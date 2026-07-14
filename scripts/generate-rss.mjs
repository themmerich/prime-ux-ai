// Erzeugt die RSS-Feeds aus der gemeinsamen Artikel-Quelle
// (src/app/data/blog-posts.json — dieselbe Datei, die auch die Angular-App liest).
// Es entstehen zwei Feeds, passend zur Zweisprachigkeit der Seite:
//   /rss.xml     — Deutsch  (Standard, entspricht der prerenderten Sprache)
//   /rss.en.xml  — Englisch
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ORIGIN = 'https://prime-ux.de';
const BROWSER_DIR = 'dist/prime-ux/browser';
const POSTS_JSON = 'src/app/data/blog-posts.json';

/** Kanal-Metadaten pro Sprache. */
const CHANNELS = {
  de: {
    file: 'rss.xml',
    title: 'PRIME UX — Blog',
    description:
      'Gedanken zu Angular-Architektur, Agentic UI und dem Handwerk moderner Frontends.',
  },
  en: {
    file: 'rss.en.xml',
    title: 'PRIME UX — Blog',
    description: 'Thoughts on Angular architecture, agentic UI and the craft of modern frontends.',
  },
};

/** XML-Sonderzeichen maskieren. */
function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** yyyy-mm-dd → RFC-822-Datum (RSS erwartet dieses Format), auf Mitternacht UTC. */
function toRfc822(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

const posts = JSON.parse(await readFile(POSTS_JSON, 'utf8'));
// Neueste zuerst (ISO-Daten sortieren lexikografisch).
posts.sort((a, b) => b.date.localeCompare(a.date));

const lastBuildDate = new Date().toUTCString();

async function writeFeed(lang) {
  const channel = CHANNELS[lang];
  const feedUrl = `${ORIGIN}/${channel.file}`;

  const items = posts
    .map((post) => {
      const url = `${ORIGIN}/blog/${post.slug}`;
      return [
        '    <item>',
        `      <title>${escapeXml(post.title[lang])}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${toRfc822(post.date)}</pubDate>`,
        `      <description>${escapeXml(post.excerpt[lang])}</description>`,
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${ORIGIN}/blog</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channel.description)}</description>
    <language>${lang}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  await writeFile(join(BROWSER_DIR, channel.file), xml, 'utf8');
}

await Promise.all(Object.keys(CHANNELS).map(writeFeed));
console.log(`RSS-Feeds mit ${posts.length} Artikeln geschrieben (de, en).`);
