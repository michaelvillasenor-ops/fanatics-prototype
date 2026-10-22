#!/usr/bin/env node
// Structural lint for the context pack. Zero dependencies (Node 18+).
//
// Checks:
//   1. YAML frontmatter exists and parses on every content file
//   2. Required frontmatter fields are present (by directory)
//   3. Bundle `includes:` paths resolve to existing files
//   4. Markdown links [text](path) resolve (external links and anchors ignored)
//   5. Frontmatter `related:` slugs map to known content files
//   6. SKILL.md backtick paths (e.g. `systems/visual.md`) resolve
//   7. learnings/*.md have skill/date/surface frontmatter and a dated filename
//
// Exit code 0 = clean, 1 = errors found. Run: node lint.mjs

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIRS = ["foundations", "systems", "specialty", "bundles"];
const SKIP_DIRS = new Set([".git", "node_modules", ".playwright-mcp", "dist", "captures"]);
const CONTENT_FIELDS = ["title", "altitude", "modality", "covers", "related", "status"];
const REQUIRED = {
  foundations: CONTENT_FIELDS,
  systems: CONTENT_FIELDS,
  specialty: CONTENT_FIELDS,
  bundles: ["bundle", "intent", "includes", "mcp-first", "status"],
};

const errors = new Set();
const err = (file, msg) => errors.add(`  ${relative(ROOT, file)}: ${msg}`);

// Minimal YAML subset: `key: value`, `key: [a, b]`, and `key:` followed by `  - item` lines.
function parseFrontmatter(file) {
  const text = readFileSync(file, "utf8");
  const m = text.match(/^---\n([\s\S]*?\n)---/);
  if (!m) {
    err(file, "missing YAML frontmatter");
    return null;
  }
  const out = {};
  let listKey = null;
  for (const [i, line] of m[1].split("\n").entries()) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      out[listKey].push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) {
      err(file, `unparseable frontmatter line ${i + 2}: ${line.trim()}`);
      return null;
    }
    const [, key, raw] = kv;
    if (raw === "") {
      out[key] = [];
      listKey = key;
    } else if (raw.startsWith("[")) {
      if (!raw.endsWith("]")) {
        err(file, `unterminated list for ${key}`);
        return null;
      }
      const inner = raw.slice(1, -1).trim();
      out[key] = inner ? inner.split(",").map((s) => unquote(s.trim())) : [];
      listKey = null;
    } else {
      out[key] = unquote(raw);
      listKey = null;
    }
  }
  return out;
}
const unquote = (s) => s.replace(/^["'](.*)["']$/, "$1");

const mdFiles = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => join(dir, f)).sort() : []);
const contentFiles = () => CONTENT_DIRS.flatMap((d) => mdFiles(join(ROOT, d)));

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

// 1 + 2
for (const f of contentFiles()) {
  const fm = parseFrontmatter(f);
  if (!fm) continue;
  for (const field of REQUIRED[basename(dirname(f))] ?? []) {
    if (!(field in fm)) err(f, `missing required frontmatter field: ${field}`);
  }
}

// 3
for (const f of mdFiles(join(ROOT, "bundles"))) {
  const fm = parseFrontmatter(f);
  if (!fm) continue;
  if (!Array.isArray(fm.includes)) {
    err(f, "`includes` should be a list");
    continue;
  }
  for (const inc of fm.includes) if (!existsSync(join(ROOT, inc))) err(f, `includes path not found: ${inc}`);
}

// 4 (links inside fenced code blocks and inline code are ignored)
const LINK_RE = /\[[^\]]*\]\(([^)\s]+)\)/g;
for (const f of walk(ROOT)) {
  const text = readFileSync(f, "utf8").replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const [, href] of text.matchAll(LINK_RE)) {
    if (/^(https?:|#|mailto:)/.test(href) || href.includes("{{") || href.includes("<")) continue;
    const clean = href.split("#")[0];
    if (clean && !existsSync(resolve(dirname(f), clean))) err(f, `broken link: ${href}`);
  }
}

// 5
const slugs = new Set(contentFiles().map((f) => basename(f, ".md")));
for (const f of contentFiles()) {
  const fm = parseFrontmatter(f);
  if (!fm || !Array.isArray(fm.related)) continue;
  for (const slug of fm.related) if (!slugs.has(slug)) err(f, `related slug not found: ${slug}`);
}

// 6
const SKILL_REF = /`((?:bundles|foundations|systems|specialty|external-resources|templates|kickstarter)\/[^`*<]+?\.(?:md|mjs))`/g;
const skillsDir = join(ROOT, ".claude", "skills");
if (existsSync(skillsDir)) {
  for (const skill of readdirSync(skillsDir)) {
    const p = join(skillsDir, skill, "SKILL.md");
    if (!existsSync(p)) {
      err(join(skillsDir, skill), "skill folder has no SKILL.md");
      continue;
    }
    const text = readFileSync(p, "utf8");
    if (!/^---\nname: /.test(text) || !/\ndescription: /.test(text)) err(p, "SKILL.md needs name and description frontmatter");
    for (const [, ref] of text.matchAll(SKILL_REF)) if (!existsSync(join(ROOT, ref))) err(p, `referenced path not found: ${ref}`);
  }
}

// 7
for (const f of mdFiles(join(ROOT, "learnings"))) {
  if (basename(f) === "README.md") continue;
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/.test(basename(f))) err(f, "filename should be YYYY-MM-DD-<skill>-<slug>.md");
  const fm = parseFrontmatter(f);
  if (fm) for (const field of ["skill", "date", "surface"]) if (!(field in fm)) err(f, `missing learnings field: ${field}`);
}

console.log("Running structural lint...\n");
if (errors.size) {
  console.log(`Found ${errors.size} error(s):\n\n${[...errors].join("\n")}\n`);
  process.exit(1);
}
console.log("All checks passed.");
