import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { TechChip } from '../shared/tech-chip';
import { ENGAGEMENTS, ENGAGEMENTS_INTRO, ENGAGEMENTS_TITLE } from '../data/content';

@Component({
  selector: 'px-engagements',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, TechChip],
  template: `
    <section id="projekte" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="03" [title]="i18n.t(title)" [intro]="i18n.t(intro)" />

        <div class="grid gap-6 lg:grid-cols-2">
          @for (e of engagements; track e.client) {
            <article
              class="flex flex-col rounded-xl border border-slate-200 p-6 md:p-8 dark:border-ink-700 dark:bg-ink-900/50"
            >
              <div class="flex items-center justify-between gap-4">
                <span class="font-mono text-xs text-accent-600 dark:text-accent-400">
                  {{ i18n.t(e.period) }}
                </span>
                <span
                  class="inline-flex items-center gap-1.5 rounded-full border border-accent-500/30 px-2.5 py-0.5 font-mono text-[11px] text-accent-700 dark:text-accent-300"
                >
                  <span class="size-1.5 animate-pulse rounded-full bg-accent-500"></span>
                  {{ i18n.lang() === 'de' ? 'aktiv' : 'active' }}
                </span>
              </div>
              <h3 class="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                {{ i18n.t(e.project) }}
              </h3>
              <p class="font-mono text-sm text-slate-500">{{ e.client }}</p>
              <p class="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {{ i18n.t(e.role) }}
              </p>
              <p class="mt-4 text-sm leading-relaxed">{{ i18n.t(e.text) }}</p>
              <ul class="mt-4 space-y-2 text-sm">
                @for (h of i18n.t(e.highlights); track h) {
                  <li class="flex gap-2">
                    <span class="text-accent-600 dark:text-accent-400" aria-hidden="true">▸</span>
                    <span>{{ h }}</span>
                  </li>
                }
              </ul>
              <div class="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-5 dark:border-ink-800">
                @for (t of e.tech; track t) {
                  <px-tech-chip [label]="t" />
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Engagements {
  protected readonly i18n = inject(I18n);
  protected readonly title = ENGAGEMENTS_TITLE;
  protected readonly intro = ENGAGEMENTS_INTRO;
  protected readonly engagements = ENGAGEMENTS;
}
