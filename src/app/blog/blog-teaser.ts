import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { BlogCard } from './blog-card';
import { BLOG_INTRO, BLOG_POSTS, BLOG_TITLE } from '../data/blog';

@Component({
  selector: 'px-blog-teaser',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SectionHeading, BlogCard],
  template: `
    <section id="blog" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="09" [title]="i18n.t(title)" [intro]="i18n.t(intro)" />

        <div class="grid gap-6 md:grid-cols-2">
          @for (post of posts; track post.slug) {
            <px-blog-card [post]="post" />
          }
        </div>

        <a
          routerLink="/blog"
          class="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent-600 transition-colors hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300"
        >
          {{ i18n.lang() === 'de' ? 'Alle Artikel' : 'All articles' }} →
        </a>
      </div>
    </section>
  `,
})
export class BlogTeaser {
  protected readonly i18n = inject(I18n);
  protected readonly title = BLOG_TITLE;
  protected readonly intro = BLOG_INTRO;
  // auf der Startseite die neuesten drei Artikel
  protected readonly posts = BLOG_POSTS.slice(0, 3);
}
