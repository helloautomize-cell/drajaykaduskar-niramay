/**
 * Per-page layout decisions for Phase 3 templates: which template a page
 * uses, its hero badge/image, and its "related services" picks. Hero images
 * follow the approved AI-portrait placement table.
 */
import { serviceBadgeMap } from "@/lib/service-badges";
import { resolveImage } from "@/lib/image-map";
import type { PageFrontmatter } from "@/lib/content/schema";

export type TemplateKind =
  | "hub"
  | "service-detail"
  | "editorial"
  | "legal"
  | "contact"
  | "faqs"
  | "services-index"
  | "blog-list"
  | "thank-you";

const HUB_URLS = new Set(["/diabetes/", "/obesity/", "/heart-care/", "/blooming-buds/"]);
const LEGAL_SECTION = "legal";

/** One-line descriptions for service cards / related rows (facts only). */
export const serviceCardText: Record<string, string> = {
  "/diabetes/": "Long-term sugar control with screening built in.",
  "/diabetes/type-2-diabetes/": "Diagnosis, medicines, food and monitoring.",
  "/diabetes/type-1-diabetes/": "Insulin plans, devices and daily support.",
  "/diabetes/diabetes-in-pregnancy/": "Safe sugar control before and during pregnancy.",
  "/diabetes/complications-screening/": "Yearly eye, kidney, foot and heart checks.",
  "/diabetes/diabetes-care-programme/": "A structured yearly plan for diabetes care.",
  "/diabetes/prediabetes-risk-assessment/": "Find your risk early and act on it.",
  "/thyroid-clinic/": "Diagnosis and steady management of thyroid disorders.",
  "/hypertension-clinic/": "Blood pressure control that protects the heart.",
  "/nutrition-lifestyle-counselling/": "Practical diet plans around your own food.",
  "/obesity/": "Medical weight care with regular follow-up.",
  "/obesity/weight-management-medicines/": "What weight-loss medicines can and cannot do.",
  "/obesity/body-composition-sarcopenia/": "InBody analysis of fat and muscle.",
  "/heart-care/": "ECG, 2D Echo and treadmill testing in-house.",
  "/heart-care/2d-echo/": "Ultrasound of the heart's structure and pumping.",
  "/heart-care/ecg/": "A quick recording of the heart's rhythm.",
  "/heart-care/tmt-stress-test/": "Treadmill test of the heart under load.",
  "/preventive-health-check-ups/": "Planned screening before symptoms appear.",
  "/blooming-buds/": "Child and adolescent health, all in one place.",
  "/blooming-buds/well-baby-clinic/": "Growth checks and early milestones.",
  "/vaccination/": "Vaccines for children, teenagers and adults.",
  "/blooming-buds/adolescent-health/": "Physical health care for teenagers.",
  "/blooming-buds/teen-mental-health/": "A calm space for stress, study and screens.",
  "/blooming-buds/psychological-testing/": "Structured testing for learning and behaviour.",
  "/blooming-buds/career-counselling/": "Aptitude testing and honest guidance.",
  "/blooming-buds/workshops/": "Health and life-skills sessions for schools.",
  "/lab/": "In-house pathology, 7 am to 7 pm.",
  "/lab/home-sample-collection/": "Sample pickup at home with prior booking.",
  "/pharmacy/": "In-house pharmacy for your prescriptions.",
};

/** badge slug for a page: last URL segment -> serviceBadgeMap, with fallbacks. */
export function badgeFor(url: string): string | undefined {
  const seg = url.replace(/\/$/, "").split("/").pop() ?? "";
  if (serviceBadgeMap[seg]) return serviceBadgeMap[seg];
  // try second-level parent (e.g. /blooming-buds/well-baby-clinic/)
  const parts = url.replace(/\/$/, "").split("/").filter(Boolean);
  for (const p of parts.reverse()) if (serviceBadgeMap[p]) return serviceBadgeMap[p];
  return undefined;
}

/** Hero photo overrides per URL (approved AI-portrait placement table). */
const heroImageOverrides: Record<string, string> = {
  "/diabetes/": "/images/doctors/dr-ajay-kaduskar-keep-simple.jpg",
  "/heart-care/": "/images/doctors/dr-ajay-kaduskar-corridor.jpg",
  "/obesity/": "/images/doctors/dr-ajay-kaduskar-desk-smile.jpg",
  "/blooming-buds/": "/images/doctors/dr-prajakta-kaduskar-hero.jpg",
  "/nutrition-lifestyle-counselling/": "/images/doctors/dr-ajay-kaduskar-desk-smile.jpg",
  "/preventive-health-check-ups/": "/images/doctors/dr-ajay-kaduskar-tablet.jpg",
  "/thyroid-clinic/": "/images/doctors/dr-ajay-kaduskar-tablet.jpg",
  "/diabetes/complications-screening/": "/images/services/diabetic-eye-screening.jpg",
  "/lab/": "/images/services/lab-analysers.jpg",
  "/lab/home-sample-collection/": "/images/services/sample-collection.jpg",
  "/pharmacy/": "/images/services/pharmacy.jpg",
  "/heart-care/2d-echo/": "/images/services/cardiac-room.jpg",
  "/heart-care/ecg/": "/images/services/cardiac-room.jpg",
  "/heart-care/tmt-stress-test/": "/images/services/cardiac-room.jpg",
};

/** Mid-body images placed per the approved table (diabetes hub "What your care includes"). */
const midImageOverrides: Record<string, string> = {
  "/diabetes/": "/images/doctors/dr-ajay-kaduskar-consult.jpg",
};

export function templateFor(meta: PageFrontmatter): TemplateKind {
  const url = meta.url;
  if (url === "/contact/thank-you/") return "thank-you";
  if (url === "/contact/") return "contact";
  if (url === "/faqs/") return "faqs";
  if (url === "/services/") return "services-index";
  if (url === "/health-library/") return "blog-list";
  if (meta.section === LEGAL_SECTION) return "legal";
  if (HUB_URLS.has(url)) return "hub";
  if (meta.section === "diabetes-heart" || meta.section === "blooming-buds" || meta.section === "lab-pharmacy")
    return "service-detail";
  return "editorial";
}

/** Hero image: explicit override, else first mapped frontmatter photo. */
export function heroImageFor(meta: PageFrontmatter): string | null {
  const o = heroImageOverrides[meta.url];
  if (o) return o;
  for (const img of meta.images) {
    const mapped = resolveImage(img);
    if (mapped && !mapped.includes("/icons/")) return mapped;
  }
  return null;
}

export function midImageFor(meta: PageFrontmatter): string | null {
  return midImageOverrides[meta.url] ?? null;
}
