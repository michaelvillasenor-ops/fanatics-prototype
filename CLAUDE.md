# CLAUDE.md — AI consumption guide

This file is the entry point for AI tools working with this repo (Claude Code, Cursor, and any
other agent). Humans should read [`README.md`](README.md) and [`PLAYBOOK.md`](PLAYBOOK.md).

## What this repo is

A working set of distilled markdown files that codify what makes something feel, look, sound, and
read like **Fanatics Markets**, plus the skills that apply them. Drop the right slice into your context
window for the work in front of you.

> Until `CUSTOMIZE.md` has been worked through, many files are templates with `{{PLACEHOLDER}}`
> tokens. If a file you need is still a template, say so to the user. Don't invent brand rules
> to fill the gap.

## How to pick context

**Don't load everything.** The repo is organized for pick-and-choose. There are three ways in,
in priority order.

### 1. By skill: the process loop (preferred in Claude Code or Cursor)

```
frame  →  build  ⇄  feedback  →  ship  →  refine
```

| Skill | Stage | Triggers when the user is |
| --- | --- | --- |
| `/design-frame` | **Frame** | Establishing why a thing should exist; ingesting a PRD or brief; pressure-testing framing |
| `/design-build` | **Build** | Vibe-coding, prototyping, iterating on a screen or hero moment |
| `/design-feedback` | **Feedback** | Asking for review or critique. Lens-aware (strategic vs craft). Alternates with `/design-build` |
| `/design-ship` | **Ship** | Pre-launch quality gate (a11y, copy, localization, usability). Returns go/no-go |
| `/skill-refine` | **Refine** | Meta-skill. Synthesizes `learnings/` into PRs against this pack |

Utility skills: `/setup-project` (scaffold from the kickstarter), `/deploy` (static hosting),
`/integrate-claude` (add an LLM feature behind a server-side proxy).

**When invoking a skill, read its `SKILL.md` first.** It handles dispatch, MCP calls, and bundle
loads for you.

### 2. By task: bundles (outside a skill, or in one-shot tools)

Each bundle declares its `intent`, the files to `include`, the MCPs to call first, and a
hand-curated **Quick rules to lead with** block. Load that block first.

| Bundle | Used by skill | Direct use |
| --- | --- | --- |
| [`bundles/strategic-brief.md`](bundles/strategic-brief.md) | `/design-frame`, `/design-feedback` (strategic) | PRDs, strategy docs, framing decisions |
| [`bundles/ui-prototype.md`](bundles/ui-prototype.md) | `/design-build`, `/design-feedback` (craft) | UI prototyping, vibe-coding a screen |
| [`bundles/hero-moment.md`](bundles/hero-moment.md) | `/design-build`, `/design-feedback` (brand-expressive) | Rare, big, brand-forward moments |
| [`bundles/copy-review.md`](bundles/copy-review.md) | `/design-feedback` (copy), `/design-ship` | Writing or reviewing user-facing strings |
| [`bundles/a11y-review.md`](bundles/a11y-review.md) | `/design-ship` | Accessibility review |
| [`bundles/localization-sweep.md`](bundles/localization-sweep.md) | `/design-ship` | Global-readiness review |

### 3. By altitude: directories

- **`foundations/`**: the *why*. Strategic, slow-changing. Load it when framing or arguing tradeoffs.
- **`systems/`**: the *what*. Codified rules. Load it when working at the surface level.
- **`specialty/`**: narrower techniques. Load it when the work touches them specifically.

## External resources

Kickstarters, component libraries, and skills owned by other teams are listed in
[`external-resources.md`](external-resources.md). `/design-build` and `/setup-project` read it.

## Live sources: MCPs hold the current truth

The markdown describes the *system and rules*. For current authoritative values, call the live
sources configured in your environment (see `CUSTOMIZE.md` §4):

