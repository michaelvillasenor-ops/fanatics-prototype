---
title: Components
altitude: system
modality: [visual, interaction]
covers: [design-system stack, setup, lookup order]
canonical-source: "https://www.figma.com/design/poY7Dn4TasEEZ4Rp5U0jWa/FMX-Component-Library"
mcp: [figma]
related: [visual, surfaces, interaction-patterns, fmx-domain]
status: living
last-reviewed: 2026-10-22
---

# Components

## The stack

```
FUEL Foundations (tokens, text styles)
  └─ FUEL Component Library (system components; Compose Multiplatform in production)
       └─ FMX Component Library (product components, by domain: Portfolio, Orders, Catalog, …)
            └─ FMX flow files (production screens)
                 └─ prototype primitives in src/components/ (this kit)
```

**There is no web component package.** FUEL ships as Compose Multiplatform. Prototypes rebuild
the components they need in React on top of `tokens.css`, matching the Figma component's
structure and property names.

## How to use it when prototyping

- **Install:** none: FUEL ships Compose, not npm. Tokens only, via `tokens.css`.
- **Setup essentials:** `tokens.css` is imported in `src/main.tsx`; Inter and Anton load from
  Google Fonts in `index.html`; `data-theme="dark"` on `<html>`.
- **Lookup order** (used by `/design-build`'s tier checkpoint):
  1. The project's own `src/components/`
  2. The FMX Component Library, through the Figma MCP. Search with `search_design_system`,
     then `get_design_context` on the component node. **Search every page**: a
     `.Domain /` prefix names the owning domain, not the page it lives on.
  3. The FUEL Component Library
  4. Reference libraries in `external-resources.md`
  5. Hand-roll from tokens (last resort)

## Building a React twin of an FMX component

- **Match the Figma property names** as React props (sentence-case Figma names become
  camelCase): `Show badge` → `showBadge`. Variant axes become string-union props.
- **Properties before variants.** Text, boolean and slot props first; a variant prop only when
  structure or styling truly differs. This mirrors the FUEL standard (`FUEL-XXX-000` rules in
  the `fuel-component-standard` skill).
- **Every value through a token.** If Figma shows an unbound value, say so; don't invent a token.
- **Width fills, height hugs**; test at 393 wide with long values.
- **Scenario data comes from `src/data/`**, never hardcoded into a component. Hardcoded scenario
  data is the root cause of most drift in the FMX Figma files too.

## Use the system; don't fight it
- Configure an existing component before creating a variant.
- New components are introduced deliberately and named for what they do.
- Reviewing or critiquing a library component is open to anyone. **Changing the Figma library
  is for its maintainers.** Prototypes never write to the FMX or FUEL Figma files.

## Where the components live

| Component family | Source | Notes |
|---|---|---|
| Global (Accordion, Avatars, Bottom Sheet, Badges, Cards, Alerts, Dropdowns, Icons, Overlay) | [FMX Component Library](https://www.figma.com/design/poY7Dn4TasEEZ4Rp5U0jWa/FMX-Component-Library) `🌎 Global` pages | |
| Inputs (Buttons, Text) | FMX Component Library `➡️ Inputs` | Button / Deposit Balance, Keypad, Price Tolerance, Get FanCash, Payment |
| Navigation (Top Nav, Bottom Tab Nav) | FMX Component Library `💠 Navigation` | `Top Nav` (slot-based) is the reference; don't model new work on the older `TopNav` |
| Domain components | FMX Component Library `🚪 Domains`: Activation & Loyalty, Catalog, Portfolio, Orders | |
| System components | [FUEL Component Library](https://www.figma.com/design/eEUrBq2TrEVHAfhbe9pm1g/FUEL-Component-Library) | |
| Production screens | Flow files: [Portfolio](https://www.figma.com/design/xPHcGeMXFgTBk1iZZ1Ln40/Portfolio), [Orders](https://www.figma.com/design/4yCc5GC0eB7ymkplNezDlo/Orders), [Catalog](https://www.figma.com/design/efuSYZGZ0ebCYn9wafxcy7/Catalog), [Search](https://www.figma.com/design/7TZrl5lCijXXxVQNPxZKeL/Search), [Onboarding](https://www.figma.com/design/7MtovDNwVOTIKLZ57odfVF/Onboarding), [Rewards](https://www.figma.com/design/qJSQsuUAVohJnZADuN6vm3/Rewards), [Refer a Friend](https://www.figma.com/design/oH1WwbV1dmgCQj0NbGkhUH/Refer-a-Friend--RAF-) | Portfolio and Orders are Live in Prod and the source of truth for their flows |
