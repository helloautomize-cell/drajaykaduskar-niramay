/**
 * Nested-interactive audit: fails if any route renders `a a`, `a button` or
 * `button a` in the DOM (invalid HTML + hydration error).
 *
 * Usage: node scripts/check-nested-links.mjs [base-url]
 * Default base: http://localhost:3001
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3001";

const ROUTES = [
  "/",
  "/about/",
  "/services/",
  "/diabetes/",
  "/diabetes/type-2-diabetes/",
  "/heart-care/2d-echo/",
  "/blooming-buds/",
  "/vaccination/",
  "/lab/",
  "/pharmacy/",
  "/plan-your-visit/",
  "/faqs/",
  "/contact/",
  "/health-library/",
  "/health-library/diabetes-myths-and-facts/",
  "/health-library/smart-love-parenting-teenagers/",
  "/health-library/self-esteem-teenagers-with-disabilities/",
  "/health-library/preparing-child-for-adolescence/",
  "/health-library/menstrual-hygiene-teenage-girls/",
  "/doctors/dr-ajay-kaduskar/",
  "/doctors/dr-prajakta-kaduskar/",
  "/privacy-policy/",
];

const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;

const browser = await chromium.launch({ executablePath: execPath });
const page = await browser.newPage();

let failures = 0;
for (const route of ROUTES) {
  const url = BASE + route;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    // Let deferred islands mount so we audit hydrated markup too.
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" })
    );
    await page.waitForTimeout(600);
    const nested = await page.evaluate(() => {
      const sel = "a a, a button, button a";
      const found = [...document.querySelectorAll(sel)];
      return found.map((el) => el.outerHTML.slice(0, 160));
    });
    if (nested.length) {
      failures++;
      console.log(`FAIL ${route} — ${nested.length} nested interactive element(s):`);
      nested.forEach((n) => console.log(`     ${n}`));
    } else {
      console.log(`ok   ${route}`);
    }
  } catch (e) {
    failures++;
    console.log(`ERR  ${route} — ${e.message.split("\n")[0]}`);
  }
}

await browser.close();
console.log(failures ? `\n${failures} route(s) failed` : "\nAll routes clean");
process.exit(failures ? 1 : 0);
