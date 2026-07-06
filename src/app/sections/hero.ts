import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { CONTACT, HERO } from '../data/content';

@Component({
  selector: 'px-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto max-w-5xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <div class="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p class="font-mono text-sm text-accent-600 dark:text-accent-400">
            // {{ hero.kicker }} · frontend architecture × agentic ui
          </p>
          <h1
            class="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl dark:text-white"
          >
            {{ hero.name }}
          </h1>
          <p class="mt-3 text-2xl font-semibold text-accent-600 md:text-3xl dark:text-accent-400">
            {{ i18n.t(hero.headline) }}
          </p>
          <p class="mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
            {{ i18n.t(hero.tagline) }}
          </p>

          <div class="mt-8 flex flex-wrap gap-2">
            @for (chip of i18n.t(hero.chips); track chip) {
              <span
                class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:text-slate-300"
              >
                <span class="size-1.5 rounded-full bg-accent-500 dark:bg-accent-400"></span>
                {{ chip }}
              </span>
            }
          </div>

          <div class="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="mailto:{{ email }}"
              class="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-500 dark:bg-accent-500 dark:text-ink-950 dark:hover:bg-accent-400"
            >
              {{ i18n.t(hero.ctaContact) }}
            </a>
            <a
              href="#projekte"
              class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-200 dark:hover:border-accent-400 dark:hover:text-accent-400"
            >
              {{ i18n.t(hero.ctaProjects) }}
            </a>
          </div>
        </div>

        <!-- Dekorative Code-Karte (nur auf großen Screens) -->
        <div
          class="hidden rounded-xl border border-slate-200 bg-slate-50 p-6 font-mono text-sm shadow-sm lg:block dark:border-ink-700 dark:bg-ink-900"
          aria-hidden="true"
        >
          <div class="mb-4 flex gap-1.5">
            <span class="size-3 rounded-full bg-slate-300 dark:bg-ink-700"></span>
            <span class="size-3 rounded-full bg-slate-300 dark:bg-ink-700"></span>
            <span class="size-3 rounded-full bg-accent-500 dark:bg-accent-400"></span>
          </div>
          <pre class="leading-relaxed text-slate-600 dark:text-slate-300"><span class="text-violet-600 dark:text-violet-400">const</span> thomas = &#123;
  role: <span class="text-accent-600 dark:text-accent-300">'Frontend Architect'</span>,
  stack: [<span class="text-accent-600 dark:text-accent-300">'Angular'</span>, <span class="text-accent-600 dark:text-accent-300">'Signals'</span>, <span class="text-accent-600 dark:text-accent-300">'Nx'</span>],
  focus: <span class="text-accent-600 dark:text-accent-300">'Agentic UI'</span>,
  status: <span class="text-accent-600 dark:text-accent-300">'building'</span> <span class="animate-pulse text-accent-500">▌</span>
&#125;;</pre>
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly i18n = inject(I18n);
  protected readonly hero = HERO;
  protected readonly email = CONTACT.email;
}
