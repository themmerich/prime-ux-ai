> Beispielartikel — Platzhalter-Inhalt, den du frei ersetzen kannst.

„Wir machen Micro-Frontends" ist selten eine technische Entscheidung. In den allermeisten Fällen ist es der Versuch, ein **Organisationsproblem** zu lösen: mehrere Teams, die unabhängig voneinander liefern wollen, ohne sich gegenseitig zu blockieren.

## Die richtige Frage

Nicht *„Wie baue ich Micro-Frontends?"*, sondern *„Habe ich das Problem, das Micro-Frontends lösen?"*.

Ein Team, ein Deployment, eine Codebasis? Dann sind Micro-Frontends fast immer Overhead ohne Gegenwert. Der Preis — verteilter Zustand, doppelte Abhängigkeiten, komplexere Builds — lohnt sich erst, wenn echte Team-Autonomie den Ausschlag gibt.

## Was Nx gut macht

Nx nimmt einen großen Teil des Schmerzes, indem es **den Monorepo-Weg zuerst gangbar macht**:

- Klare Modulgrenzen über Projekt-Tags und Lint-Regeln, lange bevor man überhaupt separat deployt.
- `affected`-Builds, die nur das neu bauen und testen, was sich geändert hat.
- Ein sauberer Upgrade-Pfad von „modularer Monolith" zu „echten Micro-Frontends" — ohne den Code wegzuwerfen.

## Meine Faustregel

Fang mit einem **modularen Monolithen** in Nx an. Zieh scharfe Grenzen zwischen den Domänen. Deploye erst dann getrennt, wenn ein Team nachweislich durch die Release-Kadenz eines anderen ausgebremst wird.

Micro-Frontends sind ein Werkzeug für Skalierung — nicht für den Anfang.
