import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { CONTACT, HERO } from '../data/content';

@Component({
  selector: 'px-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative">
      <!-- Zeichenraster als Hintergrund, läuft nach unten aus -->
      <div class="blueprint-grid absolute inset-0" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-5xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
        <div class="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <!-- Rundes Porträt auf Mobile / Tablet -->
            <img
              [src]="hero.photo"
              [alt]="hero.name"
              width="96"
              height="96"
              class="rise mb-6 size-24 rounded-full border-2 border-accent-500/40 object-cover shadow-lg lg:hidden dark:border-accent-400/40"
              style="--rise-step: 0"
            />

            <p
              class="rise flex items-center gap-2.5 font-mono text-xs tracking-widest text-accent-600 uppercase dark:text-accent-400"
              style="--rise-step: 0"
            >
              <span class="size-1.5 bg-redline-500" aria-hidden="true"></span>
              {{ hero.kicker }} · frontend architecture × agentic ui
            </p>
            <h1
              class="display-caps rise mt-5 text-5xl font-extrabold text-slate-900 md:text-7xl dark:text-white"
              style="--rise-step: 1"
            >
              {{ hero.name }}
            </h1>
            <p
              class="rise mt-4 text-xl font-semibold text-accent-600 md:text-2xl dark:text-accent-400"
              style="--rise-step: 2"
            >
              {{ i18n.t(hero.headline) }}
            </p>
            <p
              class="rise mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              style="--rise-step: 3"
            >
              {{ i18n.t(hero.tagline) }}
            </p>

            <div class="rise mt-8 flex flex-wrap gap-2" style="--rise-step: 4">
              @for (chip of i18n.t(hero.chips); track chip) {
                <span
                  class="inline-flex items-center gap-1.5 border border-slate-300/80 px-3 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:text-slate-300"
                >
                  <span class="size-1.5 bg-accent-500 dark:bg-accent-400"></span>
                  {{ chip }}
                </span>
              }
            </div>

            <div class="rise mt-10 flex flex-wrap items-center gap-4" style="--rise-step: 5">
              <a
                href="mailto:{{ email }}"
                class="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-500 dark:bg-accent-400 dark:text-ink-950 dark:hover:bg-accent-300"
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

          <!-- Porträt als Planblatt mit Plankopf (nur auf großen Screens) -->
          <div class="rise relative hidden justify-self-end lg:block" style="--rise-step: 3">
            <!-- Doppelter Zeichnungsrahmen statt Glow -->
            <div
              class="absolute -inset-2.5 border border-accent-500/30 dark:border-accent-400/30"
              aria-hidden="true"
            ></div>

            <figure
              class="relative w-80 overflow-hidden border border-slate-300 bg-white shadow-xl dark:border-ink-700 dark:bg-ink-900"
            >
              <div
                class="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 font-mono text-[11px] tracking-widest text-slate-500 uppercase dark:border-ink-700 dark:text-slate-400"
              >
                <span>Plan 01 · {{ i18n.t({ de: 'Porträt', en: 'Portrait' }) }}</span>
                <span class="text-accent-600 dark:text-accent-400">M 1:1</span>
              </div>

              <img
                [src]="hero.photo"
                width="320"
                height="320"
                [alt]="hero.name"
                class="aspect-square w-80 object-cover"
              />

              <!-- Plankopf -->
              <figcaption
                class="divide-y divide-slate-200 border-t border-slate-200 font-mono text-[11px] dark:divide-ink-700 dark:border-ink-700"
              >
                <div class="grid grid-cols-2 divide-x divide-slate-200 dark:divide-ink-700">
                  <span class="px-4 py-2 text-slate-500 dark:text-slate-400">
                    {{ i18n.t({ de: 'Projekt', en: 'Project' }) }}: prime-ux.de
                  </span>
                  <span class="px-4 py-2 text-slate-500 dark:text-slate-400">
                    {{ i18n.t({ de: 'Datei', en: 'File' }) }}: {{ hero.photoCaption }}
                  </span>
                </div>
                <div class="flex items-center gap-2 px-4 py-2.5">
                  <span
                    class="size-2 animate-pulse rounded-full bg-redline-500"
                    aria-hidden="true"
                  ></span>
                  <span class="text-slate-600 dark:text-slate-300">
                    {{ i18n.t(hero.available) }}
                  </span>
                </div>
              </figcaption>
            </figure>
          </div>
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
