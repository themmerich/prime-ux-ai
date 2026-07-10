import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'px-theme';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.initialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      if (!this.isBrowser) {
        return;
      }
      document.documentElement.classList.toggle('dark', theme === 'dark');
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* Storage nicht verfügbar */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private initialTheme(): Theme {
    // Serverseitig gilt der Standard; das Inline-Skript in index.html setzt die
    // Klasse vor dem ersten Paint, damit es nicht flackert.
    if (!this.isBrowser) {
      return 'dark';
    }
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'light') {
        return 'light';
      }
    } catch {
      /* ignore */
    }
    return 'dark';
  }
}
