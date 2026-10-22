---
name: design-feedback
description: Get signal on a build, brief, or copy artifact that shapes the next iteration. Lens-aware. The user picks strategic (does this fit the product and brand? is the framing right?) or craft (specific actionable moves on hierarchy, typography, copy, motion, interactions). Designed to alternate cheaply with /design-build. Use when the user asks for a review, critique, design review, eval against the brief, "is this on-brand", "is this the right thing to build", or "look at this with me". Third skill in the design-process loop (frame → build ⇄ feedback → ship → refine).
---

# Feedback: get signal that shapes the next build

Same artifact, very different output depending on whether the user is still settling direction or
already iterating on craft. This skill is **not** the launch gate; `/design-ship` is. It's for the
iterative loop with `/design-build`.

## Context root

Paths are relative to the **prototype-system-kit** root: the CWD if it has `bundles/` and
`systems/`, else `$PROTO_KIT_HOME`, else `~/prototype-system-kit/`, else this SKILL.md's real path
up three levels.

## When to use

- Mid-build: the user has something tangible (mock, prototype, code, memo, `BUILD-PROMPTS.md`)
  and wants signal.
- "Review this", "critique", "design review", "is this on-brand", "is this the right thing to
  build", "eval this against the brief".

## Welcome message and lens question

Ask the lens **before loading any bundle**:

> **Feedback:** what kind of feedback are you looking for?
>
> | Lens | When to pick it |
> | --- | --- |
> | **Strategic / directional** | Direction still feels open. "Does this belong? Is it competing with X? Is the framing right?" |
> | **Craft / actionable** | Direction is locked. "Is the hierarchy reading? Is the copy right? Does it feel native?" |
> | **Both: sweep** | Strategic first, then craft, with a clear separator. |
> | **Specific dimension** | Copy only, a11y only, motion only, etc. |
> | **Eval vs brief** | Grade the artifact against `PLAN.md`, empirically. |
>
> Not sure? Early and open → strategic. Locked and wanting concrete moves → craft.

Then ask for the artifact if it isn't in context: *"Paste the link, code, or screenshot, or
describe what I should look at."*

## Scope sensing: breadth vs depth

- **Narrow prompt** ("look at the filter chips"): focus all three tiers on that area. Put anything
  important outside the scope in a short **Also noticed** appendix (1 or 2 bullets).
- **Broad prompt** ("review this"): run the full sweep.
- **Ambiguous:** default to broad, but if "needs to change" passes 5 items, ask whether to go deep
  on the top 2 or 3 instead.

## Dispatch (driven by lens, not artifact type)

| Lens | Bundle(s) |
| --- | --- |
| Strategic | `bundles/strategic-brief.md` (even for UI mocks) |
| Craft: UI, visual, interaction | `bundles/ui-prototype.md` |
| Craft: brand-expressive | `bundles/hero-moment.md` |
| Craft: copy | `bundles/copy-review.md` |
| Sweep | Strategic first, then the matching craft bundle |
| Specific: a11y / copy / localization / hero | `bundles/a11y-review.md` / `bundles/copy-review.md` / `bundles/localization-sweep.md` / `bundles/hero-moment.md` |
| Eval vs brief | `bundles/strategic-brief.md` + the craft bundle; see "Eval mode" below |

Honor each bundle's `mcp-first:` list.

**FMX add-ons** (run them if the skills are installed; if not, say so and fall back to
`specialty/fmx-domain.md`):
- Any figure on screen (price, fee, cost, payout, balance, fill count): check it with
  `fmx-figma:fmx-figure-audit`'s rules, then against `src/data/fmx.ts`.
- Craft lens on a prototype that mirrors an FMX component: use the
  `fmx-figma:fmx-component-review` principles for the structure and prop API (read-only).
- Copy lens: run `responsible-gaming-check` on the strings in `src/demo/copy.ts`.

## AI principles probe

For AI-powered features, also load `foundations/ai-principles.md`. Weave the findings into the
three tiers; don't present them as a separate checklist.

## System-aware probes (run silently; weave into the tiers)

Yield is uneven, so don't force equal weight across probes.

1. **Feature stacking.** Does this add to an already-loaded surface? What does it displace, and
   how is it orchestrated with what's already there? A feature that works alone can fail when
   composed with everything else.
2. **Disruption risk.** Does it touch something users already love? Name the beloved behavior and
   the specific risk of changing it.
3. **Content quality bar.** Does it surface generated or curated text? Nuggets vs an information
   dump. Watch for "text blindness" when text competes with another modality (video, audio, a
   time-pressured task).
4. **Distribution story.** How does the user find this? Is the entry point predictable and
   habit-forming? Does it launch with enough user agency, or is it view-only with a cold-start
   problem?
5. **Identity coherence.** In a family of features: *cousins, not twins.* Shared infrastructure,
   distinct personality.
6. **Growth arc.** One state, or does it evolve with the user? Can the platform absorb the
   complexity progressively?
