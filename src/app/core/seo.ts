import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { I18n, L, Lang, localeFor } from './i18n';

/** Kanonische Basis-URL (Apex, ohne www) — Grundlage für Canonical, OG und Sitemap. */
export const ORIGIN = 'https://prime-ux.de';
const SITE_NAME = 'PRIME UX';

export interface SeoConfig {
  /** Seitentitel ohne Site-Suffix — „ | PRIME UX" wird zentral angehängt. */
  title: L;
  description: L;
  /** OG-Typ: 'website' (Standard) oder 'article' für Blogposts. */
  type?: 'website' | 'article';
  /** Optionaler JSON-LD-Baustein, sprachabhängig aufgelöst. */
  jsonLd?: (lang: Lang) => object;
}

/**
 * Setzt alle kopfseitigen SEO-Tags pro Route. Reagiert auf Sprachwechsel:
 * Weil das HTML deutsch prerendert und im Browser umgeschaltet wird, ziehen
 * Titel, Description und JSON-LD beim Toggle nach.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18n);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);

  private readonly config = signal<SeoConfig | null>(null);

  constructor() {
    effect(() => {
      const cfg = this.config();
      if (!cfg) {
        return;
      }
      const lang = this.i18n.lang();
      const title = `${this.i18n.t(cfg.title)} | ${SITE_NAME}`;
      const description = this.i18n.t(cfg.description);
      const url = this.canonicalUrl();

      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });

      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:type', content: cfg.type ?? 'website' });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
      this.meta.updateTag({
        property: 'og:locale',
        content: localeFor(lang).replace('-', '_'),
      });

      this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });

      this.setCanonical(url);
      this.setJsonLd(cfg.jsonLd ? cfg.jsonLd(lang) : null);
    });
  }

  /** Von jeder Seiten-Komponente aufgerufen; darf bei Datenwechsel erneut gesetzt werden. */
  set(config: SeoConfig): void {
    this.config.set(config);
  }

  private canonicalUrl(): string {
    const path = this.router.url.split(/[?#]/)[0];
    const clean = path === '/' ? '' : path.replace(/\/$/, '');
    return ORIGIN + clean;
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: object | null): void {
    const id = 'ld-json';
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
