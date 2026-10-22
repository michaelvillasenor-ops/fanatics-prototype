#!/usr/bin/env node
// Deterministic scaffold for /setup-project. Copies prototype-app/, renames,
// allocates a unique port, and registers it for the preview tool.
//
//   node new-project.mjs --name checkout-rethink --dest ./checkout-rethink [--viewport mobile|desktop] [--port 5230]
//
// Zero dependencies. Never writes into a non-empty destination.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TEMPLATE = join(dirname(fileURLToPath(import.meta.url)), "prototype-app");
const TEMPLATE_PORT = "5199";
const TEMPLATE_NAME = "prototype-app";
const SKIP = new Set(["node_modules", "dist", "captures", ".DS_Store", "vite.log"]);
const USER_LAUNCH = join(homedir(), ".claude", "launch.json");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]?.startsWith("--") ? true : all[i + 1] ?? true]);
    return acc;
  }, []),
);

const fail = (msg) => {
  console.error(`error: ${msg}`);
  process.exit(1);
};

const name = args.name;
if (!name || typeof name !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(name)) fail("--name must be kebab-case");
const dest = resolve(typeof args.dest === "string" ? args.dest : `./${name}`);
if (existsSync(dest) && readdirSync(dest).filter((f) => f !== ".DS_Store").length > 0)
  fail(`${dest} is not empty; pick another --dest`);

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
};

const portFree = (port) =>
  new Promise((ok) => {
    const s = createServer().once("error", () => ok(false)).once("listening", () => s.close(() => ok(true)));
    s.listen(port, "127.0.0.1");
  });

async function pickPort() {
  if (args.port) return Number(args.port);
  const taken = new Set((readJson(USER_LAUNCH, { configurations: [] }).configurations ?? []).map((c) => c.port));
  for (let p = 5200; p < 5400; p += 1) if (!taken.has(p) && (await portFree(p))) return p;
  fail("no free port found in 5200-5399");
}

const port = await pickPort();

mkdirSync(dest, { recursive: true });
cpSync(TEMPLATE, dest, { recursive: true, filter: (src) => !SKIP.has(src.split("/").pop()) });

// Token replacement: port + name in the files that carry them.
const replaceIn = (rel, pairs) => {
  const p = join(dest, rel);
  if (!existsSync(p)) return;
  let text = readFileSync(p, "utf8");
  for (const [from, to] of pairs) text = text.split(from).join(to);
  writeFileSync(p, text);
};
const portFiles = ["vite.config.ts", ".claude/launch.json", "scripts/verify-smoke.mjs", "scripts/capture.mjs", "CLAUDE.md", "HANDOFF.md", "README.md"];
for (const f of portFiles) replaceIn(f, [[TEMPLATE_PORT, String(port)]]);
for (const f of ["package.json", "package-lock.json", "index.html", ".claude/launch.json", "CLAUDE.md", "HANDOFF.md", "README.md", "PLAN.md", "BUILD-PROMPTS.md"])
  replaceIn(f, [[TEMPLATE_NAME, name]]);

if (args.viewport === "desktop") {
  replaceIn("src/app/app.css", [["--frame-w: 393px;", "--frame-w: 1440px;"], ["--frame-h: 852px;", "--frame-h: 900px;"]]);
  replaceIn("src/app/config.ts", [["frame: true,\n  present", "frame: false,\n  present"]]);
}

// Register in the user-level launch.json so ports stay unique across projects.
const launch = readJson(USER_LAUNCH, { version: "0.0.1", configurations: [] });
launch.configurations = (launch.configurations ?? []).filter((c) => c.name !== name);
launch.configurations.push({ name, runtimeExecutable: "npm", runtimeArgs: ["--prefix", dest, "run", "dev"], port });
mkdirSync(dirname(USER_LAUNCH), { recursive: true });
writeFileSync(USER_LAUNCH, JSON.stringify(launch, null, 2) + "\n");

console.log(JSON.stringify({ name, dest, port, url: `http://localhost:${port}/`, registered: USER_LAUNCH }, null, 2));
