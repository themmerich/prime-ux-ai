import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { TechChip } from '../shared/tech-chip';
import { SITE } from '../data/content';

@Component({
  selector: 'px-site-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, TechChip],
  template: `
    <section class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="08" [title]="i18n.t(site.title)" />
        <p class="max-w-3xl text-base leading-relaxed md:text-lg">{{ i18n.t(site.text) }}</p>

        <div
          class="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-6 font-mono text-sm dark:border-ink-700 dark:bg-ink-900"
        >
          <p class="whitespace-nowrap text-slate-600 dark:text-slate-300">
            <span class="text-accent-600 dark:text-accent-400">$</span> ng build
            <span class="text-slate-400 dark:text-slate-500">──▶</span> Angular 22 · zoneless
            <span class="text-slate-400 dark:text-slate-500">──▶</span> Signals i18n (de|en)
            <span class="text-slate-400 dark:text-slate-500">──▶</span> Tailwind 4
            <span class="text-slate-400 dark:text-slate-500">──▶</span>
            <span class="text-accent-600 dark:text-accent-400">prime-ux.de</span>
          </p>
        </div>

        <div class="mt-6 flex flex-wrap gap-1.5">
          @for (t of site.stack; track t) {
            <px-tech-chip [label]="t" />
          }
        </div>

        <p
          class="mt-8 inline-flex items-center gap-2 rounded-full border border-accent-500/30 px-4 py-1.5 font-mono text-xs text-accent-700 dark:text-accent-300"
        >
          <span class="size-1.5 animate-pulse rounded-full bg-accent-500"></span>
          {{ i18n.t(site.roadmap) }}
        </p>
      </div>
    </section>
  `,
})
export class SiteProject {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
}
