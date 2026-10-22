# BUILD-PROMPTS.md

<N> prompts to build **prototype-app** slowly, one reviewable step at a time. Read `PLAN.md`
first; it is the brief these prompts serve.

## How to use this

1. Start a session. Claude reads `CLAUDE.md` automatically. Say "read PLAN.md".
2. Paste **one** prompt. Let it work. Review against the checklist below. Commit if green.
3. Move to the next one. **Do not batch.** The point is to steer often.

**After every step, check:** typecheck clean · `npm run verify` green · no hardcoded
colors/spacing/copy · new states reachable by URL · looked at it in the browser.

If a step produces too much at once, reply: "Smaller. Show me the plan first."

Revisions: insert prompts as half-numbers (`4.5`) so nothing renumbers. Cut prompts leave a
tombstone (`~~Prompt 7~~ merged into 6`). A dated addendum at the top wins over the body.

---

## Phase A: Foundations
*This is staging, not the show.*

**Prompt 1. Orient.** Read CLAUDE.md and PLAN.md. Fill in CLAUDE.md's PURPOSE, NON-NEGOTIABLES,
and CORE MODEL from PLAN.md. Confirm `npm run dev` and `npm run verify` are green before changing
anything, and report the summary line. Stop there.

**Prompt 2. Tokens.** Map <design system> onto `src/tokens/tokens.css`, keeping the semantic
names. Don't inline any value in components. When done, show me `?page=tokens` as a screenshot in
both themes.

**Prompt 3. Types, then seed.** Define the domain types in `src/data/types.ts` for <domain>. Show
me the types before writing the seed. Then write a realistic, deterministic seed (real-feeling
names, one deliberately long title, no lorem ipsum) and render it as a plain list. Stop there.

**Prompt 4. The load-bearing component.** Build <the single most important component>. It must
<A>, <B>, <C>. Reuse the primitives in `src/components/` rather than building parallel ones. Add
it to `?page=tokens` as a preview. Report what you verified.

Checkpoint: tokens, types, seed, and the key component render; verify is green. Commit.

---

## Phase B: Host chrome
**Prompt 5. The surrounding app.** Build the normal <app> chrome the concept lives inside
(<navigation>, <header>). Match the live product structurally, not pixel for pixel. Don't build
the concept yet.

Checkpoint: the chrome reads like the real product in a screenshot. **Freeze it.** Commit.

---

## Phase C: The core spine *(spend time here)*
**Prompt 6. <Core flow>.** Build <…>. It must <…>. Don't <…>, because <reason>. When done, add a
check to `scripts/verify-smoke.mjs` (or a new `verify-core.mjs`) asserting <behavior>, run it,
and quote the PASS lines.

Checkpoint: the core flow works end to end at the fidelity bar. Commit and tag `v0-spine`.

---

## Phase D: Variants and features (one phase per concern)
**Prompt 7. Variant B.** Add `variant=b` behavior *inside* `Prototype` (the one-renderer rule).
It must differ from A only in <…>. Add it to `LinksRoute`. Verify that switching A↔B live
preserves <state>.

Checkpoint: … Commit.

---

## Phase E: Polish passes
**Prompt 8. Motion.** Transform and opacity only, 150–350ms, enter and exit easing from tokens,
reduced-motion fallback. List every animation in a short motion inventory (README or `MOTION.md`).
**Prompt 9. States.** Empty, loading, and error for every list and feed, each reachable via
`state=`.
**Prompt 10. Accessibility and copy.** Touch targets, contrast with real content, focus order, and
a screen-reader pass. Move every stray string into `copy.ts`.

---

## Phase F: Demo layer
**Prompt 11. Links and presenter mode.** Every canonical state gets a `?page=links` row.
`present=1` hides all tooling. Write `DEMO.md` (beats, talking point, what each beat proves).

---

## Phase G: Final sweep and handoff
**Prompt 12. Sweep.** Walk the checklist over everything. Update the README: decision log
(Default | Rationale | Flip it), what's real vs mocked, verification counts, known gaps.
**Prompt 13. Handoff.** Refresh CLAUDE.md (gotchas found), write HANDOFF.md, then simulate a cold
reader: a fresh agent orients from CLAUDE.md and HANDOFF.md alone and reports what was unclear.
Fix those gaps.

---

## Steering phrases to keep handy
- "Smaller. Show me the plan before you write files."
- "You hardcoded a value. Token it."
- "That's a new pattern. Which existing one does it evolve? Argue for it or reuse."
- "You're about to fork X. Evolve it in place instead."
- "That's not real. Say so in the docs instead of quietly mocking it."
- "Don't narrate. Run the check and quote the output."
