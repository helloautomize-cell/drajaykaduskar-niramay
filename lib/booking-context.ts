/**
 * Booking context (Phase 6 item 2.2): maps each page to the doctor + reason
 * a "Book" tap should prefill on the /contact/ form. Pages with no clear
 * match return empty — the form then opens blank.
 */
export interface BookingContext {
  doctor?: "dr-ajay" | "dr-prajakta";
  reason?: string;
}

const RULES: [prefix: string, ctx: BookingContext][] = [
  // adult practice -> Dr. Ajay
  ["/diabetes/", { doctor: "dr-ajay", reason: "Diabetes" }],
  ["/obesity/", { doctor: "dr-ajay", reason: "Weight" }],
  ["/nutrition-lifestyle-counselling/", { doctor: "dr-ajay", reason: "Weight" }],
  ["/thyroid-clinic/", { doctor: "dr-ajay", reason: "Thyroid" }],
  ["/hypertension-clinic/", { doctor: "dr-ajay", reason: "Blood pressure" }],
  ["/heart-care/", { doctor: "dr-ajay", reason: "Heart test" }],
  ["/preventive-health-check-ups/", { doctor: "dr-ajay", reason: "Health check-up" }],
  ["/lab/", { reason: "Lab test" }],
  ["/pharmacy/", {}],
  // child practice -> Dr. Prajakta
  ["/vaccination/", { doctor: "dr-prajakta", reason: "Child check-up or vaccination" }],
  ["/blooming-buds/well-baby-clinic/", { doctor: "dr-prajakta", reason: "Child check-up or vaccination" }],
  ["/blooming-buds/adolescent-health/", { doctor: "dr-prajakta", reason: "Teen health" }],
  ["/blooming-buds/teen-mental-health/", { doctor: "dr-prajakta", reason: "Counselling or testing" }],
  ["/blooming-buds/psychological-testing/", { doctor: "dr-prajakta", reason: "Counselling or testing" }],
  ["/blooming-buds/career-counselling/", { doctor: "dr-prajakta", reason: "Counselling or testing" }],
  ["/blooming-buds/", { doctor: "dr-prajakta", reason: "Child check-up or vaccination" }],
  // doctor profiles
  ["/doctors/dr-ajay-kaduskar/", { doctor: "dr-ajay" }],
  ["/doctors/dr-prajakta-kaduskar/", { doctor: "dr-prajakta" }],
];

export function bookingContextFor(pathname: string): BookingContext {
  // usePathname() returns no trailing slash; rules are written with one
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  for (const [prefix, ctx] of RULES) {
    if (p.startsWith(prefix)) return ctx;
  }
  return {};
}

/** `/contact/` href carrying the context for this page (or plain `#book`). */
export function bookHrefFor(pathname: string): string {
  const ctx = bookingContextFor(pathname);
  const params = new URLSearchParams();
  if (ctx.doctor) params.set("doctor", ctx.doctor);
  if (ctx.reason) params.set("reason", ctx.reason);
  const q = params.toString();
  return `/contact/${q ? `?${q}` : ""}#book`;
}
