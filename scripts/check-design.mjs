#!/usr/bin/env node
/**
 * Design-polish checks:
 *  - mobile Home (390x844): every section except the hero is <= 1.3x the
 *    viewport height; reports total page height
 *  - no horizontal overflow at 390 / 768 / 1024 / 1440
 *  - carousel autoplay advances on its own, pauses on hover, and never
 *    runs under prefers-reduced-motion
 *  - the conditions marquee pauses on hover and is static under reduced
 *    motion
 *
 * Run:  SITE_PASSWORD=… node scripts/check-design.mjs [baseURL]
 */
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://127.0.0.1:3020";
const PW = process.env.SITE_PASSWORD || "test";
const results = [];
const ok = (name, pass, extra = "") => {
  results.push(`${pass ? "PASS" : "FAIL"} ${name}${extra ? " — " + String(extra).slice(0, 140) : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const creds = { httpCredentials: { username: "niramay", password: PW } };

// ---------- 1. mobile height + section rule + viewport sweep ----------
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...creds, viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "load" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(600);

  const metrics = await page.evaluate(() => {
    const vp = window.innerHeight;
    const sections = [...document.querySelectorAll("main section")].filter(
      (s) => s.offsetParent !== null
    );
    return {
      height: Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sections: sections.map((s, i) => ({
        i,
        h: Math.round(s.getBoundingClientRect().height),
        first: (s.textContent || "").trim().slice(0, 40),
      })),
      vp,
    };
  });
  console.log(`INFO mobile home height: ${metrics.height}px (viewport ${metrics.vp}px)`);
  const over = metrics.sections.filter((s, i) => i > 0 && s.h > metrics.vp * 1.3);
  ok("mobile: no non-hero section taller than 1.3x viewport", over.length === 0,
     over.map((s) => `${s.h}px "${s.first}"`).join("; "));
  ok("mobile: no horizontal overflow", metrics.overflow <= 0, `+${metrics.overflow}px`);
  await ctx.close();
  await browser.close();
}

// ---------- 2. horizontal overflow at all breakpoints ----------
{
  const browser = await chromium.launch();
  for (const w of [390, 768, 1024, 1440]) {
    const ctx = await browser.newContext({ ...creds, viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    let worst = 0;
    for (const url of ["/", "/contact/", "/doctors/dr-ajay-kaduskar/", "/services/", "/health-library/"]) {
      await page.goto(`${base}${url}`, { waitUntil: "load" });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await sleep(300);
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      worst = Math.max(worst, over);
    }
    ok(`no horizontal overflow at ${w}px`, worst <= 0, `worst +${worst}px`);
    await ctx.close();
  }
  await browser.close();
}

// ---------- 3. autoplay: advances, pauses on hover, off under reduced motion ----------
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...creds, viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "load" });

  const region = page.locator('main [role="region"][aria-label]').first();
  await region.scrollIntoViewIfNeeded();

  const pos = () => region.evaluate((el) => el.scrollLeft);

  // baseline: it advances on its own (~4.5s interval)
  const p0 = await pos();
  await sleep(5600);
  const p1 = await pos();
  ok("autoplay: carousel advances without interaction", p1 !== p0, `${p0} -> ${p1}`);

  // hover pause: scrollLeft must not change while hovered
  await region.hover();
  const h0 = await pos();
  await sleep(5600);
  const h1 = await pos();
  ok("autoplay: pauses while hovered", h1 === h0, `${h0} -> ${h1}`);

  // marquee pauses on hover (CSS animation-play-state)
  const marqueeState = await page.evaluate(() => {
    const t = document.querySelector(".marquee-track");
    if (!t) return "missing";
    const before = getComputedStyle(t).animationPlayState;
    t.closest(".marquee").dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    // :hover needs a real pointer state; emulate via class check instead:
    return before;
  });
  const marquee = page.locator(".marquee").first();
  await marquee.scrollIntoViewIfNeeded();
  await marquee.hover();
  const marqueePaused = await marquee.evaluate(
    (m) => getComputedStyle(m.querySelector(".marquee-track")).animationPlayState
  );
  ok("marquee: running by default", marqueeState === "running", marqueeState);
  ok("marquee: pauses on interaction", marqueePaused === "paused", marqueePaused);

  await ctx.close();

  // reduced motion: no autoplay, pause button pressed, marquee static
  const rctx = await browser.newContext({
    ...creds,
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const rpage = await rctx.newPage();
  await rpage.goto(`${base}/`, { waitUntil: "load" });
  const rregion = rpage.locator('main [role="region"][aria-label]').first();
  await rregion.scrollIntoViewIfNeeded();
  const r0 = await rregion.evaluate((el) => el.scrollLeft);
  await sleep(5600);
  const r1 = await rregion.evaluate((el) => el.scrollLeft);
  const pressed = await rpage
    .locator('button[aria-label="Play carousel"], button[aria-label="Pause carousel"]')
    .first()
    .getAttribute("aria-pressed");
  const rmarquee = await rpage.evaluate(() => {
    const t = document.querySelector(".marquee-track");
    return t ? getComputedStyle(t).animationName : "missing";
  });
  ok("reduced motion: carousel does not autoplay", r1 === r0, `${r0} -> ${r1}`);
  ok("reduced motion: pause button reports paused", pressed === "true", `aria-pressed=${pressed}`);
  ok("reduced motion: marquee static", rmarquee === "none", rmarquee);
  await rctx.close();
  await browser.close();
}

console.log("\n" + results.join("\n"));
const failed = results.filter((r) => r.startsWith("FAIL"));
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
