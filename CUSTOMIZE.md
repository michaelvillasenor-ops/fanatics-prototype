# Customize for your environment

## FMX status (2026-10-22)

| Item | Status | Where |
|---|---|---|
| Brand name, spacing scale, touch target, theme, viewport | ✅ Filled: Fanatics Markets; FUEL space; 44px; dark; 393×852 | everywhere |
| Tokens (dark): colour, space, radius, type | ✅ Read from the FMX Component Library via the Figma MCP | `tokens.css`, `systems/visual.md` |
| Components and lookup order | ✅ FMX and FUEL Figma libraries; no web package | `systems/components.md` |
| Live sources | ✅ Remote Figma MCP with file keys; `.mcp.json` in the kickstarter | `CLAUDE.md`, `external-resources.md` |
| Domain rules and seed data | ✅ From the `fmx-figure-audit` skill | `specialty/fmx-domain.md`, `src/data/` |
| Fanatics skills in the loop | ✅ RG check, figure audit, component review | `design-build`, `design-feedback`, `design-ship` |
| High-signal rules | ✅ 12 of 13 sourced | `CLAUDE.md` |
| `text/primary-inverse` value | ⚠ Conflict: `#000000` vs `#111111`; confirm with FUEL | `systems/visual.md` |
| Light theme | ❌ Not read from FUEL `color.light` yet | `tokens.css` |
| Page headline style | ❌ No FUEL style above 18px found; 24px stand-in | `tokens.css` |
| `{{VOICE_TRAITS}}`, `{{CASE_RULE}}` | ❌ No FMX voice or content guide sourced | `systems/voice-and-tone.md`, bundles |
| Motion tokens (`{{EASE_*}}`) | ❌ | `systems/motion.md` |
| Brand, principles and AI-principles sources | ❌ | `foundations/` |
| Surfaces and interaction patterns | ❌ Fill from Portfolio / Orders screens | `systems/surfaces.md`, `systems/interaction-patterns.md` |
| Deploy target | ❌ | `.claude/skills/deploy/SKILL.md` |

The generic guide follows.

Work top to bottom. Stop after §1–§3 if you're short on time; the loop works, and
`/skill-refine` will tell you what's missing as you use it.

Find every remaining placeholder with:

```bash
grep -rn "{{" --include=*.md --include=*.ts --include=*.css . | grep -v node_modules
```

## §1. Identity (15 min): required

| Placeholder | Where | Example |
|---|---|---|
| `Fanatics Markets` | everywhere | "Acme" |
| `{{VOICE_TRAITS}}` | `CLAUDE.md`, `systems/voice-and-tone.md`, bundles | "warm, direct, a little playful" |
| `{{CASE_RULE}}` | same | "Sentence case, contractions" |
| `FUEL space: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64` | `CLAUDE.md`, `systems/visual.md` | "4, 8, 12, 16, 24, 32, 48" |
| `44px` | `CLAUDE.md`, `systems/accessibility.md` | "44px" |
| `dark` | `systems/visual.md`, kickstarter tokens | "light" |
| `393×852 mobile` | `/design-build`, kickstarter | "390×844 mobile" or "1440×900 desktop" |

Then rewrite the **High-signal rules** block in `CLAUDE.md` and the **Quick rules to lead with**
in each bundle. These are the highest-leverage lines in the pack.

## §2. Design system (30 min): required for build and feedback

1. **Tokens:** `kickstarter/prototype-app/src/tokens/tokens.css`. Map your design system's
   semantic tokens onto the kit's names (`--color-bg`, `--color-text`, `--color-accent`,
   `--space-*`, `--radius-*`, `--font-*`, `--motion-*`), or rename the kit's names to yours and
   grep-replace. Keep the names semantic.
2. **Components:** `systems/components.md`. Name your component library, its install command,
   setup essentials, and the lookup order (library → reference scaffolds → hand-roll).
3. If your design system ships an npm package, add it to `/setup-project` step 4 and to
   `external-resources.md`.
4. `systems/visual.md`, `systems/motion.md`: fill the tables from your design system docs.

## §3. Voice (15 min): required for copy review

`systems/voice-and-tone.md` (personality dials, tone by context, tone matrix) and
`systems/writing.md` (terminology table, banned words, preferred verbs).

## §4. Live sources (MCPs)

Configure the MCP servers you have access to:
- Claude Code: `claude mcp add <name> --transport http <url>`, or a project `.mcp.json`
- Cursor: `~/.cursor/mcp.json` (see `templates/cursor/mcp.json.example`)

Then replace `Figma MCP (FUEL + FMX libraries)` and `specialty/fmx-domain.md` in `CLAUDE.md` and each
bundle's `mcp-first:` list with the real tool names. If you have none, set `mcp-first:
[none-required]`. The `systems/*.md` files are the fallback of record.

Commonly useful: the Figma MCP (design context and screenshots), Playwright MCP (screenshots for
`/design-feedback`), and your docs or knowledge-base MCP (for `/design-frame` artifact ingestion).

## §5. Product structure (as you go)

`systems/surfaces.md` (navigation architecture and primary surfaces) and
`systems/interaction-patterns.md` (core flows, cross-cutting UI patterns). These power the
"precedent-aware" feedback in `/design-feedback`. Fill them from screenshots of your live
product; Claude can draft them if you point it at the screenshots.

## §6. Foundations (as you go)

- `foundations/principles.md`: company values, design principles, and design-system principles.
- `foundations/brand.md`: brand DNA and the "how to make something feel Fanatics Markets" shortlist.
- `foundations/ai-principles.md`: only if you build AI features.
- `foundations/tacit-knowledge.md`: already seeded with portable craft lessons. Add your own.

Paste raw source material into `context.md` first, then distill.

## §7. Deploy target

Pick a default in `.claude/skills/deploy/SKILL.md` ("Default target"). Vercel and Netlify serve
at the root; GitHub Pages serves under `/<repo>/`. The kickstarter's `base: "./"` works for all
of them.

## §8. Optional

- `specialty/`: add files for narrow techniques your team uses (sound, dynamic color, data viz).
- `external-resources.md`: register team kickstarters, component libraries, and external skills.
- `templates/claude/CLAUDE.global.md`: your personal working agreements.

## Done when

- `node lint.mjs` passes
- the placeholder `grep` above returns nothing in `CLAUDE.md`, `bundles/`, or `systems/visual.md`
- `/setup-project` in a scratch folder produces a running prototype that uses your tokens
