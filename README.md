# Prototype System Kit: Fanatics Markets (FMX) edition

> **This copy is customized for Fanatics Markets**, on the FUEL design system. It was forked
> from [villasenormichael-cyber/prototype-framework](https://github.com/villasenormichael-cyber/prototype-framework)
> on 2026-10-22.
>
> - **Tokens:** `kickstarter/prototype-app/src/tokens/tokens.css` maps the kit onto FUEL's dark
>   palette, spacing, radius and Inter/Anton type. Values were read from the FMX Component
>   Library via the Figma MCP.
> - **Domain:** [`specialty/fmx-domain.md`](specialty/fmx-domain.md) covers prices (¢ / % / x,
>   never American odds), the fee schedule, the canonical 907 @ 48¢ scenario and settlement.
>   The kickstarter's `src/data/fmx.ts` implements it, and the seed uses it.
> - **Live sources:** the remote Figma MCP (file keys in [`CLAUDE.md`](CLAUDE.md)), plus the
>   Fanatics skills (`fmx-figma`, `responsible-gaming-check`) wired into build, feedback and
>   ship. See [`external-resources.md`](external-resources.md).
> - **Still open:** FMX voice and case rule, light theme, page headline style, motion tokens,
>   brand and principles sources, deploy target. See the status table at the top of
>   [`CUSTOMIZE.md`](CUSTOMIZE.md).
>
> This kit lives outside `~/prototype-system-kit`, so add this to your shell profile:
> `export PROTO_KIT_HOME="$HOME/Desktop/MV Root/Work/Fanatics/Fanproto"`

A portable, company-agnostic version of a Claude Code + Cursor + Git prototyping system that was
battle-tested across ~8 decision prototypes. It packages three things:

1. **A context pack**: layered markdown that teaches Claude what "good" looks like in *your*
   environment (brand, design system, voice, tacit craft knowledge), plus a five-skill process loop:

   ```
   frame  →  build  ⇄  feedback  →  ship  →  refine
   ```

2. **A kickstarter**: a runnable Vite + React + TypeScript prototype template with the harness
   patterns that made past prototypes fast and safe to iterate on (URL-flag config, device frame,
   token layer, copy centralization, test bridge, Playwright PASS/FAIL suites, pinned ports).

3. **The playbook**: the working method (brief → planned prompt build → eval → handoff →
   short feedback rounds), the doc set every project carries, and the hard-won gotchas.

Nothing in here is tied to a specific company. Every place that needs *your* environment's
content is a clearly marked template. See [`CUSTOMIZE.md`](CUSTOMIZE.md).

---

## Setup (about 15 minutes)

### Prerequisites

- Node 20+ and npm
- Git, and optionally the GitHub CLI (`gh`)
- [Claude Code](https://claude.com/claude-code) (CLI, desktop, or IDE extension)
- Cursor (optional; it shares the same skills)

### 1. Put the kit somewhere stable

```bash
git clone <your-remote>/prototype-system-kit.git ~/prototype-system-kit
```

The skills look for the kit at `$PROTO_KIT_HOME`, then `~/prototype-system-kit`. If you keep it
elsewhere, export `PROTO_KIT_HOME` in your shell profile.

### 2. Install the skills into Claude Code and Cursor

```bash
~/prototype-system-kit/bootstrap.sh
```

This symlinks every skill in `.claude/skills/` into `~/.claude/skills/` and `~/.cursor/skills/`,
offers to install a global `~/.claude/CLAUDE.md` with the working agreements (only if you don't
have one), and checks prerequisites. It never overwrites anything without asking. Re-run it any
time; it's idempotent. Use `--dry-run` to preview.

Restart Claude Code / Cursor so the skills appear.

### 3. Fill in your environment

Work through [`CUSTOMIZE.md`](CUSTOMIZE.md). The minimum viable pass is about an hour:
`foundations/brand.md`, `systems/visual.md` (your tokens), `systems/voice-and-tone.md`, and the
"High-signal rules" block in `CLAUDE.md`. Everything else can grow through `/skill-refine`.

```bash
node lint.mjs
```

keeps the pack structurally sound (frontmatter, bundle includes, links, skill references).

### 4. Start your first prototype

In any empty project folder:

```
/setup-project        # copies the kickstarter, pins a port, git-inits, installs, verifies
/design-frame         # locks the why; writes PLAN.md
/design-build         # builds against PLAN.md
/design-feedback      # strategic or craft lens; alternate with build
/design-ship          # strict go/no-go gate
/deploy               # static deploy to Vercel / Netlify / GitHub Pages / Cloudflare
/skill-refine         # periodically, in this repo: turn learnings/ into pack improvements
```

---

## What's in the box

| Path | What it is |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | AI entry point for the context pack: routing, high-signal rules, live sources |
| [`PLAYBOOK.md`](PLAYBOOK.md) | The method, prompt patterns, working agreements, and gotchas. **Read this first.** |
| [`CUSTOMIZE.md`](CUSTOMIZE.md) | Everything you need to fill in for your environment, in priority order |
| `foundations/` | The *why*: principles, brand, AI principles, tacit knowledge |
| `systems/` | The *what*: visual, components, motion, surfaces, interaction patterns, voice, writing, a11y |
| `specialty/` | Narrow techniques: localization (and room for more) |
| `bundles/` | Task-shaped context packs the skills load |
| `learnings/` | Dated reflections the skills write after each run; input to `/skill-refine` |
| `.claude/skills/` | The loop skills plus `setup-project`, `deploy`, and `integrate-claude` |
| `kickstarter/prototype-app/` | The runnable prototype template `/setup-project` copies |
| `templates/docs/` | Optional project docs: EVAL, QA, PARITY, TESTING, MOTION, DEMO, RECORDING, WRITEUP, PROCESS |
| `templates/claude/` | Global `CLAUDE.md` and memory conventions |
| `templates/cursor/` | `mcp.json` example and a project rule that points Cursor at `CLAUDE.md` |
| [`context.md`](context.md) | Raw source register: paste source material here, distill it into the layers via PR |
| [`external-resources.md`](external-resources.md) | Registry of kickstarters, component libraries, and externally-owned skills |
| `lint.mjs` | Zero-dependency structural lint |
| `bootstrap.sh` | Installs the skills and global config |

## How the pieces fit

```
                  ┌───────────────────────── this repo ─────────────────────────┐
 you ── /skill ─► │ .claude/skills/<skill>/SKILL.md                             │
                  │     │ resolves kit root ($PROTO_KIT_HOME or ~/prototype-…)  │
                  │     ├─► bundles/<task>.md ──includes:──► foundations/ systems/ specialty/
                  │     ├─► mcp-first: live sources (design-system MCP, Figma, etc.)
                  │     └─► writes learnings/YYYY-MM-DD-<skill>-<slug>.md ──► /skill-refine ──► PR
                  └────────────────────────────────────────────────────────────┘
                         │
                         ▼
   your project/  ◄── /setup-project copies kickstarter/prototype-app/
     CLAUDE.md  PLAN.md  BUILD-PROMPTS.md  HANDOFF.md  README.md
     src/  scripts/verify-*.mjs  .claude/launch.json  .cursor/rules/
```

## Credits

The process loop, context-pack architecture, and project methods are adapted from internal work
at a previous team. All brand- and company-specific content has been removed and replaced with
templates.
