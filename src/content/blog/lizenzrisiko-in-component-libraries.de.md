Im Juli 2026 hat PrimeTek [angekündigt](https://primeui.dev/nextchapter), dass künftige Major-Versionen von PrimeNG, PrimeReact und PrimeVue nicht mehr unter MIT erscheinen, sondern unter einer kommerziellen „PrimeUI"-Lizenz. In mehreren meiner Enterprise-Projekte ist PrimeNG seit Jahren gesetzt — die Nachricht hat mich also nicht als Beobachter erreicht, sondern als Betroffenen. Dieser Artikel ist trotzdem keine Empörungsschrift. Er ist der Versuch, die eigentliche Lektion festzuhalten: **Lizenzmodelle sind ein Architektur-Attribut, und die meisten Evaluierungen behandeln sie als Checkbox.**

## Was genau passiert ist

Die Fakten, Stand Juli 2026:

- **Bestehende MIT-Versionen bleiben MIT** — für PrimeNG ist Version 21 die letzte offene Major, ältere Stände bleiben dauerhaft frei nutzbar.
- **Ab PrimeNG 22** (analog PrimeReact 11, PrimeVue 5) erscheinen die Bibliotheken als kompilierte npm-Pakete unter der PrimeUI-Lizenz — der Quellcode künftiger Versionen ist nicht mehr Open Source.
- Die kostenlose [Community-Lizenz](https://primeui.dev/licenses/community) ist eng gefasst: unter 1 Mio. $ Jahresumsatz, weniger als 5 Entwickler, weniger als 10 Mitarbeitende, maximal 3 Mio. $ Fremdkapital — und **Behörden, öffentliche Hochschulen und öffentlich finanzierte Einrichtungen sind unabhängig davon ausgeschlossen**.
- Die kommerzielle Lizenz kostet zum Einführungspreis 599 $ pro Entwickler (perpetual, ein Jahr Updates; ab 2027 dann 799 $), Update-Verlängerungen 399 $ pro Entwickler und Jahr.

Für praktisch jedes Enterprise-Team — und erst recht für den öffentlichen Sektor — heißt das: Jede künftige Major-Version ist ein Beschaffungsvorgang.

## Warum das kein Ausreißer ist

Man kann PrimeTek schwer vorwerfen, ein Geschäftsmodell zu suchen. Vier große Bibliotheken über Jahre auf Enterprise-Niveau zu pflegen, finanziert sich nicht aus Theme-Verkäufen. Dazu kommt, dass KI-Werkzeuge die Hürde senken, Standard-Komponenten selbst zu generieren — wer heute Datepicker und Tabellen verkauft, konkurriert morgen mit einem Prompt. Das Modell „Kern unter MIT, Geld mit Add-ons" wird deshalb gerade branchenweit brüchig, und die Anbieter weichen auf kommerzielle Lizenzen, Dual Licensing oder Service-Geschäft aus.

Für die Auswahl einer Component Library folgt daraus eine unbequeme Annahme: Eine Enterprise-Anwendung lebt zehn bis fünfzehn Jahre, und es ist gut möglich, dass das Lizenzmodell des Anbieters diese Zeitspanne nicht durchhält. Damit sollte man rechnen, bevor man abhängig ist, nicht danach.

## Die eigentliche Lektion: „MIT" gilt nur für die Gegenwart

In jeder Library-Evaluierung, die ich gesehen habe, steht eine Zeile wie „Lizenz: MIT ✓". Das stimmt auch — es beantwortet nur eine zu kleine Frage. MIT beschreibt den Rechtsstatus des heutigen Codes, nicht die Zukunft der Abhängigkeit. Die Version, die ihr einsetzt, bleibt frei; aber Angular zieht weiter, Sicherheitslücken wollen gepatcht werden, und der Entwicklungspfad gehört dem Anbieter.

In die Evaluierung gehören deshalb andere Fragen. Wer trägt die Bibliothek — ein einzelner Hersteller mit Monetarisierungsdruck oder eine breite Community bzw. Foundation? Wie hat der Anbieter bisher monetarisiert, und wie liefen frühere Modellwechsel ab? Kostenpflichtiges LTS gab es bei PrimeNG übrigens schon vor dieser Ankündigung, die Richtung war also erkennbar. Und schließlich: Was würde der Ausstieg kosten — nicht als Bauchgefühl, sondern als Schätzung, wie viele Stellen im Code die Bibliothek beim Namen kennen?

## Was betroffene Teams jetzt konkret tun sollten

Erst Bestandsaufnahme, dann Strategie. Drei Optionen:

**Bleiben auf Version 21.** Kurzfristig legitim — die Version läuft, MIT bleibt MIT. Aber es ist eine Entscheidung mit Verfallsdatum: Wie lange Version 21 mit künftigen Angular-Majors Schritt hält und ob Sicherheitskorrekturen kommen, liegt außerhalb der eigenen Kontrolle. Wer bleibt, sollte sich ein Datum in den Kalender schreiben, an dem die Entscheidung überprüft wird.

**Zahlen.** In vielen Fällen der wirtschaftlich rationale Zug, auch wenn er sich falsch anfühlt. Ein Team von zehn Entwicklern zahlt zum Listenpreis rund 8.000 $ — eine UI-Library-Migration in einer gewachsenen Anwendung kostet dagegen nicht Tage, sondern Monate. Und ein solvent finanzierter Anbieter ist allemal besser als eine Bibliothek, die niemand mehr pflegt. Mit offenen Augen zahlen heißt allerdings auch: Das Update-Abo von 399 $ pro Entwickler und Jahr ist der eigentliche Dauerposten, und die eigene Verhandlungsposition bleibt schwach, solange der Ausstieg unbezahlbar ist.

**Migrieren.** Angular Material, Spartan oder eine schlankere Eigenbasis auf Headless-Fundament. Realistisch nur für Anwendungen mit langem Restleben — und der Aufwand hängt fast vollständig davon ab, wie tief die Bibliothek im Code verdrahtet ist.

Genau diese Verdrahtung ist der Punkt, an dem sich entscheidet, ob die Lizenz-Nachricht ein Problem ist oder nur eine Aufgabe.

## Exit-Fähigkeit ist ein Design-Prinzip, kein Notfallplan

In einem meiner Projekte liegt zwischen Anwendungscode und UI-Library eine eigene Komponentenschicht: Die Feature-Teams importieren `app-table`, nicht die Tabelle des Herstellers. Als die Lizenz-Nachricht kam, war die Reaktion dort keine Krisensitzung, sondern eine Rechenaufgabe — die Zahl der Stellen, die die Bibliothek direkt kennen, ist bekannt und endlich. Ein Austausch bliebe teuer, aber er wäre schätzbar und damit verhandelbar.

Das ist der Governance-Nutzen, den Design Systems jenseits von Konsistenz und Barrierefreiheit liefern. Konkret heißt das:

- Eine eigene Komponentenschicht über der Fremdbibliothek, auch dort, wo sie zunächst nur durchreicht — sie ist der Ort, an dem ein Austausch überhaupt lokalisierbar wird.
- Design Tokens statt Hersteller-Theming: Farben, Abstände und Typografie gehören dem eigenen System, die Library konsumiert sie.
- Direktimporte messen und begrenzen. Eine Lint-Regel, die Hersteller-Imports außerhalb der Komponentenschicht verbietet, kostet einen Nachmittag.
- Lizenz-Exposure als Punkt im jährlichen Architektur-Review: Welche Abhängigkeiten haben Single-Vendor-Risiko, und was wäre ihr Ausstiegspreis?

## Der Merksatz

Eine Component Library ist kein Geschenk, sondern ein Liefervertrag — nur dass ihn viele Teams nie gelesen haben, weil auf dem Umschlag „MIT" stand. PrimeTek hat den Vertrag jetzt sichtbar gemacht. Wer Exit-Fähigkeit eingepreist hat, erlebt solche Ankündigungen als Rechenaufgabe mit drei Optionen; wer nicht, erlebt sie als Erpressung. Der Unterschied liegt nicht beim Anbieter.
