---
title: Tacit knowledge
altitude: foundation
modality: [process, visual, interaction, copy]
covers: [practitioner rules, craft conventions, verification habits]
canonical-source: learnings/ via /skill-refine
related: [principles, brand, visual, accessibility]
status: living
last-reviewed: 2026-09-28
---

# Tacit knowledge

What experienced practitioners know that the rest of the pack doesn't say. It's pre-seeded with
lessons that transferred across every prototype environment so far. Add your team's lessons as
`/skill-refine` surfaces them.

> **Primary synthesis target for `/skill-refine`.** When a learning doesn't clearly belong
> elsewhere, it lands here.

## Core practitioner rules

### 1. Frame to the level the work needs
A 70%-locked frame with explicit open questions beats a forced 100% frame full of invented
answers. "Thin" is a legitimate answer; confabulating is not. Separate the artifact's audience
(who sees the prototype) from the feature's audience (who the feature is for).

### 2. Reuse before invent, evolve before fork
Check every tier (project, then design system, then reference libraries) before hand-rolling. The
common failure is skipping tiers. Extend an existing component's props and states instead of
creating `*V2`. Encode constraints in primitives (spacing props that only accept scale steps) so
off-system values are unrepresentable rather than caught in review.

### 3. Real content exposes what placeholders hide
No lorem ipsum. Use real-feeling names, real lengths, and deliberately imperfect imagery. Neutral
tiles beat initials-on-gradient placeholders. Design the empty state first: it's often the most
common state, and it has to teach.

### 4. Verify by looking, not by compiling
A running dev server plus a screenshot is verification; a clean typecheck is not. No visual
claims without a screenshot. Every fix gets a regression check.

## Things that go without saying (but shouldn't)

### Restraint makes the bold moments work
Hero treatments must be earned. Most surfaces should be quiet so the content carries the weight.

### Cross-surface consistency is muscle-memory infrastructure
Keep the same behavior, position, order, and naming everywhere a pattern appears.

### Honest fallbacks beat clever guesses
In cold-start or mock paths, show an authored or generic value, never a plausible-but-wrong one.
Hand-trace one real item through any fallback before trusting it. Label what's mocked.

### Keep the baseline honest
Don't soften the as-is option or flatter with best-case content. Prototypes that flatter every
option decide nothing.

### Features have an operational cost
Ask who curates, moderates, or writes it every week.

### Animated state must track real state
For example, a "playing" indicator freezes when playback is paused or muted.

## Conventions experienced builders internalize

- **Every behavioral difference is a URL flag;** a link is a complete repro.
- **One renderer, not N.** Sibling variant components remount state on switch.
- **All user-facing copy in one file.**
- **Polish mode ≠ build mode.** When refining an existing custom prototype, don't re-home it;
  validate its tokens and fix the highest-signal tells.
- **Have an offline posture.** Know which `systems/` file stands in for which live source when an
  MCP is unavailable. Vendor design-system assets locally for demos.
- **Fake video credibly:** a still with slow drift, ticking progress, and cycling captions, with
  the parent owning the playback state.
- **Headless screenshots:** opacity-from-0 entrances can be caught invisible. Use transform
  entrances with opaque resting states.
- **Timers:** derive progress from elapsed `performance.now()`, never interval counts.
- **Portals** mounted outside the theme root lose every token.
- **Multi-agent builds:** give each agent a written contract, pre-assign IDs and positions, and
  run a mount audit before review.
- **Reviews:** assert only what comes from code or docs; hedge screenshot inferences; ask about
  feasibility; check reception before parking a direction.

## What's in your head that should be in here

- The three things reviewers at Fanatics Markets always flag
- Patterns that look right but read wrong in your product
- Content your product can't be evaluated without
- Past launches that taught a rule
