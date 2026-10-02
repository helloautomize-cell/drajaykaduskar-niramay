import { execFileSync } from "node:child_process";
const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac/Chromium.app/Contents/MacOS/Chromium`;
const ROUTES = ["/", "/diabetes/type-2-diabetes/", "/doctors/dr-ajay-kaduskar/", "/health-library/diabetes-myths-and-facts/", "/contact/"];
const BASE = "https://drajaykaduskar-niramay.vercel.app";
const results = {};
for (const route of ROUTES) {
  results[route] = [];
  for (let i = 0; i < 3; i++) {
    const out = `/tmp/psi-phase5/${route.replace(/\//g,"_")}_${i}.json`;
    try {
      execFileSync("npx", ["--no-install","lighthouse", BASE+route,
        "--preset=perf","--form-factor=mobile","--screenEmulation.mobile",
        "--throttling-method=simulate","--output=json","--output-path="+out,
        "--quiet","--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage",
        "--only-categories=performance,accessibility,best-practices,seo",
      ], { env: { ...process.env, CHROME_PATH: CHROME }, stdio: "pipe", timeout: 180000 });
      const d = JSON.parse(await import("node:fs").then(f=>f.readFileSync(out,"utf8")));
      const c = d.categories;
      results[route].push({
        perf: Math.round((c.performance?.score??0)*100),
        a11y: Math.round((c.accessibility?.score??0)*100),
        bp: Math.round((c["best-practices"]?.score??0)*100),
        seo: Math.round((c.seo?.score??0)*100),
        lcp: d.audits["largest-contentful-paint"]?.numericValue,
        fcp: d.audits["first-contentful-paint"]?.numericValue,
        tbt: d.audits["total-blocking-time"]?.numericValue,
        cls: d.audits["cumulative-layout-shift"]?.numericValue,
      });
      console.log(`${route} run${i}: ${JSON.stringify(results[route][i])}`);
    } catch(e) { console.log(`${route} run${i}: FAILED ${String(e.message||e).slice(0,150)}`); }
  }
}
console.log("=== MEDIANS ===");
for (const r of ROUTES) {
  const rs = results[r].filter(Boolean);
  const med = (k) => rs.map(x=>x[k]).sort((a,b)=>a-b)[Math.floor(rs.length/2)];
  console.log(`${r}: perf=${med("perf")} a11y=${med("a11y")} bp=${med("bp")} seo=${med("seo")} lcp=${(med("lcp")/1000).toFixed(1)}s tbt=${Math.round(med("tbt"))}ms cls=${med("cls")}`);
}
