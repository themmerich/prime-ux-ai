// Erzeugt sitemap.xml aus dem Prerender-Output. Es wird der fertige
// dist-Ordner nach index.html-Dateien durchsucht — so bleibt die Sitemap
// automatisch synchron zu den tatsächlich prerenderten Routen (inkl. Blog).
import { readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ORIGIN = 'https://prime-ux.de';
const BROWSER_DIR = 'dist/prime-ux/browser';

/** Alle index.html rekursiv einsammeln und in URL-Pfade übersetzen. */
async function collectRoutes(dir, root = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...(await collectRoutes(full, root)));
    } else if (entry.name === 'index.html') {
      const rel = relative(root, full)
        .replace(/\\/g, '/')
        .replace(/index\.html$/, '');
      const path = '/' + rel.replace(/\/$/, '');
      routes.push(path === '/' ? '/' : path);
    }
  }
  return routes;
}

const routes = (await collectRoutes(BROWSER_DIR)).sort();

const urls = routes
  .map((path) => `  <url>\n    <loc>${ORIGIN}${path === '/' ? '' : path}</loc>\n  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(join(BROWSER_DIR, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml mit ${routes.length} URLs geschrieben.`);
