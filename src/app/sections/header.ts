import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
        <a
          routerLink="/"
          (click)="closeMenu()"
          class="font-mono text-sm font-semibold text-slate-900 dark:text-white"
        >
          <span class="text-accent-600 dark:text-accent-400">~/</span>prime-ux
        </a>

        <nav
          class="hidden items-center gap-6 md:flex"
          [attr.aria-label]="i18n.t({ de: 'Hauptnavigation', en: 'Main navigation' })"
        >
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
            [attr.aria-label]="
              i18n.lang() === 'de' ? 'Switch to English' : 'Auf Deutsch umschalten'
            "
          >
            {{ i18n.lang() === 'de' ? 'EN' : 'DE' }}
          </button>
          <button
            type="button"
            (click)="theme.toggle()"
            class="rounded-md border border-slate-200 px-2.5 py-1.5 font-mono text-xs text-slate-600 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-300 dark:hover:border-accent-400 dark:hover:text-accent-400"
            [attr.aria-label]="
              theme.theme() === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'
            "
          >
            {{ theme.theme() === 'dark' ? '☀' : '☾' }}
          </button>

          <!-- Hamburger nur auf Mobile -->
          <button
            type="button"
            (click)="toggleMenu()"
            class="flex size-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:border-accent-500 hover:text-accent-600 md:hidden dark:border-ink-700 dark:text-slate-300 dark:hover:border-accent-400 dark:hover:text-accent-400"
            [attr.aria-label]="
              i18n.t(
                menuOpen()
                  ? { de: 'Menü schließen', en: 'Close menu' }
                  : { de: 'Menü öffnen', en: 'Open menu' }
              )
            "
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-menu"
          >
            @if (menuOpen()) {
              <svg
                viewBox="0 0 20 20"
                class="size-4 fill-none stroke-current stroke-2"
                aria-hidden="true"
              >
                <path d="M5 5l10 10M15 5L5 15" stroke-linecap="round" />
              </svg>
            } @else {
              <svg
                viewBox="0 0 20 20"
                class="size-4 fill-none stroke-current stroke-2"
                aria-hidden="true"
              >
                <path d="M3 6h14M3 10h14M3 14h14" stroke-linecap="round" />
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobiles Aufklapp-Menü -->
      @if (menuOpen()) {
        <nav
          id="mobile-menu"
          class="border-t border-slate-200/70 bg-white/95 px-6 py-4 md:hidden dark:border-ink-700/70 dark:bg-ink-950/95"
          [attr.aria-label]="i18n.t({ de: 'Mobile Navigation', en: 'Mobile navigation' })"
        >
          <ul class="flex flex-col gap-1">
            @for (item of nav; track item.anchor) {
              <li>
                <a
                  routerLink="/"
                  [fragment]="item.anchor"
                  (click)="closeMenu()"
                  class="block rounded-md px-2 py-2.5 text-slate-700 transition-colors hover:bg-slate-100 hover:text-accent-600 dark:text-slate-300 dark:hover:bg-ink-800 dark:hover:text-accent-400"
                >
                  {{ i18n.t(item.label) }}
                </a>
              </li>
            }
          </ul>
        </nav>
      }
    </header>
  `,
})
export class Header {
  protected readonly i18n = inject(I18n);
  protected readonly theme = inject(ThemeStore);
  protected readonly nav = NAV;

  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
