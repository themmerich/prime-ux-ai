> Example article — placeholder content you are free to replace.

"We're doing micro frontends" is rarely a technical decision. In the vast majority of cases it is an attempt to solve an **organizational problem**: several teams that want to ship independently without blocking each other.

## The right question

Not *"How do I build micro frontends?"* but *"Do I have the problem micro frontends solve?"*.

One team, one deployment, one codebase? Then micro frontends are almost always overhead without payoff. The price — distributed state, duplicated dependencies, more complex builds — only pays off once genuine team autonomy is the deciding factor.

## What Nx does well

Nx removes much of the pain by **making the monorepo path viable first**:

- Clear module boundaries via project tags and lint rules, long before you deploy anything separately.
- `affected` builds that only rebuild and test what actually changed.
- A clean upgrade path from "modular monolith" to "true micro frontends" — without throwing away code.

## My rule of thumb

Start with a **modular monolith** in Nx. Draw sharp boundaries between domains. Only deploy separately once a team is demonstrably slowed down by another team's release cadence.

Micro frontends are a tool for scale — not for the start.
