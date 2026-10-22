---
name: design-build
description: Make a framed intention tangible. Vibe-code, prototype, or wireframe a UI surface that feels native to the brand and design system in this kit. Use when the user wants to build a screen, prototype a flow, vibe-code, make something feel on-brand, run the next prompt in BUILD-PROMPTS.md, or iterate based on /design-feedback. Dispatches to the ui-prototype (everyday product) or hero-moment (brand-expressive) bundle. Second skill in the design-process loop (frame → build ⇄ feedback → ship → refine).
---

# Build: make the intention tangible

This skill turns a framing, a build-plan prompt, or an iteration request into a prototype that
looks and works like the real product. It alternates cheaply with `/design-feedback` until the
build converges.

## Context root

Paths (`bundles/*`, `systems/*`, `foundations/*`, `specialty/*`, `external-resources.md`,
`kickstarter/*`) are relative to the **prototype-system-kit** root:

1. If the CWD contains `bundles/` and `systems/`, it IS the kit.
2. Else `$PROTO_KIT_HOME` if set.
3. Else `~/prototype-system-kit/`.
4. Else resolve this SKILL.md's real path and go up three levels.

## When to use

- A `PLAN.md` exists and the user wants to start building.
- The user wants to vibe-code or prototype a surface.
- The user is running the next prompt of a `BUILD-PROMPTS.md`.
- The user is iterating on feedback notes.

## Quick rules to lead with

Anchor on these before writing any code. Then load the bundle's quick rules, which are
brand-specific and override these where they conflict.

1. **Reuse before you create.** Look up existing components and surfaces first. A prototype built
   from the real system looks like the product; one built from scratch doesn't.
2. **Highest level of abstraction.** Design-system components before custom markup. Named text
   styles before raw sizes. Semantic tokens before hex.
3. **Spacing from the scale only.** No magic numbers.
4. **Real content, never lorem ipsum.** Use the project's seed data or a real data adapter.
5. **One primary CTA per surface.**
6. **Evolve, don't fork.** Extend the existing component's props and states instead of creating
   `*V2.tsx`.
7. **Every behavioral difference is a URL flag** (`src/app/config.ts`). **One renderer, not N.**
8. **All user-facing copy in `src/demo/copy.ts`.**
9. **Motion serves clarity or delight.** Transform and opacity only. Honor `prefers-reduced-motion`
   from the start.
10. **Verify, don't narrate.** Run it and look at it.

## Collaboration mode (ask once per project)

If the project's `CLAUDE.md` doesn't already say, ask: *"Step by step (I do one prompt, you
review, then commit) or autonomous (I run through the plan and check in at checkpoints)?"* Record
the answer under "How to work with me" in the project `CLAUDE.md`. Either way, **show the plan
before any large multi-file change.**

## Set up the prototype (before anything else)

1. **Does the CWD have a `package.json` with a `src/`, or a `prototype-app/` subfolder?** If so,
   work there. Read its `CLAUDE.md`, `PLAN.md`, `HANDOFF.md`, and `BUILD-PROMPTS.md` if present.
2. **Otherwise**, run the `/setup-project` flow (read `.claude/skills/setup-project/SKILL.md` in
   the kit), which copies `kickstarter/prototype-app/`. Never modify the kit's kickstarter itself.
3. **Non-default stack** (native, Next.js, an existing repo): ask for the path or boilerplate and
   work there, applying the same rules.

## Gather visual references

> *"Do you have a Figma frame, screenshot, or mockup? Paste a Figma URL, drop a screenshot, or
> describe the surface. The more visual context, the more faithful the prototype."*

- Treat it as the **design target**, not a pixel spec: match intent with real components and tokens.
- For a Figma URL with the Figma MCP available, read the design context (structure, spacing,
  color usage) and grab a screenshot.
- **Measure, don't eyeball.** If fidelity matters, extract real values and vectors from the
  source rather than guessing twice.
- Keep reference files in the project's gitignored `/reference` folder. Never import from it.

## Check component sources before hand-rolling

**You MUST check every tier, in order, for every component you need.** Skipping tiers is the most
common failure, and it forces the user to backtrack.

- **Tier 1: the project itself.** `src/components/`, `src/host/` or `src/surfaces/`. Evolve what's
  there.
