---
title: Fanatics Markets domain rules
altitude: specialty
modality: [copy, visual, interaction]
covers: [prices, odds formats, trading fees, canonical scenario, settlement, illegal states, product nouns]
canonical-source: "fmx-figure-audit skill (references/domain-rules.md), FMX pricing config in Snowflake"
mcp: [figma]
related: [writing, visual, interaction-patterns, surfaces]
status: living
last-reviewed: 2026-10-22
---

# Fanatics Markets domain rules

The product rules every FMX prototype figure and string must obey. Distilled from the
`fmx-figure-audit` skill on 2026-10-22. That skill is the live owner: if this file and the
skill disagree, the skill wins. Re-read it and update this file.

**Source status, kept honest:**

| Rule | Status |
|---|---|
| Price formats, CFTC odds removal | Product rule, stated in the skill |
| Fee schedule | **Verified**: live pricing config, read 28 Sep 2026. Configs are versioned; re-check before quoting for a later date |
| Canonical 907 scenario | Recomputed from the fee schedule; input amount confirmed by Orders design, 28 Sep 2026 |
| FanCash earn rate (0.3% of gross) | Historical design guidance, **unverified** |
| Settlement outcomes | Historical design guidance, **policy owner unknown** |
| Combo leg states | Stated by FMX design 22 Sep 2026, no written product doc yet |

## 1. Prices and odds formats

- Contracts settle at **$1**, so a price in cents equals an implied probability in percent
  (`48¢` ≡ `48%`). **Price is the canonical form.** Store and reconcile in cents.
- Customers pick a display format in Order Preferences. There are three (since Oct 2026):

| Format | Example (55¢) | Rule |
|---|---|---|
| Contract price | `55¢` | whole cents + `¢` |
| Percentage | `55%` | same number + `%` |
| Multiplier | `1.82x` | $1 ÷ price, **always two decimals** + `x` |

- A multiplier inverts direction: "up to 60¢" reads as `1.67x or higher`.
- **American (`-110`) and decimal (`1.82`) odds were removed at the CFTC's request.** Never
  show them, never offer them as a format option. In the kickstarter, `formatPrice()` in
  `src/data/fmx.ts` is the only place prices become strings.

## 2. Trading fees (taker, US, buy and sell)

Per-contract fee by fill price:

| Fill price | Fee per contract |
|---|---|
| 1¢–4¢ | $0.0034 × cents |
| 5¢–19¢ | $0.0140, rising $0.0004 per cent to $0.0196 |
| **20¢–80¢** | **$0.0200 flat** |
| 81¢–95¢ | $0.0196, falling $0.0004 per cent to $0.0140 |
| 96¢–99¢ | $0.0136, $0.0072, $0.0068, $0.0064 |

Prototypes almost always sit in the flat band: **fee = $0.02 × contracts**.

- **Never infer a fee from an existing screen.** Old figures in circulation were wrong
  (e.g. `$21.77`, `$9.07`). A fee that divides to a suspiciously round per-contract number
  is a placeholder.
- Maker fees were not checked. Don't model maker pricing without a source.

## 3. Order arithmetic: every scenario must reconcile

- contracts × price = **gross**; gross + fee = **total cost**; **payout** = contracts × $1
  (buys only).
- **Sale amount is shown as gross**, with the fee in the caption (`$489.78` /
  `incl. $18.14 fee`). Don't display net proceeds in its place.
- A sale can never return more than its notional.
- **Price tolerance** is slippage, symmetric, and applies to **market orders only**. Showing
  tolerance on a limit order is an illegal state. Shown as a band: `48¢ → 58¢`.
- FanCash earned = **0.3% of gross**, not of total (unverified, see status table).

### Canonical scenario: use these numbers, don't invent new ones

907 contracts at 48¢ (keeps the `907 pays $907.00` symmetry):

| Line | Buy @ 48¢ | Sell @ 54¢ |
|---|---|---|
| Contracts | 907 | 907 |
| Gross | $435.36 | $489.78 |
| Fee | $18.14 | $18.14 |
| Total cost / net proceeds | $453.50 | $471.64 |
| Input amount | $453.52 | n/a |
| Unused amount | $0.02 | n/a |
| Pays | $907.00 | n/a |
| Realized gain | n/a | $18.14 |
| FanCash earned | $1.31 | $1.47 |

Modify flows use **80 contracts**: fee $1.60; 32¢ → gross $25.60, total $27.20; 31¢ → gross
$24.80, total $26.40; pays $80.00.

The kickstarter seed (`src/data/seed.ts`) encodes this scenario, and `src/data/fmx.ts`
computes it, so the numbers stay consistent across screens.

## 4. Settlement outcomes (unverified policy, don't guess beyond this)

- **Won / Lost:** ordinary. Lost pays $0.00.
- **Canceled is not a refund.** A cancelled single settles at VWAP: real payout, usually a loss.
- **Tie is the full return:** paid out = cost; gain/loss `$0.00` in the neutral treatment.
- **Sold:** exited before settlement, gain or loss, tagged `Sold` (not `Won`). Has a real
  paid-out figure.
- **A positive figure in a loss treatment is always a defect.**

### Illegal states
- Tie × Combo, Canceled × Combo (a combo with cancelled legs settles as **Partial win**).
- Tolerance on a limit order.

### Combo leg states
`Not started` (before kickoff) → `Live` (in play) → `Pending` (**event over, not yet
settled**, often 20–30 minutes) → `Win` / `Loss` / `Canceled/Tie`. `Pending` does **not**
mean "underway".

## 5. Sharing (Responsible Gaming)

Share is available on open and settled position cards and on a partially filled pending limit
order. It isn't available on empty states, tooltips or history views. **Hiding amounts on a
shared card hides cost, paid out and gain/loss together.** Never show winnings without the
stake. Run `responsible-gaming-check` on any share, promo or winnings surface.

## 6. Product nouns and vocabulary

- Protect casing: **FanCash**, **Fair Play**, **Fanatics Markets**, league names (**NFL**,
  **NBA**, …). Never sentence-case them away.
- Market vocabulary in use on FMX screens: contracts, price, Pays, Cost, Paid out, Gain, Loss,
  Est. sale value, Est. cost, Expires, Portfolio, Orders, limit order, market order, price
  tolerance, combo, leg.
- It's a **market**, not a bet. **Contracts**, not wagers. (Inferred from the product's CFTC
  framing; confirm with FMX content design before treating as a hard rule.)
