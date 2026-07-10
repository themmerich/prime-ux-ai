> Example article — placeholder content you are free to replace.

The past few years were shaped by design systems and micro frontends. The next shift is already visible: **AI agents are moving into the interface** — not as a bolted-on chat window in the corner, but as an integral part of the interaction.

<figure>
  <img src="/blog/images/agentic-ui-beispiel.jpg" alt="Example image with a caption" />
  <figcaption>This is how you embed images with a caption (placeholder image).</figcaption>
</figure>

A plain image without a caption also works with standard Markdown syntax:

![Alt text for screen readers](/blog/images/agentic-ui-beispiel.jpg)

## More than a chatbot

A chatbot answers questions. An agent **acts**: it calls functions, pre-fills forms, suggests next steps and executes them once confirmed. For the interface that means it no longer just accepts input — it has to represent an agent's suggestions, intermediate states and clarifying questions.

That changes the architecture in three places:

1. **State** — agent interactions are long-lived and asynchronous. A signal-based store that cleanly models streaming responses and tool calls becomes a core component.
2. **Components** — generative UI means parts of the interface are assembled at runtime from agent output. This needs a robust, type-safe registry of building blocks.
3. **Trust** — every action an agent triggers must be traceable and reversible. That is as much a UX topic as an architectural one.

## Where I would start

- A clearly bounded agent layer, decoupled from the rest of the app.
- Design-system components that can be filled by both humans and agents.
- Rigorous observability: every tool call is logged, every state is reproducible.

Agentic UI is not a feature you flange on afterwards. It is an architectural stance — and that is exactly where my work begins.
