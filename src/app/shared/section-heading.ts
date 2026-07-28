import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from './reveal';

/**
 * Sektions-Kopf im Editorial-Stil: kleine Mono-Kennung mit Signal-Hairline,
 * dahinter die Sektionsnummer als große Geisterziffer (rein dekorativ),
 * darunter die Display-Headline. Erscheint per Scroll-Reveal.
 */
@Component({
  selector: 'px-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  template: `
    <div class="relative mb-10 md:mb-14" pxReveal>
      <span
        class="display pointer-events-none absolute -top-8 -left-1 text-[6rem] leading-none font-bold text-slate-900/[0.05] select-none md:-top-12 md:text-[8.5rem] dark:text-white/[0.05]"
        aria-hidden="true"
      >
        {{ index() }}
      </span>
      <p
        class="relative flex items-center gap-3 font-mono text-xs tracking-widest text-accent-600 uppercase dark:text-accent-400"
      >
        <span
          class="inline-block h-px w-10 bg-gradient-to-r from-accent-500 to-aurora-500"
          aria-hidden="true"
        ></span>
        {{ index() }}
      </p>
      <h2
        class="display relative mt-3 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white"
      >
        {{ title() }}
      </h2>
      @if (intro()) {
        <p class="relative mt-4 max-w-2xl text-base leading-relaxed md:text-lg">{{ intro() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly index = input.required<string>();
  readonly title = input.required<string>();
  readonly intro = input<string>();
}
