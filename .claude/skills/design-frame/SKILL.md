---
name: design-frame
description: Establish the why and the strategic shape of a new product, feature, or initiative before any building starts. Use when the user wants to frame a product, draft or pressure-test a brief, or asks "should this exist?", "is this on-brand?", "why now?", "what's the approach?". Ingests an external artifact (PRD, doc link, chat thread, pasted text), runs structured context-gathering and problem-framing questions, then produces a brief + build plan written to PLAN.md. Always invoked first in the design-process loop (frame → build ⇄ feedback → ship → refine).
---

# Frame: establish the why and the strategic shape

This skill is the **first stop** in the design-process loop. Its job is to lock in sharp context,
a clear problem frame, and a product and design strategy before any UI is drawn.

**Do not skip ahead to design.** If the user starts asking for screens, layouts, or copy, pull
them back gently: *"Let's lock the framing first. It makes everything downstream cheaper, and
we'll build right after."*

## Context root

All bundle and context paths in this skill (`bundles/*`, `systems/*`, `foundations/*`) are
relative to the **prototype-system-kit** root. Resolve it before loading anything:

1. If the CWD contains `bundles/` and `systems/`, it IS the kit.
2. Else if `$PROTO_KIT_HOME` is set, use it.
3. Else check `~/prototype-system-kit/`.
4. Else resolve this SKILL.md's real path (follow the symlink from `~/.claude/skills/` or
   `~/.cursor/skills/`) and go up three directory levels.

Prefix every path below with the resolved root. If a loaded file is still an unfilled template
(`{{PLACEHOLDER}}` tokens), tell the user once and proceed on generic judgment. Don't invent brand
rules.

## When to use

- A new initiative, feature, or surface that doesn't yet have a written why.
- An existing brief the user wants to pressure-test.
- A handoff from a PM or stakeholder where the framing needs to hold.
- "Should we build this?", "is this us?", "why now?", "what's the approach?"

## Welcome message

> **Frame:** let's lock the why and the strategic shape before we build.
>
> I'll ask for (1) any existing brief or doc, (2) four context and problem-framing questions,
> then (3) strategy and approach. The output is a brief and build plan in `PLAN.md` that
> `/design-build` picks up automatically.
>
> No brief yet? That's fine. We'll draft one from your answers.

## Inputs (ask one at a time)

**Draft and confirm beats open-ended asking.** If the invocation or conversation already contains
an answer, play back a synthesized version ("here's what I have for *who*; does this hold?")
rather than re-asking.

### 1. Source-of-truth artifact

Ask: *"Where does the why for this live today? Paste a link or the text. If nothing exists yet,
say 'none' and we'll draft a v0 from your answers."*

- **Doc URL** (Google Docs, Notion, Confluence, Coda, etc.): fetch it with whatever doc MCP or
  connector is configured. If none is available, ask the user to paste the relevant parts.
- **Chat thread** (Slack, Teams): use the configured chat MCP, or ask for a paste.
- **Pasted text or local file:** use it directly.
- **"None":** skip ingestion. The four whys become the substrate for a v0 brief.

Summarize only the *why-relevant* parts (problem, audience, success criteria, prior art), skipping
implementation and timeline detail. Confirm: *"Here's what I think the existing why is. Does this
match your read?"*

### 2. The four why-questions

Ask each in turn. A one-line answer is fine if it's specific; a vague answer gets one nudge for
evidence.

1. **Who is this for?** *"What do we know about the user and their context? 'First-time admins at
   20-person companies on mobile' is useful; 'our users' is not."*
2. **What's the unmet need?** *"What problem are we solving, and what's the evidence it matters:
   research, support tickets, a leadership ask, a competitive move?"*
3. **Why us?** *"Why is this ours to do? What angle, capability, or right to win do we have?"* If
   the answer is generic ("we have the users"), pressure-test it against
   `foundations/principles.md`. Distribution alone isn't a right to win.
4. **Why now?** *"What has changed in the world, the platform, or user behavior? What happens if
   we wait six months?"*

Capture answers verbatim. Paraphrasing is for the memo.

