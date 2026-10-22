---
name: setup-project
description: Scaffold a new prototype from the kit's kickstarter (Vite + React + TypeScript with the URL-flag harness, token layer, device frame, copy file, test bridge, and Playwright verify suites). It pins a unique dev port, registers it for the preview tool, git-inits, installs, and proves it runs. Use when the user runs /setup-project, says "start a new prototype", "scaffold a project", "set up the kickstarter", or when /design-build finds no project in the working directory.
---

# Setup project: from empty folder to a verified, running prototype

## Context root

The kickstarter lives at `<kit>/kickstarter/prototype-app/`, where `<kit>` is `$PROTO_KIT_HOME`,
else `~/prototype-system-kit/`, else this SKILL.md's real path up three levels.

## Step 0: ask (one message, then wait)

> Setting up a new prototype. Three quick questions:
> 1. **Project name** (kebab-case, e.g. `checkout-rethink`)?
> 2. **Where?** Here (`<cwd>`), or a new folder `./<name>`? *(default: new folder)*
> 3. **Primary viewport?** Mobile 393×852 *(default)*, desktop 1440×900, or both?

Pre-fill any answers the user already gave.

## Step 1: scaffold (deterministic script)

```bash
node "<kit>/kickstarter/new-project.mjs" --name <name> --dest <dest> [--viewport mobile|desktop]
```

The script:
- Copies `prototype-app/` (excluding `node_modules`, `dist`, and `captures`)
- Replaces the `__PROJECT_NAME__` and `__PORT__` tokens
- Picks a free port starting at 5200, skipping any port in `~/.claude/launch.json` or currently
  listening
- Writes `.claude/launch.json` in the project and registers the project in `~/.claude/launch.json`
  (a unique config name, which avoids preview-tool name collisions)

It refuses to write into a non-empty destination. Read its output for the chosen port.

## Step 2: install

```bash
cd <dest> && npm install && npx playwright install chromium
```

If the install fails on a corporate mirror, the project's committed `.npmrc` already pins the
public registry. Report the error and ask before changing registries.

If your design-system package is listed in `<kit>/external-resources.md` under **Design-system
packages**, install it now and wire its CSS or theme at the top of `src/main.tsx`.

## Step 3: git

```bash
git init -q && git add -A && git commit -qm "Scaffold <name> from prototype-system-kit"
```

If git has no identity, ask the user for a name and email (or use inline `-c user.name=... -c
user.email=...` with values they give you). Don't invent an identity. Don't create a remote or
push unless asked.

## Step 4: prove it runs

1. Start the dev server with the preview tool (`preview_start` with the project's config name) or
   `npm run dev` in the background.
2. `npm run typecheck`
3. `npm run verify`, then quote the summary line. The smoke suite checks the harness: default
   render, URL-flag round trip, `?page=tokens`, `?page=links`, the test bridge, and no console
   errors.
4. Take one screenshot of the default screen.

## Step 5: orient the user

> **<name>** is running at `http://localhost:<port>/`.
>
> - `?page=tokens`: token preview. Swap in your design system in `src/tokens/tokens.css`.
> - `?page=links`: deep-link sheet. Every config is a URL.
> - `P`: control panel. `?`: help.
> - Build rules for Claude live in `CLAUDE.md`. Fill in its PURPOSE section, or run
>   `/design-frame` to write `PLAN.md`.
>
> Next: `/design-frame` (recommended), or `/design-build` if the framing already exists.

## Must not

- Modify the kit's `kickstarter/` itself.
- Add a UI framework or CSS framework unless the user asks. The design system goes through tokens.
- Leave the project unverified: step 4 is required.
