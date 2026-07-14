import { L } from '../core/i18n';

import postsMeta from './blog-posts.json';

/** Metadaten eines Artikels ohne Body — Single Source ist blog-posts.json, damit
 *  der RSS-Generator (scripts/generate-rss.mjs) dieselben Daten lesen kann.
 *  Die Artikeltexte liegen bewusst getrennt in blog-bodies.ts, damit Startseite
 *  und Artikelliste nicht das gesamte Markdown mitladen. */
export interface BlogPostMeta {
  slug: string;
  /** ISO-Datum yyyy-mm-dd */
  date: string;
  /** grobe Lesezeit in Minuten (manuell gepflegt) */
  readingMinutes: number;
  title: L;
  excerpt: L;
  tags: string[];
}

export const BLOG_TITLE = { de: 'Blog', en: 'Blog' } as L;
export const BLOG_INTRO = {
  de: 'Gedanken zu Angular-Architektur, Agentic UI und dem Handwerk moderner Frontends.',
  en: 'Thoughts on Angular architecture, agentic UI and the craft of modern frontends.',
} as L;

/** Anzeige-Reihenfolge: neuester Artikel zuerst (ISO-Daten sortieren lexikografisch). */
export const BLOG_POSTS: BlogPostMeta[] = (postsMeta as BlogPostMeta[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
