import { chromium } from "playwright-core";
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const page = await browser.newPage({ viewport: { width: 412, height: 915 } });
await page.addInitScript(() => {
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (!e.hadRecentInput) window.__shifts.push({ v: e.value, srcs: (e.sources||[]).map(s => s.node?.tagName + "." + String(s.node?.className||"").slice(0,60)) });
    }
  }).observe({ type: "layout-shift", buffered: true });
});
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
await page.waitForTimeout(6000);
const s = await page.evaluate(() => window.__shifts);
console.log(JSON.stringify(s.filter(x => x.v > 0.001), null, 1));
await browser.close();
