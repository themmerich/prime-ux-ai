import { L } from '../core/i18n';

/* ------------------------------------------------------------------ */
/* Modelle                                                             */
/* ------------------------------------------------------------------ */

export interface FocusArea {
  icon: string;
  title: L;
  text: L;
  tags: string[];
}

export interface Engagement {
  period: L;
  client: string;
  project: L;
  role: L;
  text: L;
  highlights: L<string[]>;
  tech: string[];
}

export interface HistoryEntry {
  period: string;
  client: string;
  project: L;
  role: L;
  text: L;
  tech: string[];
}

export interface SkillGroup {
  title: L;
  skills: string[];
  highlight?: boolean;
}

export interface Training {
  date: string;
  title: L;
  provider: string;
  focus?: boolean;
}

/* ------------------------------------------------------------------ */
/* Hero & Profil                                                       */
/* ------------------------------------------------------------------ */

export const HERO = {
  kicker: 'PRIME UX',
  name: 'Thomas Hemmerich',
  headline: {
    de: 'Frontend-Architekt & Angular Lead',
    en: 'Frontend Architect & Angular Lead',
  } as L,
  tagline: {
    de: 'Ich entwerfe und modernisiere Frontend-Architekturen für Enterprise-Anwendungen — mit Modern Angular, Design Systems und einem klaren Fokus: Agentic UI, die Verbindung von KI-Agenten und Benutzeroberflächen.',
    en: 'I design and modernize frontend architectures for enterprise applications — with modern Angular, design systems and one clear focus: agentic UI, connecting AI agents with user interfaces.',
  } as L,
  chips: {
    de: ['Angular Lead @ parcIT & BAMF', '20+ Jahre Erfahrung', 'Freelancer · Remote / DACH'],
    en: ['Angular lead @ parcIT & BAMF', '20+ years of experience', 'Freelancer · remote / DACH'],
  } as L<string[]>,
  ctaContact: { de: 'Projekt anfragen', en: 'Start a conversation' } as L,
  ctaProjects: { de: 'Projekte ansehen', en: 'View projects' } as L,
};

export const PROFILE = {
  title: { de: 'Profil', en: 'Profile' } as L,
  text: {
    de: 'Diplom-Informatiker mit über 20 Jahren Erfahrung in der Softwareentwicklung, seit 2009 freiberuflich in Projekten für Banken, Versicherungen und Behörden. Mein Kern: langlebige Frontend-Architekturen mit Modern Angular — Signals, Standalone Components, Nx, Micro-Frontends — kombiniert mit solidem Backend-Handwerk in Java und Spring Boot. Aktuell verantworte ich parallel die Frontend-Architektur in zwei Enterprise-Projekten und coache die Teams dabei. Meine Richtung für die nächsten Jahre ist klar: Agentic UI — Anwendungen, in denen KI-Agenten, generative Oberflächen und klassische Enterprise-UIs zusammenspielen.',
    en: 'Computer science graduate (Dipl.-Inf.) with 20+ years in software engineering, freelancing since 2009 for banks, insurers and public agencies. My core: long-lived frontend architectures with modern Angular — signals, standalone components, Nx, micro frontends — combined with solid backend craftsmanship in Java and Spring Boot. I currently own the frontend architecture of two enterprise projects in parallel while coaching the teams. My direction for the coming years is clear: agentic UI — applications where AI agents, generative interfaces and classic enterprise UIs work together.',
  } as L,
  facts: {
    de: [
      { value: '20+', label: 'Jahre Softwareentwicklung' },
      { value: '17', label: 'Jahre Freelancing' },
      { value: '12+', label: 'Enterprise-Projekte' },
      { value: '2', label: 'aktive Lead-Mandate' },
    ],
    en: [
      { value: '20+', label: 'years in software engineering' },
      { value: '17', label: 'years freelancing' },
      { value: '12+', label: 'enterprise projects' },
      { value: '2', label: 'active lead engagements' },
    ],
  } as L<{ value: string; label: string }[]>,
};

/* ------------------------------------------------------------------ */
/* Fokus / Leistungen                                                  */
/* ------------------------------------------------------------------ */

