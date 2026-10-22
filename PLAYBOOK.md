# Playbook: how prototypes get built with this system

> The distilled method from roughly eight decision prototypes: consumer-app concepts, a
> multi-scenario decision artifact, an exec vision demo, a docs and copy toolkit, and more. It
> covers the working method, the prompt patterns, the doc set, the harness, and the gotchas that
> cost real time. Environment-agnostic.

**The headline:** one designer plus Claude Code can take a leadership ask to a deployed,
automatically verified, multi-variant interactive artifact in one to three days. Every behavioral
difference is a URL flag. Every claim is backed by a check. The full history is readable as
`git log`.

---

## 1. The shape of the process

```
brief (md file) → prompt-plan build → eval vs brief → gap fixes
   → handoff packaging → feedback rounds (short prompts) → team repo
```

| Mode | What it looks like | Prompt style | Skill |
|---|---|---|---|
| **Framing** | The brief as a file Claude can read: `PLAN.md` | Question-driven, one at a time | `/design-frame` |
| **Planned build** | Numbered prompt script (`BUILD-PROMPTS.md`, 30 to 60 prompts in phases), one commit per phase | Long, specific, sequenced | `/design-build` |
| **Eval** | Independent grading of the artifact against the brief, adversarially verified | "Grade this against the brief; verify empirically, don't trust the docs" | `/design-feedback` (sweep) + `templates/docs/EVAL.md` |
| **Packaging** | `CLAUDE.md` + `HANDOFF.md` so any fresh session or teammate can orient cold | "Package for handoff; simulate a cold reader to prove it" | — |
| **Feedback rounds** | Short, observational prompts; Claude diagnoses, fixes, verifies, deploys | Symptom-first or intent-first | `/design-build` ⇄ `/design-feedback` |
| **Ship** | Strict go/no-go on a11y, copy, localization, usability | Checklist | `/design-ship` |
| **Ops** | Single verbs once trust exists | "commit", "deploy" | `/deploy` |

The first three modes are front-loaded and *slow* on purpose. The payoff comes in the feedback
rounds, where a one-sentence observation reliably becomes a diagnosed, tested, deployed fix
because the foundations (checks, docs, flags) let Claude move safely at speed.

**End every round the same way:** checks green → commit → deploy → docs and counts updated. If a
round can't end that way, it isn't done.

---

## 2. Framing: `PLAN.md`

Run `/design-frame`. It asks for the source artifact, then four questions (Who? What's the unmet
need? Why us? Why now?), then strategy (approach, tradeoffs, what it builds on). It writes
`PLAN.md` with a **Brief** section and a **Build plan** section (what to build, key decisions, out
of scope, open questions).

Lessons:
- **Frame to the level the work needs.** A 70%-locked frame with explicit open questions beats a
  forced 100% frame full of invented answers. It's fine to say "thin".
- **Draft and confirm beats open-ended asking.** If the user already gave context, play back a
  synthesized answer ("does this hold?") instead of re-asking.
- **Separate the artifact's audience from the feature's audience.** Execs set the fidelity and
  narrative. End users set the design target.
- **State the fidelity bar and non-goals explicitly** so nobody builds them by accident.

---

## 3. Planned build: `BUILD-PROMPTS.md`

Before building, ask Claude for a numbered prompt plan. Review it like a project schedule, then
run it one prompt at a time. Template: `kickstarter/prototype-app/BUILD-PROMPTS.md`.

**Canonical phase order**

0. **Foundations:** scaffold confirmed green, tokens plus a `?page=tokens` preview route,
   primitives, data types ("show me the types before the seed"), seed data, and the single most
   load-bearing component.
1. **Host chrome:** the normal app the concept lives inside. Freeze it after this checkpoint.
2. **The core spine.** Spend time here. This is the fidelity checkpoint.
3. **Features:** one phase per concern.
4. **Polish passes:** motion, contrast, touch targets, copy, a11y.
5. **Demo layer:** `copy.ts`, links sheet, presenter mode, tour, `DEMO.md`.
6. **Final sweep:** checklist plus README decision log.
7. **Handoff:** `CLAUDE.md` refresh, `HANDOFF.md`, cold-reader simulation.

