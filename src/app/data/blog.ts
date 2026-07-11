import { L } from '../core/i18n';

import makingOfDe from '../../content/blog/wie-diese-website-gebaut-ist.de.md';
import makingOfEn from '../../content/blog/wie-diese-website-gebaut-ist.en.md';
import microFrontendsDe from '../../content/blog/micro-frontends-mit-nx.de.md';
import microFrontendsEn from '../../content/blog/micro-frontends-mit-nx.en.md';

export interface BlogPost {
  slug: string;
  /** ISO-Datum yyyy-mm-dd */
  date: string;
  /** grobe Lesezeit in Minuten (manuell gepflegt) */
  readingMinutes: number;
  title: L;
  excerpt: L;
  tags: string[];
  /** Roher Markdown-Text, zur Buildzeit eingebunden */
  body: L;
}

export const BLOG_TITLE = { de: 'Blog', en: 'Blog' } as L;
export const BLOG_INTRO = {
  de: 'Gedanken zu Angular-Architektur, Agentic UI und dem Handwerk moderner Frontends.',
  en: 'Thoughts on Angular architecture, agentic UI and the craft of modern frontends.',
} as L;

/**
 * Wird nach Datum sortiert (neueste zuerst) — die Reihenfolge hier ist egal.
 * Der Artikeltext liegt als Markdown unter src/content/blog/<slug>.<lang>.md
 */
const POSTS: BlogPost[] = [
  {
    slug: 'wie-diese-website-gebaut-ist',
    date: '2026-07-11',
    readingMinutes: 8,
    title: {
      de: 'Kein Template: Wie diese Website gebaut ist',
      en: 'No Template: How This Site Is Built',
    },
    excerpt: {
      de: 'Angular 22 ohne Zone.js, Zweisprachigkeit als Datenmodell, Prerendering statt Node-Server und Infrastruktur als Terraform — ein Rundgang durch die Architektur dieser Seite.',
      en: 'Angular 22 without Zone.js, bilingualism as a data model, prerendering instead of a Node server and infrastructure as Terraform — a tour of this site’s architecture.',
    },
    tags: ['Angular', 'SSG', 'Terraform', 'Making-of'],
    body: { de: makingOfDe, en: makingOfEn },
  },
  {
    slug: 'micro-frontends-mit-nx',
    date: '2026-05-08',
    readingMinutes: 7,
    title: {
      de: 'Micro-Frontends mit Nx: Wann es sich lohnt — und wann nicht',
      en: 'Micro Frontends with Nx: When It Pays Off — and When It Does Not',
    },
    excerpt: {
      de: 'Micro-Frontends lösen ein Organisations-, kein Technikproblem. Eine ehrliche Entscheidungshilfe aus mehreren Enterprise-Projekten.',
      en: 'Micro frontends solve an organizational problem, not a technical one. An honest decision guide from several enterprise projects.',
    },
    tags: ['Micro-Frontends', 'Nx', 'Architektur'],
    body: { de: microFrontendsDe, en: microFrontendsEn },
  },
];

/** Anzeige-Reihenfolge: neuester Artikel zuerst (ISO-Daten sortieren lexikografisch). */
export const BLOG_POSTS: BlogPost[] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
