// FP-002: repair AI image-prompt fragments that leaked into image_alt.
import { edit, once } from "./io.mjs";
const FIX = {
  "diabetes-and-kidney-disease-tests-you-should-have":
    ["Lab technician handing a small urine sample container to an Indian patient while a diabetologist explains",
     "Lab technician handing a small urine sample container to an Indian patient while a diabetologist explains the report"],
  "how-to-read-cgm-report-agp-time-in-range-patterns":
    ["Diabetologist pointing at a printed ambulatory glucose profile chart on a clinic desk while an Indian",
     "Diabetologist pointing at a printed ambulatory glucose profile chart on a clinic desk while an Indian patient looks on"],
  "do-glp-1-medicines-replace-metformin-or-insulin":
    ["Injection pen, tablets and a glucometer neatly arranged on a clinic table. clinical calm mood, shallow",
     "Injection pen, tablets and a glucometer neatly arranged on a clinic table"],
  "what-is-metabolic-syndrome-5-risk-factors":
    ["Doctor measuring an Indian patient's waist and blood pressure in a clinic. professional caring mood, shallow",
     "Doctor measuring an Indian patient's waist and blood pressure in a clinic"],
  "what-is-diabesity":
    ["Doctor explaining a body chart to an Indian patient in a modern clinic. supportive mood, shallow",
     "Doctor explaining a body chart to an Indian patient in a modern clinic"],
  "what-happens-when-you-stop-glp-1-weight-loss-medicine":
    ["Indian diabetologist talking with a patient about a maintenance plan while a healthy meal and walking",
     "Indian diabetologist talking with a patient about a maintenance plan, with a healthy meal and walking shoes nearby"],
  "when-to-see-a-diabetologist":
    ["Diabetologist reviewing a patient's glucose chart on a tablet in a modern clinic in India. trustworthy",
     "Diabetologist reviewing a patient's glucose chart on a tablet in a modern clinic in India"],
  "why-glp-1-medicines-became-global-trend":
    ["Indian family at a dining table looking at a phone showing a news article while",
     "Indian family at a dining table looking at a phone showing a news article about weight-loss medicines"],
  "does-everyone-with-type-2-diabetes-need-cgm":
    ["Small continuous glucose sensor on the upper arm of an Indian adult with a phone showing",
     "Small continuous glucose sensor on the upper arm of an Indian adult, with a phone showing the glucose app beside it"],
  "after-gestational-diabetes-when-to-test-for-type-2-diabetes":
    ["Indian woman in her thirties receiving a blood test in a clinic while her young child",
     "Indian woman in her thirties receiving a blood test in a clinic while her young child waits beside her"],
  "control-blood-sugar-naturally":
    ["Indian family walking together in a park in the evening with a healthy home-cooked meal prepared",
     "Indian family walking together in a park in the evening after a healthy home-cooked meal"],
  "how-glp-1-medicines-are-given-injection-technique-storage":
    ["Nurse guiding an Indian patient to inject an injection pen into the abdomen skin fold, shown",
     "Nurse guiding an Indian patient to inject an injection pen into the abdomen skin fold"],
  "what-is-time-in-range-tir-diabetes":
    ["Diabetologist and patient looking at a smartphone showing a smooth glucose graph with a coloured target",
     "Diabetologist and patient looking at a smartphone showing a smooth glucose graph with a coloured target zone"],
};
for (const [slug, [a, b]] of Object.entries(FIX)) {
  const f = `resources/content/blog/${slug}.md`;
  edit(f, (s) => once(s, `image_alt: "${a}"`, `image_alt: "${b}"`, slug));
}
// remaining truncated/prompt-style alts found by trailing-fragment scan
const FIX2 = {
  "adult-measuring-waist-home":
    ["Adult measuring waist circumference with a tape at home in Nagpur healthy lifestyle setting",
     "Adult measuring waist circumference with a tape at home in a Nagpur apartment"],
};
for (const [slug, [a, b]] of Object.entries(FIX2)) {
  const f = `resources/content/blog/${slug}.md`;
  try { edit(f, (s) => once(s, `image_alt: "${a}"`, `image_alt: "${b}"`, slug)); } catch { /* slug guess may differ */ }
}
console.log("ok");
