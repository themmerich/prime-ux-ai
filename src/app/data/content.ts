import { L } from '../core/i18n';

/* ------------------------------------------------------------------ */
/* Modelle                                                             */
/* ------------------------------------------------------------------ */

export interface FocusArea {
  icon: string;
  title: L;
  text: L;
  /** Geschäftlicher Nutzen in einem Satz — spricht Entscheider an, nicht nur Technik. */
  outcome: L;
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
  period: L;
  client: string;
  project: L;
  role: L;
  text: L;
  tech: string[];
  active?: boolean;
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
    de: 'Frontend-Architekt für Enterprise & Agentic UI',
    en: 'Frontend Architect for Enterprise & Agentic UI',
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
  photo: 'portrait-neu.jpg',
  photoCaption: 'thomas-hemmerich.jpg',
  available: {
    de: 'aktuell ausgebucht bis 31.12.2026',
    en: 'currently booked until Dec 31, 2026',
  } as L,
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
      de: 'Agentic UI heißt: KI-Agenten werden Teil der Oberfläche — sie schlagen Aktionen vor, füllen Formulare vor und führen Workflows aus, immer unter Kontrolle der Nutzer. Ich konzipiere und baue solche Oberflächen: Agent-Workflows, generative UI, AI-Driven Development in Design Systems — fundiert durch spezialisierte Weiterbildungen bei angulararchitects.io und eigene KI-Projekte.',
      en: 'Agentic UI means AI agents become part of the interface — proposing actions, pre-filling forms and running workflows, always under user control. I design and build these interfaces: agent workflows, generative UI, AI-driven development for design systems — grounded in specialized trainings at angulararchitects.io and my own AI projects.',
    },
    outcome: {
      de: 'Macht Enterprise-Anwendungen bereit für KI-gestützte Bedienung — als Vorsprung, nicht als nachträglicher Aufsatz.',
      en: 'Gets enterprise applications ready for AI-assisted operation — as a head start, not a bolt-on.',
    },
    tags: ['Agentic AI', 'Generative UI', 'AI-Driven Development', 'LLM-Integration'],
  },
  {
    icon: '△',
    title: {
      de: 'Design Systems & Frontend-Architektur',
      en: 'Design Systems & Frontend Architecture',
    },
    text: {
      de: 'Design Systems und Barrierefreiheit als Fundament — getragen von einer klaren Architektur über Team-Grenzen hinweg: Component Libraries mit konsistentem, barrierefreiem (A11y) Verhalten, Micro-Frontends, Nx Workspaces und Modularisierung mit Sheriff.',
      en: 'Design systems and accessibility as the foundation — carried by a clear architecture across team boundaries: component libraries with consistent, accessible (a11y) behavior, micro frontends, Nx workspaces and modularization with Sheriff.',
    },
    outcome: {
      de: 'Barrierefreie, konsistente Oberflächen über alle Teams — Pflicht im öffentlichen Sektor, bei mir Standard.',
      en: 'Accessible, consistent interfaces across every team — mandatory in the public sector, standard in my work.',
    },
    tags: ['Design Systems', 'A11y', 'Micro-Frontends', 'Nx'],
  },
  {
    icon: '↻',
    title: { de: 'Angular-Modernisierung', en: 'Angular Modernization' },
    text: {
      de: 'Migration laufender Produkte auf Modern Angular: Signals, SignalStore, Standalone Components, zoneless — Upgrades über viele Major-Versionen hinweg, ohne den Betrieb zu gefährden.',
      en: 'Migrating live products to modern Angular: signals, SignalStore, standalone components, zoneless — upgrades across many major versions without endangering operations.',
    },
    outcome: {
      de: 'Modernisierung im laufenden Betrieb — weniger technische Schulden, ohne Big-Bang-Risiko.',
      en: 'Modernization while live — less technical debt, without big-bang risk.',
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
    outcome: {
      de: 'Teams, die nach dem Einsatz eigenständig auf hohem Niveau weiterliefern.',
      en: 'Teams that keep delivering at a high level on their own after the engagement.',
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
/* Projekthistorie                                                     */
/* ------------------------------------------------------------------ */

export const HISTORY_TITLE = { de: 'Projekthistorie', en: 'Project History' } as L;
export const HISTORY_INTRO = {
  de: '20 Jahre Enterprise-Projekte in Finanzen, Versicherungen, Behörden und Industrie — hier die Stationen im Überblick.',
  en: '20 years of enterprise projects in finance, insurance, government and industry — the stations at a glance.',
} as L;

export const HISTORY: HistoryEntry[] = [
  {
    period: { de: '07/2025 – heute', en: '07/2025 – present' },
    client: 'parcIT GmbH',
    project: {
      de: 'Webauswertung & Provisionsdatenerfassung',
      en: 'Web analytics & commission data management',
    },
    role: {
      de: 'Frontend-Architekt · Coach · Lead Frontend Entwickler',
      en: 'Frontend architect · coach · lead frontend developer',
    },
    text: {
      de: 'Verwaltung von Bankenparametern und Provisionsdaten; Frontend-Architektur-Verantwortung über drei Scrum-Teams — Details siehe „Aktuelle Projekte".',
      en: 'Managing bank parameters and commission data; frontend architecture ownership across three Scrum teams — see "Current Engagements" for details.',
    },
    tech: ['Angular 20–22', 'Micro-Frontends', 'Nx', 'Spring Boot 3.5'],
    active: true,
  },
  {
    period: { de: '01/2025 – heute', en: '01/2025 – present' },
    client: 'BAMF',
    project: {
      de: 'BABS — Bereitstellung Sprachmittlung',
      en: 'BABS — interpreter assignment platform',
    },
    role: {
      de: 'Frontend-Architekt · Lead Frontend Entwickler',
      en: 'Frontend architect · lead frontend developer',
    },
    text: {
      de: 'Modernisierung einer Anwendung zur Planung und Abrechnung von Dolmetscher-Einsätzen — Details siehe „Aktuelle Projekte".',
      en: 'Modernizing an application for planning and billing interpreter assignments — see "Current Engagements" for details.',
    },
    tech: ['Angular 19–22', 'Signals', 'Sheriff', 'Spring Boot'],
    active: true,
  },
  {
    period: { de: '10/2023 – 10/2024', en: '10/2023 – 10/2024' },
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
    period: { de: '12/2022 – 09/2023', en: '12/2022 – 09/2023' },
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
    period: { de: '09/2021 – 11/2022', en: '09/2021 – 11/2022' },
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
    period: { de: '01/2017 – 08/2021', en: '01/2017 – 08/2021' },
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
    period: { de: '01/2015 – 12/2016', en: '01/2015 – 12/2016' },
    client: 'Airbus Defence & Space',
    project: { de: 'ASSET Future ILS — Eurofighter', en: 'ASSET Future ILS — Eurofighter' },
    role: {
      de: 'Senior Full Stack Entwickler · Team Lead',
      en: 'Senior full stack developer · team lead',
    },
    text: {
      de: 'Logistic-Support-Plattform für den Eurofighter: technisches Design, Team-Leitung und Umsetzung.',
      en: 'Logistic support platform for the Eurofighter: technical design, team lead and implementation.',
    },
    tech: ['JavaEE 7', 'JSF/PrimeFaces', 'Oracle', 'WebLogic'],
  },
  {
    period: { de: '02/2012 – 12/2014', en: '02/2012 – 12/2014' },
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
    period: { de: '04/2009 – 12/2014', en: '04/2009 – 12/2014' },
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
    period: { de: '2006 – 2009', en: '2006 – 2009' },
    client: 'AGCS · LEONI (Festanstellung)',
    project: {
      de: 'Location Mgmt. System & diverse Tools',
      en: 'Location mgmt. system & various tools',
    },
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

export const LEARNING_TITLE = { de: 'Weiterbildungen', en: 'Continuing Education' } as L;
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
/* Werdegang: Ausbildung & Anstellung                                  */
/* ------------------------------------------------------------------ */

export interface BackgroundEntry {
  period: string;
  title: L;
  place: string;
  note?: L;
}

export const BACKGROUND_TITLE = { de: 'Werdegang', en: 'Background' } as L;
export const BACKGROUND_INTRO = {
  de: 'Vor der Freiberuflichkeit: Ausbildung, Studium und die ersten Jahre als angestellter Entwickler.',
  en: 'Before going freelance: education, studies and the first years as an employed developer.',
} as L;

export const EDUCATION_TITLE = { de: 'Ausbildung', en: 'Education' } as L;
export const EMPLOYMENT_TITLE = { de: 'Anstellung', en: 'Employment' } as L;

export const EDUCATION: BackgroundEntry[] = [
  {
    period: '09/2000 – 02/2007',
    title: { de: 'Diplom-Informatiker, Univ.', en: 'Diploma in Computer Science (Dipl.-Inf.)' },
    place: 'Universität Würzburg',
    note: { de: 'Abschluss Februar 2007', en: 'Graduated February 2007' },
  },
  {
    period: '07/1998 – 06/2000',
    title: { de: 'Reserveoffizier bei den Pionieren', en: 'Reserve officer, engineer corps' },
    place: 'Bundeswehr, Volkach',
    note: {
      de: 'Offiziersprüfung 2000, Beförderung zum Oberleutnant',
      en: 'Officer exam 2000, promoted to First Lieutenant',
    },
  },
  {
    period: '1989 – 1998',
    title: { de: 'Abitur', en: 'Abitur (secondary school diploma)' },
    place: 'Walther-Rathenau-Gymnasium, Schweinfurt',
  },
];

export const EMPLOYMENT: BackgroundEntry[] = [
  {
    period: '10/2008 – 03/2009',
    title: { de: 'IT-Berater', en: 'IT consultant' },
    place: 'LEONI Wiring Systems, Kitzingen',
  },
  {
    period: '06/2006 – 09/2008',
    title: { de: 'IT-Berater', en: 'IT consultant' },
    place: 'nobisCum, Würzburg',
  },
];

/* ------------------------------------------------------------------ */
/* Diese Seite als Projekt                                             */
/* ------------------------------------------------------------------ */

export const SITE = {
  title: { de: 'Diese Seite ist ein Projekt', en: 'This Site Is a Project' } as L,
  text: {
    de: 'Kein Baukasten, kein Template — diese Seite ist selbst ein kleiner Showcase dafür, wie ich Software baue. Frontend: Angular 22 mit zoneless Change Detection, Signal-basiertem i18n und Theming, Tailwind CSS 4, selbst gehostete Fonts, kein Tracking. Jede Route wird beim Build zu statischem HTML vorgerendert (SSR) und im Browser hydriert — für schnelle Anzeige, sauberes SEO und Barrierefreiheit nach WCAG 2.1 AA. Betrieb: Die komplette AWS-Infrastruktur (S3, CloudFront, Route 53, ACM) ist mit Terraform beschrieben; jeder Push auf main durchläuft einen Trivy-Security-Scan, Terraform Apply und das Deployment — vollautomatisch per GitHub Actions.',
    en: 'No site builder, no template — this page is itself a small showcase of how I build software. Frontend: Angular 22 with zoneless change detection, signal-based i18n and theming, Tailwind CSS 4, self-hosted fonts, no tracking. Every route is prerendered to static HTML at build time (SSR) and hydrated in the browser — for fast first paint, clean SEO and accessibility to WCAG 2.1 AA. Operations: the entire AWS infrastructure (S3, CloudFront, Route 53, ACM) is described in Terraform; every push to main runs through a Trivy security scan, Terraform apply and deployment — fully automated via GitHub Actions.',
  } as L,
  repo: { label: 'prime-ux-ai', url: 'https://github.com/themmerich/prime-ux-ai' },
  actionsUrl: 'https://github.com/themmerich/prime-ux-ai/actions/workflows/deploy.yml',
  roadmap: {
    de: 'Roadmap: ein agentischer Assistent, der Fragen zu Profil und Projekten direkt hier beantwortet.',
    en: 'Roadmap: an agentic assistant answering questions about my profile and projects right here.',
  } as L,
};

export const SITE_CATEGORIES: { title: string; items: string[] }[] = [
  { title: 'Frontend', items: ['Angular 22', 'zoneless', 'Signals', 'Tailwind CSS 4'] },
  { title: 'Rendering', items: ['SSR', 'Prerendering', 'Hydration'] },
  { title: 'A11y', items: ['WCAG 2.1 AA'] },
  { title: 'Cloud', items: ['AWS S3', 'CloudFront', 'Route 53', 'ACM'] },
  { title: 'IaC', items: ['Terraform', 'Remote State', 'State Lock'] },
  { title: 'CI/CD', items: ['GitHub Actions'] },
  { title: 'Security', items: ['Trivy Scanner'] },
];

/* ------------------------------------------------------------------ */
/* Über mich                                                           */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  title: { de: 'Über mich', en: 'About Me' } as L,
  text: {
    de: 'Seit über 20 Jahren baue ich Software, seit 2009 freiberuflich. Was mich antreibt: Architekturen, die auch in fünf Jahren noch tragen, und Teams, die nach meinem Einsatz stärker sind als vorher. Ich rede Klartext mit Fachbereich und Entwicklung gleichermaßen und teile mein Wissen lieber, als es zu horten.',
    en: 'I have been building software for over 20 years, freelancing since 2009. What drives me: architectures that still hold up five years down the line, and teams that are stronger after my engagement than before. I speak plainly with both business and engineering, and I would rather share my knowledge than hoard it.',
  } as L,
  beyond: {
    de: 'Abseits des Rechners: CrossFit, Open Source und ein wacher Blick auf neue Technologien.',
    en: 'Away from the keyboard: CrossFit, open source and a keen eye on emerging technologies.',
  } as L,
  interests: [
    { de: 'CrossFit', en: 'CrossFit' },
    { de: 'Open Source', en: 'Open Source' },
    { de: 'Technologie-Trends', en: 'Tech Trends' },
  ] as L[],
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
  { anchor: 'weiterbildung', label: { de: 'Weiterbildungen', en: 'Education' } },
  { anchor: 'blog', label: { de: 'Blog', en: 'Blog' } },
  { anchor: 'kontakt', label: { de: 'Kontakt', en: 'Contact' } },
];
