import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { CONTACT } from '../data/content';
import { SocialIcon } from '../shared/social-icon';

@Component({
  selector: 'px-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, SocialIcon],
  template: `
    <section id="kontakt" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading
          index="11"
          [title]="i18n.t(contact.title)"
          [intro]="i18n.t(contact.text)"
        />

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="mailto:{{ contact.email }}"
            class="signal-cta rounded-full px-6 py-3 text-sm font-semibold text-white"
          >
            {{ contact.email }}
          </a>
          @for (link of contact.links; track link.url) {
            <a
              [href]="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-200 dark:hover:border-accent-400 dark:hover:text-accent-400"
            >
              <px-social-icon [icon]="link.icon" />
              {{ link.label }} ↗
            </a>
          }
        </div>

        <p class="mt-8 font-mono text-sm text-slate-500">
          {{ contact.phone }} · {{ i18n.t(contact.location) }}
        </p>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly i18n = inject(I18n);
  protected readonly contact = CONTACT;
}
