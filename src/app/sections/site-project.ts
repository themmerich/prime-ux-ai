import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { TechChip } from '../shared/tech-chip';
import { SITE, SITE_PIPELINE } from '../data/content';

type PipelineState = 'loading' | 'passing' | 'failing' | 'unknown';

@Component({
  selector: 'px-site-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, TechChip],
  template: `
    <section class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="07" [title]="i18n.t(site.title)" />
        <p class="max-w-3xl text-base leading-relaxed md:text-lg">{{ i18n.t(site.text) }}</p>

        <!-- Pipeline-Diagramm im Stil "Kästen mit Pfeilen" -->
        <div
          class="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-ink-700 dark:bg-ink-900"
        >
          <div class="flex flex-wrap items-center gap-y-4 font-mono">
            @for (step of pipeline; track step.title; let last = $last) {
              <div class="flex items-center">
                <div
                  class="rounded-lg border px-3 py-2"
                  [class]="
                    step.accent
                      ? 'border-accent-500/60 bg-accent-500/[0.08] dark:border-accent-400/60 dark:bg-accent-400/[0.08]'
                      : 'border-slate-300 bg-white dark:border-ink-700 dark:bg-ink-950'
                  "
                >
                  <p
                    class="text-xs font-semibold"
                    [class]="
                      step.accent
                        ? 'text-accent-700 dark:text-accent-300'
                        : 'text-slate-800 dark:text-slate-200'
                    "
                  >
                    {{ step.title }}
                  </p>
                  <p class="mt-0.5 text-[10px] tracking-wide text-slate-500">{{ step.sub }}</p>
                  @if (step.note) {
                    <p class="text-[10px] tracking-wide text-slate-400 dark:text-slate-600">
                      {{ step.note }}
                    </p>
                  }
                </div>
                @if (!last) {
                  <span class="mx-2 text-slate-400 dark:text-slate-600" aria-hidden="true">─▶</span>
                }
              </div>
            }
          </div>

          <!-- Live-Status aus der GitHub-API -->
          <div
            class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-200 pt-5 font-mono text-xs dark:border-ink-800"
          >
            <span class="inline-flex items-center gap-2">
              <span
                class="size-2 rounded-full"
                [class]="{
                  'animate-pulse bg-amber-400': state() === 'loading',
                  'bg-accent-500': state() === 'passing',
                  'bg-red-500': state() === 'failing',
                  'bg-slate-400': state() === 'unknown',
                }"
              ></span>
              <span class="text-slate-700 dark:text-slate-300">
                Pipeline
                @switch (state()) {
                  @case ('loading') {
                    …
                  }
                  @case ('passing') {
                    passing
                  }
                  @case ('failing') {
                    failing
                  }
                  @case ('unknown') {
                    {{ i18n.lang() === 'de' ? 'Status n/v' : 'status n/a' }}
                  }
                }
              </span>
              <span class="text-slate-500">Terraform · Trivy · S3</span>
            </span>

            @if (deployDate(); as date) {
              <span class="text-slate-500">
                {{ i18n.lang() === 'de' ? 'Letzter Deploy:' : 'Last deploy:' }} {{ date }}
              </span>
            }

            <a
              [href]="site.actionsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-600 transition-colors hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"
            >
              System-Status → GitHub Actions ↗
            </a>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-1.5">
          @for (t of site.stack; track t) {
            <px-tech-chip [label]="t" />
          }
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a
            [href]="site.repo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 font-mono text-sm text-slate-700 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-slate-200 dark:hover:border-accent-400 dark:hover:text-accent-400"
          >
            <svg viewBox="0 0 16 16" class="size-4 fill-current" aria-hidden="true">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
              />
            </svg>
            {{ site.repo.label }} ↗
          </a>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-accent-500/30 px-4 py-1.5 font-mono text-xs text-accent-700 dark:text-accent-300"
          >
            <span class="size-1.5 animate-pulse rounded-full bg-accent-500"></span>
            {{ i18n.t(site.roadmap) }}
          </span>
        </div>
      </div>
    </section>
  `,
})
export class SiteProject {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
  protected readonly pipeline = SITE_PIPELINE;

  protected readonly state = signal<PipelineState>('loading');
  private readonly deployedAt = signal<Date | null>(null);

  protected readonly deployDate = computed(() => {
    const date = this.deployedAt();
    if (!date) {
      return null;
    }
    return date.toLocaleDateString(this.i18n.lang() === 'de' ? 'de-DE' : 'en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  });

  constructor() {
    this.loadPipelineStatus();
  }

  private async loadPipelineStatus(): Promise<void> {
    try {
      // Öffentliche GitHub-API, ohne Auth (60 Requests/h pro IP genügen hier).
      const response = await fetch(
        'https://api.github.com/repos/themmerich/prime-ux-ai/actions/workflows/deploy.yml/runs?per_page=1&status=completed',
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      const run = data.workflow_runs?.[0];
      if (!run) {
        this.state.set('unknown');
        return;
      }
      this.state.set(run.conclusion === 'success' ? 'passing' : 'failing');
      this.deployedAt.set(new Date(run.updated_at));
    } catch {
      this.state.set('unknown');
    }
  }
}
