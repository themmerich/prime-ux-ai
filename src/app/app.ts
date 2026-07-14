import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18n } from './core/i18n';
import { Header } from './sections/header';
import { Footer } from './sections/footer';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <!-- Skip-Link: erstes fokussierbares Element, sichtbar nur bei Tastatur-Fokus (WCAG 2.4.1) -->
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white dark:focus:bg-accent-500 dark:focus:text-ink-950"
    >
      {{ i18n.t({ de: 'Zum Inhalt springen', en: 'Skip to content' }) }}
    </a>
    <px-header />
    <main id="main" tabindex="-1" class="scroll-mt-16">
      <router-outlet />
    </main>
    <px-footer />
  `,
})
export class App {
  protected readonly i18n = inject(I18n);
}
