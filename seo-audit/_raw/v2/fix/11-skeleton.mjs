// AI-001: de-uniform the "Key takeaways / Final thoughts" skeleton.
// - "Final thoughts" heading is dropped; its paragraph ends the article naturally.
// - "Key takeaways" is renamed to one of several natural variants, picked
//   deterministically per slug so the library does not repeat one phrase.
import { readdirSync } from "node:fs";
import { edit } from "./io.mjs";
const VARIANTS = ["In short", "What to remember", "The quick version", "Points to keep", "A quick recap"];
let changed = 0;
for (const f of readdirSync("resources/content/blog")) {
  if (!f.endsWith(".md") || f.startsWith("_")) continue;
  const p = `resources/content/blog/${f}`;
  const hash = [...f].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const v = VARIANTS[hash % VARIANTS.length];
  const n = edit(p, (s) =>
    s
      .replace(/^#### Final thoughts[ \t]*\r?\n\r?\n/gm, "")
      .replace(/^#### Key takeaways[ \t]*$/gm, `#### ${v}`)
  );
  if (n) changed++;
}
console.log("files:", changed);
