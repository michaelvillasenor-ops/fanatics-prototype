# Cursor setup

Cursor and Claude Code share the same skills and project rules:

- **Skills:** `bootstrap.sh` symlinks the kit's `.claude/skills/*` into `~/.cursor/skills/` as
  well as `~/.claude/skills/`. Both tools read the same `SKILL.md` format.
- **Project rules:** every scaffolded project ships `.cursor/rules/project.mdc`
  (`alwaysApply: true`), which points Cursor at the project's `CLAUDE.md`, plus an `AGENTS.md`
  that does the same. There's one source of truth, and no rule drift between tools.
- **MCP:** copy `mcp.json.example` to `~/.cursor/mcp.json` and edit it. For Claude Code, add the
  same servers with `claude mcp add <name> --transport http <url>`, or with a project `.mcp.json`.
- Don't write into `~/.cursor/skills-cursor/`. That folder holds Cursor's own system-managed skills.
