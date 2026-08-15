import { DestroyRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Lazy geladenes GSAP-Bundle — ScrollTrigger ist bereits registriert. */
export interface MotionContext {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
}

type GsapTween = ReturnType<MotionContext['gsap']['to']>;

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

  // Einmal erzeugt — die MediaQueryList selbst bleibt live, `matches` folgt
  // Änderungen der Systemeinstellung ohne erneutes matchMedia.
  private readonly reducedQuery = this.isBrowser
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  /** True, wenn der Browser reduzierte Bewegung wünscht (SSR: false). */
  get reduced(): boolean {
    return this.reducedQuery?.matches ?? false;
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

  /**
   * Standard-Lebenszyklus einer ScrollTrigger-Animation an einem Element:
   * Reduced-Motion-Guard, Lazy-Load, Connected-Check (zwischen Render und
   * GSAP-Load kann die Komponente zerstört worden sein) und Aufräumen bei
   * Destroy. `build` liefert den Tween — oder null, wenn nichts zu animieren ist.
   */
  async scrollTween(
    el: HTMLElement,
    destroyRef: DestroyRef,
    build: (ctx: MotionContext) => GsapTween | null,
  ): Promise<void> {
    if (this.reduced) {
      return;
    }
    const ctx = await this.load();
    if (!ctx || !el.isConnected) {
      return;
    }
    const tween = build(ctx);
    if (!tween) {
      return;
    }
    destroyRef.onDestroy(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  }
}
