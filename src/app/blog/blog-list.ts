import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
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
        ← {{ i18n.lang() === 'de' ? 'Zur Startseite' : 'Back to home' }}
      </a>

      <h1 class="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
        {{ i18n.t(title) }}
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-relaxed md:text-lg">{{ i18n.t(intro) }}</p>

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
  protected readonly title = BLOG_TITLE;
  protected readonly intro = BLOG_INTRO;
  protected readonly posts = BLOG_POSTS;
}
