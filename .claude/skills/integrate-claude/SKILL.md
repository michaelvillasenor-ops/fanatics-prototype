---
name: integrate-claude
description: Add a real LLM-powered feature (generation, summarization, chat, classification) to a prototype using the Claude API through a server-side proxy so no API key ever reaches the browser. Covers the Vite dev-server middleware for local use, a serverless function for deploys, streaming, a mock-fallback seam, and honest labeling. Use when the user says "make this actually generate", "hook up Claude", "add AI to the prototype", "wire up the LLM", or a service seam in src/services/ needs a real implementation.
---

# Integrate Claude: real model calls, safely, behind a seam

## Rules

1. **The API key never ships to the browser.** No `VITE_`-prefixed key and no key in client code.
   Calls go through `/api/*`, which is served by a Vite middleware in dev and a serverless
   function in deploys.
2. **Keep the seam.** The UI calls `src/services/<name>Service.ts`, which has one interface and
   two implementations: `mock` (deterministic, the default) and `live`. A URL flag (`ai=live`)
   switches between them, so demos never depend on the network.
3. **Honest fallbacks.** If the live call fails, show the mock result labeled as such, or an
   authored message. Never a plausible-but-wrong claim.
4. **Model choice:** default to the current Claude Sonnet model for speed and cost, and Opus for
   quality-critical generation. Check the `claude-api` skill or Anthropic docs for current model
   IDs rather than trusting memory.
5. **Key handling:** the user puts `ANTHROPIC_API_KEY` in `.env.local` (gitignored) and in the
   host's environment settings. Never ask them to paste the key into chat, and never write it into
   a file yourself.

## Step 1: dependency

```bash
npm install @anthropic-ai/sdk
```

## Step 2: shared handler (`server/claude.ts`)

```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the server environment

export async function complete(body: { system?: string; prompt: string; maxTokens?: number }) {
  const msg = await client.messages.create({
    model: process.env.CLAUDE_MODEL ?? "claude-sonnet-5",
    max_tokens: body.maxTokens ?? 1024,
    system: body.system,
    messages: [{ role: "user", content: body.prompt }],
  });
  return msg.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
}
```

## Step 3: dev proxy (Vite plugin in `vite.config.ts`)

```ts
import { loadEnv, type Plugin } from "vite";

function claudeDevApi(): Plugin {
  return {
    name: "claude-dev-api",
    configureServer(server) {
      Object.assign(process.env, loadEnv("development", process.cwd(), ""));
      server.middlewares.use("/api/complete", async (req, res) => {
        let raw = "";
        req.on("data", (c) => (raw += c));
        req.on("end", async () => {
          try {
            const { complete } = await server.ssrLoadModule("/server/claude.ts");
            const text = await complete(JSON.parse(raw || "{}"));
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify({ text }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });
    },
  };
}
// plugins: [react(), claudeDevApi()]
```

## Step 4: deploy function

- **Vercel:** `api/complete.ts` that calls `complete(await req.json())` and returns
  `Response.json({ text })`.
- **Netlify:** `netlify/functions/complete.ts`, plus a `_redirects` line
  `/api/*  /.netlify/functions/:splat  200`.
- **Cloudflare:** `functions/api/complete.ts` (Pages Functions).
- **GitHub Pages** has no server. Keep `ai=mock` for the deployed build and say so in the README.

Set `ANTHROPIC_API_KEY` in the host's dashboard. The user does this.

## Step 5: the service seam

```ts
// src/services/generationService.ts
export interface GenerationService { generate(input: string): Promise<{ text: string; source: "live" | "mock" }> }

const mock: GenerationService = { async generate(input) { return { text: MOCK_RESULTS[hash(input) % MOCK_RESULTS.length], source: "mock" }; } };

const live: GenerationService = {
  async generate(input) {
    try {
      const r = await fetch("/api/complete", { method: "POST", body: JSON.stringify({ prompt: input }) });
      if (!r.ok) throw new Error(String(r.status));
      return { text: (await r.json()).text, source: "live" };
    } catch { return mock.generate(input); }
  },
};

export const generationService = (mode: "live" | "mock") => (mode === "live" ? live : mock);
```

Add `ai: "mock" | "live"` to `src/app/config.ts` (default `mock`), and show a small "mock" badge in
debug mode when `source === "mock"`.

## Step 6: verify

- With `ai=mock`, the verify suites pass offline and deterministically.
- With `ai=live` and a key present, make one real round trip and show the output.
- `grep -r "ANTHROPIC_API_KEY" dist/` must return nothing after `npm run build`.
- Record in the README under "What's real / what's mocked".

## Streaming (optional)

For chat UIs, use `client.messages.stream(...)` in the handler and forward text deltas as
Server-Sent Events. Keep the mock path streaming too (a timed reveal), so the UI code is
identical in both modes.
