import { L } from '../core/i18n';
import { BLOG_POSTS } from './blog';

import makingOfDe from '../../content/blog/wie-diese-website-gebaut-ist.de.md';
import makingOfEn from '../../content/blog/wie-diese-website-gebaut-ist.en.md';
import lizenzrisikoDe from '../../content/blog/lizenzrisiko-in-component-libraries.de.md';
import lizenzrisikoEn from '../../content/blog/lizenzrisiko-in-component-libraries.en.md';

/**
 * Artikeltexte pro Slug — als Markdown zur Buildzeit eingebunden (src/content/blog/<slug>.<lang>.md).
 * Nur von der Artikel-Ansicht importiert, damit das Markdown nicht im Startseiten-Bundle landet.
 */
const BODIES: Record<string, L> = {
  'wie-diese-website-gebaut-ist': { de: makingOfDe, en: makingOfEn },
  'lizenzrisiko-in-component-libraries': { de: lizenzrisikoDe, en: lizenzrisikoEn },
};

// Schlägt beim Prerendern (Build) fehl statt still einen leeren Artikel auszuliefern,
// wenn ein Eintrag in blog-posts.json hier keinen Body hat.
for (const post of BLOG_POSTS) {
  if (!BODIES[post.slug]) {
    throw new Error(`Blogpost "${post.slug}" hat keinen Body in blog-bodies.ts`);
  }
}

export function postBody(slug: string): L | undefined {
  return BODIES[slug];
}
