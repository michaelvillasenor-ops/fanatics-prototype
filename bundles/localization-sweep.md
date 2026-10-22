---
bundle: localization-sweep
intent: Global-readiness review of strings and layouts before shipping.
includes:
  - specialty/localization.md
  - systems/writing.md
  - systems/visual.md
  - systems/accessibility.md
mcp-first:
  - none-required
status: stable
last-reviewed: 2026-09-28
---

# Bundle — Localization sweep

## Quick rules to lead with
- **No hardcoded strings** outside `copy.ts`.
- **No concatenation;** use plural rules.
- **+30% expansion** without truncation or clipped buttons.
- **RTL:** logical properties; mirror directional icons only.
- **`Intl` formatters** for dates, numbers, and currency.
- **No text in images.**
- **Script coverage** in the font stack.

## Pre-ship checklist
See `specialty/localization.md` → Checklist and Prototype stress test.