- **Tier 2: the design system.** Call `Figma MCP (FUEL + FMX libraries)` (or read `systems/components.md`)
  for a direct match or a composition. Search the FMX Component Library
  (`poY7Dn4TasEEZ4Rp5U0jWa`) with `search_design_system`, then `get_design_context` on the
  match; check every page, since a `.Domain /` prefix names the owner, not the page. Load
  `fmx-figma:fmx-figma-conventions` first if it's installed. Read only: never write to
  FMX or FUEL files.
- **Money and prices:** every figure goes through `src/data/fmx.ts` (`quoteBuy`, `quoteSell`,
  `formatPrice`, `formatUsd`) and the seed's canonical scenario. Never type a fee or total
  into copy or a component.
- **Tier 3: reference libraries** listed in `external-resources.md` (team component catalogs,
  reference scaffolds). Read them for canonical prop interfaces even if you reimplement the
  styling.
- **Tier 4: hand-roll**, as a last resort, from tokens only.

**Checkpoint** (say it before writing any new component): *"Checked project: [found / not].
Checked design system: [found / not]. Checked reference libraries: [found / not]. Proceeding to
[reuse / compose / hand-roll]."*

## Carry forward the framing

1. Look for `PLAN.md` in the CWD, `prototype-app/`, or the parent folder. Confirm: *"I found
   PLAN.md. Does it still reflect the intent?"*
2. Otherwise, look for a framing memo in this conversation.
3. Otherwise, ask: *"Do you have a framing from `/design-frame`, or skip for now? Skipping is fine
   for fast prototyping, but the build will be less grounded."*

Use the Build plan to scope the work. If it says TBD, ask what to build. **Name drift out loud:**
if the build starts to diverge from the whys, say so.

If a `BUILD-PROMPTS.md` exists, work **one prompt at a time**, honor each prompt's show-me gates
("Stop there"), and end each phase at its checkpoint.

## Dispatch

| Surface type | Bundle |
| --- | --- |
| Everyday product: settings, lists, search, browse, forms, dashboards, controls | `bundles/ui-prototype.md` |
| Brand-expressive: a year-in-review card, launch moment, celebratory or marketing interstitial | `bundles/hero-moment.md` |

If ambiguous, ask. If still unclear, default to everyday; **hero moments must be earned.**

## MCP-first calls

Before reading the bundle, call the live sources in its `mcp-first:` list (the current truth lives
there, not in markdown). Request only the categories you need. If an MCP is unavailable, say so
once and fall back to the matching `systems/*.md` file.

## Load the bundle's includes

Read the bundle, lead with its **Quick rules**, then load its `includes:` paths.

## Do the work

- **Viewport:** `393×852 mobile` inside the kickstarter's `DeviceFrame`, unless told otherwise.
- **Tokens only.** Use `src/tokens/tokens.css` variables. If a value you need doesn't exist, add a
  semantic token rather than inlining it.
- **Data layer pattern:** a hook fetches (or reads the seed) → an adapter shapes it → the component
  renders it. Seeds are realistic and deterministic. If you mock something, label it in the
  README's "What's real / what's mocked".
- **Design the empty state first** for any list, feed, or search. It's often the most common state.
- **No invented icons.** Use the design system's icon set. If nothing fits, ask before drawing.
- **Ground new surfaces** in `systems/surfaces.md` and `systems/interaction-patterns.md`. Use the
  established flows; don't invent parallel ones.
- **Polishing an existing custom prototype is a different mode.** Don't re-home it; validate its
  tokens and fix the highest-signal tells.
- **Verify by running it.** The dev server must be on the project's pinned port (check with
  `curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>/` before starting another). Take a
  screenshot, click through the changed states, and run `npm run verify` if suites exist. Report
  what you observed, quoting PASS/FAIL lines. A clean `tsc` isn't verification, and pre-existing
  type errors aren't yours to fix.
- **Add a regression check** to `scripts/verify-*.mjs` for anything you fixed.
- **Commit at green checkpoints** only if the collaboration mode says to.

For hero moments: honor `prefers-reduced-motion` and the three-flashes rule from the start, and
use real imagery.

## Reflection capture

Write `learnings/<YYYY-MM-DD>-design-build-<slug>.md` in the kit root:

```markdown
---
skill: design-build
date: <YYYY-MM-DD>
surface: "<one line>"
---

## What worked
## What was missing
## What felt forced
## Proposed addition
## Verified in browser   (optional: states you checked live)
```

> Keep anything sensitive out; `learnings/` is checked in.

## Hand-off

End with: *"Want signal on this? Run `/design-feedback`."*
