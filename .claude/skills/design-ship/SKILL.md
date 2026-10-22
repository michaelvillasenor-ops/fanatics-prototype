---
name: design-ship
description: Pre-launch quality gate covering accessibility, copy, localization, and usability. Use when the user says "ready to ship", "pre-ship review", "launch checklist", "a11y review", "localization review", "usability check", "final pass", or before a prototype goes in front of its real audience. Multi-select review (any subset or the full sweep) that returns a strict go/no-go with blockers. Fourth skill in the design-process loop (frame → build ⇄ feedback → ship → refine). Be strict; the build/feedback loop should already have handled the soft stuff.
---

# Ship: raise the quality bar before launch

This is the **launch gate**. By now the build should have been through several `/design-build` ⇄
`/design-feedback` cycles.

**Be strict. A soft no-go is more useful than a soft yes.**

## Context root

Paths are relative to the **prototype-system-kit** root: the CWD if it has `bundles/` and
`systems/`, else `$PROTO_KIT_HOME`, else `~/prototype-system-kit/`, else this SKILL.md's real path
up three levels.

## Welcome message and scope question

> **Ship:** pre-launch quality gate. Which reviews?
>
> - [ ] **Accessibility**: contrast, keyboard, screen reader, reduced motion, touch targets
> - [ ] **Copy**: voice and tone, banned terms, errors, empty states
> - [ ] **Localization**: expansion, RTL, concatenation, hardcoded strings, formats
> - [ ] **Usability**: heuristics plus bar-raisers (`usability-checklist.md` in this skill)
> - [ ] **Responsible Gaming**: FBG RG guidelines on copy, incentives, sharing and money flows
>   (**always included** for anything customer-facing, even when not ticked)
> - [ ] **FMX figures**: prices, fees, totals, payouts and odds formats reconcile
> - [ ] **Full sweep** (the default)

Then ask for the artifact: link, code, or the surfaces being shipped.

## MCP-first calls

Take the union of the selected bundles' `mcp-first:` lists.

## Bundles

| Review | Load |
| --- | --- |
| Accessibility | `bundles/a11y-review.md` |
| Copy | `bundles/copy-review.md` |
| Localization | `bundles/localization-sweep.md` |
| Usability | `usability-checklist.md` (in this skill folder) |
| Responsible Gaming | Run the `responsible-gaming-check` skill on every customer-facing surface and on `src/demo/copy.ts`. If the skill isn't installed, say so and mark the review ❌ not run, which is a blocker. |
| FMX figures | `specialty/fmx-domain.md`, plus the `fmx-figma:fmx-figure-audit` skill if installed. Check every figure against `src/data/fmx.ts` and the canonical scenario. |

## Run the reviews

Walk each checklist against the artifact. **Be specific:** name the file and line, or the screen
region. For a running prototype:
- Check it in the browser, not just the code. Screenshot the key states, tab through with the
  keyboard, and emulate `prefers-reduced-motion`.
- Run `npm run verify` and quote the summary line.
- For localization, stress-test by temporarily swapping `copy.ts` strings to +30% length and to an
  RTL sample. Revert afterwards.
- Mark each item ✅ pass, ⚠️ caveat, or ❌ fail. Fails become blockers; caveats become
  recommendations.

## Output: go / no-go

```markdown
# Ship Review — <surface>

**Verdict:** GO ✅  |  NO-GO ❌

## Blockers (must fix before ship)
## Strong recommendations (fix if you can)
## Notes (acknowledged; defer if needed)
## Per-review summary
- Accessibility: <pass/fail + one line>
- Copy: …
- Localization: …
- Usability: …
```

**Verdict rules**
- Any blocker means NO-GO. No "we'll fix it post-launch" exceptions.
- Strong recommendations alone still allow GO.
- A blocker is anything that causes harm at launch: a contrast failure, missing alt text on
  critical content, a banned term, a layout that breaks at +30% text, a keyboard trap, missing
  reduced-motion handling, a broken deep link on the deployed URL, a "mocked" claim presented as
  real.
- **FMX blockers:** American or decimal odds anywhere; a figure that doesn't reconcile
  (contracts × price + fee ≠ total, or payout ≠ contracts × $1 on a buy); a fee typed as a
  literal instead of computed; winnings shown without the stake; price tolerance on a limit
  order; any Responsible Gaming failure, or the RG review not run.

## Reflection capture

Write `learnings/<YYYY-MM-DD>-design-ship-<slug>.md` in the kit root:

```markdown
---
skill: design-ship
date: <YYYY-MM-DD>
reviews: <which ran>
verdict: <GO | NO-GO>
surface: "<one line>"
---

## What worked
## What was missing
<including issues that should have been caught earlier in the loop>
## What felt forced
## Proposed addition
```

## Hand-off

- GO: *"Ship it. Run `/deploy` if it isn't live yet. When `learnings/` has grown, run
  `/skill-refine`."*
- NO-GO: *"Run `/design-build` on the blockers, then re-run `/design-ship`."*
