import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { Seo } from '../core/seo';
import { BlogCard } from './blog-card';
import { BLOG_INTRO, BLOG_POSTS, BLOG_TITLE } from '../data/blog';

@Component({
  selector: 'px-blog-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, BlogCard],
  template: `
    <section class="mx-auto max-w-5xl px-6 pt-32 pb-24 md:pt-40">
      <a
        routerLink="/"
        class="font-mono text-sm text-slate-500 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
      >
        ← {{ i18n.t({ de: 'Zur Startseite', en: 'Back to home' }) }}
      </a>

      <h1 class="display-caps mt-6 text-4xl font-extrabold text-slate-900 md:text-5xl dark:text-white">
        {{ i18n.t(title) }}
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-relaxed md:text-lg">{{ i18n.t(intro) }}</p>

      <a
        [href]="feedHref()"
        class="mt-6 inline-flex items-center gap-2 font-mono text-sm text-slate-500 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36Z" />
          <path d="M4 4.44v2.83A12.73 12.73 0 0 1 16.73 20h2.83A15.56 15.56 0 0 0 4 4.44Z" />
          <path d="M4 9.1v2.83A8.07 8.07 0 0 1 12.07 20h2.83A10.9 10.9 0 0 0 4 9.1Z" />
        </svg>
        {{ i18n.t({ de: 'RSS-Feed abonnieren', en: 'Subscribe via RSS' }) }}
      </a>

      <div class="mt-12 grid gap-6 md:grid-cols-2">
        @for (post of posts; track post.slug) {
          <px-blog-card [post]="post" />
        }
      </div>
    </section>
  `,
})
export class BlogList {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);
  protected readonly title = BLOG_TITLE;
  protected readonly intro = BLOG_INTRO;
  protected readonly posts = BLOG_POSTS;

  /** Feed passend zur aktuellen UI-Sprache (statische Datei, daher href statt routerLink). */
  protected readonly feedHref = computed(() => this.i18n.t({ de: '/rss.xml', en: '/rss.en.xml' }));

  constructor() {
    this.seo.set({
      title: {
        de: 'Blog — Angular-Architektur & Agentic UI',
        en: 'Blog — Angular Architecture & Agentic UI',
      },
      description: BLOG_INTRO,
    });
  }
}
