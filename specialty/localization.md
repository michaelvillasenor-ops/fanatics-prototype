---
title: Localization
altitude: specialty
modality: [copy, visual]
covers: [i18n, l10n, translation, RTL, expansion]
canonical-source: "{{LOCALIZATION_GUIDE}}"
mcp: []
related: [writing, accessibility, visual]
status: living
last-reviewed: 2026-09-28
---

# Localization

## Three concentric concepts
- **Internationalization (i18n):** the build supports any locale (no hardcoded strings, locale-aware
  formats, bidirectional layout).
- **Localization (l10n):** adapting for a market: language, imagery, formats, and legal needs.
- **Translation:** the strings themselves.

## Best practices
- **Expansion:** leave room for +30% (German, French, Finnish); short strings can grow 200%.
  Never fix widths to English copy.
- **No concatenation:** "You have " + n + " items" breaks in most languages. Use full sentences with
  placeholders and plural rules (ICU / `Intl.PluralRules`).
- **RTL:** use logical CSS properties (`margin-inline-start`), mirror directional icons, and don't
  mirror media controls or logos.
- **Capitalization:** not every script has case; don't encode meaning in case.
- **Dates, numbers, currency:** use `Intl.*` formatters, never hand-built strings.
- **Gender and number** agreement: avoid constructions that force a gender.
- **Icons and imagery:** avoid culture-specific gestures and text baked into images.
- **Names:** support any length and script; don't split into first and last name when you don't
  need to.

## Fonts and scripts
Confirm the typeface covers the target scripts, or define fallbacks. CJK, Thai, Arabic, and
Devanagari need taller line heights.

## Prototype stress test
Swap `src/demo/copy.ts` values to +30% length and to an RTL sample (`dir="rtl"` on `<html>`).
Screenshot every surface, then revert.

## Checklist
- [ ] No hardcoded strings outside `copy.ts`
- [ ] No concatenation; plurals handled
- [ ] Layout survives +30% and RTL
- [ ] `Intl` formatting for dates, numbers, and currency
- [ ] No text in images
