import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { ABOUT } from '../data/content';

@Component({
  selector: 'px-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading],
  template: `
    <section id="ueber-mich" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="10" [title]="i18n.t(about.title)" />

        <div class="max-w-3xl">
          <p class="text-lg leading-relaxed text-slate-700 md:text-xl dark:text-slate-200">
            {{ i18n.t(about.text) }}
          </p>
          <p class="mt-5 text-base leading-relaxed">{{ i18n.t(about.beyond) }}</p>

          <div class="mt-8 flex flex-wrap gap-2">
            @for (interest of about.interests; track interest.de) {
              <span
                class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:text-slate-300"
              >
                <span class="size-1.5 rounded-full bg-accent-500 dark:bg-accent-400"></span>
                {{ i18n.t(interest) }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly i18n = inject(I18n);
  protected readonly about = ABOUT;
}
