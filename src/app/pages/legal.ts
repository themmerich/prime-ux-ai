import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
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
          <!-- TODO: Straße und Hausnummer ergänzen -->
          97506 Grafenrheinfeld
        </p>
        <p>
          Telefon: {{ contact.phone }}<br />
          E-Mail: {{ contact.email }}
        </p>
        <!-- TODO: ggf. USt-IdNr. ergänzen -->
      </div>
    </section>
  `,
})
export class Impressum {
  protected readonly contact = CONTACT;
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
              ? 'Beim Aufruf der Seite verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten (z.B. IP-Adresse) in Server-Logs.'
              : 'When accessing this site, the hosting provider processes technically necessary connection data (e.g. IP address) in server logs.'
          }}
        </p>
        <!-- TODO: Hosting-Anbieter benennen, sobald das Hosting feststeht -->
      </div>
    </section>
  `,
})
export class Datenschutz {
  protected readonly i18n = inject(I18n);
}
