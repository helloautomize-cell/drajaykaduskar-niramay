import { chromium } from "playwright-core";
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const BASE = "http://localhost:3001";
const ROUTES = ["/","/about/","/services/","/diabetes/","/diabetes/type-2-diabetes/","/heart-care/2d-echo/","/blooming-buds/","/vaccination/","/lab/","/pharmacy/","/plan-your-visit/","/faqs/","/contact/","/health-library/","/health-library/diabetes-myths-and-facts/","/health-library/smart-love-parenting-teenagers/","/health-library/self-esteem-teenagers-with-disabilities/","/health-library/preparing-child-for-adolescence/","/health-library/menstrual-hygiene-teenage-girls/","/doctors/dr-ajay-kaduskar/","/doctors/dr-prajakta-kaduskar/","/privacy-policy/"];
const WIDTHS = [1440, 1024, 768, 390];

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 844 } });
  let bad = 0;
  for (const r of ROUTES) {
    try {
      await page.goto(BASE + r, { waitUntil: "networkidle", timeout: 30000 });
      await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(s=>setTimeout(s,25));} window.scrollTo(0,0); });
      await page.waitForTimeout(300);
      const res = await page.evaluate(() => {
        const issues = [];
        const doc = document.scrollingElement;
        if (doc.scrollWidth > doc.clientWidth + 2) {
          // find culprit
          const wide = [...document.querySelectorAll("body *")].filter(el => {
            const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
            return r.width > document.documentElement.clientWidth + 2 && cs.overflowX !== "hidden" && cs.overflowX !== "clip" && !el.closest('[style*="overflow"]');
          }).slice(0,3).map(el => `${el.tagName}.${String(el.className).slice(0,40)}`);
          issues.push(`hscroll ${doc.scrollWidth}>${doc.clientWidth} culprits:${wide.join(";")||"clipped"}`);
        }
        // h1 check: max one accent word
        const h1 = document.querySelector("h1");
        if (h1) {
          const accents = h1.querySelectorAll("em.accent, .accent");
          const words = [...accents].map(a => a.textContent.trim().split(/\s+/).length).reduce((a,b)=>a+b,0);
          if (words > 2) issues.push(`h1 accent words=${words}`);
          if (!h1.textContent.trim()) issues.push("empty h1");
        } else issues.push("no h1");
        // orphan heading: heading at very bottom of a section with nothing after
        for (const h of document.querySelectorAll("h2, h3")) {
          const sec = h.closest("section");
          if (sec) {
            const hb = h.getBoundingClientRect(), sb = sec.getBoundingClientRect();
            if (sb.bottom - hb.bottom < 8 && sb.height > 100) issues.push(`orphan heading "${h.textContent.trim().slice(0,40)}"`);
          }
        }
        return issues;
      });
      if (res.length) { bad++; console.log(`[${w}] ${r}: ${res.join(" | ")}`); }
    } catch(e) { bad++; console.log(`[${w}] ${r}: NAV FAIL ${e.message.split("\n")[0]}`); }
  }
  if (!bad) console.log(`[${w}] all ${ROUTES.length} routes clean`);
  await page.close();
}
await browser.close();
