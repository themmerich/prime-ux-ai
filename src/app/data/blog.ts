import { L } from '../core/i18n';

import postsMeta from './blog-posts.json';

import makingOfDe from '../../content/blog/wie-diese-website-gebaut-ist.de.md';
import makingOfEn from '../../content/blog/wie-diese-website-gebaut-ist.en.md';
import microFrontendsDe from '../../content/blog/micro-frontends-mit-nx.de.md';
import microFrontendsEn from '../../content/blog/micro-frontends-mit-nx.en.md';

/** Metadaten eines Artikels ohne Body — Single Source ist blog-posts.json, damit
 *  der RSS-Generator (scripts/generate-rss.mjs) dieselben Daten lesen kann. */
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

export interface BlogPost extends BlogPostMeta {
  /** Roher Markdown-Text, zur Buildzeit eingebunden */
  body: L;
}

export const BLOG_TITLE = { de: 'Blog', en: 'Blog' } as L;
export const BLOG_INTRO = {
  de: 'Gedanken zu Angular-Architektur, Agentic UI und dem Handwerk moderner Frontends.',
  en: 'Thoughts on Angular architecture, agentic UI and the craft of modern frontends.',
} as L;

/**
 * Artikeltexte pro Slug — als Markdown zur Buildzeit eingebunden (src/content/blog/<slug>.<lang>.md).
 * Die übrigen Metadaten kommen aus blog-posts.json (gemeinsame Quelle mit dem RSS-Generator).
 */
const BODIES: Record<string, L> = {
  'wie-diese-website-gebaut-ist': { de: makingOfDe, en: makingOfEn },
  'micro-frontends-mit-nx': { de: microFrontendsDe, en: microFrontendsEn },
};

/** Reihenfolge in der JSON ist egal — es wird nach Datum sortiert (neueste zuerst). */
const POSTS: BlogPost[] = (postsMeta as BlogPostMeta[]).map((meta) => ({
  ...meta,
  body: BODIES[meta.slug],
}));

/** Anzeige-Reihenfolge: neuester Artikel zuerst (ISO-Daten sortieren lexikografisch). */
export const BLOG_POSTS: BlogPost[] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
