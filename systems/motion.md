---
title: Motion
altitude: system
modality: [motion]
covers: [personalities, easing, durations, reduced motion]
canonical-source: "https://www.figma.com/design/poY7Dn4TasEEZ4Rp5U0jWa/FMX-Component-Library"
mcp: []
related: [visual, accessibility]
status: living
last-reviewed: 2026-09-28
---

# Motion

## Two personalities
- **Productive** (the default): quick and functional, 150–250ms, for routine UI.
- **Expressive**: for content and brand moments only, 300–500ms. It must be earned.

## Easing and durations
| Token | Value | Use |
|---|---|---|
| `--ease-enter` | {{EASE_ENTER}} | things arriving |
| `--ease-exit` | {{EASE_EXIT}} | things leaving |
| `--motion-fast` / `-base` / `-slow` | 150 / 250 / 350ms | |

## Rules
- Animate transform and opacity only. Resting states are fully opaque.
- Motion serves clarity (where did that come from?) or delight (content moments), never
  decoration.
- **Reduced motion:** honor `prefers-reduced-motion` from the start. Replace movement with an
  opacity change or an instant state, and never convey information only through motion.
- **Three flashes:** nothing flashes more than three times per second.
- Nothing blocks input for more than 500ms.

## Practical recipes
<sheets, toasts, list insert and remove, page transitions: fill in with your system's values>
