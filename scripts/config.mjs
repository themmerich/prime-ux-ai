// Gemeinsame Konstanten der Build-Skripte. ORIGIN kommt aus derselben Quelle
// wie in der App (src/app/core/seo.ts liest ebenfalls site.json) — Sitemap,
// RSS und Canonicals können damit nicht auseinanderlaufen.
import site from '../src/app/data/site.json' with { type: 'json' };

export const ORIGIN = site.origin;
export const BROWSER_DIR = 'dist/prime-ux/browser';
