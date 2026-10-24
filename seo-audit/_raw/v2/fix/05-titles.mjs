// KW-002/003: repair truncated and too-short seo_titles (<=60 chars incl suffix).
import { edit } from "./io.mjs";
const FIX = {
  "can-type-2-diabetes-be-reversed-remission": "Type 2 Diabetes Reversal and Remission | Niramay",
  "first-signs-of-type-2-diabetes": "First Signs of Type 2 Diabetes | Niramay",
  "how-glp-1-medicines-are-given-injection-technique-storage": "GLP-1 Injections: Technique and Storage | Niramay",
  "what-is-diabesity": "What Is Diabesity? Diabetes and Obesity | Niramay",
  "cgm-vs-glucometer-type-2-diabetes": "CGM vs Glucometer for Type 2 Diabetes | Niramay",
  "diabetes-and-sweets-handling-mithai": "Diabetes and Sweets: The Mithai Guide | Niramay",
  "oral-glp-1-tablets-replacing-weight-loss-injections": "Oral GLP-1 Tablets for Weight Loss | Niramay",
  "prediabetes-hba1c-blood-sugar-symptoms-prevention": "Prediabetes: HbA1c, Symptoms and Prevention | Niramay",
  "type-2-diabetes-symptoms-diagnosis-management": "Type 2 Diabetes: Symptoms and Management | Niramay",
};
for (const [slug, title] of Object.entries(FIX)) {
  const f = `resources/content/blog/${slug}.md`;
  edit(f, (s) => {
    const m = s.match(/^seo_title:\s*"[^"]*"/m);
    if (!m) throw new Error("no seo_title in " + f);
    return s.replace(m[0], `seo_title: "${title}"`);
  });
}
console.log("ok");
