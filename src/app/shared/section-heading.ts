import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'px-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-10 md:mb-14">
      <!-- Zeichnungs-Annotation: Bemaßungslinie + Blattnummer im Rotstift -->
      <p class="flex items-center gap-3 font-mono text-xs tracking-widest">
        <svg
          width="72"
          height="10"
          viewBox="0 0 72 10"
          class="text-accent-600 dark:text-accent-400"
          aria-hidden="true"
        >
          <path d="M1 1v8M1 5h70M71 1v8" stroke="currentColor" fill="none" />
        </svg>
        <span class="text-redline-600 dark:text-redline-400">{{ index() }}</span>
      </p>
      <h2
        class="display-caps mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl dark:text-white"
      >
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
