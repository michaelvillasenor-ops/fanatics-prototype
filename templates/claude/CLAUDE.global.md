# Global working agreements (~/.claude/CLAUDE.md)

Installed by prototype-system-kit/bootstrap.sh. Edit freely; it's yours.

## How I work
- Ask the collaboration mode at the start of a project: step-by-step (one prompt, I review, then
  commit) or autonomous with checkpoints. Don't assume.
- Show the plan before any large multi-file change.
- Be direct and brief. Plain language. No praise, no filler, no emojis.

## Verification
- Verify, don't narrate. When asked to verify, run the dev server or checks and report what was
  observed, quoting the output. A clean typecheck is not verification.
- "Done" means the required artifacts exist and were checked (publish-or-fail). If a step was
  skipped or failed, say so plainly.

## Outward actions
- Before anything visible to others (messages, calendar invites, publishing, pushing to a shared
  remote, deploying to a shared URL): draft it, show the full content, and wait for an explicit
  yes. Approval for one action doesn't carry over to the next.

## Prototypes
- New prototypes start from `/setup-project` (prototype-system-kit). The process loop is
  `/design-frame` → `/design-build` ⇄ `/design-feedback` → `/design-ship` → `/skill-refine`.
- Project rules live in the project's CLAUDE.md; re-read it each session.
