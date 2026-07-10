import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { marked } from 'marked';
import { I18n } from '../core/i18n';
import { TechChip } from '../shared/tech-chip';
import { findPost } from '../data/blog';

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
        ← {{ i18n.lang() === 'de' ? 'Alle Artikel' : 'All articles' }}
      </a>

      @if (post(); as p) {
        <header class="mt-6">
          <div class="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500">
            <span>{{ formattedDate() }}</span>
            <span aria-hidden="true">·</span>
            <span
              >{{ p.readingMinutes }}
              {{ i18n.lang() === 'de' ? 'Min. Lesezeit' : 'min read' }}</span
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
        <p class="mt-4 text-sm">
          {{
            i18n.lang() === 'de'
              ? 'Diesen Artikel gibt es nicht (mehr).'
              : 'This article does not exist (anymore).'
          }}
        </p>
      }
    </article>
  `,
})
export class BlogPost {
  protected readonly i18n = inject(I18n);
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly post = computed(() => findPost(this.slug()));

  // roher HTML-String — Angular sanitisiert beim [innerHTML]-Binding
  protected readonly body = computed(() => {
    const p = this.post();
    return p ? marked.parse(this.i18n.t(p.body), { async: false }) : '';
  });

  protected readonly formattedDate = computed(() => {
    const p = this.post();
    if (!p) {
      return '';
    }
    return new Date(p.date).toLocaleDateString(this.i18n.lang() === 'de' ? 'de-DE' : 'en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });
}
