import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'px-tech-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-block rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-600 dark:border-ink-700 dark:bg-ink-800 dark:text-slate-300"
    >
      {{ label() }}
    </span>
  `,
})
export class TechChip {
  readonly label = input.required<string>();
}
