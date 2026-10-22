import type { Portfolio } from "./types";

// Realistic, deterministic seed for Fanatics Markets. Rules:
// - p-01 is the canonical scenario (907 @ 48¢ → $453.50 total, pays $907.00) and
//   p-02 the modify-flow scenario (80 @ 32¢). Don't change their numbers; build
//   new scenarios alongside them. See specialty/fmx-domain.md §3 in the kit.
// - every price sits in the 20¢–80¢ flat fee band unless a screen is about fees
// - one long market name to test truncation at 393 wide
// - no lorem ipsum, no randomness in render
export const seedPortfolio: Portfolio = {
  id: "u-001",
  name: "Jordan Ellis",
  positions: [
    { id: "p-01", league: "NFL", market: "Chiefs vs. Bills", outcome: "Chiefs", contracts: 907, priceCents: 48, openedAt: "2026-10-18" },
    { id: "p-02", league: "NBA", market: "Lakers vs. Celtics", outcome: "Lakers", contracts: 80, priceCents: 32, openedAt: "2026-10-20" },
    { id: "p-03", league: "NCAAF", market: "Texas Longhorns vs. Georgia Bulldogs: Longhorns win by more than 6.5 points", outcome: "Yes", contracts: 250, priceCents: 37, openedAt: "2026-10-19" },
    { id: "p-04", league: "NHL", market: "Rangers vs. Bruins: total goals over 5.5", outcome: "Over", contracts: 120, priceCents: 54, openedAt: "2026-10-21" },
  ],
};
