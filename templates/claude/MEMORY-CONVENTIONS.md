# Memory conventions (Claude Code auto-memory)

Claude Code keeps per-project memory under `~/.claude/projects/<path-slug>/memory/`. These
conventions kept memory useful across roughly ten prototype projects.

- **`MEMORY.md` is an index only**: one line per memory, formatted
  `- [Title](file.md) — hook`. The hook carries the key fact: path, port, canonical doc, gotcha.
- **One file per memory**, named by type: `project_<name>.md`, `feedback_<topic>.md`,
  `reference_<topic>.md`.
- **Body**: the fact, then `**Why:**` and `**How to apply:**`. Link related memories with
  `[[name]]`.
- **Project memories point at the in-repo source of truth** (CLAUDE.md, HANDOFF.md, PLAN.md):
  "read first each session". Don't duplicate repo content into memory.
- Save non-obvious things only: collaboration preferences, environment quirks, where a project
  lives and its port, and corrections the user gave.

## Example: project memory

```markdown
---
name: checkout-rethink
description: Checkout redesign prototype at ~/checkout-rethink (port 5212); BUILD-PROMPTS.md is canonical
metadata:
  type: project
---
Prototype of the three-step checkout concept for the Q3 review. Repo ~/checkout-rethink, dev port
5212, deployed to Vercel (checkout-rethink.vercel.app).

**Why:** leadership review on 2026-10-15 needs A/B of guest vs account-first.
**How to apply:** read the repo CLAUDE.md and HANDOFF.md first each session; work one
BUILD-PROMPTS step at a time; the user commits after reviewing each one.
```

## Example: feedback memory

```markdown
---
name: publish-or-fail
description: Agent runs must verify required artifacts exist before reporting completion
metadata:
  type: feedback
---
Never report a multi-step publish as done because the agent finished without errors.

**Why:** a run once "completed" while silently skipping the upload step.
**How to apply:** list the required artifacts up front; check each one exists (URL resolves,
file present) before saying done; otherwise report which step failed.
```
