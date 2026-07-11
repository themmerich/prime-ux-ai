Eine Portfolio-Seite für einen Frontend-Architekten hat ein eingebautes Glaubwürdigkeitsproblem: Kommt sie aus dem Baukasten, sagt sie mehr über den Baukasten aus als über mich. Also ist diese Seite selbst ein Projekt — mit denselben Ansprüchen, die ich an Kundenprojekte stelle: klare Architektur-Entscheidungen, Infrastruktur als Code, ein Deployment, das ohne Handarbeit auskommt. Dieser Artikel ist der Rundgang.

## Die Rahmenbedingungen

Bevor über Technik entschieden wird, gehören die Anforderungen auf den Tisch. Hier sind sie überschaubar, aber präzise:

- **Der Inhalt ist statisch.** Profil, Projekte, Blogartikel — nichts davon hängt vom Besucher ab.
- **Zwei Sprachen**, Deutsch und Englisch, umschaltbar ohne Neuladen.
- **Kein Tracking, keine Cookies**, selbst gehostete Fonts. Eine Portfolio-Seite braucht kein Consent-Banner.
- **Günstig und wartungsarm im Betrieb.** Kein Server, der gepatcht werden will.

Diese vier Punkte erklären fast jede Entscheidung, die folgt.

## Angular 22, ohne Zone.js

Das Frontend ist Angular 22 mit Standalone Components und Signals — und ohne Zone.js. Change Detection läuft zoneless: Was sich ändert, ist über Signals explizit modelliert, statt dass ein Monkey-Patch über allen Browser-APIs liegt und nach jedem Event die halbe Welt prüft.

Für eine Seite dieser Größe ist das kein Performance-Thema, sondern ein Architektur-Statement: Der gesamte veränderliche Zustand — Sprache, Theme, aktueller Blogartikel — ist als Signal deklariert und über `computed` abgeleitet. Es gibt keinen Zustand, der irgendwo in einer Komponente „einfach so" lebt. Das initiale Bundle bleibt dabei bei gut 100 kB übers Netz, Fonts inklusive selbst gehostet.

## Zweisprachigkeit ist ein Datenmodell, kein Framework

Für DE/EN auf einer Seite dieser Größe braucht es keine i18n-Bibliothek. Es braucht einen Typ:

```ts
export interface L<T = string> {
  de: T;
  en: T;
}
```

Der komplette Seiteninhalt — vom Hero-Text bis zu den Projekt-Highlights — liegt als typisiertes Datenmodell in einer Datei, und jedes übersetzbare Feld ist ein `L`. Ein Signal hält die aktive Sprache, eine einzige Funktion löst auf:

```ts
readonly t = <T>(text: L<T>): T => text[this.lang()];
```

<figure>
  <img src="/blog/images/zweisprachiges-content-modell.svg" alt="Schaubild: Das L-Interface erzwingt beide Sprachen pro Feld, ein Sprach-Signal wählt zur Laufzeit aus" />
  <figcaption>Ein Typ statt einer Bibliothek: Jedes Feld trägt beide Sprachen, das Sprach-Signal wählt aus — fehlt eine Übersetzung, bricht der Build.</figcaption>
</figure>

Der entscheidende Unterschied zu Wörterbuch-Ansätzen mit String-Keys: **Vollständigkeit prüft der Compiler.** Ein `Engagement` ohne englisches `role`-Feld kompiliert nicht. Es gibt keine Übersetzungsdatei, die vergessen werden kann, keine Keys, die zur Laufzeit ins Leere zeigen. Der Sprachumschalter setzt genau ein Signal — alles, was über `t()` liest, zieht nach, einschließlich Titel und Meta-Tags.

## Der Blog: Markdown zur Buildzeit

Artikel wie dieser liegen als Markdown im Repository, pro Sprache eine Datei. Der naheliegende Weg — Markdown zur Laufzeit per HTTP nachladen — war sogar die erste Version. Er flog wieder raus, als das Prerendering kam: Ein `fetch` läuft beim Rendern zur Buildzeit nicht, die generierten Seiten wären ohne Artikeltext geblieben.

Stattdessen zieht der esbuild-`text`-Loader die Markdown-Dateien als Strings direkt ins Bundle:

```ts
import makingOfDe from '../../content/blog/wie-diese-website-gebaut-ist.de.md';
```

Gerendert wird mit `marked`, synchron, in einem `computed`. Damit steht der volle Artikeltext im prerenderten HTML — und der Sprachwechsel tauscht ihn ohne Netzwerk-Request aus, weil beide Fassungen ohnehin im Bundle liegen.

## Prerendering statt Server

Server-Side Rendering hat bei statischem Inhalt eine einfache Wahrheit: Wenn jeder Request dasselbe HTML ergibt, muss es nicht bei jedem Request gerendert werden. Deshalb rendert der Build jede Route genau einmal (`outputMode: "static"`) — heraus fallen fertige HTML-Seiten, eine pro Route, Blogartikel über `getPrerenderParams` aus der Artikelliste aufgezählt.

