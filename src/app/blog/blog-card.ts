import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { TechChip } from '../shared/tech-chip';
import { BlogPost } from '../data/blog';

@Component({
  selector: 'px-blog-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TechChip],
  template: `
    <a
      [routerLink]="['/blog', post().slug]"
      class="group flex h-full flex-col rounded-xl border p-6 transition-colors dark:bg-ink-900/50"
      [class]="
        featured()
          ? 'border-accent-500/60 hover:border-accent-500 dark:border-accent-400/50 dark:hover:border-accent-400'
          : 'border-slate-200 hover:border-accent-500/60 dark:border-ink-700 dark:hover:border-accent-400/60'
      "
    >
      <div class="flex items-center gap-3 font-mono text-xs text-slate-500">
        @if (featured()) {
          <span
            class="rounded-full border border-accent-500/40 bg-accent-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.15em] text-accent-600 uppercase dark:text-accent-400"
          >
            {{ i18n.lang() === 'de' ? 'Neu' : 'New' }}
          </span>
        }
        <span>{{ formattedDate() }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ post().readingMinutes }} {{ i18n.lang() === 'de' ? 'Min.' : 'min' }}</span>
      </div>

      <h3
        class="mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400"
      >
        {{ i18n.t(post().title) }}
      </h3>

      <p class="mt-2 flex-1 text-sm leading-relaxed">{{ i18n.t(post().excerpt) }}</p>

      <div class="mt-5 flex flex-wrap gap-1.5">
        @for (tag of post().tags; track tag) {
          <px-tech-chip [label]="tag" />
        }
      </div>

      <span class="mt-5 font-mono text-sm text-accent-600 dark:text-accent-400" aria-hidden="true">
        {{ i18n.lang() === 'de' ? 'Weiterlesen' : 'Read more' }} →
      </span>
    </a>
  `,
})
export class BlogCard {
  protected readonly i18n = inject(I18n);
  readonly post = input.required<BlogPost>();
  /** Hebt die Karte hervor (Akzent-Rahmen + Badge) — für den neuesten Artikel. */
  readonly featured = input(false);

  protected readonly formattedDate = computed(() =>
    new Date(this.post().date).toLocaleDateString(this.i18n.lang() === 'de' ? 'de-DE' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  );
}