7. **Cross-surface consistency.** Where the same pattern appears on several surfaces, check
   **behavior and position**, **ordering**, and **naming**. Muscle memory depends on it.
   Cross-reference `systems/surfaces.md` and `systems/interaction-patterns.md`.
8. **Scope calibration.** Stepping stone or overhaul, and is that explicit? Watch for implicit
   scope: decisions that only make sense assuming a future phase.
9. **Lifecycle explicitness.** Ephemeral, persistent, or in between? That cascades into
   distribution, naming, and user expectation.

Also, for flows: **enumerate the missing screens** (empty, error, loading, edge cases), not just
the drawn ones.

## Review questioning behaviors (how to deliver it)

- **Probe via reframing.** "This is really a [familiar concept] with [one twist]. Does the design
  change if you think of it that way?"
- **Name the operational cost.** "Who curates this every week?"
- **Surface technical constraints early**, as questions.
- **Articulate tradeoffs.** Name what a choice eliminates.
- **Bring real user behavior**, concrete and observable, not personas.
- **Find the synthesis.** Can a forced binary be merged instead?
- **Force scope clarity.** Is this section functional or promotional? They need different
  treatments.
- **Spec gap vs build defect.** If the build came from a written spec, say which it is.
- **Triage by fixability.** Some findings are decisions for `PLAN.md`, not code tasks.

## Confidence calibration

- From code, docs, or conversation → assert.
- Inferred from screenshots → hedge: "From the screenshot I see X; I'm inferring Y. Correct me."
- Feasibility → ask as a question, never claim.
- Ambiguous UI elements → describe first, then interpret.
- **Before parking a direction, check whether it had positive reception.** Ask before shelving
  something the designer is excited about.

## Visual grounding (craft lens)

When the artifact is a running web prototype, the lens is craft or sweep, and a dev URL is
available: **look at the rendered output.** Use the Playwright MCP, the preview browser, or
`scripts/capture.mjs` at the project's viewport (default `393×852 mobile`, with `onboard=0`).

Look for: visual hierarchy (where does the eye land?), density and breathing room, content vs
chrome balance, color harmony with real content, and consistency with the live product per the
`systems/` files.

Report each visual finding as **what you see → why it's off → the concrete fix.**

**Do not report visual findings if you did not take a screenshot.**

## Precedent-aware feedback

Identify the surface type and load the matching `systems/` file. Compare **structure, not
pixels**: section order, action placement, flow choreography, component choice. If the designer
says a divergence is intentional, evaluate it on its merits, but name what it departs from.

## Eval mode (grade against the brief)

For "eval this against the brief" or pre-show evals:
1. Extract every requirement from `PLAN.md` (and `BUILD-PROMPTS.md` checkpoints).
2. Grade each one **empirically**: run the app, probe with Playwright, read the code. Don't trust
   the repo's own docs.
3. For big artifacts, fan out parallel graders per brief dimension, then adversarial verifiers
   that try to refute each grade. Keep only what survives. Fact-check every citation.
4. Write `EVAL.md` from `templates/docs/EVAL.md` (scorecard: ✅ met, ⚠️ partial, 🔀 deliberate
   divergence, ❌ gap, ➖ N/A). Rank next steps by decision leverage per unit of effort.

## Voice in feedback

- Vary your vocabulary. Avoid AI-tell words that become wallpaper ("load-bearing", "crucial",
  "delve").
- Use the designer's own terms. Define any new framing inline in one clause.
- Tone: a senior design lead in crit. Direct, specific, no filler.

## Output structure: always three tiers

- **What's working**: so the user knows what to keep.
- **What needs to change**: every item ends with a concrete move, a question to resolve, or an
  experiment to run. Lead with structural items (the ones that might change the approach), then
  implementation detail. Don't restate what's already in `PLAN.md` or the conversation.
- **What's polish**: defer it to `/design-ship` (craft) or a future `/design-frame` (strategic).
  Check reception before parking anything.

**Strategic** output reaches up: framing, fit, and competition with existing surfaces, referencing
`foundations/`. It never nitpicks spacing, type, or copy.

**Craft** output names the rule or reference, the violation, and the fix, specifically enough that
the next `/design-build` can act without reinterpreting. Example: *"The column gap is 14px; snap it
to 16 (`--space-4`)."*

## Don't cross the streams

Strategic means no craft notes; craft means no first-principles lectures. Save cross-lens issues
for the lens-switch offer.

## Mid-session lens switching

Always offer: *"Want the other lens on the same artifact? Or a specific dimension (copy, a11y,
localization, motion)? No need to repaste."*

## Reflection capture

Write `learnings/<YYYY-MM-DD>-design-feedback-<slug>.md` in the kit root:

```markdown
---
skill: design-feedback
date: <YYYY-MM-DD>
lens: <strategic | craft | sweep | eval | specific:copy|a11y|…>
surface: "<one line>"
---

## What worked
## What was missing
## What felt forced
## Proposed addition
```

If this continues earlier feedback, link the prior reflection rather than restating it. Keep
anything sensitive out.

## Hand-off

End with: *"Run `/design-build` to act on the feedback above."*