- **Figma MCP (remote, the tools that take a `fileKey`)**: FUEL tokens and FMX components. Call it
  FIRST before writing UI code. `search_design_system` finds components and variables;
  `get_design_context` / `get_variable_defs` on a node give structure and values. If a local
  Dev Mode Figma server is also present, prefer the remote one.

  | File | Key |
  |---|---|
  | FMX Component Library | `poY7Dn4TasEEZ4Rp5U0jWa` |
  | FUEL Component Library | `eEUrBq2TrEVHAfhbe9pm1g` |
  | FUEL Foundations Library | `X3sKsaeXXikXy2nIe6IZz6` |
  | Portfolio flow (Live in Prod) | `xPHcGeMXFgTBk1iZZ1Ln40` |
  | Orders flow (Live in Prod) | `4yCc5GC0eB7ymkplNezDlo` |

  Prototypes **read** Figma; they never write to the FMX or FUEL files.
- **[`specialty/fmx-domain.md`](specialty/fmx-domain.md)**: prices, fees, the canonical scenario,
  settlement and vocabulary. Check it before any figure or string ships.
- **Fanatics skills** (if installed): `fmx-figure-audit` owns the domain numbers,
  `fmx-figma-conventions` and `fuel-component-standard` own component structure, and
  `responsible-gaming-check` gates anything customer-facing. See `external-resources.md`.

If no MCP exists for a source, the matching `systems/*.md` file is the fallback of record.

## High-signal rules that apply everywhere

> FMX rules first (sourced from FUEL, the FMX libraries and the FMX domain skills, 2026-10-22).
> Rule 12 is still a template: voice hasn't been sourced. Say so rather than inventing one.

1. **Prices in cents are canonical.** Display in the customer's format (`55¢`, `55%`, `1.82x`).
   **Never American or decimal odds**: they were removed at the CFTC's request.
2. **Every figure reconciles.** contracts × price = gross; + fee = total; payout = contracts ×
   $1. Use the canonical 907 @ 48¢ scenario; never invent fees (flat-band fee = $0.02 × contracts).
3. **Never show winnings without the stake.** Hide cost, paid out and gain/loss together, and
   run `responsible-gaming-check` on anything customer-facing.
4. **Dark theme, FUEL tokens only.** Semantic tokens (`--color-text`) before `--fuel-*`, and
   `--fuel-*` before hex. The light theme isn't sourced yet.
5. **Inter for UI, Anton only for scores and hero figures.** Named FUEL text styles (P1–P4), never raw
   sizes. Tabular figures in prices and balances.
6. **Spacing comes from the scale.** `FUEL space: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64`. Never random numbers.
7. **Gain and loss never rely on colour alone.** Green or red plus a sign, a label or an icon.
8. **One primary CTA per surface**: the white `fill/primary` button. `text/info` blue for links.
9. **Protect product nouns**: FanCash, Fair Play, Fanatics Markets, league names.
10. **Real content, never lorem ipsum.** Real markets, real teams, real lengths, at 393 wide.
11. **Reuse before invent.** Check the FMX Component Library (every page) before hand-rolling;
    match Figma property names as props.
12. **Voice: {{VOICE_TRAITS}}.** {{CASE_RULE}}.
13. **44px minimum touch target** on touch devices.

## Frontmatter

Every content file has YAML frontmatter: `title`, `altitude`, `modality`, `covers`,
`canonical-source`, `mcp`, `related`, `status`, `last-reviewed`. Use it to filter.

## Provenance

The raw source register is [`context.md`](context.md). New raw material goes there first. New
principles get distilled into the right file via PR.

## When in doubt

- *Why are we building this?* → `/design-frame`
- Starting a new prototype → `/setup-project`, then `/design-build`
- Review or critique → `/design-feedback`
- Preparing to launch → `/design-ship`
- Periodic maintenance of this repo → `/skill-refine`
- Wants something to feel "more Fanatics Markets" → the high-signal rules above + `foundations/tacit-knowledge.md`
- Building an AI feature → `foundations/ai-principles.md` + `/integrate-claude`
