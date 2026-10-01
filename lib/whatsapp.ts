import { site } from "@/lib/site-config";

/**
 * WhatsApp deep links. The pre-filled message is built from the current page
 * title (plan section 2.10): "Hello, I would like to book an appointment for
 * Thyroid Clinic." on a service page, a generic line elsewhere.
 */

/** pathname -> short page name used inside the WhatsApp message. */
const PAGE_NAMES: Record<string, string> = {
  "/": "Niramay Clinics",
  "/diabetes/": "Diabetes Care",
  "/diabetes/type-2-diabetes/": "Type 2 Diabetes",
  "/diabetes/type-1-diabetes/": "Type 1 Diabetes",
  "/diabetes/diabetes-in-pregnancy/": "Diabetes in Pregnancy",
  "/diabetes/complications-screening/": "Diabetes Complications Screening",
  "/diabetes/diabetes-care-programme/": "the Diabetes Care Programme",
  "/diabetes/prediabetes-risk-assessment/": "a Prediabetes Risk Assessment",
  "/thyroid-clinic/": "Thyroid Clinic",
  "/hypertension-clinic/": "Hypertension Clinic",
  "/nutrition-lifestyle-counselling/": "Nutrition and Lifestyle Counselling",
  "/preventive-health-check-ups/": "a Preventive Health Check-up",
  "/obesity/": "Obesity Care",
  "/obesity/weight-management-medicines/": "Weight-management Medicines",
  "/obesity/body-composition-sarcopenia/": "Body Composition Analysis",
  "/heart-care/": "Heart Care",
  "/heart-care/2d-echo/": "a 2D Echo",
  "/heart-care/ecg/": "an ECG",
  "/heart-care/tmt-stress-test/": "a TMT Stress Test",
  "/blooming-buds/": "Blooming Buds",
  "/blooming-buds/well-baby-clinic/": "the Well Baby Clinic",
  "/vaccination/": "Vaccinations",
  "/blooming-buds/adolescent-health/": "Adolescent Health",
  "/blooming-buds/teen-mental-health/": "Teen Counselling",
  "/blooming-buds/psychological-testing/": "Psychological Testing",
  "/blooming-buds/career-counselling/": "Career Counselling",
  "/blooming-buds/workshops/": "School Workshops",
  "/lab/": "the Laboratory",
  "/lab/home-sample-collection/": "Home Sample Collection",
  "/pharmacy/": "the Pharmacy",
  "/doctors/dr-ajay-kaduskar/": "Dr. Ajay Kaduskar",
  "/doctors/dr-prajakta-kaduskar/": "Dr. Prajakta Kaduskar",
  "/about/": "Niramay Clinics",
  "/contact/": "Niramay Clinics",
  "/plan-your-visit/": "a visit to Niramay Clinics",
  "/faqs/": "Niramay Clinics",
  "/health-library/": "Niramay Clinics",
  "/videos/": "Niramay Clinics",
  "/patient-rights/": "Niramay Clinics",
};

export function waMessageFor(pathname: string): string {
  const key = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const name = PAGE_NAMES[key] ?? PAGE_NAMES[pathname];
  if (name && name !== "Niramay Clinics")
    return `Hello, I would like to book an appointment for ${name}.`;
  return site.whatsappPrefill;
}

export function waLinkFor(pathname: string): string {
  return `${site.whatsapp.url}?text=${encodeURIComponent(waMessageFor(pathname))}`;
}
