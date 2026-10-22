// Screenshots of key states at @3x into captures/ (gitignored).
// Run with the dev server up: npm run capture
// Edit SHOTS to list the moments × variants reviewers need.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:5199";
const SHOTS = [
  { name: "home-a", qs: "" },
  { name: "home-b", qs: "variant=b" },
  { name: "empty", qs: "state=empty" },
  { name: "error", qs: "state=error" },
  { name: "home-a-light", qs: "theme=light" },
];

await mkdir("captures", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 3 });
for (const s of SHOTS) {
  // frame=0 for full-bleed device-size captures; present=1 hides tooling.
  await page.goto(`${BASE}/?onboard=0&frame=0&present=1${s.qs ? `&${s.qs}` : ""}`);
  await page.waitForFunction(() => window.__proto?.ready, null, { timeout: 10000 });
  await page.waitForTimeout(400); // let entrance motion settle
  await page.screenshot({ path: `captures/${s.name}.png` });
  console.log(`captured captures/${s.name}.png`);
}
await browser.close();
