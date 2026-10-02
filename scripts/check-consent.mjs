#!/usr/bin/env node
/**
 * Consent + analytics checks (phase 6, part 5A):
 *  - before consent: ZERO requests to googletagmanager / google-analytics /
 *    google.com/maps / youtube / youtube-nocookie on Home, Contact and a blog post
 *  - after Accept: gtag.js loads and page_view fires
 *  - after withdrawal via footer "Cookie settings": _ga cookies are gone
 *  - prefill works on 4 sample pages
 *
 * Requires a build where NEXT_PUBLIC_GA_ID was set (inlined at build time).
 * Run:  SITE_PASSWORD=… node scripts/check-consent.mjs [baseURL]
 */
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://127.0.0.1:3020";
const PW = process.env.SITE_PASSWORD || "test";
const results = [];
const ok = (name, pass, extra = "") => {
  results.push(`${pass ? "PASS" : "FAIL"} ${name}${extra ? " — " + String(extra).slice(0, 120) : ""}`);
};

const TRACKED = /googletagmanager|google-analytics|google\.com\/maps|youtube|youtube-nocookie|google\.com\/recaptcha|cloudflare.*turnstile/i;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  httpCredentials: { username: "niramay", password: PW },
});
const page = await ctx.newPage();

// ---------- 1. zero third-party requests before consent ----------
const pagesToCheck = [
  `${base}/`,
  `${base}/contact/`,
  `${base}/health-library/diabetes-myths-and-facts/`,
];
for (const url of pagesToCheck) {
  const hits = [];
  const onReq = (r) => {
    if (TRACKED.test(r.url())) hits.push(r.url());
  };
  page.on("request", onReq);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  // scroll to bottom to trigger any lazy/deferred islands
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  page.off("request", onReq);
  ok(`no tracker requests before consent: ${url.replace(base, "")}`, hits.length === 0, hits[0] || "");
}

// ---------- 2. accept -> gtag loads + page_view ----------
const gaRequests = [];
page.on("request", (r) => {
  if (/googletagmanager|google-analytics/.test(r.url())) gaRequests.push(r.url());
});
await page.goto(`${base}/`, { waitUntil: "networkidle" });
const acceptBtn = page.locator('button:has-text("Accept")');
ok("cookie banner shown", await acceptBtn.isVisible().catch(() => false));
await acceptBtn.click();
await page.waitForTimeout(3000);
const gtagLoaded = gaRequests.some((u) => /gtag\/js/.test(u));
ok("gtag.js loaded after accept", gtagLoaded);
const pageViewSent = await page.waitForFunction(
  () => window.dataLayer && window.dataLayer.some((a) => Array.isArray(a) && a[0] === "event" && a[1] === "page_view"),
  { timeout: 8000 }
).then(() => true).catch(() => false);
ok("page_view event after accept", pageViewSent);

// ---------- 3. withdrawal -> cookies gone ----------
await page.locator('button:has-text("Cookie settings")').first().click();
await page.waitForTimeout(600);
// settings view: uncheck analytics (it shows current state checked)
const toggle = page.locator('input[type=checkbox]');
if (await toggle.isChecked().catch(() => false)) await toggle.uncheck();
await page.locator('button:has-text("Save choices")').click();
await page.waitForTimeout(1500);
const cookies = await ctx.cookies();
const gaCookies = cookies.filter((c) => /^_ga/.test(c.name));
ok("no _ga cookies after withdrawal", gaCookies.length === 0, gaCookies.map((c) => c.name).join(","));
const denied = await page.evaluate(() =>
  window.dataLayer && window.dataLayer.some(
    (a) => Array.isArray(a) && a[0] === "consent" && a[1] === "update" && a[2]?.analytics_storage === "denied"
  )
);
ok("consent update -> denied after withdrawal", !!denied);

// ---------- 4. prefill on 4 sample pages ----------
const samples = [
  { url: "/diabetes/type-2-diabetes/", doctor: "dr-ajay" },
  { url: "/vaccination/", doctor: "dr-prajakta" },
  { url: "/doctors/dr-prajakta-kaduskar/", doctor: "dr-prajakta" },
  { url: "/about/", doctor: null },
];
for (const s of samples) {
  await page.goto(`${base}${s.url}`, { waitUntil: "networkidle" });
  // BookButton hydrates client-side (usePathname) — wait for the enriched href
  if (s.doctor) {
    await page
      .waitForSelector(`a[href*="doctor=${s.doctor}"]`, { timeout: 8000 })
      .catch(() => {});
  } else {
    await page.waitForTimeout(1500);
  }
  const href = await page
    .locator('a[href*="/contact?"], a[href="/contact/"], a[href="/contact/#book"], a[href*="/contact#"]')
    .first()
    .getAttribute("href")
    .catch(() => null);
  if (s.doctor) ok(`book link on ${s.url}`, !!href && href.includes(`doctor=${s.doctor}`), href || "none");
  else results.push(`NOTE book link on ${s.url}: ${href || "none"}`);
}

// ---------- 5. prefill lands in the form ----------
await page.goto(`${base}/diabetes/type-2-diabetes/`, { waitUntil: "domcontentloaded" });
const link = await page.locator('a[href*="/contact?"]').first().getAttribute("href").catch(() => null);
if (link) {
  await page.goto(`${base}${link}`, { waitUntil: "networkidle" });
  const doc = await page.inputValue("#f-doctor").catch(() => "");
  const reason = await page.inputValue("#f-reason").catch(() => "");
  ok("form prefilled from link", doc === "dr-ajay" && !!reason, `${doc}/${reason}`);
}

await browser.close();
console.log(results.join("\n"));
const fails = results.filter((r) => r.startsWith("FAIL"));
process.exit(fails.length ? 1 : 0);
