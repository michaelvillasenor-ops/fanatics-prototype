// Fanatics Markets money and price rules. The ONLY place prices and fees become
// numbers or strings, so every screen reconciles. Rules: specialty/fmx-domain.md
// in the kit (owner of record: the fmx-figure-audit skill). All money is integer
// cents; never do dollar arithmetic in floats.

/** Display formats a customer can pick in Order Preferences (since Oct 2026).
 *  American and decimal odds were removed at the CFTC's request: never add them. */
export type OddsFormat = "cents" | "percent" | "multiplier";

/** Contracts settle at $1, so cents and implied percent are the same number. */
export function formatPrice(priceCents: number, format: OddsFormat): string {
  switch (format) {
    case "cents":
      return `${priceCents}¢`;
    case "percent":
      return `${priceCents}%`;
    case "multiplier":
      // $1 ÷ price, always two decimals.
      return `${(100 / priceCents).toFixed(2)}x`;
  }
}

export function formatUsd(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const dollars = Math.abs(cents) / 100;
  return `${sign}$${dollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Taker fee per contract in units of $0.0001, by whole-cent fill price.
 * Source: FMX pricing config (US, buy and sell, taker), read 28 Sep 2026.
 * Configs are versioned: re-check before relying on this for a later date.
 */
export function feePerContractUnits(priceCents: number): number {
  const c = priceCents;
  if (c < 1 || c > 99 || !Number.isInteger(c)) throw new Error(`price out of range: ${c}`);
  if (c <= 4) return 34 * c;
  if (c <= 19) return 140 + 4 * (c - 5);
  if (c <= 80) return 200; // flat band: $0.02
  if (c <= 95) return 196 - 4 * (c - 81);
  return { 96: 136, 97: 72, 98: 68, 99: 64 }[c]!;
}

/** Total fee in cents. Rounding outside the flat band is unverified (flat band is exact). */
export function feeCents(contracts: number, priceCents: number): number {
  return Math.round((contracts * feePerContractUnits(priceCents)) / 100);
}

/** FanCash earn rate: 0.3% of gross. Historical design guidance, unverified. */
export const FANCASH_RATE = 0.003;

export interface BuyQuote {
  contracts: number;
  priceCents: number;
  grossCents: number;
  feeCents: number;
  totalCents: number;
  paysCents: number;
  fanCashCents: number;
}

/** contracts × price = gross; gross + fee = total; payout = contracts × $1. */
export function quoteBuy(contracts: number, priceCents: number): BuyQuote {
  const grossCents = contracts * priceCents;
  const fee = feeCents(contracts, priceCents);
  return {
    contracts,
    priceCents,
    grossCents,
    feeCents: fee,
    totalCents: grossCents + fee,
    paysCents: contracts * 100,
    fanCashCents: Math.round(grossCents * FANCASH_RATE),
  };
}

export interface SellQuote {
  contracts: number;
  priceCents: number;
  /** Shown as the sale amount, with the fee in the caption. Never show net in its place. */
  grossCents: number;
  feeCents: number;
  netCents: number;
  fanCashCents: number;
}

export function quoteSell(contracts: number, priceCents: number): SellQuote {
  const grossCents = contracts * priceCents;
  const fee = feeCents(contracts, priceCents);
  return {
    contracts,
    priceCents,
    grossCents,
    feeCents: fee,
    netCents: grossCents - fee,
    fanCashCents: Math.round(grossCents * FANCASH_RATE),
  };
}
