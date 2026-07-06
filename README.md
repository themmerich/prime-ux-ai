# prime-ux.de

Persönliche Webseite von Thomas Hemmerich — Frontend-Architekt & Angular Lead.

Die Seite ist selbst ein Showcase: **Angular 22** (zoneless, Signals, Standalone Components), **Tailwind CSS 4**, Signal-basiertes i18n (DE/EN), Dark/Light-Mode, selbst gehostete Fonts, kein Tracking.

## Entwicklung

```bash
npm install
npm start        # Dev-Server auf http://localhost:4200
npm run build    # Produktions-Build nach dist/
```

## Struktur

- `src/app/data/content.ts` — kompletter Seiteninhalt als typisiertes, zweisprachiges Datenmodell
- `src/app/core/` — Signal-basierte Services für i18n und Theming
- `src/app/sections/` — die Sektionen der One-Page-Seite
- `src/app/pages/` — Home, Impressum, Datenschutz

## Roadmap

- [ ] Agentischer Assistent (Phase 2)
- [ ] Hosting & Deployment für prime-ux.de
