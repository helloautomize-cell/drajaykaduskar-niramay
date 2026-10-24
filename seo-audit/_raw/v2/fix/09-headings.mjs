// AI-002: convert Title Case headings to sentence case in the Health Library.
// Keeps proper nouns, acronyms and brand names capitalised; lowercases the rest.
import { readdirSync } from "node:fs";
import { edit } from "./io.mjs";

const KEEP = new Set([
  "CGM","CGMs","GLP-1","GLP-1s","HbA1c","HbA1C","TIR","TBR","TAR","ECG","TMT","BMI","AGP","GDM","OGTT",
  "PCOS","LDL","HDL","AI","CT","MRI","DNA","FIB-4","FibroScan","InBody",
  "India","Indian","Indians","Nagpur","Dhantoli","WHO","NIDDK","ICMR","ADA","RSSDI","API",
  "Wegovy","Ozempic","Mounjaro","Rybelsus","Victoza","Trulicity","Saxenda","Zepbound",
  "Dr.","Blooming","Niramay","Ramadan","Diwali","Diabesity?","Type","GoS loaf",
]);

function sentenceCase(h) {
  // split on spaces; treat "word" tokens, keep punctuation attached
  const tokens = h.split(" ");
  return tokens.map((tok, i) => {
    const m = tok.match(/^([("'*]*)([A-Za-z0-9''-]+)([)"'’*:,.?!]*)$/);
    if (!m) return tok;
    const [, pre, core, post] = m;
    if (i === 0) return tok;                       // first word keeps its case
    if (/^[0-9]/.test(core)) return tok;            // numbers/units
    if (KEEP.has(core)) return tok;                 // proper nouns / acronyms
    if (/^[A-Z]{2,}$/.test(core)) return tok;       // ALL-CAPS acronyms
    if (/[A-Z].*[a-z]/.test(core) && /[a-z][A-Z]/.test(core)) return tok; // camelCase (HbA1c)
    if (pre.endsWith("(") === false && /^[A-Z]/.test(core) && !KEEP.has(core)) {
      // after a colon keep the word's original case? Standard: sentence case => lowercase
      return pre + core.charAt(0).toLowerCase() + core.slice(1) + post;
    }
    return tok;
  }).join(" ");
}

let changed = 0, files = 0;
for (const f of readdirSync("resources/content/blog")) {
  if (!f.endsWith(".md") || f.startsWith("_")) continue;
  const p = `resources/content/blog/${f}`;
  const n = edit(p, (s) => s.replace(/^(#{2,5})[ \t]+(.+)$/gm, (_, hs, h) => {
    const fixed = sentenceCase(h.trimEnd());
    if (fixed !== h.trimEnd()) changed++;
    return `${hs} ${fixed}`;
  }));
  if (n) files++;
}
console.log("files:", files, "headings:", changed);
