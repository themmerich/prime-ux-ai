import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import {
  CONTACT,
  EDUCATION_TITLE,
  ENGAGEMENTS,
  ENGAGEMENTS_TITLE,
  FOCUS_AREAS,
  FOCUS_TITLE,
  HERO,
  PROFILE,
} from '../data/content';

/**
 * Bento-Landing: Die Seite öffnet als Kachel-Raster — großes Identitäts-Panel,
 * daneben kompakte Kacheln, die in ihre Sektionen verlinken. Alle Inhalte
 * stammen aus den bestehenden Content-Daten.
 */
@Component({
  selector: 'px-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden">
      <!-- Aurora: das Signal als Lichtquelle hinter dem Einstieg -->
      <div class="aurora absolute inset-0" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-32">
        <p
          class="rise font-mono text-xs tracking-widest text-accent-600 uppercase dark:text-accent-400"
          style="--rise-step: 0"
        >
          {{ hero.kicker }} · frontend architecture × agentic ui
        </p>

        <div class="mt-6 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          <!-- Identität: das große Panel -->
          <div
            class="rise rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm sm:col-span-2 lg:row-span-2 lg:p-8 dark:border-ink-700 dark:bg-ink-900/70"
            style="--rise-step: 1"
          >
            <div class="flex h-full flex-col">
              <div
                class="inline-block self-start rounded-full bg-gradient-to-br from-accent-500 via-aurora-500 to-accent-500 p-[3px]"
              >
                <img
                  [src]="hero.photo"
                  [alt]="hero.name"
                  width="320"
                  height="320"
                  class="size-20 rounded-full object-cover md:size-24"
                />
              </div>
              <h1
                class="display mt-5 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white"
              >
                {{ hero.name }}
              </h1>
              <p class="display mt-2 text-lg font-semibold md:text-xl">
                <span class="signal-text">{{ i18n.t(hero.headline) }}</span>
              </p>
              <p class="mt-4 max-w-xl text-sm leading-relaxed text-pretty md:text-base">
                {{ i18n.t(hero.tagline) }}
              </p>
              <div class="mt-6 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-6">
                <a
                  href="mailto:{{ contact.email }}"
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
          </div>

          <!-- Fokus: die vier Schwerpunkte -->
          <a
            href="#fokus"
            class="rise group rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-accent-500/60 lg:row-span-2 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-accent-400/60"
            style="--rise-step: 2"
          >
            <p class="font-mono text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500">
              {{ i18n.t(focusTitle) }}
            </p>
            <ul class="mt-4 space-y-4">
              @for (area of focusAreas; track area.icon) {
                <li class="flex items-start gap-3">
                  <span class="font-mono text-lg text-accent-600 dark:text-accent-400" aria-hidden="true">
                    {{ area.icon }}
                  </span>
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {{ i18n.t(area.title) }}
                  </span>
                </li>
              }
            </ul>
            <p
              class="mt-5 font-mono text-xs text-accent-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-accent-400"
              aria-hidden="true"
            >
              →
            </p>
          </a>

          <!-- Ausbildung: präsent im ersten Viewport, aber im Standard-Kartenstil —
               der Verlaufsrahmen bleibt der Diplom-Kachel in der Profil-Sektion vorbehalten. -->
          <a
            href="#profil"
            class="rise group flex flex-col rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-accent-500/60 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-accent-400/60"
            style="--rise-step: 3"
          >
            <span
              class="font-mono text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500"
            >
              {{ i18n.t(educationTitle) }}
            </span>
            <span class="display mt-3 text-2xl font-bold">
              <span class="signal-text">{{ diplomFact().value }}</span>
            </span>
            <span class="mt-1 text-sm">{{ diplomFact().label }}</span>
          </a>

          <!-- Status / Verfügbarkeit -->
          <div
            class="rise rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm dark:border-ink-700 dark:bg-ink-900/70"
            style="--rise-step: 4"
          >
            <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500">
              <span class="size-2 animate-pulse rounded-full bg-amber-500" aria-hidden="true"></span>
              {{ i18n.t({ de: 'Status', en: 'Status' }) }}
            </p>
            <p class="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              {{ i18n.t(hero.available) }}
            </p>
            <p class="mt-1 font-mono text-xs text-slate-500">{{ i18n.t(contact.location) }}</p>
          </div>

          <!-- Erfahrung in Zahlen -->
          <a
            href="#profil"
            class="rise group rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-accent-500/60 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-accent-400/60"
            style="--rise-step: 5"
          >
            <span class="flex h-full flex-col justify-center gap-2.5">
              @for (fact of numberFacts(); track fact.label) {
                <span class="flex items-baseline gap-2.5">
                  <span
                    class="display w-11 shrink-0 text-right text-2xl font-bold text-accent-600 dark:text-accent-400"
                  >
                    {{ fact.value }}
                  </span>
                  <span class="text-xs leading-snug">{{ fact.label }}</span>
                </span>
              }
            </span>
          </a>

          <!-- Aktuelle Mandate -->
          <a
            href="#projekte"
            class="rise group rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-accent-500/60 sm:col-span-2 dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-accent-400/60"
            style="--rise-step: 6"
          >
            <span
              class="font-mono text-xs tracking-widest text-slate-400 uppercase dark:text-slate-500"
            >
              {{ i18n.t(engagementsTitle) }}
            </span>
            <span class="mt-4 grid gap-4 sm:grid-cols-2">
              @for (engagement of engagements; track engagement.client) {
                <span class="flex flex-col">
                  <span class="text-sm font-semibold text-slate-900 dark:text-white">
                    {{ engagement.client }}
                  </span>
                  <span class="mt-0.5 text-xs leading-snug">{{ i18n.t(engagement.role) }}</span>
                  <span class="mt-1 font-mono text-xs text-accent-600 dark:text-accent-400">
                    {{ i18n.t(engagement.period) }}
                  </span>
                </span>
              }
            </span>
          </a>

          <!-- Kontakt -->
          <a
            href="mailto:{{ contact.email }}"
            class="signal-cta rise group flex flex-col justify-between rounded-3xl p-6"
            style="--rise-step: 7"
          >
            <span class="font-mono text-xs tracking-widest text-white/80 uppercase">
              {{ i18n.t(contact.title) }}
            </span>
            <span class="mt-4 text-sm font-semibold text-white">
              {{ contact.email }}
              <span aria-hidden="true"> →</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly i18n = inject(I18n);
  protected readonly hero = HERO;
  protected readonly contact = CONTACT;
  protected readonly focusTitle = FOCUS_TITLE;
  protected readonly focusAreas = FOCUS_AREAS;
  protected readonly educationTitle = EDUCATION_TITLE;
  protected readonly engagementsTitle = ENGAGEMENTS_TITLE;
  protected readonly engagements = ENGAGEMENTS;

  /** Erste Profil-Kachel (Diplom) — sprachabhängig aus den bestehenden Fakten. */
  protected diplomFact(): { value: string; label: string } {
    return this.i18n.t(PROFILE.facts)[0];
  }

  /** Die drei Zahlen-Fakten (ohne Diplom) für die Erfahrungs-Kachel. */
  protected numberFacts(): { value: string; label: string }[] {
    return this.i18n.t(PROFILE.facts).slice(1);
  }
}
