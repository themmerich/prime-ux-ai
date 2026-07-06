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
          <!-- Rundes Porträt auf Mobile / Tablet -->
          <img
            [src]="hero.photo"
            [alt]="hero.name"
            width="96"
            height="96"
            class="mb-6 size-24 rounded-full border-2 border-accent-500/40 object-cover shadow-lg lg:hidden dark:border-accent-400/40"
          />

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

        <!-- Porträt als Datei-Fenster (nur auf großen Screens) -->
        <div class="relative hidden justify-self-end lg:block">
          <!-- weicher Akzent-Schein hinter dem Bild -->
          <div
            class="absolute -inset-6 rounded-full bg-accent-500/15 blur-3xl dark:bg-accent-400/15"
            aria-hidden="true"
          ></div>

          <figure
            class="relative w-80 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-xl dark:border-ink-700 dark:bg-ink-900"
          >
            <div
              class="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3 dark:border-ink-700"
            >
              <span class="size-3 rounded-full bg-slate-300 dark:bg-ink-700"></span>
              <span class="size-3 rounded-full bg-slate-300 dark:bg-ink-700"></span>
              <span class="size-3 rounded-full bg-accent-500 dark:bg-accent-400"></span>
              <span class="ml-2 font-mono text-xs text-slate-400 dark:text-slate-500">
                ~/{{ hero.photoCaption }}
              </span>
            </div>

            <img
              [src]="hero.photo"
              width="320"
              height="320"
              [alt]="hero.name"
              class="aspect-square w-80 object-cover"
            />

            <figcaption
              class="flex items-center gap-2 border-t border-slate-200 px-4 py-3 font-mono text-xs dark:border-ink-700"
            >
              <span class="size-2 animate-pulse rounded-full bg-amber-500"></span>
              <span class="text-slate-600 dark:text-slate-300">{{ i18n.t(hero.available) }}</span>
            </figcaption>
          </figure>
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