<figure>
  <img src="/blog/images/build-und-auslieferung.svg" alt="Schaubild: Quellcode wird beim Build zu statischem HTML prerendert, per S3 und CloudFront ausgeliefert und im Browser hydratisiert" />
  <figcaption>Zwei Zeitachsen: Beim Build entsteht fertiges HTML, zur Request-Zeit wird nur noch ausgeliefert — und im Browser hydratisiert.</figcaption>
</figure>

Der Browser bekommt sofort lesbares HTML — Suchmaschinen auch. Danach hydratisiert Angular die Seite: Das vorhandene DOM wird übernommen statt neu aufgebaut, die Signale übernehmen. Zwei Services brauchten dafür Umbau, weil sie im Konstruktor auf `localStorage` und `document` zugriffen — beim Rendern zur Buildzeit gibt es beides nicht. Serverseitig gelten jetzt die Defaults (Deutsch, Dark Mode), der Browser korrigiert nach der Hydration anhand der gespeicherten Präferenz.

Ein echter Node-Server zur Request-Zeit hätte dagegen nur Nachteile gehabt: laufende Kosten, Patching, ein Ausfallrisiko — für HTML, das sich nur bei einem Deployment ändert.

## Der Haken: ein Objekt-Speicher kennt keine Verzeichnisse

Prerendering erzeugt pro Route ein Verzeichnis mit `index.html` — die URL bleibt aber `/impressum`, ohne Dateinamen. S3 ist ein Key-Value-Speicher: Unter dem Key `impressum` liegt nichts, unter `impressum/index.html` schon. Ohne Gegenmaßnahme hätte der 404-Fallback der Distribution die *Startseite* mit Status 200 geliefert — der Klassiker unter den stillen SEO-Fehlern, weil optisch alles funktioniert.

<figure>
  <img src="/blog/images/cloudfront-rewrite.svg" alt="Schaubild: Eine CloudFront Function ergänzt bei Verzeichnis-URLs index.html, bevor die Anfrage S3 erreicht" />
  <figcaption>Eine CloudFront Function am Viewer-Request ergänzt den Dateinamen; nur unbekannte URLs landen im SPA-Fallback.</figcaption>
</figure>

Die Lösung ist eine CloudFront Function von einer Handvoll Zeilen: Endet der Pfad ohne Dateiendung, wird `/index.html` angehängt, bevor die Anfrage den Origin erreicht. Sie läuft am Edge, kostet praktisch nichts — und ist, wie alles hier, im Repository versioniert.

## Infrastruktur, die im Repo lebt

Die komplette AWS-Infrastruktur ist Terraform: privater S3-Bucket (Zugriff ausschließlich über CloudFront per Origin Access Control), die CDN-Distribution samt Function, Route 53, ACM-Zertifikat, sogar ein Kosten-Budget mit Alarm. Es gibt keinen Klick in der AWS-Konsole, der nicht reproduzierbar wäre.

Jeder Push auf `main` durchläuft dieselbe Strecke: Trivy scannt Abhängigkeiten und Terraform-Code, Terraform gleicht die Infrastruktur ab, Angular baut und prerendert, `aws s3 sync` lädt hoch, CloudFront invalidiert. Die Cache-Strategie folgt dem Build: gehashte Assets cachen ein Jahr `immutable`, die prerenderten HTML-Seiten gar nicht — so greift ein Deployment sofort, ohne dass je ein Besucher veraltetes JavaScript bekommt.

Wer das live sehen will: Die Startseite zeigt den [Pipeline-Status](/#diese-seite) des letzten Deployments — direkt aus der GitHub-API.

## SEO als letzter Baustein

Prerendering liefert das Fundament — fertiges HTML —, aber erst die Metadaten machen es für Suchmaschinen nutzbar. Ein zentraler `Seo`-Service setzt pro Route Titel, Description, Canonical-Link, Open-Graph-Tags und JSON-LD (`Person` auf der Startseite, `BlogPosting` auf Artikeln). Auch er ist sprachreaktiv: Er liest über dasselbe `L`-Modell und zieht beim Umschalten nach.

Die `sitemap.xml` entsteht nach dem Build aus dem Prerender-Output selbst — ein Skript sammelt die erzeugten `index.html`-Dateien ein. Dadurch kann die Sitemap nie von den echten Routen abweichen: Ein neuer Artikel in der Artikelliste wird prerendert und taucht damit automatisch auf.

## Was noch kommt

Die Seite ist bewusst Phase 1. Auf der Roadmap steht ein agentischer Assistent, der Fragen zu Profil und Projekten direkt hier beantwortet — nicht als aufgesetztes Chat-Fenster, sondern als Teil der Seite. Die Architektur dafür ist vorbereitet: typisierter Content als Wissensbasis, Signals als Zustandsmodell, und eine Infrastruktur, die sich per Pull Request erweitern lässt.

Der komplette Quellcode — inklusive Terraform und Pipeline — liegt offen auf [GitHub](https://github.com/themmerich/prime-ux-ai).
