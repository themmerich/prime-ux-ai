In July 2026, PrimeTek [announced](https://primeui.dev/nextchapter) that future major versions of PrimeNG, PrimeReact and PrimeVue will no longer ship under MIT but under a commercial "PrimeUI" license. PrimeNG has been the established choice in several of my enterprise projects for years — so the news did not reach me as an observer but as someone affected. This article is still not an outrage piece. It is an attempt to capture the actual lesson: **license models are an architecture attribute, and most evaluations treat them as a checkbox.**

## What exactly happened

The facts, as of July 2026:

- **Existing MIT versions stay MIT** — for PrimeNG, version 21 is the last open major; older releases remain freely usable forever.
- **From PrimeNG 22 onward** (likewise PrimeReact 11, PrimeVue 5), the libraries ship as compiled npm packages under the PrimeUI license — the source of future versions is no longer open.
- The free [community license](https://primeui.dev/licenses/community) is narrow: under $1M annual revenue, fewer than 5 developers, fewer than 10 employees, at most $3M outside capital — and **government agencies, public universities and publicly funded institutions are excluded regardless**.
- The commercial license costs $599 per developer at launch pricing (perpetual, one year of updates; $799 from 2027), with update extensions at $399 per developer per year.

For practically every enterprise team — and even more so for the public sector — this means: every future major version is a procurement process.

## Why this is not an outlier

It is hard to blame PrimeTek for seeking a business model. Maintaining four large libraries at enterprise level for years does not fund itself through theme sales. On top of that, AI tools are lowering the bar for generating standard components in-house — whoever sells datepickers and tables today competes with a prompt tomorrow. The "core under MIT, money from add-ons" model is therefore getting brittle across the industry, and vendors are moving to commercial licenses, dual licensing or services.

For component library selection this leads to an uncomfortable assumption: an enterprise application lives ten to fifteen years, and it is quite possible that the vendor's license model will not last that long. Better to account for that before you are dependent, not after.

## The actual lesson: "MIT" only covers the present

Every library evaluation I have seen contains a line like "License: MIT ✓". Which is true — it just answers too small a question. MIT describes the legal status of today's code, not the future of the dependency. The version you use stays free; but Angular moves on, security holes want patching, and the development path belongs to the vendor.

So the evaluation needs different questions. Who carries the library — a single vendor under monetization pressure, or a broad community or foundation? How has the vendor monetized so far, and how did earlier model changes play out? Paid LTS existed at PrimeNG before this announcement, so the direction was visible. And finally: what would the exit cost — not as a gut feeling, but as an estimate of how many places in the code know the library by name?

## What affected teams should do now

Inventory first, then strategy. Three options:

**Stay on version 21.** Legitimate short term — the version works, MIT stays MIT. But it is a decision with an expiry date: how long version 21 keeps up with future Angular majors, and whether security fixes arrive, is outside your control. If you stay, put a date in the calendar on which the decision gets reviewed.

**Pay.** In many cases the economically rational move, even if it feels wrong. A team of ten developers pays around $8,000 at list price — a UI library migration in a grown application, by contrast, costs months rather than days. And a solvently funded vendor beats a library nobody maintains anymore. Paying with open eyes also means: the update subscription of $399 per developer per year is the real recurring item, and your negotiating position stays weak as long as the exit remains unaffordable.

**Migrate.** Angular Material, Spartan, or a leaner in-house base on a headless foundation. Realistic only for applications with a long remaining life — and the effort depends almost entirely on how deeply the library is wired into the code.

That wiring is exactly where it gets decided whether the license news is a problem or merely a task.

## Exit capability is a design principle, not a contingency plan

In one of my projects there is a dedicated component layer between application code and UI library: feature teams import `app-table`, not the vendor's table. When the license news arrived, the reaction there was not a crisis meeting but an arithmetic exercise — the number of places that know the library directly is known and finite. A replacement would still be expensive, but it would be estimable, and therefore negotiable.

That is the governance benefit design systems deliver beyond consistency and accessibility. In practice it means:

- An in-house component layer on top of the third-party library, even where it initially just passes things through — it is the place where a replacement becomes localizable at all.
- Design tokens instead of vendor theming: colors, spacing and typography belong to your system; the library consumes them.
- Measure and limit direct imports. A lint rule banning vendor imports outside the component layer costs an afternoon.
- License exposure as an item in the annual architecture review: which dependencies carry single-vendor risk, and what would their exit price be?

## The takeaway

A component library is not a gift but a supply contract — it is just that many teams never read it because the envelope said "MIT". PrimeTek has now made the contract visible. Teams that priced in exit capability experience such announcements as an arithmetic exercise with three options; teams that did not experience them as extortion. The difference does not lie with the vendor.
