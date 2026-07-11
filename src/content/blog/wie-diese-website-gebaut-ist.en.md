A portfolio site for a frontend architect has a built-in credibility problem: if it comes from a site builder, it says more about the builder than about me. So this site is a project in its own right — held to the same standards I apply to client work: deliberate architecture decisions, infrastructure as code, a deployment that needs no manual steps. This article is the tour.

## The constraints

Before deciding on technology, the requirements belong on the table. Here they are modest but precise:

- **The content is static.** Profile, projects, blog articles — none of it depends on the visitor.
- **Two languages**, German and English, switchable without a reload.
- **No tracking, no cookies**, self-hosted fonts. A portfolio site does not need a consent banner.
- **Cheap and low-maintenance to operate.** No server that wants patching.

These four points explain almost every decision that follows.

## Angular 22, without Zone.js

The frontend is Angular 22 with standalone components and signals — and without Zone.js. Change detection runs zoneless: whatever changes is modelled explicitly through signals, instead of a monkey patch sitting on top of every browser API and re-checking half the world after each event.

For a site this size that is not a performance play but an architecture statement: all mutable state — language, theme, the current blog article — is declared as a signal and derived via `computed`. There is no state living "just somewhere" inside a component. The initial bundle stays at a good 100 kB over the wire, self-hosted fonts included.

## Bilingualism is a data model, not a framework

For DE/EN on a site this size you do not need an i18n library. You need a type:

```ts
export interface L<T = string> {
  de: T;
  en: T;
}
```

The entire page content — from the hero copy to the project highlights — lives as a typed data model in a single file, and every translatable field is an `L`. A signal holds the active language, a single function resolves it:

```ts
readonly t = <T>(text: L<T>): T => text[this.lang()];
```

<figure>
  <img src="/blog/images/zweisprachiges-content-modell.svg" alt="Diagram: the L interface enforces both languages per field, a language signal selects at runtime" />
  <figcaption>A type instead of a library: every field carries both languages, the language signal selects — a missing translation breaks the build.</figcaption>
</figure>

The decisive difference to dictionary approaches with string keys: **completeness is checked by the compiler.** An `Engagement` without an English `role` field does not compile. There is no translation file to forget, no key pointing nowhere at runtime. The language toggle sets exactly one signal — everything reading through `t()` follows, including titles and meta tags.

## The blog: Markdown at build time

Articles like this one live as Markdown in the repository, one file per language. The obvious route — fetching Markdown over HTTP at runtime — was in fact the first version. It got thrown out when prerendering arrived: a `fetch` does not run during build-time rendering, and the generated pages would have shipped without their article text.

Instead, the esbuild `text` loader pulls the Markdown files into the bundle as strings:

```ts
import makingOfEn from '../../content/blog/wie-diese-website-gebaut-ist.en.md';
```

Rendering happens with `marked`, synchronously, inside a `computed`. That puts the full article text into the prerendered HTML — and the language toggle swaps it without a network request, because both versions are in the bundle anyway.

## Prerendering instead of a server

With static content, server-side rendering has one simple truth: if every request produces the same HTML, it does not need to be rendered on every request. So the build renders each route exactly once (`outputMode: "static"`) — out come finished HTML pages, one per route, blog articles enumerated from the article list via `getPrerenderParams`.

<figure>
  <img src="/blog/images/build-und-auslieferung.svg" alt="Diagram: source code is prerendered to static HTML at build time, delivered via S3 and CloudFront, and hydrated in the browser" />
  <figcaption>Two timelines: finished HTML is produced at build time; at request time it is merely delivered — and hydrated in the browser.</figcaption>
</figure>

The browser receives readable HTML immediately — and so do search engines. Then Angular hydrates the page: the existing DOM is adopted rather than rebuilt, and the signals take over. Two services needed rework for this, because their constructors touched `localStorage` and `document` — neither exists during build-time rendering. On the server the defaults now apply (German, dark mode); the browser corrects after hydration based on the stored preference.

A real Node server at request time would have brought only downsides: running costs, patching, an outage risk — for HTML that only changes on deployment.

## The catch: an object store knows no directories

Prerendering produces one directory with an `index.html` per route — but the URL stays `/impressum`, without a file name. S3 is a key-value store: there is nothing under the key `impressum`, but there is under `impressum/index.html`. Without a countermeasure, the distribution's 404 fallback would have served the *home page* with status 200 — the classic among silent SEO failures, because visually everything works.

<figure>
  <img src="/blog/images/cloudfront-rewrite.svg" alt="Diagram: a CloudFront function appends index.html to directory URLs before the request reaches S3" />
  <figcaption>A CloudFront function on the viewer request appends the file name; only unknown URLs end up in the SPA fallback.</figcaption>
</figure>

The solution is a CloudFront function of a handful of lines: if the path ends without a file extension, `/index.html` is appended before the request reaches the origin. It runs at the edge, costs practically nothing — and, like everything here, is versioned in the repository.

## Infrastructure that lives in the repo

The entire AWS infrastructure is Terraform: a private S3 bucket (accessible exclusively through CloudFront via origin access control), the CDN distribution including the function, Route 53, the ACM certificate, even a cost budget with an alarm. There is no click in the AWS console that would not be reproducible.

Every push to `main` runs the same track: Trivy scans dependencies and Terraform code, Terraform reconciles the infrastructure, Angular builds and prerenders, `aws s3 sync` uploads, CloudFront invalidates. The cache strategy follows the build: hashed assets are cached for a year as `immutable`, the prerendered HTML pages not at all — so a deployment takes effect immediately, and no visitor ever receives stale JavaScript.

To see it live: the home page shows the [pipeline status](/#diese-seite) of the latest deployment — straight from the GitHub API.

## SEO as the final building block

Prerendering lays the foundation — finished HTML — but only metadata makes it usable for search engines. A central `Seo` service sets title, description, canonical link, Open Graph tags and JSON-LD per route (`Person` on the home page, `BlogPosting` on articles). It is language-reactive too: it reads through the same `L` model and follows the toggle.

The `sitemap.xml` is generated after the build from the prerender output itself — a script collects the produced `index.html` files. That way the sitemap can never drift from the real routes: a new article in the article list gets prerendered and therefore shows up automatically.

## What comes next

This site is deliberately phase one. On the roadmap is an agentic assistant answering questions about my profile and projects right here — not a bolted-on chat window, but part of the page. The architecture for it is in place: typed content as a knowledge base, signals as the state model, and infrastructure that grows by pull request.

The complete source code — Terraform and pipeline included — is public on [GitHub](https://github.com/themmerich/prime-ux-ai).
