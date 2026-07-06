import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { ThemeStore } from '../core/theme';
import { NAV } from '../data/content';

@Component({
  selector: 'px-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-ink-700/70 dark:bg-ink-950/80"
    >
      <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a routerLink="/" class="font-mono text-sm font-semibold text-slate-900 dark:text-white">
          <span class="text-accent-600 dark:text-accent-400">~/</span>prime-ux
        </a>

        <nav class="hidden items-center gap-6 md:flex" aria-label="Hauptnavigation">
          @for (item of nav; track item.anchor) {
            <a
              routerLink="/"
              [fragment]="item.anchor"
              class="text-sm text-slate-600 transition-colors hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"
            >
              {{ i18n.t(item.label) }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="i18n.toggle()"
            class="rounded-md border border-slate-200 px-2.5 py-1.5 font-mono text-xs text-slate-600 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-300 dark:hover:border-accent-400 dark:hover:text-accent-400"
            [attr.aria-label]="i18n.lang() === 'de' ? 'Switch to English' : 'Auf Deutsch umschalten'"
          >
            {{ i18n.lang() === 'de' ? 'EN' : 'DE' }}
          </button>
          <button
            type="button"
            (click)="theme.toggle()"
            class="rounded-md border border-slate-200 px-2.5 py-1.5 font-mono text-xs text-slate-600 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-300 dark:hover:border-accent-400 dark:hover:text-accent-400"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'"
          >
            {{ theme.theme() === 'dark' ? '☀' : '☾' }}
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly i18n = inject(I18n);
  protected readonly theme = inject(ThemeStore);
  protected readonly nav = NAV;
}
