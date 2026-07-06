import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'px-theme';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  readonly theme = signal<Theme>(this.initialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
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
