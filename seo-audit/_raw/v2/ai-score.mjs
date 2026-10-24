// Heuristic AI-likeness score (0-100) per content page from the live raw HTML,
// plus the 5 sentences that read most machine-written. Formula is documented
// in AUDIT_REPORT.md section 7 so the fix step can recompute it identically.
import { readFileSync, writeFileSync } from "node:fs";
const crawl = JSON.parse(readFileSync(new URL("./live-crawl.json", import.meta.url), "utf8"));
const SKIP = /^\/(accessibility|cancellation-refund-policy|editorial-policy|medical-disclaimer|patient-rights|privacy-policy|terms-of-use|contact)\/$/;
const GPT = /\b(delve|tapestry|realm|landscape|navigat\w*|embark|journey|unlock|elevate|empower\w*|seamless\w*|robust|pivotal|crucial|vital|myriad|testament|holistic|game[- ]changer|fast-paced|it'?s important to note|when it comes to|comprehensive guide|in conclusion|whether you'?re)\b/gi;
const CLAUDE = /\b(here'?s the thing|that said|the reality is|genuinely|nuanced|straightforward|the bottom line|but there is a catch|in short)\b/gi;
const SENT_PATTERNS = [
  [/^(so|but|and|again|instead|nevertheless|however|similarly),?\s/i, 2],
  [/^(this|that|it) (is|does|means|also|simply|deserves|becomes|matters)\b/i, 2],
  [/^there (is|are|isn't) (no|a|one)\b/i, 2],
  [/\b(the (important|key|real|financially sensible) (question|point|thing)|the bigger picture|in practical terms|this guide|a closer look|it helps to understand)\b/i, 4],
  [/\bnot (simply|just|necessarily|automatically)\b/i, 2],
  [/\b(isn't|is not) [^.]{3,40}\. (it is|it's|instead)\b/i, 4],
  [/\b(varies from person to person|depends on (the|your)|everyone is different|no single|no universal|no one-size)\b/i, 2],
  [/\b(may|might|can) (help|be|vary|support|improve)\b/i, 1],
  [/\b(important|significant(ly)?|considerably|substantial(ly)?|particularly|realistic(ally)?)\b/i, 1],
  [/\?$/, 1],
  [/^(no|yes|they won't|price matters|tell your doctor)\.?$/i, 4],
  [/\b(final thoughts|key takeaways|take-home|quick answer)\b/i, 3],
  [GPT, 4],
  [CLAUDE, 4],
];
const sentScore = (s) => SENT_PATTERNS.reduce((a, [re, w]) => a + (new RegExp(re.source, re.flags.replace("g", "")).test(s) ? w : 0), 0) + (s.split(/\s+/).length <= 5 ? 2 : 0);
const split = (t) =>
  t.replace(/\b(Dr|Mr|Mrs|Ms|St|vs|No|e\.g|i\.e)\./g, "$1§").replace(/\b([A-Z])\.(?=\s[A-Z])/g, "$1§")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“])/).map((s) => s.replace(/§/g, ".").trim()).filter((s) => s.split(/\s+/).length >= 2);
const rows = [];
for (const p of crawl) {
  if (SKIP.test(p.url)) continue;
  // article body only: drop boilerplate lines shared across templates
  const paras = p.paras.filter((x) => !/^(Written by|This page is for general information|Call 0712|Ready to talk|Published \d|Last reviewed|Medically reviewed by)/.test(x));
  const sents = paras.flatMap(split);
  const words = sents.join(" ").split(/\s+/).length || 1;
  const lens = sents.map((s) => s.split(/\s+/).length);
  const mean = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / (lens.length || 1));
  const body = sents.join(" ");
  const gpt = (body.match(GPT) || []).length, claude = (body.match(CLAUDE) || []).length;
  const hs = p.headings.filter((h) => /h[23]/.test(h.tag) && !h.hidden && !/^(Related|More from|Frequently|Sources|Key facts|Articles by)/.test(h.text));
  const tc = hs.filter((h) => { const w = h.text.split(/\s+/).filter((x) => x.length > 3 && /^[a-z]/i.test(x)); return w.length >= 2 && w.every((x) => /^[A-Z]/.test(x)); }).length;
  const tcRatio = hs.length ? tc / hs.length : 0;
  // one-line paragraphs among real <p> blocks (list items excluded)
  const ps = (p.pOnly || []).filter((x) => x.split(/\s+/).length >= 2 && !/^(Written by|This page is for general|Published|Last reviewed|Medically reviewed)/.test(x));
  const oneLiners = ps.filter((x) => split(x).length === 1 && x.split(/\s+/).length < 16).length;
  const oneRatio = ps.length ? oneLiners / ps.length : 0;
  const nums = (body.match(/\b\d+([.,]\d+)?\s?(%|mg|mmol|kg|cm|g|mg\/dL|years?|weeks?|months?|days?|hours?|minutes?|₹)?/g) || []).length;
  const numsPer100 = (nums / words) * 100;
  const templ = /final thoughts|key takeaways/i.test(p.headings.map((h) => h.text).join("|"));
  const quick = /Quick answer/.test(p.mainText);
  const faqAvg = p.faqs.length ? p.faqs.reduce((a, f) => a + (f.a || "").split(/\s+/).length, 0) / p.faqs.length : 30;
  const emPerK = ((body.match(/—/g) || []).length / words) * 1000;
  // candidate "worst sentences" come from prose paragraphs only (no list items,
  // headings or link titles)
  const proseSents = ps.flatMap(split).filter((s) => /[.!?]$/.test(s) && !/^(Dr\.|Read our|Book|Call|Please bring)/.test(s));
  const scored = proseSents.map((s) => ({ s, v: sentScore(s) }));
  const rhetDensity = scored.filter((x) => x.v >= 4).length / (proseSents.length || 1);
  const parts = {
    vocab: Math.min(15, 3 * (gpt + claude)),
    titleCase: Math.round(15 * tcRatio),
    oneLiners: Math.round(20 * Math.min(1, oneRatio * 1.5)),
    template: (templ ? 7 : 0) + (quick ? 3 : 0),
    uniform: sd < 6 ? 10 : sd < 7.5 ? 5 : 0,
    noSpecifics: numsPer100 < 1 ? 10 : numsPer100 < 2 ? 5 : 0,
    thinFaq: faqAvg < 15 ? 5 : 0,
    emDash: emPerK > 2 ? 5 : 0,
    rhetoric: Math.min(15, Math.round(rhetDensity * 60)),
  };
  const score = Math.min(100, Object.values(parts).reduce((a, b) => a + b, 0));
  const seen = new Set();
  const worst = scored.sort((a, b) => b.v - a.v || a.s.length - b.s.length).filter((x) => { const k = x.s.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 5).map((x) => x.s);
  rows.push({ url: p.url, score, parts, words, sd: +sd.toFixed(1), tc: `${tc}/${hs.length}`, oneLiners: `${oneLiners}/${ps.length}`, numsPer100: +numsPer100.toFixed(1), worst });
}
rows.sort((a, b) => b.score - a.score);
writeFileSync(new URL("./ai-likeness.json", import.meta.url), JSON.stringify(rows, null, 1));
for (const r of rows) console.log(r.score, r.url, JSON.stringify(r.parts));
