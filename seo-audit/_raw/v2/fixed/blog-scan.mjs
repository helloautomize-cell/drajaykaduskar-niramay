// Source-level scan of every Health Library post on origin/main.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
const SRC = process.env.SRC;
const dir = path.join(SRC, "resources/content/blog");
const GPT = /\b(delve|tapestry|realm|landscape|navigat\w*|embark|journey|unlock|elevate|empower\w*|seamless\w*|robust|pivotal|crucial|vital|myriad|testament|holistic|game[- ]changer|fast-paced|it'?s important to note|when it comes to|comprehensive guide|in conclusion|whether you'?re|not just)\b/gi;
const CLAUDE = /\b(here'?s the thing|that said|the reality is|genuinely|nuanced|straightforward|the bottom line|but there is a catch|let'?s|in short)\b/gi;
const RISK = /\b(100%|cure[sd]?|guarantee[sd]?|painless|best doctor|no side effects|miracle|permanent(ly)?|reverse[sd]?|reversal)\b/gi;
const BRANDS = /\b(Wegovy|Ozempic|Mounjaro|Rybelsus|Victoza|Saxenda|Trulicity|Zepbound|Libre|FreeStyle|Dexcom|Glucophage|Januvia|Jardiance|Forxiga)\b/g;
const rows = [];
for (const f of readdirSync(dir).filter((x) => x.endsWith(".md") && !x.startsWith("_"))) {
  const raw = readFileSync(path.join(dir, f), "utf8");
  const [, fmRaw, body] = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const fm = parse(fmRaw);
  const lines = body.split(/\r?\n/);
  const headings = lines.filter((l) => /^#{2,6}\s/.test(l)).map((l) => l.replace(/^#+\s*/, ""));
  const tc = headings.filter((h) => { const w = h.split(/\s+/).filter((x) => x.length > 3 && /^[a-z]/i.test(x)); return w.length >= 2 && w.every((x) => /^[A-Z]/.test(x)); });
  const paras = body.split(/\r?\n\s*\r?\n/).map((p) => p.trim()).filter((p) => p && !/^[#|>-]|^\d+\./.test(p) && !/^\*\*.+\?\*\*$/.test(p));
  const oneSentence = paras.filter((p) => p.split(/(?<=[.!?])\s+/).length === 1 && p.split(/\s+/).length < 16).length;
  // FAQ answers
  const faqSec = body.split(/####\s+Frequently asked questions/i)[1]?.split(/\n---|\n####/)[0] ?? "";
  const faqA = [];
  const qa = faqSec.split(/\r?\n\s*\r?\n/).map((s) => s.trim()).filter(Boolean);
  for (let i = 0; i < qa.length; i++) if (/^\*\*.+\?\*\*$/.test(qa[i]) && qa[i + 1] && !/^\*\*/.test(qa[i + 1])) faqA.push(qa[i + 1].split(/\s+/).length);
  rows.push({
    file: `resources/content/blog/${f}`, url: fm.url, cluster: fm.cluster ?? null, pillar: !!fm.pillar,
    title: fm.title, seo_title: fm.seo_title, seoLen: (fm.seo_title || "").length, published: fm.published, updated: fm.updated,
    author: fm.author, reviewer: fm.reviewed_by, keywords: fm.keywords ?? [], sources: (fm.sources ?? []).length,
    image_alt: fm.image_alt ?? "", altPromptLeak: /mood|shallow|depth of field|photoreal|cinematic|bokeh|lighting|4k|render|\. [a-z]/i.test(fm.image_alt ?? ""),
    truncatedTitle: /\b(and|or|the|of|to|for|with|a|in|vs)\s*\|/i.test(fm.seo_title || "") || /[,:&-]\s*\|/.test(fm.seo_title || ""),
    words: body.split(/\s+/).length, inr: (body.match(/₹\s?\d|Rs\.?\s?\d|INR\s?\d/g) || []).length, inrPlaceholder: /₹X|₹Y|Rs\.? ?X/.test(body),
    brands: [...new Set(body.match(BRANDS) || [])], gpt: (body.match(GPT) || []).map((x) => x.toLowerCase()), claude: (body.match(CLAUDE) || []).map((x) => x.toLowerCase()),
    risk: (body.match(RISK) || []).map((x) => x.toLowerCase()), emDash: (body.match(/—/g) || []).length,
    headings: headings.length, titleCaseHeadings: tc.length, finalThoughts: /####\s+(Final Thoughts|Key Takeaways|Conclusion|In Conclusion|Take-home)/i.test(body),
    quickAnswer: /^\*\*Quick answer\.\*\*/m.test(body), whenToSee: /####\s+When to (seek|see)/i.test(body),
    oneSentenceParas: oneSentence, paras: paras.length, faqCount: faqA.length, faqAvgWords: faqA.length ? Math.round(faqA.reduce((a, b) => a + b, 0) / faqA.length) : 0,
    faqIn40to60: faqA.filter((n) => n >= 40 && n <= 60).length, tables: (body.match(/^\|.*\|\s*$/gm) || []).length > 0,
    boldBulletLabels: (body.match(/^\s*[-*]\s+\*\*[^*]+\*\*\s*[:—-]/gm) || []).length,
  });
}
writeFileSync(new URL("./blog-scan.json", import.meta.url), JSON.stringify(rows, null, 1));
for (const r of rows.sort((a, b) => (a.cluster ?? 99) - (b.cluster ?? 99) || b.pillar - a.pillar))
  console.log([r.cluster ?? "-", r.pillar ? "P" : "s", r.url.replace("/health-library/", "").slice(0, 48), `seo${r.seoLen}${r.truncatedTitle ? "TRUNC" : ""}`, r.published, `w${r.words}`, `src${r.sources}`, `inr${r.inr}${r.inrPlaceholder ? "PH" : ""}`, `br:${r.brands.join("/")}`, `gpt:${r.gpt.length}`, `cl:${r.claude.join("/")}`, `risk:${r.risk.join("/")}`, `TC${r.titleCaseHeadings}/${r.headings}`, `1s${r.oneSentenceParas}/${r.paras}`, `faq${r.faqCount}@${r.faqAvgWords}`, r.finalThoughts ? "FT" : "", r.altPromptLeak ? "ALTLEAK" : "", r.reviewer === r.author ? "selfrev" : ""].join(" "));
