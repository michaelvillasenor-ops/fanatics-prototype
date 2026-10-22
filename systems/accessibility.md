---
title: Accessibility
altitude: system
modality: [visual, interaction, copy]
covers: [inclusive design, WCAG AA, testing]
canonical-source: "https://www.figma.com/design/poY7Dn4TasEEZ4Rp5U0jWa/FMX-Component-Library"
mcp: []
related: [visual, motion, writing, localization]
status: living
last-reviewed: 2026-09-28
---

# Accessibility

Inclusive design is the brief, not a pass at the end. This file is largely generic. Add your
design system's guarantees and your team's specifics.

## Four interaction modes to design for
Touch · pointer · keyboard · assistive technology (screen reader, switch, voice).

## Working inclusively: eight rules
1. **Contrast:** WCAG AA. 4.5:1 for body text, 3:1 for large text and UI components. Check it
   against real content, not blank backgrounds.
2. **Touch targets** of at least 44px, with non-overlapping hit zones.
3. **Keyboard:** everything is reachable and operable, focus order follows reading order, focus is
   always visible, and there are no traps.
4. **Screen readers:** semantic elements first, a meaningful heading structure, labels on every
   control, and live regions for async status.
5. **Motion:** honor `prefers-reduced-motion`; no more than three flashes per second.
6. **Don't rely on color alone** to convey state.
7. **Text scales** to 200% without loss of content or function.
8. **Errors** are announced, described in plain language, and tied to their fields.

## What the design system handles (fill in)
<color sets that guarantee contrast · component focus states · control sizes>

## What you have to think about
Custom components, content over imagery, dynamic content, gesture-only interactions, and time
limits.

## Things to test
- A keyboard-only pass of the whole flow
- A VoiceOver or TalkBack walk-through from top to bottom
- The browser at 200% zoom
- `prefers-reduced-motion` emulation in devtools
- Contrast spot-checks on the real content
