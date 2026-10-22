#!/usr/bin/env bash
# Install prototype-system-kit skills into Claude Code and Cursor, and optionally a global
# ~/.claude/CLAUDE.md. Idempotent. Never overwrites anything that isn't already ours.
#
#   ./bootstrap.sh            install
#   ./bootstrap.sh --dry-run  show what would happen
set -euo pipefail

KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DRY=0; [[ "${1:-}" == "--dry-run" ]] && DRY=1
run() { if (( DRY )); then echo "  [dry-run] $*"; else "$@"; fi; }
ok()   { printf "  \033[32m✓\033[0m %s\n" "$*"; }
warn() { printf "  \033[33m!\033[0m %s\n" "$*"; }

echo "prototype-system-kit at $KIT"
echo
echo "Prerequisites"
command -v node >/dev/null && ok "node $(node -v)" || warn "node not found (need 20+): https://nodejs.org"
command -v npm  >/dev/null && ok "npm $(npm -v)"   || warn "npm not found"
if command -v git >/dev/null && git --version >/dev/null 2>&1; then ok "$(git --version)"
else warn "git missing or blocked (macOS: run 'sudo xcodebuild -license accept' or 'xcode-select --install')"; fi
command -v gh     >/dev/null && ok "gh (GitHub CLI)" || warn "gh not found (optional; used for PRs and GitHub Pages)"
command -v claude >/dev/null && ok "claude CLI"      || warn "claude CLI not found (fine if you use the desktop app or IDE extension)"

echo
echo "Skills"
link_skills() { # $1 = target skills dir
  local target="$1"
  run mkdir -p "$target"
  for src in "$KIT"/.claude/skills/*/; do
    local name; name="$(basename "$src")"; src="${src%/}"
    local dest="$target/$name"
    if [[ -L "$dest" && "$(readlink "$dest")" == "$src" ]]; then ok "$dest (already linked)"
    elif [[ -e "$dest" || -L "$dest" ]]; then
      warn "$dest exists and isn't this kit's; skipped. Remove or rename it, then re-run."
    else run ln -s "$src" "$dest"; ok "$dest → $src"; fi
  done
}
link_skills "$HOME/.claude/skills"
if [[ -d "$HOME/.cursor" ]]; then link_skills "$HOME/.cursor/skills"
else warn "~/.cursor not found; skipping Cursor (re-run after installing Cursor)"; fi

echo
echo "Global CLAUDE.md"
if [[ -e "$HOME/.claude/CLAUDE.md" ]]; then
  ok "~/.claude/CLAUDE.md exists; left untouched. Compare with templates/claude/CLAUDE.global.md"
elif (( DRY )); then echo "  [dry-run] would offer to copy templates/claude/CLAUDE.global.md"
elif [[ -t 0 ]]; then
  read -r -p "  Install the working agreements as ~/.claude/CLAUDE.md? [y/N] " yn
  [[ "$yn" =~ ^[Yy]$ ]] && cp "$KIT/templates/claude/CLAUDE.global.md" "$HOME/.claude/CLAUDE.md" && ok "installed"
else warn "non-interactive; skipped. Copy templates/claude/CLAUDE.global.md yourself if you want it"; fi

echo
if [[ "$KIT" != "$HOME/prototype-system-kit" ]]; then
  warn "Kit isn't at ~/prototype-system-kit. Add to your shell profile:"
  echo "      export PROTO_KIT_HOME=\"$KIT\""
fi
echo "Next: restart Claude Code / Cursor, work through CUSTOMIZE.md, then run 'node lint.mjs'."
