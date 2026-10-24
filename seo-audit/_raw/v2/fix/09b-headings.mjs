// Patch leftovers: capital after hyphen mid-word + "Niramay Clinics" name.
import { readdirSync } from "node:fs";
import { edit } from "./io.mjs";
const KEEP = new Set(["GLP-1","HbA1c","FIB-4","DPP-4","SGLT-2","GLP-1s","COVID-19"]);
let n = 0;
for (const f of readdirSync("resources/content/blog")) {
  if (!f.endsWith(".md") || f.startsWith("_")) continue;
  const p = `resources/content/blog/${f}`;
  edit(p, (s) => s.replace(/^(#{2,5})[ \t]+(.+)$/gm, (_, hs, h) => {
    let out = h.replace(/\bNiramay clinics\b/g, "Niramay Clinics");
    // lowercase a capitalised segment after a hyphen inside a word
    out = out.replace(/\b([a-z][A-Za-z]*)-([A-Z][a-z]+)\b/g, (m, a, b) =>
      KEEP.has(`${a}-${b}`) ? m : `${a}-${b.toLowerCase()}`);
    if (out !== h) n++;
    return `${hs} ${out}`;
  }));
}
console.log("fixed", n);
