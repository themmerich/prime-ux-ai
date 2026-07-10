# prime-ux.de

Persönliche Webseite von Thomas Hemmerich — Frontend-Architekt & Angular Lead.

Die Seite ist selbst ein Showcase: **Angular 22** (zoneless, Signals, Standalone Components), **Tailwind CSS 4**, Signal-basiertes i18n (DE/EN), Dark/Light-Mode, selbst gehostete Fonts, kein Tracking.

## Rendering

Der Build prerendert jede Route zu fertigem HTML (`outputMode: "static"`), das anschließend im Browser hydratisiert wird. Es läuft kein Node-Server: Der Output bleibt eine Sammlung statischer Dateien für S3 + CloudFront.

Zwei Dinge folgen daraus:

- Artikeltexte werden als Markdown zur Buildzeit ins Bundle gezogen (esbuild-`text`-Loader, siehe `angular.json`), damit sie im prerenderten HTML stehen.
- Ausgeliefert wird deutsches HTML; der Sprachumschalter tauscht die Texte nach der Hydration im Browser.

## Entwicklung

```bash
npm install
npm start        # Dev-Server auf http://localhost:4200 (rendert serverseitig vor)
npm run build    # Produktions-Build + Prerendering nach dist/prime-ux/browser
```

## Struktur

- `src/app/data/content.ts` — kompletter Seiteninhalt als typisiertes, zweisprachiges Datenmodell
- `src/content/blog/` — Artikeltexte als Markdown, `<slug>.<lang>.md`
- `src/app/core/` — Signal-basierte Services für i18n und Theming
- `src/app/sections/` — die Sektionen der One-Page-Seite
- `src/app/pages/` — Home, Impressum, Datenschutz
- `src/app/app.routes.server.ts` — welche Routen prerendert werden (inkl. Blog-Slugs)
- `infra/` — komplette AWS-Infrastruktur als Terraform (S3, CloudFront, Route 53, ACM, Budget)
- `.github/workflows/` — CI (PR-Checks) und Deployment (Trivy → Terraform → Build → S3 → CloudFront)

## Deployment

Jeder Push auf `main` deployt automatisch nach AWS — Details und einmaliges Bootstrap: [infra/README.md](infra/README.md).

## Roadmap

- [ ] Agentischer Assistent (Phase 2)
- [x] Hosting & Deployment für prime-ux.de (AWS via Terraform)
