// Scans the rendered main text (crawl.json) and source markdown for AI-writing
// tells, risky claims and US spellings. Output: content-scan.json
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
const crawl = JSON.parse(readFileSync(new URL(process.env.IN || "./crawl.json", import.meta.url), "utf8"));
const root = path.resolve("resources/content");

const GPT = ["delve", "tapestry", "realm", "landscape", "navigate", "navigating", "embark", "journey", "unlock", "elevate", "empower", "seamless", "seamlessly", "robust", "pivotal", "crucial", "vital", "myriad", "testament", "holistic", "game-changer", "game changer", "fast-paced", "it's important to note", "it is important to note", "when it comes to", "comprehensive guide", "in conclusion", "whether you're", "whether you are", "not just", "it's not just"];
const CLAUDE = ["here's the thing", "that said", "the reality is", "genuinely", "nuanced", "straightforward", "the bottom line", "bottom line"];
const RISK = ["100%", "cure", "cured", "guarantee", "guaranteed", "painless", "best doctor", "best clinic", "no side effects", "permanent", "reverse", "reversal", "miracle", "only clinic", "number one", "no. 1", "top doctor", "risk-free", "completely safe"];
const US = ["color", "center", "behavior", "pediatric", "pediatrician", "program ", "fiber", "analyze", "organize", "counseling", "favorite", "liter", "meter ", "anemia", "hemoglobin", "esophag", "estrogen", "gynecolog", "labor ", "optimize", "personalized", "recognize", "realize", "specialize", "minimize", "jewelry", "check-up"];

const rx = (w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "gi");
function hits(text, list) {
  const out = {};
  for (const w of list) {
    const m = text.match(rx(w));
    if (m) out[w] = m.length;
  }
  return out;
}
function sentences(text) {
  return text.split(/(?<=[.!?])\s+(?=[A-Z0-9"“])/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length > 3);
}
const res = [];
for (const p of crawl) {
  const t = p.mainText;
  const sents = p.paras.flatMap(sentences);
  const lens = sents.map((s) => s.split(/\s+/).length);
  const mean = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / (lens.length || 1));
  const syll = (w) => Math.max(1, (w.toLowerCase().replace(/[^a-z]/g, "").replace(/e$/, "").match(/[aeiouy]+/g) || []).length);
  const words = sents.join(" ").split(/\s+/).filter((w) => /[a-z]/i.test(w));
  const sy = words.reduce((a, w) => a + syll(w), 0);
  const fkgl = 0.39 * (words.length / (sents.length || 1)) + 11.8 * (sy / (words.length || 1)) - 15.59;
  res.push({
    url: p.url,
    emDash: (t.match(/—/g) || []).length,
    enDash: (t.match(/ – /g) || []).length,
    gpt: hits(t, GPT),
    claude: hits(t, CLAUDE),
    risk: hits(t, RISK),
    us: hits(t, US),
    emoji: (t.match(/\p{Extended_Pictographic}/gu) || []).length,
    boldLabelLis: p.boldLabelLis,
    words: t.split(/\s+/).length,
    sentences: sents.length,
    meanLen: +mean.toFixed(1),
    sdLen: +sd.toFixed(1),
    fkgl: +fkgl.toFixed(1),
    titleCaseHeadings: p.headings.filter((h) => {
      const w = h.text.split(/\s+/).filter((x) => x.length > 3);
      return w.length >= 3 && w.every((x) => /^[A-Z]/.test(x));
    }).map((h) => h.text),
    riskSentences: sents.filter((s) => /\b(cure|guarantee|painless|100%|reverse|permanent|best)\b/i.test(s)).slice(0, 6),
  });
}
// Source-level: bold-label bullets, TODO/FIXME, CONFIRM markers, placeholders
const files = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = path.join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n.endsWith(".md")) files.push(p); } })(root);
const src = files.map((f) => {
  const s = readFileSync(f, "utf8");
  return {
    file: path.relative(process.cwd(), f),
    boldLabelBullets: (s.match(/^\s*[-*]\s+\*\*[^*]+:\*\*/gm) || []).length + (s.match(/^\s*[-*]\s+\*\*[^*]+\*\*:/gm) || []).length,
    confirm: (s.match(/\[CONFIRM[^\]]*\]/g) || []).length,
    pending: (s.match(/PENDING|TBD|TODO|FIXME|lorem|example\.com|John Doe|XXXX/gi) || []),
    emDash: (s.match(/—/g) || []).length,
  };
});
writeFileSync(new URL(process.env.COUT || "./content-scan.json", import.meta.url), JSON.stringify({ res, src }, null, 1));
for (const r of res) console.log(r.url, "w", r.words, "bl", r.boldLabelLis, "em", r.emDash, "fk", r.fkgl, "mean", r.meanLen, "sd", r.sdLen, "gpt", JSON.stringify(r.gpt), "cl", JSON.stringify(r.claude), "risk", JSON.stringify(r.risk), "us", JSON.stringify(r.us), "TC", r.titleCaseHeadings.length);
console.log("---- source");
for (const s of src.filter((x) => x.boldLabelBullets || x.confirm || x.pending.length || x.emDash)) console.log(s.file, "bold", s.boldLabelBullets, "confirm", s.confirm, "pend", s.pending.join(","), "em", s.emDash);
