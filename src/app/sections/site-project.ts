import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { SectionHeading } from '../shared/section-heading';
import { TechChip } from '../shared/tech-chip';
import { SITE } from '../data/content';

@Component({
  selector: 'px-site-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, TechChip],
  template: `
    <section class="border-t border-slate-200 dark:border-ink-800">
      <div class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <px-section-heading index="07" [title]="i18n.t(site.title)" />
        <p class="max-w-3xl text-base leading-relaxed md:text-lg">{{ i18n.t(site.text) }}</p>

        <!-- Die echte Deployment-Pipeline (.github/workflows/deploy.yml) -->
        <div
          class="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-6 font-mono text-sm dark:border-ink-700 dark:bg-ink-900"
        >
          <p class="whitespace-nowrap text-slate-600 dark:text-slate-300">
            <span class="text-accent-600 dark:text-accent-400">$</span> git push origin main
          </p>
          <p class="mt-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
            <span class="text-slate-400 dark:text-slate-500">──▶</span> GitHub Actions
            <span class="text-slate-400 dark:text-slate-500">──▶</span> Trivy
            <span class="mr-1.5 text-[11px] text-slate-400 dark:text-slate-500">SECURITY SCAN</span>
            <span class="text-slate-400 dark:text-slate-500">──▶</span> Terraform
            <span class="mr-1.5 text-[11px] text-slate-400 dark:text-slate-500">INIT · APPLY</span>
            <span class="text-slate-400 dark:text-slate-500">──▶</span> ng build
          </p>
          <p class="mt-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
            <span class="text-slate-400 dark:text-slate-500">──▶</span> S3 Sync
            <span class="text-slate-400 dark:text-slate-500">──▶</span> CloudFront
            <span class="mr-1.5 text-[11px] text-slate-400 dark:text-slate-500">CACHE INVALIDATION</span>
            <span class="text-slate-400 dark:text-slate-500">──▶</span> Route 53 + ACM
            <span class="text-slate-400 dark:text-slate-500">──▶</span>
            <span class="text-accent-600 dark:text-accent-400">https://prime-ux.de</span>
          </p>
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
}