**Prompt anatomy** (every prompt):

> **Prompt N. [Name].** Build [specific thing]. It must [A], [B], [C]. Don't [X]; [reason]. Reuse
> [existing piece] rather than building a parallel version. When done, run [verification] and
> report what you observed. *(Optional gate: "Show me the structure before anything else. Stop
> there.")*

**Mechanics**
- Each phase ends with `Checkpoint: <observable state>. Commit.` One commit per green
  checkpoint. Tag milestones (`v1`, `fidelity-v2`).
- **Revisions:** inserted prompts get half-numbers (`10.5`) so nothing renumbers. Cut prompts
  leave a tombstone. A dated addendum at the top wins over the body.
- **Review the spec before building.** A multi-lens review of `BUILD-PROMPTS.md` (with
  adversarial verification of each finding) removes whole classes of rework: mock data layers,
  shared components spec'd before first use, demo-state controls, simulated fallbacks for
  interactions the web can't do.
- **Parallel agents** building variants need a written contract (`VARIANT-CONTRACT.md`): write
  only inside your folder, keep the export name, don't start or stop the dev server, here's the
  typecheck command, and here are the shared primitive APIs. The orchestrator pre-assigns IDs and
  positions.

**Steering phrases to keep handy**
- "Smaller. Show me the plan before you write files."
- "You hardcoded a value. Token it."
- "That's a new pattern. Which existing one does it evolve? Argue for it or reuse."
- "You're about to fork X. Evolve it in place instead."
- "That's not real. Say so in the docs instead of quietly mocking it."
- "Don't narrate. Run the check and quote the output."

---

## 4. Feedback-round prompt patterns

**a. Planned-build prompts.** See §3.

**b. Symptom-first bug reports.** Never prescribe the fix.
> "The video restarts when I skip ahead."

Claude reproduces it with probes, finds the real cause (often not where you'd guess), fixes it,
and adds a regression check. If you have a hypothesis, offer it as a question: "Would a lower
bitrate stream fix the latency?" You get the tradeoff explained instead of a wrong fix applied
blindly.

**c. Source-of-truth anchoring.** Point, don't describe. Attach the Figma node, screenshot, or
brief and ask for *alignment with it*. Measure the reference; never guess by eye twice. Extract
real vectors rather than redrawing them.

**d. Experience directives.** Say what the viewer should feel or do, and include the why.
> "Show the three options side by side, playing in real time, so the viewer understands the
> differences."

The "so that..." clause steers a dozen decisions you didn't specify.

**e. Purpose statements** unlock judgment calls.
> "The goal is to show the actual experience as a user would see it."

**f. Exploration framing.** "Explore X" means build it as a flag variant, not a replacement.

**g. Ops verbs**, once trust exists: "commit", "deploy". Don't start here. Earn it with the
verification harness first.

---

## 5. Working agreements (put these in every project's `CLAUDE.md`)

1. **Every behavioral difference is a URL flag.** A link is a complete, reproducible
   configuration. Nobody asks "which version is this?"
2. **One renderer, not N.** All variants render through one component that branches on config.
   Parity is structural, and live switches don't remount state.
3. **Verify, don't narrate.** When asked to verify, run the dev server or checks and report what
   was observed. Every feedback round adds a regression check for what it fixed.
4. **Docs are the memory.** `CLAUDE.md` holds the rules (auto-read). `HANDOFF.md` is the
   narrative snapshot. The README decision log records every default with its rationale and the
   flag that flips it.
5. **Keep the baseline honest.** Don't soften the as-is option and don't flatter with best-case
   content. Prototypes that flatter every option decide nothing.
6. **Honest mocks.** Label what's real vs mocked. Fall back to an authored or generic value, never
   a plausible-but-wrong guess.
7. **All user-facing copy in one file** (`src/demo/copy.ts`), so a copy pass is one reviewable diff.
8. **Show the plan before any big multi-file change.**
9. **Ask the collaboration mode up front.** One prompt at a time with review and commit, or
   autonomous? It varies by project.
10. **Approval before outward writes.** Messages, invites, publishing, pushing to shared remotes,
    and deploys to shared URLs: draft, show, and wait for a yes.
11. **Publish-or-fail.** An agent finishing without errors isn't proof. Check that the required
    artifacts exist before calling a run complete.

---

## 6. The doc set

**Core (every project).** Templates in `kickstarter/prototype-app/`:

| Doc | Purpose |
|---|---|
| `CLAUDE.md` | Rules Claude auto-reads: purpose, non-negotiables, stack, core model, folder map, design rules, always/never, after-every-step checklist, how to work with me, **hard-won gotchas**, verification commands, project notes |
| `PLAN.md` | Brief + build plan (written by `/design-frame`) |
| `BUILD-PROMPTS.md` | The numbered prompt plan |
| `HANDOFF.md` | Narrative snapshot for a fresh session: where things stand, read-in-order list, architecture in five lines, flag surface, session log, open threads, 3-command orientation |
| `README.md` | Quickstart, keyboard map, **decision log** (Default, Rationale, Flip it), what's real vs mocked, verification, known gaps |

**Decision-artifact set (as needed).** Templates in `templates/docs/`:

| Doc | Use when |
|---|---|
| `EVAL.md` | Before showing anyone: adversarial multi-grader scorecard against the brief |
| `QA.md` | Requirement-by-requirement compliance, each item with how it was verified |
| `PARITY.md` | Comparing variants: everything but the intended differences must be identical |
| `TESTING.md` | 5-minute unmoderated cold-user protocol, plus an automated replay |
| `MOTION.md` | Motion inventory: element, trigger, duration, easing, properties |
| `DEMO.md` | Golden-path presenter script: beats, talking points, what each beat proves |
| `RECORDING.md` | Walkthrough video scripts, reproducible from the keyboard |
| `WRITEUP.md` | Short stakeholder narrative |
| `PROCESS.md` | How it was built, for other leads to copy |

---

## 7. The harness (built into the kickstarter)

- **`src/app/config.ts`**: typed `PrototypeConfig`, `defaultConfig`, `oneOf()` enum parsers,
  `parseConfig` / `serializeConfig` (writes only non-default values).
- **Standard params:** `present=1` (presenter: hide tooling, auto-hide cursor), `debug=1` (HUD),
  `onboard=0` (skip first-run), `tour=1` (hands-free), `page=links` (deep-link sheet with copy
  buttons), `page=tokens` (token preview), `page=compare` (synced side-by-side).
- **Keyboard:** `?` opens help and `P` opens the control panel. The same map works in normal and
  presenter modes.
- **Test bridge:** `window.__proto` exposes state and actions. Suites read it for assertions; the
  cold-user suite never drives through it.
- **Device frame:** mobile-first at 390×844 by default.
- **State:** React context plus hooks, with a provider per device frame so two frames can run side
  by side. No Redux.
- **Mock data:** a realistic seed with real-feeling names. Deterministic (no `Date.now()`-seeded
  randomness in render). Deliberately imperfect assets so contrast treatments get tested honestly.
- **Service seams:** `src/services/*` with stable interfaces, mocked now, real implementation
  later.
- **Verification:** `scripts/verify-*.mjs` Playwright suites that print `PASS`/`FAIL  name — detail`
  and a summary, exiting 1 on any failure. They test behavior, not styling.

---

## 8. Hard-won gotchas (do not relearn these)

**Verification and preview**
1. An embedded or IDE preview pane is a **hidden page**. Chromium throttles rAF and timers there
   and may suspend video-only media. Use it for looks; verify behavior in Playwright. Give
   generated clips a silent audio track.
2. Verify with a running dev server and a screenshot, not a clean typecheck. Pre-existing type
   errors aren't yours to fix.
3. Opacity-from-0 entrance animations can be caught invisible in headless screenshots. Use
   transform-based entrances with fully opaque resting states.
4. Derive timed progress from elapsed `performance.now()`, not fixed intervals, because background
   tabs throttle timers.
5. Don't read post-click state in the same synchronous eval as the click; React updates
   asynchronously.
6. Wizards that keep every step mounted: find the active step by transform or `aria-hidden`, not
   the first DOM match.
7. Check overflow against the component's own scroll container, not the viewport.
8. If screenshot tooling returns stale frames, restart the server instead of retrying.
9. Portals mounted outside the theme root silently lose every CSS token.
10. Onboarding overlays intercept input in fresh browser profiles. Every test and capture URL needs
    `onboard=0`.
11. Wall-clock-timed tests fail falsely if the display sleeps. On macOS, wrap long runs in
    `caffeinate -dims`.
12. `page.waitForFunction(fn, {timeout})` treats the options as `arg`. Always write
    `(fn, null, {timeout})`.
13. A fresh machine needs `npx playwright install chromium`.

**Build and tooling**
14. A trailing `# comment` in a `package.json` script becomes Vite's project root, which serves a
    blank page with no error.
15. Vite silently bumps the port if it's taken, and tests hardcode it. Use `strictPort: true`, and
    `curl` for an existing server before starting another. Register the port in
    `.claude/launch.json` with a **unique** config name, since name collisions resolve to the wrong
    app.
16. Run `tsc` from the project directory, not from `~`.
17. Commit a project `.npmrc` pinning the registry you expect. Corporate mirrors break installs
    off-network.
18. A fresh repo may lack a git identity. Set it or use inline `-c user.name=... -c user.email=...`.
19. Keep reference material in a gitignored `/reference` folder with the rule "never import from
    /reference". A `NOTES.md` there records "worth mimicking / to avoid" with file:line citations.

**React and runtime**
20. Separate variant components at the same tree position remount on switch. Use one renderer
    that branches on config.
21. `useMemo` any array or object passed as a hook dependency in a rAF-driven render, or the engine
    is torn down every frame (symptom: repeated boot logs).
22. Multi-pane sync: buffer media to blobs first and use a gated start. Never hard-seek a lagging
    pane toward a master clock; pause the group and resume together. Read live state, not render
    state, in click handlers.
23. Animated state indicators must track real state. For example, equalizer bars freeze when muted.
24. Fake video credibly: a still with slow drift, ticking progress, and cycling captions, with the
    parent owning the playback state.

**Deploy**
25. Subpath static hosts need `base: "./"` (or a conditional base) plus query-param routes or a
    router basename. A flat base leaks the subpath into dev.
26. SPAs need deep-link fallback on static hosts (`_redirects`, `vercel.json` rewrites, or a
    `404.html` copy).
27. Hosts cache `index.html` hard. Hard-refresh after deploy. Check the CLI's `--help` rather than
    trusting docs for flag names.

**Agents**
28. In multi-agent builds, run a mount audit (grep the imports) before review. A component that's
    never imported is implicit scope.
29. Large review sweeps benefit from parallel critics plus a fact-check pass on every citation.
30. Launch Agent-SDK apps outside a Claude Code session, which can inject a stale API key into the
    environment.

---

## 9. Run this on a new project: checklist

1. `/setup-project` in an empty folder.
2. `/design-frame`, which produces `PLAN.md`. Include the decision it serves, hard requirements,
   open questions, success criteria, and non-goals.
3. Ask for a `BUILD-PROMPTS.md` and review it (optionally with a multi-lens spec review) before
   building.
4. Demand a verification harness in the plan, because it makes later one-line rounds safe.
5. Run the plan one prompt at a time. Commit at each green checkpoint.
6. Eval against the brief before showing anyone (`templates/docs/EVAL.md`). The gaps become your
   next phases.
7. Package early: refresh `CLAUDE.md`, write `HANDOFF.md`, and prove it with a cold-reader
   simulation.
8. Iterate in short prompts (§4). Attach references instead of describing them.
9. `/design-ship` before it goes in front of the real audience. `/deploy`.
10. Every couple of weeks, run `/skill-refine` in the kit repo.
