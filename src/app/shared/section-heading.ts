import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'px-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-10 md:mb-14">
      <p class="font-mono text-sm text-accent-600 dark:text-accent-400">// {{ index() }}</p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
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
