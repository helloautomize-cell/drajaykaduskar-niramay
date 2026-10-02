// Phase 6 Part 2 form acceptance tests (Playwright).
// Usage: SITE_PASSWORD=… node scripts/check-forms.mjs [base]
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://127.0.0.1:3020";
const pw = process.env.SITE_PASSWORD || "";
const ctx = { httpCredentials: pw ? { username: "niramay", password: pw } : undefined };
const results = [];
const ok = (name, cond, extra = "") => results.push(`${cond ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);

const browser = await chromium.launch();
const page = await (await browser.newContext(ctx)).newPage();
page.on("pageerror", (e) => results.push(`PAGEERROR ${e.message}`));

// --- appointment form: empty submit ---
await page.goto(`${base}/contact/#book`, { waitUntil: "networkidle" });
await page.fill("#f-name", "");
await page.click("button[type=submit]");
await page.waitForTimeout(1200);
ok("empty submit -> error summary", await page.locator("div[role=alert] p.font-semibold, [role=alert]").first().isVisible().catch(() => false));
const focused = await page.evaluate(() => document.activeElement?.textContent?.slice(0, 40));
ok("focus moved to summary", /fix the following/i.test(focused || ""), focused);

// --- invalid mobile ---
await page.fill("#f-name", "Test Patient");
await page.fill("#f-phone", "12345");
await page.fill("#f-ageValue", "40");
await page.selectOption("#f-reason", "Diabetes");
await page.check("#f-consent");
await page.click("button[type=submit]");
await page.waitForTimeout(1200);
ok("invalid mobile shows phone error", await page.locator("text=valid 10-digit mobile").count() > 0);

// --- age 12 without guardian blocked ---
await page.fill("#f-phone", "8459141584");
await page.fill("#f-ageValue", "12");
await page.click("button[type=submit]");
await page.waitForTimeout(1200);
ok("under-18 without guardian blocked", await page.locator("text=parent or guardian").first().isVisible().catch(() => false));

// --- tick guardian -> guardian name required ---
await page.check("#f-guardian");
await page.click("button[type=submit]");
await page.waitForTimeout(1200);
ok("guardian name required", await page.locator("#f-guardianName").isVisible().catch(() => false));
await page.fill("#f-guardianName", "Test Parent");
await page.waitForSelector('button[type=submit]:not([disabled])');
await page.click("button[type=submit]");
await page.waitForURL(/thank-you/, { timeout: 25000 }).catch(() => {});
if (!/thank-you/.test(page.url())) {
  const alerts = await page.$$eval("[role=alert]", (els) => els.map((e) => e.textContent.slice(0, 100)));
  const btnDisabled = await page.locator("button[type=submit]").isDisabled();
  results.push("DEBUG alerts=" + JSON.stringify(alerts) + " disabled=" + btnDisabled);
}
ok("guardian flow -> thank-you", /thank-you/.test(page.url()), page.url());
ok("appointment thank-you copy", await page.locator("text=30 to 90 minutes").isVisible().catch(() => false));

// --- Sunday note ---
await page.goto(`${base}/contact/#book`, { waitUntil: "networkidle" });
const nextSunday = new Date();
nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7 || 7));
const sunIso = nextSunday.toISOString().slice(0, 10);
await page.fill("#f-date", sunIso);
await page.waitForTimeout(500);
const dateVal = await page.inputValue("#f-date");
ok("Sunday note shown", await page.locator("text=closed on Sundays").count() > 0, sunIso + " set:" + dateVal);

// --- prefill ---
await page.goto(`${base}/diabetes/type-2-diabetes/`, { waitUntil: "networkidle" });
const href = await page.locator('a[href*="/contact/?"], a[href*="/contact?"]').first().getAttribute("href").catch(() => null);
ok("book link carries context", !!href && href.includes("doctor=dr-ajay"), href || "none");
if (href) {
  await page.goto(`${base}${href}`, { waitUntil: "networkidle" });
  const doc = await page.inputValue("#f-doctor");
  const reason = await page.inputValue("#f-reason");
  ok("form prefilled", doc === "dr-ajay" && reason === "Diabetes", `${doc}/${reason}`);
}

// --- honeypot: fill hidden field -> silently "succeeds" (stays, no send) ---
await page.goto(`${base}/contact/#book`, { waitUntil: "networkidle" });
await page.evaluate(() => { document.querySelector("[name=company]").value = "spammy"; });
await page.fill("#f-name", "Bot Spam");
await page.fill("#f-phone", "8459141584");
await page.fill("#f-ageValue", "30");
await page.selectOption("#f-reason", "Diabetes");
await page.check("#f-consent");
await page.click("button[type=submit]");
await page.waitForURL(/thank-you/, { timeout: 25000 }).catch(() => {});
ok("honeypot -> silent success", /thank-you/.test(page.url()), page.url());

// --- workshop form ---
await page.goto(`${base}/blooming-buds/workshops/`, { waitUntil: "networkidle" });
ok("workshop form present", await page.locator("#w-organisation").isVisible().catch(() => false));
await page.click("button[type=submit]");
await page.waitForTimeout(1200);
ok("workshop empty -> errors", await page.locator("[role=alert]").first().isVisible().catch(() => false));
await page.fill("#w-organisation", "Test School");
await page.selectOption("#w-audience", "Students");
await page.check('input[value="Bullying"]');
await page.selectOption("#w-language", "English");
await page.fill("#w-contactName", "Test Teacher");
await page.fill("#w-phone", "9021351693");
await page.fill("#w-email", "test@example.com");
await page.check("#w-consent");
await page.click("button[type=submit]");
await page.waitForURL(/thank-you.*workshop/, { timeout: 15000 }).catch(() => {});
ok("workshop -> thank-you?type=workshop", /type=workshop/.test(page.url()), page.url());
ok("workshop thank-you copy", await page.locator("text=2 working days").isVisible().catch(() => false));

// --- forced failure path needs RESEND off; check fatal branch exists ---
results.push("NOTE failure-state test needs RESEND_API_KEY unset AND FORM_TEST_MODE unset — manual");

console.log(results.join("\n"));
await browser.close();
