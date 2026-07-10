> Beispielartikel — Platzhalter-Inhalt, den du frei ersetzen kannst.

Die letzten Jahre standen im Zeichen von Design Systems und Micro-Frontends. Die nächste Verschiebung ist schon sichtbar: **KI-Agenten wandern in die Oberfläche**. Nicht als aufgesetztes Chat-Fenster in der Ecke, sondern als integraler Teil der Interaktion.

<figure>
  <img src="/blog/images/agentic-ui-beispiel.jpg" alt="Beispielbild mit Bildunterschrift" />
  <figcaption>So kannst du Bilder mit Bildunterschrift einbinden (Platzhalterbild).</figcaption>
</figure>

Ein einfaches Bild ohne Unterschrift geht auch mit normaler Markdown-Syntax:

![Alternativtext für Screenreader](/blog/images/agentic-ui-beispiel.jpg)

## Mehr als ein Chatbot

Ein Chatbot beantwortet Fragen. Ein Agent **handelt**: Er ruft Funktionen auf, füllt Formulare vor, schlägt nächste Schritte vor und führt sie nach Bestätigung aus. Für die Oberfläche heißt das: Sie muss nicht mehr nur Eingaben entgegennehmen, sondern Vorschläge, Zwischenzustände und Rückfragen eines Agenten darstellen.

Das verändert die Architektur an drei Stellen:

1. **Zustand** — Agenten-Interaktionen sind langlebig und asynchron. Ein Signal-basierter Store, der Streaming-Antworten und Tool-Calls sauber modelliert, wird zur Kernkomponente.
2. **Komponenten** — Generative UI bedeutet: Teile der Oberfläche werden zur Laufzeit aus Agenten-Ausgaben zusammengesetzt. Das braucht eine robuste, typsichere Registry aus Bausteinen.
3. **Vertrauen** — Jede Aktion, die ein Agent auslöst, muss nachvollziehbar und widerrufbar sein. Das ist genauso ein UX- wie ein Architekturthema.

## Wo ich ansetzen würde

- Ein klar abgegrenzter Agent-Layer, der von der restlichen App entkoppelt ist.
- Design-System-Komponenten, die sowohl von Menschen als auch von Agenten befüllt werden können.
- Konsequente Beobachtbarkeit: Jeder Tool-Call wird geloggt, jeder Zustand ist reproduzierbar.

Agentic UI ist kein Feature, das man nachträglich anflanscht. Es ist eine Architektur-Haltung — und genau da fängt meine Arbeit an.
