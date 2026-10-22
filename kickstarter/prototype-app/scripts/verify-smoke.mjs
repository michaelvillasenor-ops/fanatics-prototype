// Harness smoke suite. Requires the dev server on the project port.
// Run: npm run verify   (or BASE_URL=https://deployed.example npm run verify)
//
// Pattern for every verify-*.mjs: check(name, ok, detail) prints PASS/FAIL,
// a summary line at the end, exit 1 on any failure. Test BEHAVIOR, not styling.
// Add a regression check here for every bug a feedback round fixes.
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:5199";
const results = [];
const check = (name, ok, detail) => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

// Every test URL passes onboard=0: onboarding intercepts input in fresh profiles.
const open = async (qs = "") => {
  await page.goto(`${BASE}/?onboard=0${qs ? `&${qs}` : ""}`);
  // Note the null: waitForFunction(fn, arg, options). Omitting it silently breaks the timeout.
  await page.waitForFunction(() => window.__proto?.ready, null, { timeout: 10000 });
};

try {
  // 1. Default render
  await open();
  check("default renders home in the device frame",
    (await page.locator("[data-testid=device-frame] [data-testid=home]").count()) === 1);

  // 2. URL flags round-trip into config
  await open("variant=b&state=default&theme=light");
  const cfg = await page.evaluate(() => window.__proto.config);
  check("URL flags parse into config", cfg.variant === "b" && cfg.theme === "light",
    `variant=${cfg.variant} theme=${cfg.theme}`);
  check("theme flag applies to <html>",
    (await page.evaluate(() => document.documentElement.dataset.theme)) === "light");

  // 3. Config changes write back to the URL (a link is a complete repro)
  await page.evaluate(() => window.__proto.setConfig({ variant: "a", state: "empty" }));
  await page.waitForFunction(() => location.search.includes("state=empty"), null, { timeout: 2000 });
  const search = await page.evaluate(() => location.search);
  check("config serializes back to the URL", search.includes("state=empty") && !search.includes("variant="),
    search);

  // 4. Every data state is reachable
  for (const s of ["empty", "loading", "error"]) {
    await open(`state=${s}`);
    const ok = await page.locator(".screen").count();
    check(`state=${s} renders`, ok === 1);
  }

  // 4b. FMX canonical scenario reconciles (907 @ 48¢: pays $907.00, total $453.50, fee $18.14)
  await open();
  const home = await page.locator("[data-testid=home]").innerText();
  check("canonical position renders in cents", home.includes("907 contracts at 48¢") && home.includes("Pays $907.00"));
  check("no American or decimal odds on screen", !/(^|\s)[+-]\d{3}(\s|$)/m.test(home));
  await open("variant=b");
  check("variant b cost line reconciles",
    (await page.locator("[data-testid=home]").innerText()).includes("Cost $453.50 · incl. $18.14 fee"));

  // 4c. Odds formats: same price, three displays
  for (const [odds, expected] of [["percent", "48%"], ["multiplier", "2.08x"]]) {
    await open(`odds=${odds}`);
    check(`odds=${odds} renders ${expected}`,
      (await page.locator("[data-testid=home]").innerText()).includes(`907 contracts at ${expected}`));
  }

  // 5. Utility routes
  await open("page=tokens");
  check("?page=tokens renders", await page.getByRole("heading", { name: "Tokens" }).isVisible());
  await open("page=links");
  check("?page=links renders", await page.getByRole("heading", { name: "Links" }).isVisible());

  // 6. Keyboard: P opens the control panel
  await open();
  await page.keyboard.press("p");
  check("P opens the control panel", (await page.locator(".control-panel--open").count()) === 1);

  // 7. Presenter mode hides tooling
  await open("present=1");
  check("present=1 hides the control panel", (await page.locator(".control-panel").count()) === 0);

  check("no console or page errors", errors.length === 0, errors.slice(0, 3).join(" | "));
} catch (e) {
  check("suite ran to completion", false, String(e));
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
