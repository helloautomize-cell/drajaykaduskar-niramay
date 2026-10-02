import { chromium } from "playwright-core";
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const page = await browser.newPage({ viewport: { width: 1440, height: 844 } });
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
const r = await page.evaluate(() => {
  const doc = document.scrollingElement;
  window.scrollTo(200, 0);
  const canScroll = window.scrollX;
  return {
    scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth,
    htmlOX: getComputedStyle(document.documentElement).overflowX,
    bodyOX: getComputedStyle(document.body).overflowX,
    canScroll,
    // widest visible (unclipped) element
    visibleWide: [...document.querySelectorAll("body *")].filter(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right <= document.documentElement.clientWidth + 1) return false;
      let p = el; while (p && p !== document.body) { const cs = getComputedStyle(p); if (["hidden","clip","auto","scroll"].includes(cs.overflowX)) return false; p = p.parentElement; }
      return true;
    }).map(el => `${el.tagName}.${String(el.className).slice(0,50)}`).slice(0,5)
  };
});
console.log(r);
await browser.close();
