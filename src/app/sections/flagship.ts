import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { TechChip } from '../shared/tech-chip';
import { FLAGSHIP } from '../data/content';

@Component({
  selector: 'px-flagship',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TechChip],
  template: `
    <section class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <article
          class="relative overflow-hidden rounded-2xl border border-accent-500/40 bg-gradient-to-br from-accent-500/[0.06] to-transparent p-8 md:p-12 dark:border-accent-400/30"
        >
          <p class="font-mono text-sm text-accent-600 dark:text-accent-400">// 04</p>
          <div class="mt-2 flex flex-wrap items-center gap-3">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              {{ flagship.title }}
            </h2>
            <span
              class="rounded-full bg-accent-600/10 px-3 py-1 font-mono text-xs font-medium text-accent-700 dark:bg-accent-400/10 dark:text-accent-300"
            >
              {{ i18n.t(flagship.label) }}
            </span>
          </div>
          <p class="mt-2 font-mono text-xs text-slate-500">{{ flagship.period }}</p>

          <p class="mt-6 max-w-3xl text-base leading-relaxed md:text-lg">
            {{ i18n.t(flagship.text) }}
          </p>
          <p
            class="mt-4 max-w-3xl border-l-2 border-accent-500 pl-4 text-sm leading-relaxed text-slate-700 italic dark:border-accent-400 dark:text-slate-300"
          >
            {{ i18n.t(flagship.why) }}
          </p>

          <div class="mt-8 flex flex-wrap gap-1.5">
            @for (t of flagship.tech; track t) {
              <px-tech-chip [label]="t" />
            }
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            @for (repo of flagship.repos; track repo.url) {
              <a
                [href]="repo.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 font-mono text-sm text-slate-700 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-200 dark:hover:border-accent-400 dark:hover:text-accent-400"
              >
                <svg viewBox="0 0 16 16" class="size-4 fill-current" aria-hidden="true">
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                  />
                </svg>
                {{ repo.label }}
              </a>
            }
          </div>
        </article>
      </div>
    </section>
  `,
})
export class Flagship {
  protected readonly i18n = inject(I18n);
  protected readonly flagship = FLAGSHIP;
}
