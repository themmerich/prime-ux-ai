import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { Motion } from '../core/motion';

/**
 * Reveal-Modi:
 * - 'rise'    — Element steigt als Ganzes auf (Default)
 * - 'stagger' — die direkten Kinder steigen nacheinander auf
 * - 'fade'    — reiner Opacity-Fade, ohne Bewegung
 */
export type RevealMode = 'rise' | 'stagger' | 'fade';

/**
 * Scroll-getriebener Reveal per GSAP/ScrollTrigger.
 *
 * Progressive Enhancement: Der Inhalt ist im SSR-HTML und ohne JS vollständig
 * sichtbar — erst wenn GSAP im Browser geladen ist, wird der Ausgangszustand
 * gesetzt und beim Eintritt in den Viewport aufgelöst. Bei
 * `prefers-reduced-motion` passiert gar nichts.
 */
@Directive({ selector: '[pxReveal]' })
export class Reveal {
  /** Leerer String (nur Attribut) fällt auf 'rise' zurück. */
  readonly mode = input<RevealMode | ''>('', { alias: 'pxReveal' });
  readonly delay = input(0, { alias: 'pxRevealDelay' });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(Motion);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      void this.motion.scrollTween(host, this.destroyRef, (ctx) => {
        const mode = this.mode() || 'rise';
        const targets: HTMLElement | Element[] =
          mode === 'stagger' ? Array.from(host.children) : host;
        if (mode === 'stagger' && (targets as Element[]).length === 0) {
          return null;
        }
        return ctx.gsap.from(targets, {
          opacity: 0,
          y: mode === 'fade' ? 0 : 28,
          duration: 0.9,
          ease: 'power3.out',
          delay: this.delay(),
          stagger: mode === 'stagger' ? 0.09 : 0,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: host,
            start: 'top 86%',
            once: true,
          },
        });
      });
    });
  }
}
