// SCH-006/SCH-007: MedicalSpecialty enum values + sameAs for condition nodes.
import { edit, once } from "./io.mjs";
const W = "https://en.wikipedia.org/wiki/", M = "https://meshb.nlm.nih.gov/record/ui?ui=";
const add = {
  "/diabetes/": ["Diabetes", "D003920"], "/diabetes/type-1-diabetes/": ["Type_1_diabetes", "D003922"],
  "/diabetes/type-2-diabetes/": ["Type_2_diabetes", "D003924"], "/diabetes/diabetes-in-pregnancy/": ["Gestational_diabetes", "D016640"],
  "/diabetes/prediabetes-risk-assessment/": ["Prediabetes", "D011236"], "/obesity/": ["Obesity", "D009765"],
  "/hypertension-clinic/": ["Hypertension", "D006973"], "/thyroid-clinic/": ["Thyroid_disease", "D013959"],
};
edit("lib/seo.tsx", (s) => {
  for (const [u, [w, m]] of Object.entries(add)) {
    const key = `  "${u}": {\n`;
    s = once(s, key, `${key}    sameAs: ["${W}${w}", "${M}${m}"],\n`, u);
  }
  s = once(s, "{ name: string; alternateName?: string; treatments: string[]; specialty: string }",
    "{ name: string; alternateName?: string; treatments: string[]; specialty: string; sameAs?: string[] }");
  s = s.split('specialty: "Diabetology"').join('specialty: "Endocrine"').replace('specialty: "Cardiology"', 'specialty: "Cardiovascular"');
  s = once(s, "    possibleTreatment: c.treatments", "    ...(c.sameAs ? { sameAs: c.sameAs } : {}),\n    possibleTreatment: c.treatments");
  return s;
});
console.log("ok");
