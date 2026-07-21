import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { PROFILE } from '../data/content';

@Component({
  selector: 'px-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading],
  template: `
    <section id="profil" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="01" [title]="i18n.t(profile.title)" />
        <p class="max-w-3xl text-base leading-relaxed md:text-lg">{{ i18n.t(profile.text) }}</p>

        <dl class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          @for (fact of i18n.t(profile.facts); track fact.label; let first = $first) {
            <!-- Erste Kachel (Diplom) als Bento-Highlight: Signal-Rahmen, doppelte Breite -->
            @if (first) {
              <div
                class="col-span-2 rounded-2xl bg-gradient-to-br from-accent-500 to-aurora-500 p-px"
              >
                <div class="h-full rounded-[calc(1rem-1px)] bg-white p-5 dark:bg-ink-900">
                  <dd class="display text-3xl font-bold text-slate-900 dark:text-white">
                    {{ fact.value }}
                  </dd>
                  <dt class="mt-1 text-sm">{{ fact.label }}</dt>
                </div>
              </div>
            } @else {
              <div
                class="rounded-2xl border border-slate-200 bg-white/50 p-5 dark:border-ink-700 dark:bg-ink-900/50"
              >
                <dd class="display text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {{ fact.value }}
                </dd>
                <dt class="mt-1 text-sm">{{ fact.label }}</dt>
              </div>
            }
          }
        </dl>
      </div>
    </section>
  `,
})
export class Profile {
  protected readonly i18n = inject(I18n);
  protected readonly profile = PROFILE;
}
