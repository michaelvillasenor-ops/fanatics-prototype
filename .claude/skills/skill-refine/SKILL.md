---
name: skill-refine
description: Synthesize accumulated learnings from skill use into proposed improvements to the context pack. Use when the user says "refine the skills", "update tacit knowledge", "synthesize learnings", "what have we learned", or "improve the context pack". Reads learnings/, clusters themes, and drafts a PR with proposed edits to foundations/tacit-knowledge.md or other targeted files. Meta-skill, invoked periodically by a maintainer rather than in every project. It acts on the system itself, not on a design artifact.
---

# Refine: feed learnings back into the system

This closes the self-improving loop. It reads the reflections in `learnings/`, clusters recurring
friction, and drafts a PR proposing edits to the pack.

It's run by a maintainer, **biweekly** or whenever `learnings/` has grown by 10 or more
unprocessed files.

## Context root

Work in the **prototype-system-kit** root: the CWD if it has `bundles/` and `systems/`, else
`$PROTO_KIT_HOME`, else `~/prototype-system-kit/`, else this SKILL.md's real path up three levels.
`cd` there before any git commands.

## Read the learnings

1. List `learnings/*.md` (skip `.gitkeep` and `README.md`). A file is *processed* if it contains
   `> Synthesized into`.
2. Default to all unprocessed files. Otherwise ask: *"All unprocessed, or just the last N days?"*
3. Read each one and group by `skill:`.

## Cluster themes

- **What was missing**, repeated → an undocumented rule.
- **What felt forced**, repeated → a rule needs nuance or conditions, or should go.
- **Proposed addition** → a draft to refine, not finished prose.

**Threshold:** a theme appears in **3 or more files**, OR it's a single high-conviction proposal
that closes an obvious gap. Don't synthesize on thin evidence.

## Route the changes

| Theme type | Target |
| --- | --- |
| Cross-cutting practitioner wisdom (the default) | `foundations/tacit-knowledge.md` |
| Strategic or framing nuance | `foundations/principles.md` or `foundations/brand.md` |
| Visual or component | `systems/visual.md` or `systems/components.md` |
| Copy, voice, tone | `systems/voice-and-tone.md` or `systems/writing.md` |
| Motion | `systems/motion.md` |
| Accessibility | `systems/accessibility.md` |
| Localization | `specialty/localization.md` |
| Surfaces or flows | `systems/surfaces.md` or `systems/interaction-patterns.md` |
| Workflow-specific | the relevant bundle's **Quick rules to lead with** block |
| The skill's own process | that skill's `SKILL.md` (flag it as a skill change in the PR) |
| Project method or gotcha | `PLAYBOOK.md` and, if it's a template default, the kickstarter's `CLAUDE.md` |

## Draft the PR

**Show a diff for every change before modifying any file. Never edit without confirmation.**

For each change:
1. **Proposed edit**: a markdown diff against the target.
2. **Why**: one sentence.
3. **Evidence**: the learnings files that support it, with a short quote from each.

After approval:
- Apply the edits and run `node lint.mjs`.
- Offer to create a branch `refine/YYYY-MM-DD-<theme-slug>`, commit, and open a PR with
  `gh pr create` (HEREDOC body listing each edit and its evidence trail). **No auto-merge;** human
  review is the design. Pushing and opening the PR are outward actions, so confirm before doing
  them.
- Append `> Synthesized into <PR URL or branch> on <YYYY-MM-DD>.` to each source learning.

## Principles

- **Show diffs first, edit second.**
- **Cite evidence.** No rules "from intuition".
- **Be willing to remove.** The pack should shrink as much as it grows.
- **Don't touch bundles' `includes:` or `mcp-first:`** in a refine pass; those are deliberate
  structural PRs.
- Keep sensitive material out of the PR body.

## Hand-off

End with: *"Refined. The context pack is a little smarter than it was."*
