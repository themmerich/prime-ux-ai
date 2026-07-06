import { effect, Injectable, signal } from '@angular/core';

export type Lang = 'de' | 'en';

/** Ein zweisprachiger Text — die gesamte Seite ist über dieses Modell lokalisiert. */
export interface L<T = string> {
  de: T;
  en: T;
}

const STORAGE_KEY = 'px-lang';

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>(this.initialLang());

  constructor() {
    effect(() => {
      const lang = this.lang();
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
