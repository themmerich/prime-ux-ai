import { L } from '../core/i18n';

import agenticUiDe from '../../content/blog/agentic-ui-fuer-frontend-architekten.de.md';
import agenticUiEn from '../../content/blog/agentic-ui-fuer-frontend-architekten.en.md';
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
 * Reihenfolge = Anzeige-Reihenfolge (neueste zuerst).
 * Der Artikeltext liegt als Markdown unter src/content/blog/<slug>.<lang>.md
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'agentic-ui-fuer-frontend-architekten',
    date: '2026-06-20',
    readingMinutes: 6,
    title: {
      de: 'Agentic UI: Was KI-Agenten für Frontend-Architekten bedeuten',
      en: 'Agentic UI: What AI Agents Mean for Frontend Architects',
    },
    excerpt: {
      de: 'KI-Agenten wandern in die Oberfläche. Warum das mehr ist als ein Chat-Fenster — und welche Architektur-Entscheidungen jetzt anstehen.',
      en: 'AI agents are moving into the interface. Why that is more than a chat window — and which architecture decisions are due now.',
    },
    tags: ['Agentic UI', 'Architektur', 'Angular'],
    body: { de: agenticUiDe, en: agenticUiEn },
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

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
