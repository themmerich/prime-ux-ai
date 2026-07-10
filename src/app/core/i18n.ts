import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Lang = 'de' | 'en';

/** Ein zweisprachiger Text — die gesamte Seite ist über dieses Modell lokalisiert. */
export interface L<T = string> {
  de: T;
  en: T;
}

const STORAGE_KEY = 'px-lang';

/** Beim Prerendern gerendert und im index.html als lang-Attribut hinterlegt. */
const SSR_LANG: Lang = 'de';

@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly lang = signal<Lang>(this.initialLang());

  constructor() {
    effect(() => {
      const lang = this.lang();
      if (!this.isBrowser) {
        return;
      }
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* Storage nicht verfügbar (z.B. Privacy-Modus) */
      }
      document.documentElement.lang = lang;
    });
  }

  /** Löst einen zweisprachigen Text zur aktuell gewählten Sprache auf. */
  readonly t = <T>(text: L<T>): T => text[this.lang()];

  toggle(): void {
    this.lang.update((l) => (l === 'de' ? 'en' : 'de'));
  }

  private initialLang(): Lang {
    // Der Server rendert immer Deutsch; der Browser korrigiert nach der Hydration.
    if (!this.isBrowser) {
      return SSR_LANG;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'de' || stored === 'en') {
        return stored;
      }
    } catch {
      /* ignore */
    }
    return navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
  }
}
