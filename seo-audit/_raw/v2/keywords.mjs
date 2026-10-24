// Primary-keyword placement check + page-by-page table data.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
const SRC = process.env.SRC;
const crawl = JSON.parse(readFileSync(new URL("./live-crawl.json", import.meta.url), "utf8"));
const an = JSON.parse(readFileSync(new URL("./live-analysis.json", import.meta.url), "utf8")).rows;
const ai = JSON.parse(readFileSync(new URL("./ai-likeness.json", import.meta.url), "utf8"));
const clusters = JSON.parse(readFileSync(new URL("./clusters.json", import.meta.url), "utf8")).out;
const fm = {};
(function walk(d) {
  for (const n of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, n.name);
    if (n.isDirectory()) walk(p);
    else if (n.name.endsWith(".md") && !n.name.startsWith("_")) {
      const m = readFileSync(p, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!m) continue;
      const f = parse(m[1]);
      if (f.url) fm[f.url] = { ...f, file: path.relative(SRC, p).replace(/\\/g, "/") };
    }
  }
})(path.join(SRC, "resources/content"));
// Manual primary keyword map for non-blog pages (what each page should rank for)
const KW = {
  "/": "diabetes and child specialist clinic Nagpur", "/about/": "Niramay Clinics Nagpur", "/services/": "clinic services Nagpur",
  "/contact/": "Niramay Clinics contact", "/faqs/": "Niramay Clinics FAQs", "/health-library/": "diabetes health articles",
  "/plan-your-visit/": "plan your visit Niramay Clinics", "/plan-your-visit/coming-from-outside-nagpur/": "diabetologist Nagpur outstation patients",
  "/diabetes/": "diabetes care Nagpur", "/diabetes/type-2-diabetes/": "type 2 diabetes treatment Nagpur", "/diabetes/type-1-diabetes/": "type 1 diabetes treatment Nagpur",
  "/diabetes/diabetes-in-pregnancy/": "diabetes in pregnancy Nagpur", "/diabetes/complications-screening/": "diabetes complications screening",
  "/diabetes/diabetes-care-programme/": "diabetes care programme", "/diabetes/prediabetes-risk-assessment/": "prediabetes test Nagpur",
  "/obesity/": "obesity treatment Nagpur", "/obesity/weight-management-medicines/": "weight loss medicines", "/obesity/body-composition-sarcopenia/": "body composition analysis Nagpur",
  "/heart-care/": "heart check up Nagpur", "/heart-care/2d-echo/": "2D echo test Nagpur", "/heart-care/ecg/": "ECG test Nagpur", "/heart-care/tmt-stress-test/": "TMT test Nagpur",
  "/thyroid-clinic/": "thyroid doctor Nagpur", "/hypertension-clinic/": "high blood pressure doctor Nagpur", "/nutrition-lifestyle-counselling/": "diabetes diet counselling Nagpur",
  "/preventive-health-check-ups/": "health check up Nagpur", "/blooming-buds/": "child specialist Nagpur", "/blooming-buds/well-baby-clinic/": "well baby clinic Nagpur",
  "/vaccination/": "child vaccination Nagpur", "/blooming-buds/adolescent-health/": "adolescent health clinic Nagpur", "/blooming-buds/teen-mental-health/": "teen counselling Nagpur",
  "/blooming-buds/psychological-testing/": "psychological testing children Nagpur", "/blooming-buds/career-counselling/": "career counselling Nagpur",
  "/blooming-buds/workshops/": "school health workshops Nagpur", "/lab/": "pathology lab Dhantoli Nagpur", "/lab/home-sample-collection/": "home blood sample collection Nagpur",
  "/pharmacy/": "pharmacy Dhantoli Nagpur", "/doctors/dr-ajay-kaduskar/": "Dr Ajay Kaduskar diabetologist Nagpur", "/doctors/dr-prajakta-kaduskar/": "Dr Prajakta Kaduskar child specialist Nagpur",
};
const STOP = new Set(["in", "the", "and", "for", "of", "a", "to", "with", "what", "how", "is", "your", "you", "can", "do", "does", "test", "nagpur"]);
const toks = (s) => (s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t));
const has = (hay, kw) => { const h = (hay || "").toLowerCase(); const t = toks(kw); return t.length > 0 && t.every((x) => h.includes(x.replace(/s$/, ""))); };
const typeOf = (u) => u === "/" ? "home" : u.startsWith("/doctors/") ? "doctor" : u === "/health-library/" ? "blog index" :
  u.startsWith("/health-library/") ? (fm[u]?.pillar ? "pillar article" : fm[u]?.cluster ? "supporting article" : "article (unclustered)") :
  ["/diabetes/", "/obesity/", "/heart-care/", "/blooming-buds/", "/lab/"].includes(u) ? "service hub" :
  /privacy|terms|disclaimer|editorial|rights|refund|accessibility/.test(u) ? "trust/legal" :
  ["/about/", "/contact/", "/faqs/", "/services/", "/plan-your-visit/"].includes(u) ? "trust/utility" : "service";
