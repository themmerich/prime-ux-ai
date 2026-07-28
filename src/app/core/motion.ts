import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Lazy geladenes GSAP-Bundle — ScrollTrigger ist bereits registriert. */
export interface MotionContext {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
}

/**
 * Zentraler Einstiegspunkt für alle GSAP-Animationen der Seite.
 *
 * - GSAP + ScrollTrigger werden erst im Browser und erst bei Bedarf geladen
 *   (dynamic import) — sie landen damit nicht im Initial-Bundle und können
 *   das Prerendering nicht brechen.
 * - `reduced` spiegelt `prefers-reduced-motion` — Aufrufer überspringen dann
 *   ihre Animationen komplett (Inhalte bleiben statisch sichtbar).
 */
@Injectable({ providedIn: 'root' })
export class Motion {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private context?: Promise<MotionContext | null>;

  /** True, wenn der Browser reduzierte Bewegung wünscht (SSR: false). */
  get reduced(): boolean {
    return this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Lädt GSAP lazy und genau einmal. Auf dem Server wird `null` geliefert —
   * jeder Aufrufer muss damit rechnen und ohne Animation weiterleben können.
   */
  load(): Promise<MotionContext | null> {
    if (!this.isBrowser) {
      return Promise.resolve(null);
    }
    this.context ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, stModule]) => {
        gsapModule.gsap.registerPlugin(stModule.ScrollTrigger);
        return { gsap: gsapModule.gsap, ScrollTrigger: stModule.ScrollTrigger };
      },
    );
    return this.context;
  }
}