export const FOCUS_TITLE = { de: 'Fokus & Leistungen', en: 'Focus & Services' } as L;
export const FOCUS_INTRO = {
  de: 'Vier Schwerpunkte, ein Anspruch: Software, die auch in fünf Jahren noch wartbar ist.',
  en: 'Four focus areas, one standard: software that is still maintainable five years from now.',
} as L;

export const FOCUS_AREAS: FocusArea[] = [
  {
    icon: '◇',
    title: { de: 'Agentic UI & AI Engineering', en: 'Agentic UI & AI Engineering' },
    text: {
      de: 'KI-gestützte Oberflächen konzipieren und bauen: Agent-Workflows, generative UI, AI-Driven Development in Design Systems. Fundiert durch Weiterbildungen bei angulararchitects.io und mein eigenes KI-Produkt SkillFlowAI.',
      en: 'Designing and building AI-powered interfaces: agent workflows, generative UI, AI-driven development for design systems. Grounded in trainings at angulararchitects.io and my own AI product SkillFlowAI.',
    },
    tags: ['Agentic AI', 'Generative UI', 'AI-Driven Development', 'LLM-Integration'],
  },
  {
    icon: '△',
    title: { de: 'Frontend-Architektur', en: 'Frontend Architecture' },
    text: {
      de: 'Architektur-Verantwortung über Team-Grenzen hinweg: Micro-Frontends, Nx Workspaces, Modularisierung mit Sheriff, Component Libraries, Design Systems und Barrierefreiheit (A11y).',
      en: 'Architecture ownership across team boundaries: micro frontends, Nx workspaces, modularization with Sheriff, component libraries, design systems and accessibility (a11y).',
    },
    tags: ['Micro-Frontends', 'Nx', 'Design Systems', 'A11y'],
  },
  {
    icon: '↻',
    title: { de: 'Angular-Modernisierung', en: 'Angular Modernization' },
    text: {
      de: 'Migration laufender Produkte auf Modern Angular: Signals, SignalStore, Standalone Components, zoneless — Upgrades über viele Major-Versionen hinweg, ohne den Betrieb zu gefährden.',
      en: 'Migrating live products to modern Angular: signals, SignalStore, standalone components, zoneless — upgrades across many major versions without endangering operations.',
    },
    tags: ['Signals', 'SignalStore', 'Standalone', 'Upgrades'],
  },
  {
    icon: '⧉',
    title: { de: 'Lead & Coaching', en: 'Lead & Coaching' },
    text: {
      de: 'Teams führen und weiterentwickeln: Schulungen, Vorträge, Pairing, Architektur-Reviews und die Kommunikation zwischen Entwicklung, UX- und Plattform-Teams.',
      en: 'Leading and growing teams: trainings, talks, pairing, architecture reviews and the communication between development, UX and platform teams.',
    },
    tags: ['Schulungen', 'Reviews', 'Team Lead', 'Mentoring'],
  },
];

export const FOCUS_NOTE = {
  de: 'Und wenn es sein muss, auch gerne Fullstack: Java, Spring Boot, REST/OpenAPI, OAuth2 — seit über 20 Jahren.',
  en: 'And full stack when needed: Java, Spring Boot, REST/OpenAPI, OAuth2 — for more than 20 years.',
} as L;

/* ------------------------------------------------------------------ */
/* Aktuelle Engagements                                                */
/* ------------------------------------------------------------------ */

export const ENGAGEMENTS_TITLE = { de: 'Aktuelle Projekte', en: 'Current Engagements' } as L;
export const ENGAGEMENTS_INTRO = {
  de: 'Zwei parallele Lead-Mandate — beide mit Architektur-Verantwortung über mehrere Teams.',
  en: 'Two parallel lead engagements — both with architecture ownership across multiple teams.',
} as L;

