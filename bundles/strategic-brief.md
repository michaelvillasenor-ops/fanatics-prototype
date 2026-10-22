---
bundle: strategic-brief
intent: Frame or pressure-test why something should exist and its strategic shape; strategic-lens feedback.
includes:
  - foundations/principles.md
  - foundations/ai-principles.md
  - foundations/brand.md
  - foundations/tacit-knowledge.md
  - systems/components.md
mcp-first:
  - none-required
status: stable
last-reviewed: 2026-09-28
---

# Bundle — Strategic brief

## What this is
Context for framing decisions: PRDs, strategy docs, "should this exist?", and strategic-lens
reviews. *The question is whether we should build it and in what shape, not how it looks.*

## How to use it
- Claude Code or Cursor: `/design-frame` or `/design-feedback` (strategic) load this automatically.
- One-shot tools: paste this file and its `includes` files.

## Quick rules to lead with
- **Four whys before anything:** who, need (with evidence), why us, why now.
- **Distribution is not a right to win.** "We have the users" needs an angle.
- **Frame to the level the work needs.** Mark open questions instead of inventing answers.
- **Simplest version that tests the hypothesis.**
- **Name the tradeoffs:** "not X because Y".
- **Evolve shared patterns before inventing parallel ones.**
- **Name the operational cost:** who runs this every week?
- **State lifecycle and distribution explicitly:** ephemeral or persistent, and how people find it.
- **Separate the artifact audience from the feature audience.**
- **It's a CFTC-regulated prediction market.** Framing, formats and incentives must survive
  that lens (odds formats were already removed once at the CFTC's request). Flag regulatory
  and Responsible Gaming questions as open questions; don't answer them.

## When to use principles as a tiebreaker
When two directions both satisfy the brief, pick the one that leans on more of
`foundations/principles.md` and violates none.

## What's out of scope
Visual and copy detail → `ui-prototype`, `copy-review`.
