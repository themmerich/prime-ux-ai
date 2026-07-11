import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { TechChip } from '../shared/tech-chip';
import { SITE, SITE_CATEGORIES } from '../data/content';

type PipelineState = 'loading' | 'passing' | 'failing' | 'unknown';

/** Ein Kasten im Pipeline-Flowchart. */
@Component({
  selector: 'px-flow-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <div
      class="rounded-lg border px-6 py-3 text-center font-mono"
      [class]="
        accent()
          ? 'border-accent-500/70 bg-accent-500/[0.08] dark:border-accent-400/60 dark:bg-accent-400/[0.08]'
          : 'border-slate-300 bg-white dark:border-ink-600 dark:bg-ink-950'
      "
    >
      <p
        class="text-sm font-semibold"
        [class]="
          accent() ? 'text-accent-700 dark:text-accent-300' : 'text-slate-800 dark:text-slate-200'
        "
      >
        {{ title() }}
      </p>
      @if (sub()) {
        <p
          class="mt-0.5 text-[10px] tracking-[0.15em] uppercase"
          [class]="accent() ? 'text-accent-700/70 dark:text-accent-300/70' : 'text-slate-500'"
        >
          {{ sub() }}
        </p>
      }
    </div>
  `,
})
export class FlowBox {
  readonly title = input.required<string>();
  readonly sub = input<string>();
  readonly accent = input(false);
}

@Component({
  selector: 'px-site-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, TechChip, FlowBox],
  template: `
    <section id="diese-seite" class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="08" [title]="i18n.t(site.title)" />
        <p class="max-w-3xl text-base leading-relaxed md:text-lg">{{ i18n.t(site.text) }}</p>

        <!-- Vertikales Pipeline-Flowchart -->
        <div class="mt-12 flex flex-col items-center">
          <px-flow-box title="GitHub Repo" sub="TRIGGER: push to main" [accent]="true" />
          <div class="connector"></div>

          <px-flow-box title="GitHub Actions" sub="CI/CD" />
          <div class="connector"></div>

          <px-flow-box title="Trivy" sub="Security Scan" />
          <div class="connector"></div>

          <!-- Terraform-Gruppe -->
          <div
            class="rounded-lg border border-dashed border-slate-300 px-6 py-4 dark:border-ink-600"
          >
            <p class="mb-3 text-center font-mono text-[10px] tracking-[0.25em] text-slate-500">
              TERRAFORM
            </p>
            <div class="flex items-center">
              <px-flow-box title="Init" />
              <span class="w-4 border-t border-dashed border-slate-300 dark:border-ink-600"></span>
              <px-flow-box title="Plan" />
              <span class="w-4 border-t border-dashed border-slate-300 dark:border-ink-600"></span>
              <px-flow-box title="Apply" />
            </div>
          </div>
          <div class="connector !h-4"></div>
          <p class="font-mono text-[10px] tracking-wide text-slate-500">
            STATE: s3://prime-ux-tfstate
          </p>
          <div class="connector !h-4"></div>

          <px-flow-box title="ng build" sub="Angular 22 · zoneless" />
          <div class="connector"></div>

          <px-flow-box title="AWS S3 Sync" />

          <!-- Verzweigung -->
          <div class="relative h-6 w-full max-w-xl">
            <div
              class="absolute inset-x-1/4 bottom-0 border-t border-dashed border-slate-300 dark:border-ink-600"
            ></div>
            <div
              class="absolute left-1/2 top-0 h-full border-l border-dashed border-slate-300 dark:border-ink-600"
            ></div>
          </div>
          <div class="relative h-6 w-full max-w-xl">
            <div
              class="absolute left-1/4 top-0 h-full border-l border-dashed border-slate-300 dark:border-ink-600"
            ></div>
            <div
              class="absolute left-3/4 top-0 h-full border-l border-dashed border-slate-300 dark:border-ink-600"
            ></div>
          </div>
          <div class="grid w-full max-w-xl grid-cols-2 gap-6">
            <px-flow-box title="CloudFront" sub="Cache Invalidation" />
            <px-flow-box title="Route 53 + ACM" sub="DNS · HTTPS" />
          </div>

          <!-- Zusammenführung -->
          <div class="relative h-6 w-full max-w-xl">
            <div
              class="absolute left-1/4 top-0 h-full border-l border-dashed border-slate-300 dark:border-ink-600"
            ></div>
            <div
              class="absolute left-3/4 top-0 h-full border-l border-dashed border-slate-300 dark:border-ink-600"
            ></div>
            <div
              class="absolute inset-x-1/4 bottom-0 border-t border-dashed border-slate-300 dark:border-ink-600"
            ></div>
          </div>
          <div class="connector !border-accent-500/60 dark:!border-accent-400/60"></div>

          <px-flow-box title="prime-ux.de" sub="HTTPS · CDN · DNS" [accent]="true" />
        </div>

        <!-- Kategorien -->
        <div class="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          @for (cat of categories; track cat.title) {
            <div
              class="rounded-xl border border-slate-200 p-4 dark:border-ink-700 dark:bg-ink-900/50"
            >
              <p
                class="font-mono text-[10px] font-semibold tracking-[0.25em] text-accent-600 uppercase dark:text-accent-400"
              >
                {{ cat.title }}
              </p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                @for (item of cat.items; track item) {
                  <px-tech-chip [label]="item" />
                }
              </div>
            </div>
          }
        </div>

        <!-- System-Status -->
        <div class="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-ink-700">
          <div
            class="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-5 py-3 dark:border-ink-700 dark:bg-ink-800/60"
          >
            <span class="inline-flex items-center gap-2 font-mono text-xs">
              <span class="size-2 animate-pulse rounded-full bg-accent-500"></span>
              <span class="font-semibold text-accent-600 dark:text-accent-400">LIVE</span>
              <span class="text-slate-600 dark:text-slate-300">System-Status</span>
            </span>
            <a
              [href]="site.actionsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-xs text-slate-500 transition-colors hover:text-accent-600 dark:hover:text-accent-400"
            >
              GitHub Actions ↗
            </a>
          </div>
          <div
            class="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-ink-700"
          >
            <div class="px-5 py-4">
              <p class="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                {{ i18n.lang() === 'de' ? 'Letztes Deployment' : 'Last deployment' }}
              </p>
              <p class="mt-1 font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
                {{ deployDate() ?? '—' }}
              </p>
              <p class="mt-0.5 font-mono text-[10px] text-slate-500">{{ deployAgo() }}</p>
            </div>
            <div class="px-5 py-4">
              <p class="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">Uptime</p>
              <p class="mt-1 font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
                {{ uptime() ?? '—' }}
              </p>
              <p class="mt-0.5 font-mono text-[10px] text-slate-500">
                {{ i18n.lang() === 'de' ? 'seit letztem Deploy' : 'since last deploy' }}
              </p>
            </div>
            <div class="px-5 py-4">
              <p class="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                Pipeline
              </p>
              <p class="mt-1 inline-flex items-center gap-2 font-mono text-sm font-semibold">
                <span
                  class="size-2 rounded-full"
                  [class]="{
                    'animate-pulse bg-amber-400': state() === 'loading',
                    'bg-accent-500': state() === 'passing',
                    'bg-red-500': state() === 'failing',
                    'bg-slate-400': state() === 'unknown',
                  }"
                ></span>
                <span
                  [class]="{
                    'text-slate-500': state() === 'loading' || state() === 'unknown',
                    'text-accent-600 dark:text-accent-400': state() === 'passing',
                    'text-red-600 dark:text-red-400': state() === 'failing',
                  }"
                >
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
              </p>
              <p class="mt-0.5 font-mono text-[10px] text-slate-500">Terraform · Trivy · S3</p>
            </div>
          </div>
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
  styles: `
    .connector {
      height: 1.5rem;
      width: 1px;
      border-left: 1px dashed var(--color-slate-300);
    }
    :host-context(.dark) .connector {
      border-left-color: var(--color-ink-600);
    }
  `,
})
export class SiteProject {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
  protected readonly categories = SITE_CATEGORIES;

  protected readonly state = signal<PipelineState>('loading');
  private readonly deployedAt = signal<Date | null>(null);

  protected readonly deployDate = computed(() => {
    const date = this.deployedAt();
    if (!date) {
      return null;
    }
    const locale = this.i18n.lang() === 'de' ? 'de-DE' : 'en-GB';
    const day = date.toLocaleDateString(locale, {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const time = date.toLocaleTimeString(locale, {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${day} ${time} UTC`;
  });

  protected readonly deployAgo = computed(() => {
    const date = this.deployedAt();
    if (!date) {
      return '';
    }
    const de = this.i18n.lang() === 'de';
    const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
    if (minutes < 60) {
      return de ? `vor ${minutes} Min.` : `${minutes} min ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 48) {
      return de ? `vor ${hours} Std.` : `${hours} hrs ago`;
    }
    const days = Math.floor(hours / 24);
    return de ? `vor ${days} Tagen` : `${days} days ago`;
  });

  protected readonly uptime = computed(() => {
    const date = this.deployedAt();
    if (!date || this.state() !== 'passing') {
      return null;
    }
    const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
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