export const ENGAGEMENTS: Engagement[] = [
  {
    period: { de: '07/2025 – heute', en: '07/2025 – present' },
    client: 'parcIT GmbH',
    project: {
      de: 'Webauswertung & Provisionsdatenerfassung',
      en: 'Web Analytics & Commission Data Management',
    },
    role: {
      de: 'Frontend-Architekt · Coach · Lead Frontend Developer',
      en: 'Frontend Architect · Coach · Lead Frontend Developer',
    },
    text: {
      de: 'Neu- und Weiterentwicklung einer Software zur Verwaltung von Bankenparametern und Provisionsdaten. Frontend-Architektur-Verantwortung über drei Scrum-Teams, Schnittstelle zu Basis- und UX-Team.',
      en: 'Greenfield and continued development of a system for managing bank parameters and commission data. Frontend architecture ownership across three Scrum teams, liaising with the platform and UX teams.',
    },
    highlights: {
      de: [
        'Micro-Frontend-Architektur mit Nx und Modern Angular (Signals, Standalone)',
        'Schulungen und Vorträge für die Frontend-Entwickler aller Teams',
        'REST-Schnittstellen mit Spring Boot 3.5 und OpenAPI',
      ],
      en: [
        'Micro-frontend architecture with Nx and modern Angular (signals, standalone)',
        'Trainings and talks for frontend developers across all teams',
        'REST APIs with Spring Boot 3.5 and OpenAPI',
      ],
    },
    tech: [
      'Angular 20–22',
      'Signals',
      'SignalStore',
      'Micro-Frontends',
      'Nx',
      'PrimeNG',
      'Spring Boot 3.5',
      'OpenAPI',
      'Playwright',
    ],
  },
  {
    period: { de: '01/2025 – heute', en: '01/2025 – present' },
    client: 'BAMF',
    project: {
      de: 'BABS — Bereitstellung Sprachmittlung',
      en: 'BABS — Interpreter Assignment Platform',
    },
    role: {
      de: 'Frontend-Architekt · Lead Frontend Developer',
      en: 'Frontend Architect · Lead Frontend Developer',
    },
    text: {
      de: 'Modernisierung einer Anwendung zur Planung und Abrechnung von Dolmetscher-Einsätzen für das Bundesamt für Migration und Flüchtlinge.',
      en: 'Modernizing an application for planning and billing interpreter assignments for the German Federal Office for Migration and Refugees.',
    },
    highlights: {
      de: [
        'Upgrade auf Modern Angular: Signals, SignalStore, Modularisierung mit Sheriff',
        'Analyse und Behebung von Produktiv-Fehlern, Performance-Optimierung',
        'Schulung des Teams auf die neue Architektur',
      ],
      en: [
        'Upgrade to modern Angular: signals, SignalStore, modularization with Sheriff',
        'Production issue analysis and performance optimization',
        'Training the team on the new architecture',
      ],
    },
    tech: [
      'Angular 19–22',
      'Signals',
      'SignalStore',
      'Sheriff',
      'NgRx',
      'Spring Boot',
      'Oracle',
      'Playwright',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Flaggschiff: SkillFlowAI                                            */
/* ------------------------------------------------------------------ */

export const FLAGSHIP = {
  label: { de: 'Eigenes Produkt · Open Source', en: 'Own product · open source' } as L,
  title: 'SkillFlowAI',
  period: '11/2024 – 06/2025',
  text: {
    de: 'Web- und Mobile-App zur Verwaltung und Durchführung interner Schulungen — entwickelt für die Freiwillige Feuerwehr. Schulungsinhalte werden mit KI aufbereitet, Lernzielkontrollen automatisch generiert. Von Requirements über Architektur bis Frontend und Backend komplett selbst konzipiert und umgesetzt.',
    en: 'Web and mobile app for managing and running internal trainings — built for a volunteer fire department. Training content is enriched with AI, assessments are generated automatically. Conceived and built end to end: requirements, architecture, frontend and backend.',
  } as L,
  why: {
    de: 'Warum dieses Projekt hier ganz oben steht: Es verbindet genau das, wofür ich stehe — Modern Angular, saubere Architektur und praktisch eingesetzte KI.',
    en: 'Why this project sits at the top: it combines exactly what I stand for — modern Angular, clean architecture and AI put to practical use.',
  } as L,
  tech: [
    'Angular 19',
    'SignalStore',
    'Tailwind CSS',
    'KI-Integration',
    'Java 23',
    'Spring Boot 3.4',
    'PostgreSQL',
    'Playwright',
  ],
  repos: [
    { label: 'skillflowai-frontend', url: 'https://github.com/themmerich/skillflowai-frontend' },
    { label: 'skillflowai (Backend)', url: 'https://github.com/themmerich/skillflowai' },
  ],
};

/* ------------------------------------------------------------------ */
/* Projekthistorie                                                     */
/* ------------------------------------------------------------------ */

export const HISTORY_TITLE = { de: 'Projekthistorie', en: 'Project History' } as L;
export const HISTORY_INTRO = {
  de: '20 Jahre Enterprise-Projekte in Finanzen, Versicherungen, Behörden und Industrie — hier die Stationen im Überblick.',
  en: '20 years of enterprise projects in finance, insurance, government and industry — the stations at a glance.',
} as L;

export const HISTORY: HistoryEntry[] = [
  {
    period: '10/2023 – 10/2024',
    client: 'Optica (Dr. Güldener Gruppe)',
    project: { de: 'Omnia — Factoring-Software', en: 'Omnia — factoring software' },
    role: { de: 'Senior Full Stack Entwickler', en: 'Senior full stack developer' },
    text: {
      de: 'Neuentwicklung einer Factoring-Software für orthopädische Hilfsmittel; Frontend-Architektur-Verantwortung und alleinverantwortliche Umsetzung der Direktabrechnung.',
      en: 'Greenfield factoring software for orthopedic aids; frontend architecture ownership and sole responsibility for the direct billing domain.',
    },
    tech: ['Angular 14–16', 'NgRx', 'AG Grid', 'Spring Boot', 'Spring Batch', 'RabbitMQ'],
  },
  {
    period: '12/2022 – 09/2023',
    client: 'DZR (Dr. Güldener Gruppe)',
    project: { de: 'Megadoc — Factoring-Software', en: 'Megadoc — factoring software' },
    role: { de: 'Senior Full Stack Entwickler', en: 'Senior full stack developer' },
    text: {
      de: 'Neuentwicklung einer Abrechnungssoftware für Zahnarztrechnungen; Modernisierung der Frontend-Architektur auf Micro-Frontends und Web Components.',
      en: 'Greenfield billing software for dental invoices; modernized the frontend architecture towards micro frontends and web components.',
    },
    tech: ['Angular 14–15', 'Micro-Frontends', 'Web Components', 'Spring Boot', 'Keycloak'],
  },
  {
    period: '09/2021 – 11/2022',
    client: 'Sopra Financial Technology',
    project: { de: 'DSGVO & FinStabDev', en: 'GDPR & financial stability regulation' },
    role: { de: 'Senior Full Stack Entwickler', en: 'Senior full stack developer' },
    text: {
      de: 'Umsetzung der Datenschutz-Grundverordnung und der Finanzstabilisierungsgesetz-Verordnungen im Banken-Umfeld.',
      en: 'Implementing GDPR and financial stability regulations in a banking environment.',
    },
    tech: ['Angular 13', 'NgRx', 'Spring Boot', 'Oracle', 'RabbitMQ'],
  },
  {
    period: '01/2017 – 08/2021',
    client: 'Sparda-Datenverarbeitung eG',
    project: { de: 'GloboZAP — Baufinanzierung', en: 'GloboZAP — mortgage financing' },
    role: { de: 'Senior Full Stack Entwickler', en: 'Senior full stack developer' },
    text: {
      de: 'Ablösung einer Bestandssoftware für Baufinanzierung; Mitverantwortung für die Frontend-Architektur und Migration von AngularJS auf Angular 8.',
      en: 'Replacing a legacy mortgage financing system; co-owned the frontend architecture and migrated from AngularJS to Angular 8.',
    },
    tech: ['AngularJS → Angular 8', 'JavaEE', 'WebLogic', 'DB2/Oracle', 'Kubernetes'],
  },
  {
    period: '01/2015 – 12/2016',
    client: 'Airbus Defence & Space',
    project: { de: 'ASSET Future ILS — Eurofighter', en: 'ASSET Future ILS — Eurofighter' },
    role: { de: 'Senior Full Stack Entwickler · Team Lead', en: 'Senior full stack developer · team lead' },
    text: {
      de: 'Logistic-Support-Plattform für den Eurofighter: technisches Design, Team-Leitung und Umsetzung.',
      en: 'Logistic support platform for the Eurofighter: technical design, team lead and implementation.',
    },
    tech: ['JavaEE 7', 'JSF/PrimeFaces', 'Oracle', 'WebLogic'],
  },
  {
    period: '02/2012 – 12/2014',
    client: 'Allianz Global Corporate & Specialty',
    project: { de: 'Actuarial Data Platform', en: 'Actuarial Data Platform' },
    role: { de: 'Full Stack Entwickler', en: 'Full stack developer' },
    text: {
      de: 'Plattform für versicherungsmathematische Prozesse; Frontend-Architektur-Verantwortung.',
      en: 'Platform for actuarial processes; frontend architecture ownership.',
    },
    tech: ['Sencha ExtJS', 'Java/Spring', 'Oracle', 'JBoss'],
  },
  {
    period: '04/2009 – 12/2014',
    client: 'Allianz Global Corporate & Specialty',
    project: { de: 'AGCS Pricing Tools', en: 'AGCS Pricing Tools' },
    role: { de: 'Full Stack Entwickler', en: 'Full stack developer' },
    text: {
      de: 'Generisches Framework, mit dem 16 Pricing Tools für die Industrieversicherung umgesetzt wurden.',
      en: 'Generic framework used to build 16 pricing tools for industrial insurance lines.',
    },
    tech: ['JavaEE', 'Adobe Flex', 'Apache CXF', 'Oracle'],
  },
  {
    period: '2006 – 2009',
    client: 'AGCS · LEONI (Festanstellung)',
    project: { de: 'Location Mgmt. System & diverse Tools', en: 'Location mgmt. system & various tools' },
    role: { de: 'Full Stack Entwickler', en: 'Full stack developer' },
    text: {
      de: 'Erste Berufsjahre als IT-Berater: Administrationssystem für die Sachversicherung und mehrere interne IT-Systeme.',
      en: 'Early career as IT consultant: property insurance administration system and several internal tools.',
    },
    tech: ['JavaEE', 'JSF', 'Apache Tapestry', 'Oracle', 'Informix'],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const SKILLS_TITLE = { de: 'Skills', en: 'Skills' } as L;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { de: 'AI & Agentic', en: 'AI & Agentic' },
    highlight: true,
    skills: [
      'Agentic UI Patterns',
      'AI-Driven Development',
      'LLM-Integration',
      'Design Systems mit AI',
      'Prompt Engineering',
    ],
  },
  {
    title: { de: 'Frontend', en: 'Frontend' },
    skills: [
      'Angular 2–22',
      'TypeScript',
      'Signals & SignalStore',
      'NgRx · RxJS',
      'Nx · Micro-Frontends',
      'Tailwind CSS',
      'PrimeNG · Material',
      'Barrierefreiheit (A11y)',
      'OpenAPI',
    ],
  },
  {
    title: { de: 'Backend', en: 'Backend' },
    skills: [
      'Java · Spring Boot',
      'JPA · Hibernate · QueryDSL',
      'REST · OAuth2',
      'Kafka · RabbitMQ',
      'PostgreSQL · Oracle',
      'Flyway · Liquibase',
    ],
  },
  {
    title: { de: 'DevOps & Testing', en: 'DevOps & Testing' },
    skills: [
      'Docker · Kubernetes',
      'Jenkins · GitHub Actions',
      'Playwright · Cypress',
      'Jest · JUnit · Cucumber',
      'SonarQube',
      'AWS',
    ],
  },
  {
    title: { de: 'Methoden', en: 'Methods' },
    skills: [
      'Domain-Driven Design',
      'Clean Code',
      'TDD · BDD',
      'Microservices',
      'Scrum · Agile',
      'Teamführung & Coaching',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Weiterbildung / Lernpfad                                            */
/* ------------------------------------------------------------------ */

export const LEARNING_TITLE = { de: 'Lernpfad', en: 'Learning Path' } as L;
export const LEARNING_INTRO = {
  de: 'Kein Zufall, sondern ein roter Faden: von Angular-Architektur über Design Systems zu Agentic AI.',
  en: 'Not random, but a through line: from Angular architecture via design systems to agentic AI.',
} as L;

export const TRAININGS: Training[] = [
  {
    date: '07/2026',
    title: { de: 'Agentic AI mit Angular', en: 'Agentic AI with Angular' },
    provider: 'angulararchitects.io',
    focus: true,
  },
  {
    date: '06/2026',
    title: { de: 'Agentic Engineering', en: 'Agentic Engineering' },
    provider: 'angulararchitects.io',
    focus: true,
  },
  {
    date: '01/2026',
    title: { de: 'Docker & Kubernetes', en: 'Docker & Kubernetes' },
    provider: 'Udemy',
  },
  {
    date: '11/2025',
    title: {
      de: 'Design Systems mit AI-Driven Development',
      en: 'Design Systems with AI-Driven Development',
    },
    provider: 'angulararchitects.io',
    focus: true,
  },
  {
    date: '04/2025',
    title: { de: 'Barrierefreiheit / Accessibility (A11y)', en: 'Accessibility (A11y)' },
    provider: 'angulararchitects.io',
  },
  {
    date: '10/2024',
    title: { de: 'Component Library Erstellung', en: 'Building Component Libraries' },
    provider: 'angulararchitects.io',
  },
  {
    date: '07/2024',
    title: { de: 'Zertifizierter Angular-Architekt', en: 'Certified Angular Architect' },
    provider: 'angulararchitects.io',
  },
];

/* ------------------------------------------------------------------ */
/* Diese Seite als Projekt                                             */
/* ------------------------------------------------------------------ */

export const SITE = {
  title: { de: 'Diese Seite ist ein Projekt', en: 'This Site Is a Project' } as L,
  text: {
    de: 'Kein Baukasten, kein Template — diese Seite ist selbst ein kleiner Showcase dafür, wie ich Frontends baue: Angular 22, zoneless Change Detection, Signal-basiertes i18n und Theming, Tailwind CSS 4, selbst gehostete Fonts, kein Tracking.',
    en: 'No site builder, no template — this page is itself a small showcase of how I build frontends: Angular 22, zoneless change detection, signal-based i18n and theming, Tailwind CSS 4, self-hosted fonts, no tracking.',
  } as L,
  stack: ['Angular 22', 'zoneless', 'Signals', 'Standalone Components', 'Tailwind CSS 4', 'TypeScript 6'],
  roadmap: {
    de: 'Roadmap: ein agentischer Assistent, der Fragen zu Profil und Projekten direkt hier beantwortet.',
    en: 'Roadmap: an agentic assistant answering questions about my profile and projects right here.',
  } as L,
};

/* ------------------------------------------------------------------ */
/* Kontakt                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  title: { de: 'Kontakt', en: 'Contact' } as L,
  text: {
    de: 'Sie planen eine Angular-Modernisierung, brauchen Architektur-Verstärkung oder wollen Agentic UI in Ihr Produkt bringen? Schreiben Sie mir.',
    en: 'Planning an Angular modernization, need architecture reinforcement, or want to bring agentic UI into your product? Get in touch.',
  } as L,
  email: 'info@prime-ux.de',
  phone: '+49 176 23547994',
  location: {
    de: 'Grafenrheinfeld, Bayern · Remote / DACH',
    en: 'Grafenrheinfeld, Bavaria, Germany · remote / DACH',
  } as L,
  links: [
    { label: 'GitHub', url: 'https://github.com/themmerich' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/thomas-hemmerich-83b29831b/' },
  ],
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV: { anchor: string; label: L }[] = [
  { anchor: 'profil', label: { de: 'Profil', en: 'Profile' } },
  { anchor: 'fokus', label: { de: 'Fokus', en: 'Focus' } },
  { anchor: 'projekte', label: { de: 'Projekte', en: 'Projects' } },
  { anchor: 'skills', label: { de: 'Skills', en: 'Skills' } },
  { anchor: 'kontakt', label: { de: 'Kontakt', en: 'Contact' } },
];
