// Read-only crawl: loads every URL with JavaScript DISABLED (raw server HTML,
// what AI bots see) and extracts SEO signals into crawl.json.
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:3031";
const urls = readFileSync(new URL(process.env.URLS || "./all.txt", import.meta.url), "utf8").split(/\r?\n/).filter(Boolean);
const browser = await chromium.launch();
const ctx = await browser.newContext({
  javaScriptEnabled: false,
  userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
});
const page = await ctx.newPage();
const out = [];
for (const u of urls) {
  const res = await page.goto(BASE + u, { waitUntil: "domcontentloaded" });
  const headers = res.headers();
  const data = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const meta = (n) => q(`meta[name="${n}"]`)?.content ?? q(`meta[property="${n}"]`)?.content ?? null;
    const main = q("main") || document.body;
    const headings = [...main.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
      tag: h.tagName.toLowerCase(),
      text: h.textContent.trim().replace(/\s+/g, " "),
      hidden: !!h.closest("[hidden]"),
    }));
    const imgs = [...document.querySelectorAll("img")].map((i) => ({
      src: i.getAttribute("src"),
      alt: i.getAttribute("alt"),
      w: i.getAttribute("width"),
      h: i.getAttribute("height"),
      fill: (i.getAttribute("style") || "").includes("position:absolute"),
      nextImage: (i.getAttribute("src") || "").startsWith("/_next/image") || i.hasAttribute("data-nimg"),
      inMain: !!i.closest("main"),
    }));
    const links = [...document.querySelectorAll("a[href]")].map((a) => ({
      href: a.getAttribute("href"),
      text: (a.textContent || a.getAttribute("aria-label") || "").trim().replace(/\s+/g, " "),
      rel: a.getAttribute("rel"),
      target: a.getAttribute("target"),
      zone: a.closest("header,nav") ? "nav" : a.closest("footer") ? "footer" : a.closest("main") ? "main" : "other",
      inProse: !!a.closest("main p, main li, main td") && !a.closest("nav,[aria-label*='Related'],[aria-label*='related']"),
    }));
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);
    const onclickNav = [...document.querySelectorAll("[onclick]")].length;
    const clone = main.cloneNode(true);
    clone.querySelectorAll("script,style,noscript").forEach((n) => n.remove());
    // keep block boundaries so sentences do not run together
    clone.querySelectorAll("p,li,h1,h2,h3,h4,h5,h6,td,th,div,section,button").forEach((n) => n.append(document.createTextNode(" \n ")));
    const mainText = clone.textContent;
    const paras = [...clone.querySelectorAll("p,li")].map((n) => n.textContent.replace(/\s+/g, " ").trim()).filter((s) => s.length > 40);
    const pOnly = [...clone.querySelectorAll("article p, main p")].filter((n) => !n.closest("li,nav,aside,[role=region]")).map((n) => n.textContent.replace(/\s+/g, " ").trim()).filter((s) => s.length > 0);
    const boldLabelLis = [...main.querySelectorAll("li")].filter((li) => {
      const f = li.querySelector(":scope > strong:first-child, :scope > p:first-child > strong:first-child");
      return f && /:\s*$/.test(f.textContent) || (f && /^\s*:/.test((f.nextSibling?.textContent) || ""));
    }).length;
    // collect visible-in-DOM FAQ q/a pairs from the accordion markup
    const faqs = [...document.querySelectorAll("section h3 > button[aria-expanded]")].map((b) => {
      const panel = document.getElementById(b.getAttribute("aria-controls"));
      return { q: b.textContent.trim(), a: panel ? panel.textContent.trim().replace(/\s+/g, " ") : null };
    });
    const bc = q('nav[aria-label*="readcrumb"]');
    return {
      lang: document.documentElement.lang,
      title: document.title,
      description: meta("description"),
      robots: meta("robots"),
      canonical: q('link[rel="canonical"]')?.href ?? null,
      og: {
        title: meta("og:title"), description: meta("og:description"), url: meta("og:url"),
        image: meta("og:image"), type: meta("og:type"), locale: meta("og:locale"), site: meta("og:site_name"),
      },
      twitter: { card: meta("twitter:card"), title: meta("twitter:title"), image: meta("twitter:image"), description: meta("twitter:description") },
      icons: [...document.querySelectorAll('link[rel*="icon"],link[rel="manifest"]')].map((l) => `${l.rel}:${l.getAttribute("href")}`),
      headings,
      imgs,
      links,
      ld,
      onclickNav,
      faqs,
      breadcrumb: bc ? bc.textContent.trim().replace(/\s+/g, " ") : null,
      mainText: (mainText || "").replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim(),
      paras,
      pOnly,
      boldLabelLis,
      hasWrittenBy: /written by/i.test(document.body.textContent),
      hasReviewedBy: /medically reviewed by|reviewed by/i.test(document.body.textContent),
      hasLastReviewed: /last reviewed/i.test(document.body.textContent),
      hasPublished: /published/i.test(document.body.textContent),
      httpLinks: [...document.querySelectorAll('[src^="http:"],[href^="http:"]')].map((e) => e.getAttribute("src") || e.getAttribute("href")),
    };
  });
  out.push({ url: u, status: res.status(), xRobots: headers["x-robots-tag"] ?? null, ...data });
  process.stdout.write(".");
}
await browser.close();
writeFileSync(new URL(process.env.OUT || "./crawl.json", import.meta.url), JSON.stringify(out, null, 1));
console.log("\nok", out.length);
