import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { TechChip } from '../shared/tech-chip';
import { HISTORY, HISTORY_INTRO, HISTORY_TITLE } from '../data/content';

@Component({
  selector: 'px-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, TechChip],
  template: `
    <section class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="05" [title]="i18n.t(title)" [intro]="i18n.t(intro)" />

        <ol class="relative space-y-10 border-l border-slate-200 pl-8 dark:border-ink-700">
          @for (entry of history; track entry.period) {
            <li class="relative">
              <span
                class="absolute top-1.5 -left-[37px] size-2.5 rounded-full border-2 border-white bg-accent-500 dark:border-ink-950 dark:bg-accent-400"
                aria-hidden="true"
              ></span>
              <p class="font-mono text-xs text-slate-500">{{ entry.period }}</p>
              <h3 class="mt-1 font-semibold text-slate-900 dark:text-white">
                {{ i18n.t(entry.project) }}
              </h3>
              <p class="font-mono text-sm text-slate-500">
                {{ entry.client }} · {{ i18n.t(entry.role) }}
              </p>
              <p class="mt-2 max-w-3xl text-sm leading-relaxed">{{ i18n.t(entry.text) }}</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                @for (t of entry.tech; track t) {
                  <px-tech-chip [label]="t" />
                }
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class History {
  protected readonly i18n = inject(I18n);
  protected readonly title = HISTORY_TITLE;
  protected readonly intro = HISTORY_INTRO;
  protected readonly history = HISTORY;
}
