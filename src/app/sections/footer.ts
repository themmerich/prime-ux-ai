import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';

@Component({
  selector: 'px-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-slate-200 dark:border-ink-800">
      <div
        class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm md:flex-row"
      >
        <p class="font-mono text-xs text-slate-500">© {{ year }} Thomas Hemmerich · PRIME UX</p>
        <p class="font-mono text-xs text-slate-500">
          {{
            i18n.t({
              de: 'Gebaut mit Angular 22 & Tailwind — kein Tracking, keine Cookies.',
              en: 'Built with Angular 22 & Tailwind — no tracking, no cookies.',
            })
          }}
        </p>
        <nav class="flex gap-6" [attr.aria-label]="i18n.t({ de: 'Rechtliches', en: 'Legal' })">
          <a
            routerLink="/impressum"
            class="text-xs text-slate-500 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
          >
            {{ i18n.t({ de: 'Impressum', en: 'Legal Notice' }) }}
          </a>
          <a
            routerLink="/datenschutz"
            class="text-xs text-slate-500 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
          >
            {{ i18n.t({ de: 'Datenschutz', en: 'Privacy' }) }}
          </a>
        </nav>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly i18n = inject(I18n);
  // Beim Prerendern ausgewertet — entspricht dem Jahr des letzten Deploys.
  protected readonly year = new Date().getFullYear();
}
