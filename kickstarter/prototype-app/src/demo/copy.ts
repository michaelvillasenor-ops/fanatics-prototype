// ALL end-user copy lives here, so a copy pass is one reviewable diff and a
// localization stress test is one file swap. Tooling copy (panel, help) can
// live here too under `tooling`. Voice: {{VOICE_TRAITS}}. {{CASE_RULE}}.
// (FMX voice isn't sourced yet. These strings are placeholders for a content designer.)
//
// Banned in user-facing strings (extend per systems/writing.md):
// internal code names, "Oops", "Sorry", "AI-powered", error codes on their own,
// American or decimal odds, urgency or loss-chasing language.
// Protect product nouns: FanCash, Fair Play, Fanatics Markets.
// Figures come from src/data/fmx.ts, never typed into a string.

export const copy = {
  home: {
    greeting: (name: string) => `Welcome back, ${name.split(" ")[0]}`,
    sectionTitle: "Open positions",
    primaryCta: "Browse markets",
    positionSubtitle: (contracts: string, price: string) => `${contracts} contracts at ${price}`,
    pays: (amount: string) => `Pays ${amount}`,
  },
  empty: {
    title: "No open positions",
    body: "Markets you trade will show up here.",
    cta: "Browse markets",
  },
  loading: "Loading your portfolio",
  error: {
    title: "Couldn't load your portfolio",
    body: "Check your connection, then try again.",
    cta: "Try again",
  },
  variantB: {
    banner: "Your largest position",
    costLine: (cost: string, fee: string) => `Cost ${cost} · incl. ${fee} fee`,
  },
  tooling: {
    panelTitle: "Controls",
    helpTitle: "Keyboard",
    onboardingTitle: "This is a prototype",
    onboardingBody: "Press P for controls and ? for help. Every setting is saved in the URL, so you can share exactly what you see.",
    onboardingCta: "Got it",
  },
} as const;
