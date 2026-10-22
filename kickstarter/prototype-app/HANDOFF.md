# HANDOFF — prototype-app

> Written <YYYY-MM-DD>, refreshed <YYYY-MM-DD>. `CLAUDE.md` holds the rules; this file is the
> narrative. It's a pointer, not a duplicate. If they conflict, prefer PLAN.md and README.

## Where things stand
- Repo / branch / latest tag: …
- Verification: `npm run verify` → <x/y> checks
- Deployed: <URL> · redeploy: `<command>` (hard-refresh after deploy)

## What this is (one breath)

## Read these, in order
1. `CLAUDE.md`: rules and gotchas
2. `PLAN.md`: the brief
3. `README.md`: decision log, what's real vs mocked
4. <others>

## Architecture in five lines

## Flag surface (URL params)
| Param | Values | Default | What it does |
|---|---|---|---|
| `variant` | a, b | a | … |
| `state` | default, empty, loading, error | default | forces a data state |
| `present` / `debug` / `onboard` / `frame` / `theme` | | | harness |

## What happened, in order
1. …

## Hard-won gotchas (project-specific; the general ones are in CLAUDE.md)

## Tactical notes
Dev server on :5199 · preview config name `prototype-app` · env quirks …

## Open threads (ranked)
1. …

## Fast orientation for a new session
```bash
npm install && npm run dev
npm run verify
open "http://localhost:5199/?page=links"
```
