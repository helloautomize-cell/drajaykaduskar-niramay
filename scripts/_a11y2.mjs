import { chromium } from "playwright-core";
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const BASE = "http://localhost:3001";
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500); // hydration
await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(s=>setTimeout(s,120));} });
await page.waitForTimeout(1500); // let islands load
const labels = await page.evaluate(() => {
  const q = (sel) => [...document.querySelectorAll(sel)].map(el => ({ label: el.getAttribute("aria-label"), role: el.getAttribute("role") }));
  return {
    tablist: q('[role="tablist"]'),
    tabs: q('[role="tab"]').length,
    prevNext: q('button').filter(b => /previous|next/i.test(b.label||"")),
    mapBtn: q('button').filter(b => /map/i.test(b.label||b.text)),
    stepNav: q('nav[aria-label], ol[aria-label]').map(n=>n.label),
  };
});
console.log(JSON.stringify(labels, null, 1));

// blog post: video facade + faq
await page.goto(BASE + "/health-library/diabetes-myths-and-facts/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const blog = await page.evaluate(() => {
  const q = (sel) => [...document.querySelectorAll(sel)].map(el => ({ label: el.getAttribute("aria-label"), text: el.textContent.trim().slice(0,50) }));
  return {
    video: q('button').filter(b => /video/i.test(b.label||"")),
    faqButtons: q('h3 button, [class*="faq"] button').length,
  };
});
console.log("blog:", JSON.stringify(blog));
await browser.close();
