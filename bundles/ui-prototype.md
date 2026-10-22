---
bundle: ui-prototype
intent: Vibe-code or wireframe an everyday product UI surface that feels native to the brand and design system.
includes:
  - systems/visual.md
  - systems/components.md
  - systems/motion.md
  - systems/surfaces.md
  - systems/interaction-patterns.md
  - foundations/brand.md
  - foundations/tacit-knowledge.md
  - specialty/fmx-domain.md
mcp-first:
  - "Figma MCP (FUEL + FMX libraries)"
status: stable
last-reviewed: 2026-10-22
---

# Bundle — UI prototype

## What this is
Context for building or reviewing an everyday product surface: the visual system, components,
motion, the product's surface structure, and interaction patterns.

## How to use it
- Claude Code or Cursor: `/design-build` or `/design-feedback` (craft) load this automatically.
- **Always first:** call the `mcp-first` sources. The MCPs hold the current values; these files
  hold the rules.

## Quick rules to lead with
- **Check the FMX Component Library first** (every page; `.Domain /` names the owner, not the
  page). Match Figma property names as props.
- **Dark theme on FUEL tokens.** Black base, `#1a1a1a` containers, text by opacity (100 / 75 / 50).
- **Inter, FUEL text styles P1–P4;** Anton only for scores and hero figures. Tabular figures.
- **Spacing from the scale:** FUEL space: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64.
- **One primary CTA per surface:** the white `fill/primary` button.
- **Prices through `formatPrice()`**, numbers from the canonical scenario. Never invent a fee.
- **Gain and loss:** colour plus a sign or label, never colour alone.
- **393 wide, long values.** Real markets and team names, no lorem ipsum.
- **44px minimum touch target.**
- **Design empty, loading and error states** alongside the happy path.
- **Voice in any string:** {{VOICE_TRAITS}}. {{CASE_RULE}}.

## What's out of scope
Brand-expressive moments → `hero-moment`. Copy review → `copy-review`.
