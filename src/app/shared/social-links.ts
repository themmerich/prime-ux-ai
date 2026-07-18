import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { CONTACT } from '../data/content';
import { SocialIcon } from './social-icon';

@Component({
  selector: 'px-social-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center gap-1' },
  imports: [SocialIcon],
  template: `
    @for (link of links; track link.url) {
      <a
        [href]="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex size-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"
        [attr.aria-label]="
          i18n.t({
            de: link.label + ' (öffnet in neuem Tab)',
            en: link.label + ' (opens in a new tab)',
          })
        "
      >
        <px-social-icon [icon]="link.icon" />
      </a>
    }
  `,
})
export class SocialLinks {
  protected readonly i18n = inject(I18n);
  protected readonly links = CONTACT.links;
}
