import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import {
  BACKGROUND_INTRO,
  BACKGROUND_TITLE,
  BackgroundEntry,
  EDUCATION,
  EDUCATION_TITLE,
  EMPLOYMENT,
  EMPLOYMENT_TITLE,
} from '../data/content';

@Component({
  selector: 'px-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading],
  template: `
    <section class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="07" [title]="i18n.t(title)" [intro]="i18n.t(intro)" />

        <div class="grid gap-12 md:grid-cols-2">
          @for (col of columns; track col.heading.de) {
            <div>
              <h3
                class="mb-6 font-mono text-sm font-semibold tracking-wide text-accent-600 uppercase dark:text-accent-400"
              >
                {{ i18n.t(col.heading) }}
              </h3>
              <ol class="relative space-y-8 border-l border-slate-200 pl-6 dark:border-ink-700">
                @for (entry of col.entries; track entry.period) {
                  <li class="relative">
                    <span
                      class="absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-white bg-accent-500 dark:border-ink-950 dark:bg-accent-400"
                      aria-hidden="true"
                    ></span>
                    <p class="font-mono text-xs text-slate-500">{{ entry.period }}</p>
                    <h4 class="mt-1 font-semibold text-slate-900 dark:text-white">
                      {{ i18n.t(entry.title) }}
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ entry.place }}</p>
                    @if (entry.note) {
                      <p class="mt-1 text-sm text-slate-500">{{ i18n.t(entry.note) }}</p>
                    }
                  </li>
                }
              </ol>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Background {
  protected readonly i18n = inject(I18n);
  protected readonly title = BACKGROUND_TITLE;
  protected readonly intro = BACKGROUND_INTRO;

  protected readonly columns: { heading: typeof EDUCATION_TITLE; entries: BackgroundEntry[] }[] = [
    { heading: EDUCATION_TITLE, entries: EDUCATION },
    { heading: EMPLOYMENT_TITLE, entries: EMPLOYMENT },
  ];
}
