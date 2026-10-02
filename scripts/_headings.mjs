import { chromium } from "playwright-core";
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const BASE = "http://localhost:3001";
const ROUTES = ["/","/about/","/services/","/diabetes/","/diabetes/type-2-diabetes/","/heart-care/2d-echo/","/blooming-buds/","/vaccination/","/lab/","/pharmacy/","/plan-your-visit/","/faqs/","/contact/","/health-library/","/health-library/diabetes-myths-and-facts/","/health-library/smart-love-parenting-teenagers/","/health-library/self-esteem-teenagers-with-disabilities/","/health-library/preparing-child-for-adolescence/","/health-library/menstrual-hygiene-teenage-girls/","/doctors/dr-ajay-kaduskar/","/doctors/dr-prajakta-kaduskar/","/privacy-policy/"];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const r of ROUTES) {
  await page.goto(BASE + r, { waitUntil: "networkidle", timeout: 30000 });
  const bad = await page.evaluate(() => {
    const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
    const issues = [];
    let prev = 0;
    for (const h of hs) {
      const lvl = +h.tagName[1];
      if (prev && lvl > prev + 1) issues.push(`${h.tagName} "${h.textContent.trim().slice(0,45)}" after h${prev}`);
      prev = lvl;
    }
    return issues;
  });
  console.log(`${bad.length ? bad.length + " skips" : "ok"} ${r}${bad.length ? " :: " + bad.slice(0,3).join("; ") : ""}`);
}
await browser.close();
