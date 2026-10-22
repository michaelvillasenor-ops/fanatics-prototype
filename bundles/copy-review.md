---
bundle: copy-review
intent: Write or review user-facing strings against voice, tone, terminology, and translatability.
includes:
  - systems/voice-and-tone.md
  - systems/writing.md
  - foundations/ai-principles.md
  - specialty/localization.md
  - specialty/fmx-domain.md
mcp-first:
  - none-required
status: stable
last-reviewed: 2026-10-22
---

# Bundle — Copy review

## What this is
Context for writing and reviewing strings. In prototypes, every string lives in
`src/demo/copy.ts`, so review that file.

## Quick rules to lead with
- **Voice: {{VOICE_TRAITS}}.** {{CASE_RULE}}. (Not sourced yet: flag it, don't invent it.)
- **Never American or decimal odds.** Prices as `48¢`, `48%` or `1.82x`.
- **Contracts, not bets.** Protect FanCash, Fair Play, Fanatics Markets.
- **Fees as figures:** `incl. $18.14 fee`, never "fees apply".
- **No urgency or loss-chasing language.** Run `responsible-gaming-check` on every customer-facing string.
- **Clarity before cleverness.**
- **Errors:** what happened plus what to do next. No blame, no "oops".
- **Empty states teach the next action.**
- **Buttons are verbs** that make sense out of context.
- **No internal jargon or code names.**
- **AI features:** describe what it does, not the technology.
- **Write for translation:** no concatenation; leave room for +30%.

## Tone cheat-sheet
| Context | Tone |
|---|---|
| Error | calm, specific |
| Success | brief, warm |
| Onboarding | encouraging, concrete |

## Output format for reviews
A Before → After → Why table grouped by rule source. For a larger pass, keep a
`COPY-CHANGELOG.md` in that format.
