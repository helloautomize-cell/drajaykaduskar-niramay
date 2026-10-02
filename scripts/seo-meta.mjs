// Writes resources/docs/seo-meta.csv (route,title,description) and fails if
// any title > 60 chars, description > 155, or either is duplicated.
import { writeFileSync } from "node:fs";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { pageByUrl, postBySlug } = jiti("../lib/content/pages.ts");
const { site } = jiti("../lib/site-config.ts");

const rows = [];
const seen = new Map();
const problems = [];

function add(url, title, description, kind) {
  rows.push({ url, title: title || "", description: description || "", kind });
  if (url !== "/styleguide/" && url !== "/thank-you/") {
    if (title && title.length > 60)
      problems.push(`${url}: title ${title.length} chars — ${title}`);
    if (description && description.length > 155)
      problems.push(`${url}: description ${description.length} chars`);
    if (title) {
      const k = `t:${title}`;
      if (seen.has(k)) problems.push(`duplicate title: ${seen.get(k)} and ${url}`);
      seen.set(k, url);
    }
    if (description) {
      const k = `d:${description}`;
      if (seen.has(k)) problems.push(`duplicate description: ${seen.get(k)} and ${url}`);
      seen.set(k, url);
    }
  }
}

const pages = [...pageByUrl().entries()].sort((a, b) => a[0].localeCompare(b[0]));
for (const [url, page] of pages) {
  const m = page.meta;
  add(url === "-" ? "/404/" : url, m.seo_title || `${m.title} | ${site.name}`, m.meta_description || "", "page");
}
for (const post of postBySlug().values()) {
  add(post.meta.url,
    post.meta.seo_title || post.meta.title + " | Niramay Clinics, Nagpur",
    post.meta.excerpt || "", "post");
}
add("/thank-you/", "Thank you | Niramay Clinics, Nagpur", "", "utility");
add("/styleguide/", "Design system | Niramay Clinics, Nagpur", "", "utility");

const esc = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const csv =
  "route,title,title_len,description,desc_len\n" +
  rows.map((r) => [r.url, r.title, r.title.length, r.description, r.description.length].map(esc).join(",")).join("\n") +
  "\n";
writeFileSync("resources/docs/seo-meta.csv", csv);

console.log(`wrote resources/docs/seo-meta.csv — ${rows.length} routes`);
if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}
console.log("no length or duplicate issues");
