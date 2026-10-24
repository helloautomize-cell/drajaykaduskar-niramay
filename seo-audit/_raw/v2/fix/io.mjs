// Read/write helpers that keep the working tree's CRLF line endings
// (core.autocrlf=true) while letting edit scripts work on LF text.
import { readFileSync, writeFileSync } from "node:fs";
export const read = (f) => readFileSync(f, "utf8").replace(/\r\n/g, "\n");
export const write = (f, s) => writeFileSync(f, s.replace(/\r?\n/g, "\r\n"));
export function edit(f, fn) {
  const before = read(f);
  const after = fn(before);
  if (after !== before) write(f, after);
  return after !== before;
}
/** Replace exactly one occurrence; throws when missing so silent no-ops can't happen. */
export function once(s, a, b, label = "") {
  const i = s.indexOf(a);
  if (i < 0) throw new Error(`not found ${label}: ${a.slice(0, 80)}`);
  return s.slice(0, i) + b + s.slice(i + a.length);
}