### 3. Strategy and approach

1. **Design approach:** *"Are we extending an existing surface, creating a new one, or changing
   behavior in an existing flow? What's the simplest version that tests the hypothesis?"*
2. **Key tradeoffs:** *"What are you choosing between? What are you explicitly not doing, and
   why?"* Push for "not X because Y".
3. **Builds on:** *"Which existing patterns, surfaces, or components does this extend or sit
   next to? What should it feel familiar to?"* The bias is toward evolving shared patterns, not
   inventing parallel ones.

Also ask, briefly:
- **Artifact audience vs feature audience.** Who will *see the prototype* (execs, a review, user
  testing)? That sets fidelity and narrative. Who is the *feature* for? That sets the design target.
- **Fidelity bar and success criteria.** How will we know the prototype did its job?

**Scope zoom:** for big multi-workstream bets, frame the whole briefly, then narrow to "your
scope" before going deep.

## AI principles gate

If the initiative touches AI or agentic features, load `foundations/ai-principles.md` and run the
framing through each principle as a pressure test. Add an **AI principles check** section to the
memo, and flag failures as strategic risks under Open questions.

## Context to load

- `bundles/strategic-brief.md`: lead with its Quick rules.
- `foundations/principles.md`: name the principle(s) the framing leans on or violates.
- `foundations/brand.md`: for "is this us?" judgment.
- `foundations/tacit-knowledge.md`
- `foundations/ai-principles.md`, when relevant.

No design-system MCPs are needed at this stage.

## Output: the framing memo

```markdown
# Framing — <name>

**Source**: <link, or "drafted in this session">
**Date**: <YYYY-MM-DD>
**Artifact audience**: <who sees the prototype, and the fidelity bar>

## Who
## Need
<with the evidence cited>
## Why us
<name the principle(s) it leans on or violates>
## AI principles check   (only if relevant)
## Why now
## Strategy & approach
**Design approach:** …
**Key tradeoffs:** …
**Builds on:** …
## Success criteria
## Open questions
<where answers were thin or evidence is missing; /design-feedback can pressure-test these>
```

Ask: *"Would you defend this to a skeptical exec? If not, what's missing?"* Iterate until the
user confirms. **Frame to the level the work needs.** A 70%-locked frame with explicit open
questions beats invented certainty. Let the user say "thin".

## Output: PLAN.md, the build handoff

Once the memo is confirmed, write `PLAN.md` to the working directory (or `prototype-app/` if
present):

```markdown
# PLAN — <name>

## Brief
<the confirmed memo, verbatim>

## Build plan
### What to build
<1-3 bullets: surface, states, what the prototype must demonstrate>
### Key design decisions
### Out of scope
### Open questions for /design-feedback
```

Draft the Build plan from the conversation, then confirm it: *"Here's what I'd build. Does this
match, or should we adjust scope?"* If the user says "skip", write only the Brief and set Build
plan to `TBD — to be filled during /design-build`.

Offer as a next step: *"Want a numbered `BUILD-PROMPTS.md` plan too? It's worth it for anything
bigger than one screen."* If yes, follow the template in the project's `BUILD-PROMPTS.md` (from the
kickstarter) and `PLAYBOOK.md` §3.

## Reflection capture

Write `learnings/<YYYY-MM-DD>-design-frame-<slug>.md` in the kit root:

```markdown
---
skill: design-frame
date: <YYYY-MM-DD>
surface: "<one line>"
---

## What worked
## What was missing
## What felt forced
## Proposed addition
<optional: a ready-to-paste rule and its target file>
```

> `learnings/*` is checked into the kit repo. Keep anything sensitive or confidential out. The
> user may ask you to skip the reflection.

## What this skill must not do

- **Skip to design.** No screens, UI, or copy in the memo.
- **Paper over thin answers.** Surface them as open questions; don't invent rationale.
- **Accept "we have the users" as a right to win.**

## Hand-off

End with: *"Framing locked. `PLAN.md` written to `<path>`. Run `/design-build` when you're ready;
it'll pick up the brief and build plan automatically."*
