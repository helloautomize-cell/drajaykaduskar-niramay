import { chromium } from "playwright-core";
const BASE = "http://localhost:3001";
const ROUTES = ["/","/about/","/services/","/diabetes/","/diabetes/type-2-diabetes/","/heart-care/2d-echo/","/blooming-buds/","/vaccination/","/lab/","/pharmacy/","/plan-your-visit/","/faqs/","/contact/","/health-library/","/health-library/diabetes-myths-and-facts/","/health-library/smart-love-parenting-teenagers/","/health-library/self-esteem-teenagers-with-disabilities/","/health-library/preparing-child-for-adolescence/","/health-library/menstrual-hygiene-teenage-girls/","/doctors/dr-ajay-kaduskar/","/doctors/dr-prajakta-kaduskar/","/privacy-policy/"];
const execPath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-x64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: execPath });
const page = await browser.newPage();
for (const route of ROUTES) {
  const issues = [];
  const onConsole = (m) => { if (["error","warning"].includes(m.type())) issues.push(`[${m.type()}] ${m.text().slice(0,200)}`); };
  const onErr = (e) => issues.push(`[pageerror] ${String(e).slice(0,200)}`);
  page.on("console", onConsole); page.on("pageerror", onErr);
  try { await page.goto(BASE+route, { waitUntil:"networkidle", timeout:30000 }); await page.waitForTimeout(800); }
  catch(e){ issues.push("[nav] "+e.message.split("\n")[0]); }
  page.off("console", onConsole); page.off("pageerror", onErr);
  // filter noise: font preload warnings are dev-mode noise? keep all, report raw
  console.log(`${issues.length === 0 ? "0 issues" : issues.length+" issues"} ${route}`);
  issues.slice(0,4).forEach(i=>console.log("    "+i));
}
await browser.close();
