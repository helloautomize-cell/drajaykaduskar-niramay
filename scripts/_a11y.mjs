import { chromium } from "playwright-core";
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const BASE = "http://localhost:3001";

// 1) aria-labels on interactive landmarks
const checks = [
  ["/", ["ServiceTabs tabs", 'div[role="tablist"]', "carousel", 'section[aria-label], div[aria-roledescription="carousel"], [aria-label*="arousel"]', "map button", 'button:has-text("Show map"), button:has-text("map")', "mobile bar", 'nav[aria-label], [class*="mobile"] nav']],
  ["/health-library/diabetes-myths-and-facts/", ["video facade", 'button[class*="group relative"]', "faq region", '[class*="faq"], section']],
  ["/diabetes/type-2-diabetes/", ["step/callout regions", 'section', "reviewer box", 'aside, [class*="review"]']],
];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(s=>setTimeout(s,30));} window.scrollTo(0,0); });
await page.waitForTimeout(500);
const labels = await page.evaluate(() => {
  const q = (sel) => [...document.querySelectorAll(sel)].map(el => ({ tag: el.tagName, label: el.getAttribute("aria-label"), labelledby: el.getAttribute("aria-labelledby"), role: el.getAttribute("role"), text: el.textContent.trim().slice(0,40) }));
  return {
    tablist: q('[role="tablist"]'),
    tab: q('[role="tab"]').length,
    carouselRegions: q('[aria-roledescription="carousel"], section[aria-label]'),
    mapBtn: q('button').filter(b => /map/i.test(b.text)),
    prevNext: q('button[aria-label*="revious"], button[aria-label*="ext"]'),
    mobileNav: q('nav[aria-label]').map(n => n.label),
    videoBtn: q('button').filter(b => /video|play/i.test(b.text)),
    stepRegions: q('[aria-label*="step"], [role="progressbar"], ol[aria-label], nav[aria-label*="tep"]'),
  };
});
console.log("== home labels:", JSON.stringify(labels, null, 1));

// 2) focus-visible styles: tab through home & check outline
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const focusCheck = await page.evaluate(async () => {
  const results = [];
  for (let i = 0; i < 25; i++) {
    const el = document.activeElement;
    if (el && el !== document.body) {
      const cs = getComputedStyle(el);
      const hasFocus = el.matches(":focus-visible");
      const visible = cs.outlineStyle !== "none" && cs.outlineWidth !== "0px" || cs.boxShadow !== "none";
      results.push({ tag: el.tagName, text: (el.textContent||"").trim().slice(0,30), focusVisible: hasFocus, styled: visible });
    }
    // simulate Tab
    const evt = new KeyboardEvent("keydown", { key: "Tab", bubbles: true });
    document.activeElement?.dispatchEvent(evt);
    // real tab via keyboard requires driver; use manual focus walk
    const focusables = [...document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"]), input, select, textarea')].filter(e => e.offsetParent !== null);
    const idx = focusables.indexOf(document.activeElement);
    if (idx >= 0 && idx < focusables.length - 1) focusables[idx+1].focus(); else break;
  }
  return results;
});
const unstyled = focusCheck.filter(f => !f.styled);
console.log("== focus walk (25 stops), unstyled:", unstyled.length, JSON.stringify(unstyled.slice(0,5)));

// 3) 200% zoom on home & contact — horizontal scroll check
for (const r of ["/", "/contact/"]) {
  const z = await browser.newPage({ viewport: { width: 720, height: 800 } });
  await z.goto(BASE + r, { waitUntil: "networkidle" });
  await z.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await z.waitForTimeout(400);
  const s = await z.evaluate(() => ({ canScroll: (window.scrollTo(100,0), window.scrollX) }));
  console.log(`== 200% zoom ${r}: hscroll=${s.canScroll}`);
  await z.close();
}

// 4) medical pages: reviewer box + CTA + emergency line
for (const r of ["/diabetes/type-2-diabetes/","/heart-care/2d-echo/","/health-library/menstrual-hygiene-teenage-girls/","/doctors/dr-ajay-kaduskar/"]) {
  await page.goto(BASE + r, { waitUntil: "networkidle" });
  const found = await page.evaluate(() => ({
    reviewer: !!document.body.innerHTML.match(/Medically reviewed|Written by/),
    cta: /Book Appointment|WhatsApp/.test(document.body.innerHTML),
    emergency: /108|112|emergency/i.test(document.body.innerHTML),
  }));
  console.log(`== ${r}:`, found);
}
await browser.close();
