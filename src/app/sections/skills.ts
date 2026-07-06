import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { SKILL_GROUPS, SKILLS_TITLE } from '../data/content';

@Component({
  selector: 'px-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading],
  template: `
    <section id="skills" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="06" [title]="i18n.t(title)" />

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (group of groups; track i18n.t(group.title)) {
            <div
              class="rounded-xl border p-6"
              [class]="
                group.highlight
                  ? 'border-accent-500/40 bg-accent-500/[0.04] dark:border-accent-400/40 dark:bg-accent-400/[0.04]'
                  : 'border-slate-200 dark:border-ink-700 dark:bg-ink-900/50'
              "
            >
              <h3
                class="font-mono text-sm font-semibold tracking-wide uppercase"
                [class]="
                  group.highlight
                    ? 'text-accent-700 dark:text-accent-300'
                    : 'text-slate-900 dark:text-white'
                "
              >
                {{ i18n.t(group.title) }}
              </h3>
              <ul class="mt-4 space-y-2 text-sm">
                @for (skill of group.skills; track skill) {
                  <li class="flex gap-2">
                    <span class="text-accent-600 dark:text-accent-400" aria-hidden="true">·</span>
                    <span>{{ skill }}</span>
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly i18n = inject(I18n);
  protected readonly title = SKILLS_TITLE;
  protected readonly groups = SKILL_GROUPS;
}
