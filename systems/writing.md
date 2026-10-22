---
title: Writing
altitude: system
modality: [copy]
covers: [accessible writing, terminology, style]
canonical-source: "specialty/fmx-domain.md (no FMX writing guide sourced yet)"
mcp: []
related: [voice-and-tone, localization]
status: living
last-reviewed: 2026-09-28
---

# Writing

## Accessible writing rules
1. Plain language; short sentences; front-load the point.
2. Links and buttons make sense on their own ("View invoice", not "Click here").
3. Headings describe their section.
4. Don't rely on color, position, or shape alone ("the red button").
5. Numbers as numerals; dates in the user's locale format.
6. Write for translation: no concatenated strings, no idioms, room for expansion.
7. Alt text describes purpose, not pixels; decorative images get empty alt.

## Terminology
Domain rules and the full vocabulary live in [`specialty/fmx-domain.md`](../specialty/fmx-domain.md).

| Use | Don't use | Notes |
|---|---|---|
| `48¢`, `48%` or `1.82x` (the customer's chosen format) | `-110`, `+120`, `1.82` decimal odds | American and decimal odds were removed at the CFTC's request |
| contracts | shares, bets, wagers | Contracts settle at $1 |
| FanCash | Fancash, fan cash, FANCASH | Protected product noun |
| Fair Play | fair play | Protected product noun |
| Pays | Wins, To win | Payout line on a buy |
| Paid out · Gain · Loss | Profit, Winnings | Settled-position labels in use |
| Est. cost · Est. sale value | Approx., ~ | Pre-fill estimates |
| `incl. $18.14 fee` | `+ fee`, `fees apply` | Fee always stated as a figure in the caption |

**Capitalization:** {{CASE_RULE}}. FMX Figma *properties and layers* are sentence case, but
that's a file convention, not a confirmed UI-copy rule. Product nouns above keep their casing
regardless. **Preferred verbs:** <not yet sourced>.

**Money and figures:** always `$` with two decimals (`$453.50`). Prices in whole cents. A
multiplier always has two decimals. Every figure on a screen reconciles with the canonical
scenario in `fmx-domain.md` §3.

## Banned in user-facing strings
- Internal code names and team jargon
- "Oops", "Sorry" as filler, blame language
- Error codes on their own
- American or decimal odds in any form
- Language that urges risk or chasing losses ("don't miss out", "win it back"). Run
  `responsible-gaming-check` on anything customer-facing.
- Winnings shown without the stake

## Writing for specific surfaces
<buttons · errors · empty states · notifications · settings>
