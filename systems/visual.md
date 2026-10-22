---
title: Visual
altitude: system
modality: [visual]
covers: [color, typography, layout, spacing, iconography, imagery]
canonical-source: "https://www.figma.com/design/X3sKsaeXXikXy2nIe6IZz6/FUEL-Foundations-Library"
mcp: [figma]
related: [components, motion, accessibility, brand, fmx-domain]
status: living
last-reviewed: 2026-10-22
---

# Visual

Fanatics Markets is built on **FUEL**. FUEL's two Figma libraries own every token and text
style: the [FUEL Foundations Library](https://www.figma.com/design/X3sKsaeXXikXy2nIe6IZz6/FUEL-Foundations-Library)
and the [FUEL Component Library](https://www.figma.com/design/eEUrBq2TrEVHAfhbe9pm1g/FUEL-Component-Library).
This file holds the rules and the why. The values in `kickstarter/prototype-app/src/tokens/tokens.css`
were read from the FMX Component Library via the Figma MCP on **2026-10-22**. When they
disagree with Figma, Figma wins.

**Re-reading values:** `get_variable_defs` on a section of the
[FMX Component Library](https://www.figma.com/design/poY7Dn4TasEEZ4Rp5U0jWa/FMX-Component-Library)
(Cards `4606:64211`, Buttons `5376:59` and Alerts `4609:64427` cover the palette). Use
`search_design_system` with variable queries to find names and keys. It doesn't return values.

## Color

- **Theme:** FMX ships **dark** (`color.dark` mode). FUEL has a `color.light` mode, but it
  hasn't been read into this kit yet. The light block in `tokens.css` is a placeholder; don't
  present light-theme work as on-brand.
- **Surfaces:** `background/base` and `background/surface-low` are pure black;
  `background/container` (`#1a1a1a`) is the card surface; `neutral/950` (`#242424`) is raised.
- **Text hierarchy by opacity:** `text/primary` `#f5f5f5` → `text/secondary` white 75% →
  `text/tertiary` white 50%.
- **Primary CTA is a white fill** (`fill/primary`) with inverse text. Brand royal purple is
  for brand moments, not the default button.
- **`text/info` (`#5091f1`) is the accent and link blue.**
- **Status:** `text/positive` green for gains, `text/negative` red for losses,
  `text/warning` amber. Colour is never the only signal for gain or loss: pair it with a sign,
  a label (`Gain` / `Loss`) or an icon.
- **FanCash purple** (`text/fancash` `#7a5dff`, `fill/fancash` `#5327dc`) is reserved for FanCash.
- **Translucent strokes composite over fills.** Borders are white at 5–25%
  (`border/weakest` → `border/medium`). Give the container the stroke and put the fill on an
  inner surface.

| Kit token | FUEL variable | Dark value |
|---|---|---|
| `--color-bg` | `background/base` | `#000000` |
| `--color-surface` | `background/container` | `#1a1a1a` |
| `--color-surface-raised` | `neutral/950` | `#242424` |
| `--color-text` | `text/primary` | `#f5f5f5` |
| `--color-text-subdued` | `text/secondary` | `#ffffffbf` |
| `--color-text-tertiary` | `text/tertiary` | `#ffffff80` |
| `--color-border` | `border/weak` | `#ffffff26` |
| `--color-accent` | `fill/primary` | `#ffffff` |
| `--color-on-accent` | `text/primary-inverse` | `#000000` ⚠ |
| `--color-link` | `text/info` | `#5091f1` |
| `--color-positive` | `text/positive` | `#48cb57` |
| `--color-negative` | `text/negative` | `#f85d51` |
| `--color-warning` | `text/warning` | `#dab01f` |
| `--color-fancash` | `text/fancash` | `#7a5dff` |
| `--color-focus` | `border/strong` | `#f5f5f5` |

⚠ `text/primary-inverse` read `#000000` on the Buttons page and `#111111` on the Cards page
(stale snapshot or a second collection). The kit uses the Buttons value. Confirm with FUEL.

Every FUEL colour read is available as `--fuel-<name>` in `tokens.css` (slashes become
dashes), for roles the kit layer doesn't cover.

## Typography

- **Inter** (`family/primary`) for everything. **Anton** (`family/score`) only for scores and
  hero figures (`marquee/large`).
- Two weights: Regular 400 and **SemiBold 600** (`style/strong`). No bold 700.
- **Use named styles, never raw sizes:**

| FUEL style | Size / line height | Kit variant | Use for |
|---|---|---|---|
| `marquee/large` (Anton) | 44 / 44 | none, use `--font-family-score` | scores, hero numbers |
| `title/large (P1)` | 18 / 24, 600 | `title` | section and sheet titles |
| `title/medium - strong` | 16 / 24, 600 | `body-lg` | card titles, alert titles |
| `body/medium (P2)` | 14 / 20 | `body` | standard body, inactive tabs |
| `body/medium - strong (P2)` | 14 / 20, 600 | none | active nav, buttons |
| `body/small (P3)` | 12 / 16 | `caption` | small body, details |
| `body/small - strong (P3)` | 12 / 16, 600 | none | small interactions, large badges |
| `body/xSmall (P4)` | 10 / 14 | none | metadata |
| `body/xSmall - strong (P4)` | 10 / 14, 600 | none | strong metadata, small badges |

- The kit's `headline` (24px) has **no FUEL source yet**. The largest Inter style found is
  P1 at 18px. Find the right style before a page headline ships.
- **Numbers use tabular figures** in prices, balances and timers. Watch punctuation: a `.` or
  `,` set in a tabular face takes a full digit width.

## Layout and spacing

- **Scale:** FUEL space: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64. Never off-scale
  values. The kit's `--space-1…7` map to 4, 8, 12, 16, 24, 32, 48. Reach for `--fuel-space-*`
  for the rest.
- **Semantic aliases where they fit:** `Component/Padding/padding-medium` (12),
  `Component/Stack/stack-gap-large` (16).
- **Radius:** none 0 · small 4 · medium 8 · mediumLarge 12 · large 16 · xLarge 30 · full.
  Nested radius steps down by the padding.
- **Viewport:** 393 wide mobile (393×852). FMX components are tested at 393 wide with long
  values.
- **Touch targets:** at least 44px. FMX's compact buttons render at 40px tall, so extend the
  hit area rather than shrinking the floor.
- Component owns its inner padding; the parent owns the margin. Gap between siblings, never
  spacer elements.

## Iconography
- Use FMX/FUEL icons from the `↳ Icons` page of the FMX Component Library. Don't hand-draw them.
- Icon colours mirror text roles: `icon/primary`, `icon/tertiary`, `icon/warning`.
- `icon/secondary` is white at 75%. It's invisible on a white board, so screenshot over dark.

## Imagery
- Team and league marks come from licensed asset sources only. Don't recolour or crop logos.
- Text over imagery needs a scrim (`fill/transparent-inverse`, black 50%).
