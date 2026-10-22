# prototype-app

<What this is and the decision it serves, in two sentences. "Prototype, not production.">

## Quickstart

```bash
npm install
npx playwright install chromium   # first time on a machine
npm run dev                        # http://localhost:5199/
npm run verify                     # with the dev server running
```

Start at `?page=links` for every canonical state.

## Keyboard
| Key | Action |
|---|---|
| `P` | Control panel |
| `?` | Help |
| `Esc` | Close overlays |

## Decision log
| Decision | Default | Rationale | Flip it |
|---|---|---|---|
| <e.g. Banner above the list> | on in B | … | `?variant=a` |

## What's real / what's mocked
| Piece | Status | Notes |
|---|---|---|
| Data | Mocked | `src/data/seed.ts`, deterministic |

## Verification
`npm run verify`: <x/y> checks across <n> suites. The suites test behavior, not styling.

## Known gaps
- …

## Open questions (verbatim from PLAN.md)
- …
