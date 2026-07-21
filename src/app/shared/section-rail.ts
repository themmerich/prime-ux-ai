import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { NAV } from '../data/content';

/**
 * Vertikale Sektions-Leiste am linken Rand (nur ≥xl): das „Signal", das die
 * Sektionen wie Stationen verbindet. Scroll-Spy per IntersectionObserver +
 * Signal — die aktive Station leuchtet.
 */
@Component({
  selector: 'px-section-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav
      class="fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 xl:block"
      [attr.aria-label]="i18n.t({ de: 'Sektionsnavigation', en: 'Section navigation' })"
    >
      <ol class="relative flex flex-col gap-4">
        <!-- durchlaufender Signal-Faden -->
        <span
          class="absolute top-1 bottom-1 left-[3px] w-px bg-gradient-to-b from-accent-500/60 via-aurora-500/40 to-transparent"
          aria-hidden="true"
        ></span>
        @for (item of nav; track item.anchor) {
          <li class="relative">
            <a
              routerLink="/"
              [fragment]="item.anchor"
              class="group flex items-center gap-3"
              [attr.aria-current]="active() === item.anchor ? 'true' : null"
            >
              <span
                class="size-[7px] rounded-full transition-all duration-300"
                [class]="
                  active() === item.anchor
                    ? 'bg-accent-500 shadow-[0_0_8px_2px] shadow-accent-500/50 dark:bg-accent-400 dark:shadow-accent-400/50'
                    : 'bg-slate-300 group-hover:bg-accent-500/60 dark:bg-ink-700 dark:group-hover:bg-accent-400/60'
                "
                aria-hidden="true"
              ></span>
              <span
                class="font-mono text-[11px] tracking-wide transition-all duration-300"
                [class]="
                  active() === item.anchor
                    ? 'text-accent-600 opacity-100 dark:text-accent-400'
                    : 'text-slate-400 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-slate-500'
                "
              >
                {{ i18n.t(item.label) }}
              </span>
            </a>
          </li>
        }
      </ol>
    </nav>
  `,
})
export class SectionRail {
  protected readonly i18n = inject(I18n);
  protected readonly nav = NAV;
  protected readonly active = signal<string | null>(null);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Nur im Browser: SSR kennt weder IntersectionObserver noch Scroll-Position.
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.active.set(entry.target.id);
            }
          }
        },
        // Aktiv ist die Sektion, die das obere Drittel des Viewports berührt.
        { rootMargin: '-15% 0px -65% 0px' },
      );
      for (const item of this.nav) {
        const el = document.getElementById(item.anchor);
        if (el) {
          observer.observe(el);
        }
      }
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
