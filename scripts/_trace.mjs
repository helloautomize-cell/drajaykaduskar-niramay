import { chromium } from "playwright-core";
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const page = await browser.newPage({ viewport: { width: 1440, height: 844 } });
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
const info = await page.evaluate(() => {
  const els = [...document.querySelectorAll("body *")]
    .filter(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 2)
    .map(el => {
      let anc = [], p = el.parentElement;
      while (p && anc.length < 5) { const cs = getComputedStyle(p); anc.push(`${p.tagName}.${String(p.className).slice(0,50)}|ox:${cs.overflowX}`); p = p.parentElement; }
      const h = el.closest("section")?.querySelector("h1,h2,h3")?.textContent?.slice(0,50) || "?";
      return { el: `${el.tagName}.${String(el.className).slice(0,60)}`, right: Math.round(el.getBoundingClientRect().right), section: h, anc };
    });
  return els.slice(0, 8);
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
