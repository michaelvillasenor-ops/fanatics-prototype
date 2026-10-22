// Show the types before the seed. Keep these close to what a real API would return,
// so an adapter can replace the seed later without touching components.
// Money is integer cents; prices are whole cents (1–99). See ./fmx.ts.

export type League = "NFL" | "NBA" | "NHL" | "MLB" | "NCAAF";

export interface Position {
  id: string;
  league: League;
  /** The market, as the customer reads it. */
  market: string;
  /** The outcome this position pays on. */
  outcome: string;
  contracts: number;
  /** Average fill price, whole cents. */
  priceCents: number;
  openedAt: string; // ISO date; authored, never Date.now()
}

export interface Portfolio {
  id: string;
  name: string;
  positions: Position[];
}
