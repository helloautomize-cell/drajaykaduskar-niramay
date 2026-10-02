#!/usr/bin/env node
/**
 * Desktop mega-menu geometry check:
 *  - at 1440px and 1280px, open each dropdown in turn, including switching
 *    directly from one trigger to the next
 *  - no two link bounding boxes may intersect
 *  - the doctor card must not intersect any link
 *  - the panel must stay inside the viewport and inside the 1240px shell
 *  - keyboard navigation and Escape still work
 *
 * Run:  SITE_PASSWORD=… node scripts/check-menus.mjs [baseURL]
 */
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://127.0.0.1:3020";
const PW = process.env.SITE_PASSWORD || "test";
const results = [];
const ok = (name, pass, extra = "") => {
  results.push(
    `${pass ? "PASS" : "FAIL"} ${name}${extra ? " — " + String(extra).slice(0, 160) : ""}`
  );
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TRIGGERS = [
  "Diabetes and Heart",
  "Child and Teen",
  "Lab and Pharmacy",
  "Doctors",
  "Patient Info",
];

const overlaps = (a, b, tol = 1) =>
  a.left < b.right - tol &&
  a.right > b.left + tol &&
  a.top < b.bottom - tol &&
  a.bottom > b.top + tol;

for (const width of [1440, 1280]) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    httpCredentials: { username: "niramay", password: PW },
    viewport: { width, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "load" });
  await sleep(400);

  const shell = await page.evaluate(() => {
    // the 1240px header container = the sticky header's inner div
    const el = document.querySelector("header > div");
    const r = el.getBoundingClientRect();
    return { left: r.left, right: r.right };
  });

  for (let i = 0; i < TRIGGERS.length; i++) {
    const label = TRIGGERS[i];
    // hover the trigger (direct switch from the previous menu, no close in between)
    await page.hover(`nav >> text="${label}"`);
    await sleep(500);

    const m = await page.evaluate(() => {
      const panel = document.querySelector("[data-nav-content]");
      if (!panel) return { open: false };
      const pr = panel.getBoundingClientRect();
      const links = [...panel.querySelectorAll("a")]
        .filter((a) => !a.closest("[data-doctor-card]"))
        .map((a) => {
        const r = a.getBoundingClientRect();
        return { text: a.textContent.trim().slice(0, 40), left: r.left, right: r.right, top: r.top, bottom: r.bottom };
      });
      const noImg = [...panel.querySelectorAll("a")]
        .filter((a) => !a.closest("[data-doctor-card]"))
        .map((a) => !a.querySelector("img"));
      const card = panel.querySelector("[data-doctor-card]");
      const cardRect = card
        ? (() => {
            const r = card.getBoundingClientRect();
            return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
          })()
        : null;
      return {
        open: true,
        panel: { left: pr.left, right: pr.right, top: pr.top, bottom: pr.bottom, w: pr.width },
        links,
        noImg,
        cardRect,
        vw: window.innerWidth,
      };
    });

    if (!m.open) {
      ok(`${width}px ${label}: panel opens`, false, "no [data-nav-content]");
      continue;
    }

    // link-vs-link intersections
    const linkHits = [];
    for (let a = 0; a < m.links.length; a++)
      for (let b = a + 1; b < m.links.length; b++)
        if (overlaps(m.links[a], m.links[b])) linkHits.push(`${m.links[a].text} | ${m.links[b].text}`);
    ok(`${width}px ${label}: links do not overlap`, linkHits.length === 0, linkHits.join(" ; "));

    // doctor card vs links
    const cardHits = m.cardRect
      ? m.links.filter((l) => overlaps(m.cardRect, l)).map((l) => l.text)
      : [];
    ok(`${width}px ${label}: doctor card clear of links`, cardHits.length === 0, cardHits.join(" ; "));

    // panel inside viewport + inside the 1240px shell
    const inside = m.panel.left >= shell.left - 1 && m.panel.right <= shell.right + 1 && m.panel.right <= m.vw + 1;
    ok(
      `${width}px ${label}: panel inside shell`,
      inside,
      `panel ${Math.round(m.panel.left)}-${Math.round(m.panel.right)} (${Math.round(m.panel.w)}px), shell ${Math.round(shell.left)}-${Math.round(shell.right)}`
    );

    // text links never wrap: 40px rows (doctor rows are taller by design)
    const textLinks = m.links.filter((_, i) => m.noImg[i]);
    const wrapped = textLinks.filter((l) => l.bottom - l.top > 44);
    ok(`${width}px ${label}: links stay one line`, wrapped.length === 0, wrapped.map((l) => l.text).join(" ; "));
  }

  // Escape closes the open panel
  await page.keyboard.press("Escape");
  await sleep(300);
  const closed = await page.evaluate(() => !document.querySelector("[data-nav-content]"));
  ok(`${width}px Escape closes the panel`, closed);

  // keyboard: focus first trigger, Enter opens, Tab moves into panel
  await page.evaluate(() => document.querySelector("nav button").focus());
  await page.keyboard.press("Enter");
  await sleep(400);
  const kbOpen = await page.evaluate(() => !!document.querySelector("[data-nav-content]"));
  ok(`${width}px keyboard Enter opens menu`, kbOpen);
  if (kbOpen) {
    await page.keyboard.press("Tab");
    await sleep(150);
    const focusInside = await page.evaluate(() => {
      const panel = document.querySelector("[data-nav-content]");
      return panel && panel.contains(document.activeElement);
    });
    ok(`${width}px Tab moves focus into panel`, !!focusInside);
    await page.keyboard.press("Escape");
  }

  await browser.close();
}

console.log(results.join("\n"));
const fails = results.filter((r) => r.startsWith("FAIL")).length;
console.log(`\n${results.length - fails}/${results.length} menu checks passed`);
process.exit(fails ? 1 : 0);
