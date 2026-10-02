/**
 * Illustrated service badges. Source PNGs live in resources/images/ and are
 * processed to public/images/icons/services/<slug>-{256,512}.{png,webp}.
 * To point a service at a different badge later, change one line here.
 */
export const badgeAlt: Record<string, string> = {
  "diabetes-care": "Diabetes care icon",
  "diabetes-in-pregnancy": "Diabetes in pregnancy icon",
  "eye-screening": "Diabetic eye screening icon",
  thyroid: "Thyroid clinic icon",
  hypertension: "Hypertension clinic icon",
  "heart-care": "Heart care icon",
  "obesity-care": "Obesity and weight care icon",
  "body-composition": "Body composition analysis icon",
  nutrition: "Nutrition and lifestyle counselling icon",
  "health-checkup": "Preventive health check-up icon",
  "adolescent-health": "Adolescent health icon",
  "teen-counselling": "Teen counselling icon",
  "career-counselling": "Career counselling icon",
  "well-baby": "Well baby clinic icon",
  vaccination: "Vaccination icon",
  "diagnostic-lab": "Diagnostic laboratory icon",
  "home-sample-collection": "Home sample collection icon",
  pharmacy: "Pharmacy icon",
  "doctor-male": "Doctor icon",
  "doctor-female": "Doctor icon",
};

/** service page / UI slug -> badge slug */
export const serviceBadgeMap: Record<string, string> = {
  // Diabetes and heart
  diabetes: "diabetes-care",
  "type-2-diabetes": "diabetes-care",
  "type-1-diabetes": "diabetes-care", // no dedicated badge; reuses diabetes-care
  "diabetes-in-pregnancy": "diabetes-in-pregnancy",
  "complications-screening": "eye-screening",
  "diabetes-care-programme": "diabetes-care",
  "prediabetes-risk-assessment": "health-checkup",
  "thyroid-clinic": "thyroid",
  "hypertension-clinic": "hypertension",
  "nutrition-lifestyle-counselling": "nutrition",
  obesity: "obesity-care",
  "weight-management-medicines": "obesity-care",
  "body-composition-sarcopenia": "body-composition",
  "heart-care": "heart-care",
  "2d-echo": "heart-care",
  ecg: "heart-care",
  "tmt-stress-test": "heart-care",
  "preventive-health-check-ups": "health-checkup",
  // Blooming Buds
  "blooming-buds": "adolescent-health",
  "well-baby-clinic": "well-baby",
  vaccination: "vaccination",
  "adolescent-health": "adolescent-health",
  "teen-mental-health": "teen-counselling",
  "psychological-testing": "teen-counselling",
  "career-counselling": "career-counselling",
  workshops: "career-counselling",
  // Lab and pharmacy
  lab: "diagnostic-lab",
  "home-sample-collection": "home-sample-collection",
  pharmacy: "pharmacy",
  // Centre badges (About "two centres", mega menu headings only)
  "centre-diabetes-heart": "doctor-male",
  "centre-blooming-buds": "doctor-female",
};

export function badgeFor(serviceSlug: string): string {
  return serviceBadgeMap[serviceSlug] ?? "diabetes-care";
}

/**
 * Health Library post covers: all posts get the same designed cover (soft
 * gradient + badge) — never the video thumbnails, which carry other
 * channels' branding. Badge per post (design-polish spec):
 */
export const postBadgeMap: Record<string, string> = {
  "diabetes-myths-and-facts": "diabetes-care",
  "menstrual-hygiene-teenage-girls": "adolescent-health",
  "preparing-child-for-adolescence": "teen-counselling",
  "smart-love-parenting-teenagers": "well-baby",
  "self-esteem-teenagers-with-disabilities": "career-counselling",
};

export function postBadgeFor(slug: string): string {
  return postBadgeMap[slug] ?? "health-checkup";
}

/* ---- Services still sharing a badge (report to client; new PNG badges to
   be designed later — do not invent icons):
   - diabetes-care:      diabetes, type-2-diabetes, type-1-diabetes,
                         diabetes-care-programme   (cards re-ordered so they
                         are never adjacent)
   - heart-care:         heart-care, 2d-echo, ecg, tmt-stress-test
                         (all four in the Heart tab — cannot be separated)
   - obesity-care:       obesity, weight-management-medicines
                         (separated by body-composition in the carousel)
   - health-checkup:     prediabetes-risk-assessment, preventive-health-check-ups
                         (in different groups — never adjacent)
   - adolescent-health:  blooming-buds, adolescent-health   (separated)
   - teen-counselling:   teen-mental-health, psychological-testing (separated)
   - career-counselling: career-counselling, workshops       (separated)
*/
