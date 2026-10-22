# External resources

Things this pack depends on that live elsewhere. `/design-build` and `/setup-project` read this
file. Link to externally owned resources; don't fork them.

## Kickstarters
| Name | Repo / path | Default location | Notes |
|---|---|---|---|
| prototype-app (built in) | `kickstarter/prototype-app/` | this repo | Vite + React + TS harness; the default |
| <team boilerplate> | | | |

## Design-system packages
| Package | Install | Setup | Docs |
|---|---|---|---|
| FUEL | none: Compose Multiplatform only, no web package | Tokens mapped in `src/tokens/tokens.css`; Inter + Anton in `index.html` | [FUEL Foundations](https://www.figma.com/design/X3sKsaeXXikXy2nIe6IZz6/FUEL-Foundations-Library) |

## Component and reference libraries (lookup tier 3)
| Library | Where | What's in it |
|---|---|---|
| FMX Component Library | [Figma](https://www.figma.com/design/poY7Dn4TasEEZ4Rp5U0jWa/FMX-Component-Library) | Product components: Global, Inputs, Navigation, and the Portfolio / Orders / Catalog / Activation & Loyalty domains |
| FUEL Component Library | [Figma](https://www.figma.com/design/eEUrBq2TrEVHAfhbe9pm1g/FUEL-Component-Library) | System components |

Lookup order: project `src/components/` → design system → these libraries → hand-roll.

## Live sources (MCP servers)
| Source | MCP / URL | Used by |
|---|---|---|
| Design system + Figma | Remote Figma MCP (tools take a `fileKey`; file keys in `CLAUDE.md`) | build, feedback, ship |
| Playwright | `@playwright/mcp` | feedback (screenshots) |
| Docs / knowledge base | Confluence, Google Drive (if connected) | frame (artifact ingestion) |

## Skills owned by other teams
| Skill | Owner | Link | When the loop routes to it |
|---|---|---|---|
| `fmx-figma:fmx-figure-audit` | FMX design (fmx-figma plugin) | Claude plugin | `/design-build` and `/design-feedback` whenever a fee, cost, payout, fill count or balance is on screen |
| `fmx-figma:fmx-component-review` | FMX design | Claude plugin | `/design-feedback` (craft) when a prototype mirrors an FMX component |
| `fmx-figma:fmx-figma-conventions` | FMX design | Claude plugin | `/design-build` before reading FMX components from Figma |
| `fmx-figma:fuel-component-standard` | FUEL team | Claude plugin | `/design-ship` handoff notes: cite `FUEL-XXX-000` rules for anything heading to Compose |
| `responsible-gaming-check` | FBG Responsible Gaming | Claude skill | `/design-ship` (required gate) and `/design-feedback` (copy) for any customer-facing surface |
| `design:ux-copy` | design plugin | Claude plugin | `/design-feedback` (copy) |
| `design:accessibility-review` | design plugin | Claude plugin | `/design-ship` a11y sweep |

## Why this file
Keeping external dependencies in one place means the skills never hardcode a repo URL, and
swapping a kickstarter or library is a one-line change.
