import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { LEARNING_INTRO, LEARNING_TITLE, TRAININGS } from '../data/content';

@Component({
  selector: 'px-learning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading],
  template: `
    <section class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="06" [title]="i18n.t(title)" [intro]="i18n.t(intro)" />

        <ol class="space-y-3">
          @for (t of trainings; track t.date) {
            <li
              class="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border px-5 py-3.5"
              [class]="
                t.focus
                  ? 'border-accent-500/40 bg-accent-500/[0.04] dark:border-accent-400/40 dark:bg-accent-400/[0.04]'
                  : 'border-slate-200 dark:border-ink-700 dark:bg-ink-900/50'
              "
            >
              <span class="w-20 shrink-0 font-mono text-xs text-slate-500">{{ t.date }}</span>
              <span class="font-medium text-slate-900 dark:text-white">{{ i18n.t(t.title) }}</span>
              <span class="font-mono text-xs text-slate-500">{{ t.provider }}</span>
              @if (t.focus) {
                <span
                  class="ml-auto rounded-full bg-accent-600/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent-700 dark:bg-accent-400/10 dark:text-accent-300"
                >
                  Agentic
                </span>
              }
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Learning {
  protected readonly i18n = inject(I18n);
  protected readonly title = LEARNING_TITLE;
  protected readonly intro = LEARNING_INTRO;
  protected readonly trainings = TRAININGS;
}
