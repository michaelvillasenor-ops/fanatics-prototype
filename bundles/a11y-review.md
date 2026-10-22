---
bundle: a11y-review
intent: Accessibility review of a surface or prototype before it ships.
includes:
  - systems/accessibility.md
  - systems/visual.md
  - systems/writing.md
  - systems/motion.md
  - specialty/localization.md
mcp-first:
  - "Figma MCP (FUEL + FMX libraries)"
status: stable
last-reviewed: 2026-09-28
---

# Bundle — Accessibility review

## Quick rules to lead with
- **WCAG AA contrast** on real content: 4.5:1 for text, 3:1 for large text and UI.
- **44px targets**, non-overlapping.
- **Keyboard:** everything reachable, visible focus, no traps.
- **Screen reader:** semantic structure, labels, and live regions for async updates.
- **Reduced motion** parity; no more than three flashes per second.
- **Color is never the only signal.**
- **200% text zoom** without loss.
- **Alt text** for content images; decorative images hidden.

## Test checklist
- [ ] Keyboard-only pass
- [ ] Screen-reader walk-through
- [ ] 200% zoom
- [ ] Reduced-motion emulation
- [ ] Contrast spot-checks on real content
