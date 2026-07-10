import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { Seo } from '../core/seo';
import { CONTACT } from '../data/content';

@Component({
  selector: 'px-impressum',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto max-w-3xl px-6 pt-36 pb-24">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Impressum</h1>
      <div class="mt-8 space-y-4 text-sm leading-relaxed">
        <p>Angaben gemäß § 5 DDG</p>
        <p>
          Thomas Hemmerich · PRIME UX<br />
          Bühlstr. 16<br />
          97506 Grafenrheinfeld
        </p>
        <p>
          Telefon: {{ contact.phone }}<br />
          E-Mail: {{ contact.email }}
        </p>
        <p>Steuernummer: 249/227/60531</p>
      </div>
    </section>
  `,
})
export class Impressum {
  protected readonly contact = CONTACT;
  private readonly seo = inject(Seo);

  constructor() {
    this.seo.set({
      title: { de: 'Impressum | PRIME UX', en: 'Legal Notice | PRIME UX' },
      description: {
        de: 'Impressum und Anbieterkennzeichnung von Thomas Hemmerich · PRIME UX.',
        en: 'Legal notice and provider identification for Thomas Hemmerich · PRIME UX.',
      },
    });
  }
}

@Component({
  selector: 'px-datenschutz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto max-w-3xl px-6 pt-36 pb-24">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
        {{ i18n.lang() === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy' }}
      </h1>
      <div class="mt-8 space-y-4 text-sm leading-relaxed">
        <p>
          {{
            i18n.lang() === 'de'
              ? 'Diese Webseite verwendet keine Cookies, kein Tracking und keine Analyse-Tools. Es werden keine personenbezogenen Daten erhoben oder an Dritte weitergegeben.'
              : 'This website uses no cookies, no tracking and no analytics tools. No personal data is collected or shared with third parties.'
          }}
        </p>
        <p>
          {{
            i18n.lang() === 'de'
              ? 'Die Seite wird über Amazon Web Services (Amazon CloudFront/S3) ausgeliefert. Beim Aufruf verarbeitet AWS technisch notwendige Verbindungsdaten (z.B. IP-Adresse), soweit dies für die Auslieferung erforderlich ist. Anbieter: Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, L-1855 Luxemburg.'
              : 'This site is delivered via Amazon Web Services (Amazon CloudFront/S3). When accessing it, AWS processes technically necessary connection data (e.g. IP address) as required for delivery. Provider: Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, L-1855 Luxembourg.'
          }}
        </p>
      </div>
    </section>
  `,
})
export class Datenschutz {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);

  constructor() {
    this.seo.set({
      title: { de: 'Datenschutzerklärung | PRIME UX', en: 'Privacy Policy | PRIME UX' },
      description: {
        de: 'Diese Webseite verwendet keine Cookies, kein Tracking und keine Analyse-Tools.',
        en: 'This website uses no cookies, no tracking and no analytics tools.',
      },
    });
  }
}
