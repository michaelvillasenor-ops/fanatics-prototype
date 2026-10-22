---
name: deploy
description: Deploy a static prototype (Vite dist/ or Next static export out/) to Vercel, Netlify, GitHub Pages, or Cloudflare Pages, with correct base paths, SPA deep-link fallback, and a post-deploy verification checklist. Use when the user runs /deploy, says "deploy this", "ship it to a URL", "put this online", "share a link", or at the end of a feedback round.
---

# Deploy: static prototype to a shareable URL

Deploying publishes content to an external service. **Confirm the target, project name, and
visibility with the user before the first deploy of a project.** Later redeploys to the same
target can proceed when the user says "deploy".

## Default target

`{{DEFAULT_DEPLOY_TARGET}}`. Set it in CUSTOMIZE §7. If unset, ask:

| Target | Serves at | CLI | Deep links |
|---|---|---|---|
| **Vercel** | root `/` | `npx vercel` | `vercel.json` rewrite |
| **Netlify** | root `/` | `npx netlify-cli` | `public/_redirects` |
| **Cloudflare Pages** | root `/` | `npx wrangler pages` | `public/_redirects` |
| **GitHub Pages** | subpath `/<repo>/` | `gh` + Actions, or the `gh-pages` branch | `404.html` copy, or query routing |

## Inputs to collect

- Target and project/site name (default: the `package.json` name)
- Visibility: public, or password- or team-protected (Vercel and Netlify support protection on
  paid plans; say so if it matters)
- Router type: the kickstarter uses `?page=` query routing, which needs no fallback. If the
  project added a path router, deep-link fallback is required.

## Prerequisites

- Logged in: `npx vercel login` / `npx netlify-cli login` / `npx wrangler login` / `gh auth status`.
  **The user runs any login themselves;** never enter credentials for them.
- The working tree is clean and `npm run verify` is green. A deploy is the last step of a round:
  checks green → commit → deploy.

## Config changes by target

**Base path**
- The kickstarter ships `base: "./"` (relative), which works at any mount point, including GitHub
  Pages subpaths. Keep it.
- If the project uses a path router: `basename={import.meta.env.BASE_URL}`, plus for subpaths
  `base: command === "build" ? "/<repo>/" : "/"`.
- Next.js static export: `output: "export"`, `basePath` / `assetPrefix` for subpaths,
  `images.unoptimized: true`, and `trailingSlash: true` to get per-route `index.html` files.

**Deep-link fallback** (only with a path router)
- Vercel `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- Netlify or Cloudflare `public/_redirects`: `/*  /index.html  200`
- GitHub Pages: after the build, run `cp dist/index.html dist/404.html`

**Hard-coded root paths:** grep for `src="/` and `url(/` in `src/` and `index.html`, and make them
relative or imported.

## Build and deploy

```bash
npm run build
# Vercel
npx vercel deploy --prod --yes          # first run links the project interactively; let the user answer
# Netlify
npx netlify-cli deploy --prod --dir=dist
# Cloudflare Pages
npx wrangler pages deploy dist --project-name <name>
# GitHub Pages (simple branch deploy)
npx gh-pages -d dist
```

**Check the CLI's `--help`** if a flag errors. Docs drift, and the CLI is the source of truth.

## Verify (required)

1. Open the deployed URL in the browser. Hard-refresh, because hosts cache `index.html`.
2. Load the root, `?page=links`, and 2 or 3 deep links from the links sheet.
3. Hard-refresh one deep link: no 404.
4. Network panel: no 404s on assets.
5. Optionally, run the verify suite against production: `BASE_URL=<url> npm run verify`
   (behavioral suites only; skip the ones that need local-only media).

## Record it

Add the URL and the exact redeploy command to the project's `CLAUDE.md` (PROJECT NOTES) and
`HANDOFF.md` ("Where things stand"). Remind the user that viewers may need a hard refresh after
each redeploy.