const clusterOf = (u) => { for (const c of clusters) if (c.pillar === u || c.supports.includes(u)) return `C${c.cluster}`; return "-"; };
const rows = [];
for (const p of crawl) {
  const a = an.find((r) => r.url === p.url);
  const f = fm[p.url] || {};
  const kw = KW[p.url] || f.keywords?.[0] || (f.seo_title || f.title || "").replace(/\s*\|.*$/, "").replace(/\?$/, "");
  const first100 = p.paras.join(" ").split(/\s+/).slice(0, 100).join(" ");
  const h2s = p.headings.filter((h) => h.tag === "h2").map((h) => h.text).join(" | ");
  const place = {
    title: has(p.title, kw), h1: has(a.h1.join(" "), kw), url: has(p.url.replace(/[-/]/g, " "), kw),
    first100: has(first100, kw), h2: has(h2s, kw), desc: has(p.description, kw),
  };
  rows.push({
    url: p.url, type: typeOf(p.url), cluster: clusterOf(p.url), file: f.file || null, primaryKeyword: kw,
    placement: place, placementScore: Object.values(place).filter(Boolean).length,
    byline: /Written by/.test(p.mainText.slice(0, 1500)) ? "top" : /Medically reviewed by/.test(p.mainText.slice(0, 1500)) ? "review-top" : /Written by|Medically reviewed by/.test(p.mainText) ? "bottom" : "none",
    dates: /Published \d/.test(p.mainText) ? "pub+upd" : /Last reviewed: \d|Last reviewed: [A-Z]/.test(p.mainText) ? "reviewed" : /Last reviewed: ·/.test(p.mainText) ? "BLANK" : /Last updated: \d/.test(p.mainText) ? "updated" : "none",
    faq: a.faqVisible, faqAvgWords: a.faqAvgWords, schema: a.types.join("+").replace(/^MedicalClinic\+LocalBusiness\+WebSite\+?/, ""),
    linksIn: a.inboundTotal, linksInProse: a.inboundProse.length, linksOut: a.internalOut, linksOutProse: a.proseOut.length,
    titleLen: a.titleLen, descLen: a.descLen, words: a.words, ai: ai.find((x) => x.url === p.url)?.score ?? null,
  });
}
writeFileSync(new URL("./pages.json", import.meta.url), JSON.stringify(rows, null, 1));
const weak = rows.filter((r) => r.placementScore <= 3 && r.type !== "trust/legal");
console.log("weak placement", weak.length);
for (const r of weak) console.log(r.placementScore, r.url, r.primaryKeyword, JSON.stringify(r.placement));
console.log(rows.reduce((m, r) => ((m[r.byline] = (m[r.byline] || 0) + 1), m), {}), rows.reduce((m, r) => ((m[r.dates] = (m[r.dates] || 0) + 1), m), {}));
