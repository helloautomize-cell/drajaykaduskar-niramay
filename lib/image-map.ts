/**
 * Maps the ORIGINAL file names used in content frontmatter `images:` to the
 * processed files under public/images/. Sources are listed in
 * resources/images/IMAGE-GUIDE.md and the approved AI-portrait table.
 * `resolveImage` reports unmapped names at build time.
 */

export const imageMap: Record<string, string> = {
  /* brand */
  "Nirmay-nlogo-retina.png": "brand/niramay-logo.png",
  "Niramayclinic_favicon.png": "brand/niramay-mark.png",

  /* doctors — real photos */
  "Dr ajay.jpg": "doctors/dr-ajay-kaduskar-keep-simple.jpg",
  "NiramayClinic_Dr_AjayKaduskar.jpg": "doctors/dr-ajay-kaduskar-at-desk.jpg",
  "Child specialist niramay.jpg": "doctors/dr-prajakta-kaduskar-portrait.jpg",

  /* doctors — AI portraits (approved, marketing contract 2 Oct 2026) */
  "Dr ajay Kaduskar in appron.png": "doctors/dr-ajay-kaduskar-hero.jpg",
  "Dr prajakta in appron.png": "doctors/dr-prajakta-kaduskar-hero.jpg",
  "Dr Ajay Kaduskar close shot..png": "doctors/dr-ajay-kaduskar-headshot.jpg",
  "Dr_Ajay_Variation_1.png": "doctors/dr-ajay-kaduskar-corridor.jpg",
  "Dr_Ajay_Variation_2.png": "doctors/dr-ajay-kaduskar-consult.jpg",
  "Dr_Ajay_Variation_3.png": "doctors/dr-ajay-kaduskar-arms-crossed.jpg",
  "Dr_Ajay_Variation_4.png": "doctors/dr-ajay-kaduskar-desk-smile.jpg",
  "Dr_Ajay_Variation_5.png": "doctors/dr-ajay-kaduskar-tablet.jpg",

  /* team and clinic */
  "NiramayClinics_slide_img6.jpg": "team/doctors-and-staff.jpg",
  "NiramayClinics_slide_img7.jpg": "team/care-team.jpg",
  "NiramayClinic_Section_bg_img2.jpg": "clinic/exterior-wide.jpg",
  "Niramay clinic outside.jpg": "clinic/exterior-entrance.jpg",
  "Niramay board.jpg": "clinic/signboard-marathi.jpg",
  "NiramayClinic_Section_bg_img1.jpg": "clinic/reception-board.jpg",
  "Niramay waiting launge.jpg": "clinic/reception.jpg",

  /* services */
  "NiramayClinics_slide_img2.jpg": "services/diabetic-eye-screening.jpg",
  "NirmayClinics_Diabetes_Complication_Screening1.jpg": "services/fundus-camera-detail.jpg",
  "NirmayClinics_Diabetes_Complication_Screening2.jpg": "services/cardiac-room.jpg",
  "NiramayClinics_slide_img3.jpg": "services/sample-collection.jpg",
  "NirmayClinics_Inhouse_pathology.jpg": "services/lab-analysers.jpg",
  "NirmayClinics_Pharmacy.jpg": "services/pharmacy.jpg",

  /* blog */
  "Niramayclinics_Diabetes_Separating_Myths_Facts_By_Dr_Ajay_Kaduskar.jpg":
    "blog/diabetes-myths.jpg",

  /* illustrated badges → service badge slugs (handled separately) */
  "Diabetes_Care.png": "icons/services/diabetes-care-512.png",
  "Pregnancy_Diabetes.png": "icons/services/diabetes-in-pregnancy-512.png",
  "Eye_Screening.png": "icons/services/eye-screening-512.png",
  "Thyroid_Clinic.png": "icons/services/thyroid-512.png",
  "Hypertension.png": "icons/services/hypertension-512.png",
  "Heart_Care.png": "icons/services/heart-care-512.png",
  "Obesity_Care.png": "icons/services/obesity-care-512.png",
  "Body_Composition.png": "icons/services/body-composition-512.png",
  "Nutrition.png": "icons/services/nutrition-512.png",
  "Health_Checkup.png": "icons/services/health-checkup-512.png",
  "Adolescent_Health_Care.png": "icons/services/adolescent-health-512.png",
  "Teen_Counselling.png": "icons/services/teen-counselling-512.png",
  "Career_Counselling.png": "icons/services/career-counselling-512.png",
  "Well_Baby.png": "icons/services/well-baby-512.png",
  "Vaccination.png": "icons/services/vaccination-512.png",
  "Diagnostic_Lab.png": "icons/services/diagnostic-lab-512.png",
  "Home_Sample_Collection.png": "icons/services/home-sample-collection-512.png",
  "Pharmacy.png": "icons/services/pharmacy-512.png",
};

const reported = new Set<string>();

/** Original file name → public path, or null (reported once). */
export function resolveImage(original: string): string | null {
  const hit = imageMap[original];
  if (hit) return `/images/${hit}`;
  if (!reported.has(original)) {
    reported.add(original);
    console.warn(`[image-map] unmapped image name: ${original}`);
  }
  return null;
}

export function allUnmapped(pages: { meta: { url: string; images: string[] } }[]): string[] {
  const missing: string[] = [];
  for (const p of pages) {
    for (const img of p.meta.images) {
      if (!imageMap[img]) missing.push(`${p.meta.url} -> ${img}`);
    }
  }
  return missing;
}
