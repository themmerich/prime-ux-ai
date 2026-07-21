import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { CONTACT, HERO } from '../data/content';

@Component({
  selector: 'px-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden">
      <!-- Aurora: das Signal als Lichtquelle hinter dem Einstieg -->
      <div class="aurora absolute inset-0" aria-hidden="true"></div>

      <div
        class="relative mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-center px-6 pt-32 pb-20 md:pt-36"
      >
        <div class="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p
              class="rise font-mono text-xs tracking-widest text-accent-600 uppercase dark:text-accent-400"
              style="--rise-step: 0"
            >
              {{ hero.kicker }} · frontend architecture × agentic ui
            </p>
            <h1
              class="display mt-5 text-5xl font-bold text-slate-900 md:text-7xl dark:text-white"
              style="--rise-step: 1"
            >
              <span class="rise block">{{ hero.name }}</span>
            </h1>
            <p class="rise display mt-4 text-2xl font-semibold md:text-3xl" style="--rise-step: 2">
              <span class="signal-text">{{ i18n.t(hero.headline) }}</span>
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
                  class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 py-1 font-mono text-xs text-slate-600 backdrop-blur-sm dark:border-ink-700 dark:bg-ink-900/60 dark:text-slate-300"
                >
                  <span
                    class="size-1.5 rounded-full bg-gradient-to-r from-accent-500 to-aurora-500"
                  ></span>
                  {{ chip }}
                </span>
              }
            </div>

            <div class="rise mt-10 flex flex-wrap items-center gap-4" style="--rise-step: 5">
              <a
                href="mailto:{{ email }}"
                class="signal-cta rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                {{ i18n.t(hero.ctaContact) }}
              </a>
              <a
                href="#projekte"
                class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-200 dark:hover:border-accent-400 dark:hover:text-accent-400"
              >
                {{ i18n.t(hero.ctaProjects) }}
              </a>
            </div>
          </div>

          <!-- Porträt mit Signal-Ring; auf Mobile kompakt über dem Text -->
          <div
            class="rise relative order-first justify-self-start lg:order-none lg:justify-self-end"
            style="--rise-step: 2"
          >
            <div
              class="relative size-28 rounded-full bg-gradient-to-br from-accent-500 via-aurora-500 to-accent-500 p-[3px] md:size-32 lg:size-72"
            >
              <img
                [src]="hero.photo"
                [alt]="hero.name"
                width="320"
                height="320"
                class="size-full rounded-full object-cover"
              />
            </div>
            <!-- Verfügbarkeits-Badge, überlappt den Ring -->
            <p
              class="absolute -bottom-2 left-1/2 hidden w-max -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 font-mono text-xs text-slate-600 shadow-lg backdrop-blur lg:flex dark:border-ink-700 dark:bg-ink-900/90 dark:text-slate-300"
            >
              <span class="size-2 animate-pulse rounded-full bg-amber-500" aria-hidden="true"></span>
              {{ i18n.t(hero.available) }}
            </p>
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
