import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { ThemeStore } from '../core/theme';
import { NAV } from '../data/content';
import { SocialLinks } from '../shared/social-links';

@Component({
  selector: 'px-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SocialLinks],
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-ink-700/70 dark:bg-ink-950/80"
    >
      <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          routerLink="/"
          (click)="closeMenu()"
          class="flex shrink-0 items-center gap-2 font-mono text-sm font-semibold tracking-widest whitespace-nowrap text-slate-900 uppercase dark:text-white"
        >
          <!-- Plansymbol: Quadrat mit Diagonale -->
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            class="text-accent-600 dark:text-accent-400"
            aria-hidden="true"
          >
            <path d="M.5.5h11v11H.5zM.5 11.5 11.5.5" stroke="currentColor" fill="none" />
          </svg>
          prime-ux
        </a>

        <nav
          class="mx-4 hidden items-center gap-4 md:flex lg:gap-6"
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
          <div class="hidden items-center gap-1 md:flex">
            <px-social-links />
          </div>
          <span
            class="hidden h-5 w-px shrink-0 bg-slate-200 md:block dark:bg-ink-700"
            aria-hidden="true"
          ></span>

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
              i18n.t(
                theme.theme() === 'dark'
                  ? { de: 'Helles Design aktivieren', en: 'Switch to light theme' }
                  : { de: 'Dunkles Design aktivieren', en: 'Switch to dark theme' }
              )
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

          <div
            class="mt-3 flex items-center gap-1 border-t border-slate-200/70 px-2 pt-3 dark:border-ink-700/70"
          >
            <px-social-links />
          </div>
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
