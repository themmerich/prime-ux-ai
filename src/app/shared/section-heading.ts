import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'px-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-10 md:mb-14">
      <p
        class="flex items-center gap-3 font-mono text-xs tracking-widest text-accent-600 uppercase dark:text-accent-400"
      >
        <span
          class="inline-block h-px w-10 bg-gradient-to-r from-accent-500 to-aurora-500"
          aria-hidden="true"
        ></span>
        {{ index() }}
      </p>
      <h2 class="display mt-3 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
        {{ title() }}
      </h2>
      @if (intro()) {
        <p class="mt-4 max-w-2xl text-base leading-relaxed md:text-lg">{{ intro() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly index = input.required<string>();
  readonly title = input.required<string>();
  readonly intro = input<string>();
}
