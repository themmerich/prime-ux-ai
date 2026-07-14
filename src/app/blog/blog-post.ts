import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { marked } from 'marked';
import { I18n, L, localeFor } from '../core/i18n';
import { ORIGIN, Seo } from '../core/seo';
import { TechChip } from '../shared/tech-chip';
import { findPost } from '../data/blog';
import { postBody } from '../data/blog-bodies';

const NOT_FOUND: L = {
  de: 'Diesen Artikel gibt es nicht (mehr).',
  en: 'This article does not exist (anymore).',
};

@Component({
  selector: 'px-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TechChip],
  template: `
    <article class="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
      <a
        routerLink="/blog"
        class="font-mono text-sm text-slate-500 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
      >
        ← {{ i18n.t({ de: 'Alle Artikel', en: 'All articles' }) }}
      </a>

      @if (post(); as p) {
        <header class="mt-6">
          <div class="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500">
            <span>{{ formattedDate() }}</span>
            <span aria-hidden="true">·</span>
            <span
              >{{ p.readingMinutes }} {{ i18n.t({ de: 'Min. Lesezeit', en: 'min read' }) }}</span
            >
          </div>
          <h1
            class="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white"
          >
            {{ i18n.t(p.title) }}
          </h1>
          <div class="mt-4 flex flex-wrap gap-1.5">
            @for (tag of p.tags; track tag) {
              <px-tech-chip [label]="tag" />
            }
          </div>
        </header>

        <div class="prose mt-10" [innerHTML]="body()"></div>
      } @else {
        <h1 class="mt-6 text-3xl font-bold text-slate-900 dark:text-white">404</h1>
        <p class="mt-4 text-sm">{{ i18n.t(notFound) }}</p>
      }
    </article>
  `,
})
export class BlogPost {
  protected readonly i18n = inject(I18n);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(Seo);

  protected readonly notFound = NOT_FOUND;

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly post = computed(() => findPost(this.slug()));

  constructor() {
    // SEO folgt dem Artikel; bei Slug-Wechsel ohne Neuaufbau der Komponente aktualisiert.
    effect(() => {
      const p = this.post();
      if (!p) {
        this.seo.set({
          title: { de: 'Artikel nicht gefunden', en: 'Article not found' },
          description: NOT_FOUND,
        });
        return;
      }
      this.seo.set({
        title: p.title,
        description: p.excerpt,
        type: 'article',
        jsonLd: (lang) => ({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title[lang],
          description: p.excerpt[lang],
          datePublished: p.date,
          inLanguage: localeFor(lang),
          keywords: p.tags.join(', '),
          url: `${ORIGIN}/blog/${p.slug}`,
          author: { '@type': 'Person', name: 'Thomas Hemmerich', url: ORIGIN },
        }),
      });
    });
  }

  // roher HTML-String — Angular sanitisiert beim [innerHTML]-Binding
  protected readonly body = computed(() => {
    const p = this.post();
    const md = p && postBody(p.slug);
    return md ? marked.parse(this.i18n.t(md), { async: false }) : '';
  });

  protected readonly formattedDate = computed(() => {
    const p = this.post();
    if (!p) {
      return '';
    }
    return this.i18n.formatDate(p.date, { day: '2-digit', month: 'long', year: 'numeric' });
  });
}
