import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { TechChip } from '../shared/tech-chip';
import { FOCUS_AREAS, FOCUS_INTRO, FOCUS_NOTE, FOCUS_TITLE } from '../data/content';

@Component({
  selector: 'px-focus',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, TechChip],
  template: `
    <section id="fokus" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="02" [title]="i18n.t(title)" [intro]="i18n.t(intro)" />

        <div class="grid gap-6 md:grid-cols-2">
          @for (area of areas; track area.icon; let first = $first) {
            <article
              class="group rounded-xl border p-6 transition-colors md:p-8"
              [class]="
                first
                  ? 'border-accent-500/40 bg-accent-500/[0.04] dark:border-accent-400/40 dark:bg-accent-400/[0.04]'
                  : 'border-slate-200 hover:border-accent-500/50 dark:border-ink-700 dark:bg-ink-900/50 dark:hover:border-accent-400/50'
              "
            >
              <div class="flex items-start justify-between">
                <span
                  class="font-mono text-2xl text-accent-600 dark:text-accent-400"
                  aria-hidden="true"
                  >{{ area.icon }}</span
                >
                @if (first) {
                  <span
                    class="rounded-full bg-accent-600/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent-700 dark:bg-accent-400/10 dark:text-accent-300"
                  >
                    {{ i18n.lang() === 'de' ? 'Zukunfts-Fokus' : 'future focus' }}
                  </span>
                }
              </div>
              <h3 class="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {{ i18n.t(area.title) }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed md:text-base">{{ i18n.t(area.text) }}</p>

              <!-- Geschäftlicher Nutzen — hebt die Karte über die reine Technik -->
              <p
                class="mt-4 flex gap-2 border-t border-slate-200 pt-4 text-sm font-medium text-slate-700 dark:border-ink-700 dark:text-slate-200"
              >
                <span class="text-accent-600 dark:text-accent-400" aria-hidden="true">→</span>
                <span>{{ i18n.t(area.outcome) }}</span>
              </p>

              <div class="mt-5 flex flex-wrap gap-1.5">
                @for (tag of area.tags; track tag) {
                  <px-tech-chip [label]="tag" />
                }
              </div>
            </article>
          }
        </div>

        <p class="mt-8 font-mono text-sm text-slate-500 dark:text-slate-500">
          → {{ i18n.t(note) }}
        </p>
      </div>
    </section>
  `,
})
export class Focus {
  protected readonly i18n = inject(I18n);
  protected readonly title = FOCUS_TITLE;
  protected readonly intro = FOCUS_INTRO;
  protected readonly note = FOCUS_NOTE;
  protected readonly areas = FOCUS_AREAS;
}
