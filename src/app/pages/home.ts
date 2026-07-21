import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Seo, ORIGIN } from '../core/seo';
import { HERO } from '../data/content';
import { Hero } from '../sections/hero';
import { Profile } from '../sections/profile';
import { Focus } from '../sections/focus';
import { Engagements } from '../sections/engagements';
import { History } from '../sections/history';
import { Skills } from '../sections/skills';
import { Learning } from '../sections/learning';
import { Background } from '../sections/background';
import { SiteProject } from '../sections/site-project';
import { BlogTeaser } from '../blog/blog-teaser';
import { About } from '../sections/about';
import { Contact } from '../sections/contact';
import { SectionRail } from '../shared/section-rail';

@Component({
  selector: 'px-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Hero,
    Profile,
    Focus,
    Engagements,
    History,
    Skills,
    Learning,
    Background,
    SiteProject,
    BlogTeaser,
    About,
    Contact,
    SectionRail,
  ],
  template: `
    <px-section-rail />
    <px-hero />
    <px-profile />
    <px-focus />
    <px-engagements />
    <px-history />
    <px-skills />
    <px-learning />
    <px-background />
    <px-site-project />
    <px-blog-teaser />
    <px-about />
    <px-contact />
  `,
})
export class Home {
  private readonly seo = inject(Seo);

  constructor() {
    this.seo.set({
      title: {
        de: 'Thomas Hemmerich — Frontend-Architekt & Angular Lead',
        en: 'Thomas Hemmerich — Frontend Architect & Angular Lead',
      },
      description: HERO.tagline,
      jsonLd: (lang) => ({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: HERO.name,
        // Bewusst als stabile Rolle gepflegt, entkoppelt von der Hero-Headline
        // (die gerade als Positionierungs-Test variiert wird).
        jobTitle:
          lang === 'de' ? 'Frontend-Architekt & Angular Lead' : 'Frontend Architect & Angular Lead',
        description: HERO.tagline[lang],
        url: ORIGIN,
        email: 'mailto:info@prime-ux.de',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: lang === 'de' ? 'Universität Würzburg' : 'University of Würzburg',
          sameAs: 'https://www.uni-wuerzburg.de/',
        },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name:
            lang === 'de'
              ? 'Diplom-Informatiker, Univ.'
              : 'Diploma in Computer Science (Dipl.-Inf.)',
        },
        knowsAbout: [
          'Angular',
          'Frontend Architecture',
          'Agentic UI',
          'Micro Frontends',
          'Design Systems',
        ],
        sameAs: [
          'https://github.com/themmerich',
          'https://www.linkedin.com/in/thomas-hemmerich-83b29831b/',
        ],
      }),
    });
  }
}
