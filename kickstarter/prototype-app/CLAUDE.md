# prototype-app

> Rules Claude reads automatically every session. **Re-read this file at the start of each
> session.** Narrative state lives in `HANDOFF.md`; the brief lives in `PLAN.md`.

## PURPOSE

<One paragraph: what this prototype must demonstrate, for whom (artifact audience), and the
decision it serves. This is NOT production code; optimize for learning speed and honesty.>

## NON-NEGOTIABLES

1. <strategic principle, e.g. "Keep the baseline honest: don't soften the as-is option">
2. <e.g. "Real content only">
3. <e.g. "Every claim in the demo is backed by a verify check">

## STACK

Vite + React 19 + TypeScript (strict). CSS custom properties as the token layer
(`src/tokens/tokens.css`). No UI or CSS frameworks unless added deliberately. Target: 393×852
inside `DeviceFrame`. Dev server on port **5199** (`strictPort`).

## CORE MODEL

<The domain types in one paragraph; see `src/data/types.ts`. Name the single most important
structural rule here, e.g. "every variant renders through `Prototype`, branching on config".>

## FOLDER STRUCTURE

```
src/app/         shell: App (routing by ?page=), config.ts (URL flags), DeviceFrame, useConfig
src/components/  token-driven primitives (Text, Stack, Button, ListRow) + index.ts barrel
src/data/        types.ts, seed.ts, useData.ts (hook → adapter → component)
src/demo/        stage furniture: copy.ts, ControlPanel (P), HelpOverlay (?), Onboarding, LinksRoute
src/tokens/      tokens.css + TokensRoute (?page=tokens)
src/services/    (add as needed) mocked seams with stable interfaces; real impl drops in later
src/Prototype.tsx  the concept; ONE renderer for all variants
scripts/         verify-*.mjs (Playwright PASS/FAIL), capture.mjs
/reference       gitignored design references; never import from it
```

## RULES

- **Every behavioral difference is a URL flag** in `src/app/config.ts` (type, default, parse,
  serialize). A link is a complete repro. Add canonical ones to `LinksRoute`.
- **One renderer, not N.** Variants branch inside `Prototype`; never a sibling `<PrototypeB/>`.
- **Tokens only.** No hex and no raw px outside `tokens.css`. Spacing uses the `Stack` `gap`
  scale. If a value is missing, add a semantic token.
- **All user-facing copy in `src/demo/copy.ts`.**
- **Reuse before invent.** Evolve existing components; don't fork `*V2`.
- **Real, deterministic seed data.** No lorem ipsum. No `Date.now()` or random values in render.
- Transform and opacity for animation, fully opaque resting states, and `prefers-reduced-motion`
  honored.
- Minimum touch target is `var(--touch-target)`. One primary CTA per surface.
- **When asked to verify, actually run the dev server or checks and report what was observed.**
  Quote PASS/FAIL lines. Don't narrate what should happen.
- **Never ship a big multi-file change without showing the plan first.**
- Label anything mocked in README "What's real / what's mocked".

## AFTER EVERY STEP, CHECK

- [ ] `npm run typecheck` is clean
- [ ] `npm run verify` is green, with a new check added for anything fixed
- [ ] No hardcoded colors, spacing, or copy strings
- [ ] Every new state or variant is reachable by URL and listed in `?page=links`
- [ ] Looked at it in the browser (screenshot), not just the code

## HOW TO WORK WITH ME

- Collaboration mode: **<step-by-step: one prompt, review, commit | autonomous with checkpoints>**
- Be opinionated. If a request conflicts with PLAN.md or these rules, say so before building.
- Commit after each green checkpoint (only if the mode above says so).
- Ask before anything outward-facing: pushing to a shared remote, deploying, messaging anyone.

## HARD-WON GOTCHAS (do not relearn these)

1. The embedded or IDE preview pane is a hidden page: rAF and timers are throttled and video may
   be suspended. Use it for looks; verify behavior with `scripts/verify-*.mjs`.
2. Onboarding intercepts input in fresh browser profiles. Every test and capture URL passes
   `onboard=0`.
3. A trailing `# comment` in a package.json script becomes Vite's root, giving a blank page with
   no error.
4. Vite port collisions: `strictPort` fails loudly. Check first with
   `curl -s -o /dev/null -w "%{http_code}" http://localhost:5199/`.
5. `page.waitForFunction(fn, {timeout})` treats options as `arg`. Write `(fn, null, {timeout})`.
6. A fresh machine needs `npx playwright install chromium`.
7. `base: "./"` plus `?page=` query routing are load-bearing for subpath deploys. Don't switch to
   pathnames without updating the deploy config.
8. Portals mounted outside `<html data-theme>` lose every token.
<Add project-specific gotchas here as they're found. Numbered, one or two lines each.>

## VERIFICATION

```bash
npm run dev          # in one terminal (or the preview tool: config "prototype-app")
npm run typecheck
npm run verify       # Playwright smoke + project suites
npm run capture      # @3x screenshots of key states into captures/
```

## PROJECT NOTES (kept current)

- Deployed URL: <none yet>. Redeploy: <command>.
- <YYYY-MM-DD: decisions from user feedback, one line each>
