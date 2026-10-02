import { z } from "zod";

/** Shared Zod schemas — used by the client forms AND the server actions. */

export const REASONS = [
  "Diabetes",
  "Weight",
  "Thyroid",
  "Blood pressure",
  "Heart test",
  "Health check-up",
  "Child check-up or vaccination",
  "Teen health",
  "Counselling or testing",
  "Lab test",
  "Other",
] as const;

export const DOCTORS = ["dr-ajay", "dr-prajakta", "not-sure"] as const;
export const TIMES_OF_DAY = [
  "Morning (8:30 am to 12 pm)",
  "Afternoon (12 to 3 pm)",
  "Late afternoon (3 to 6 pm)",
] as const;

/** Normalise an Indian mobile to +91XXXXXXXXXX; returns "" if unparseable. */
export function normalisePhone(raw: string): string {
  let d = raw.replace(/[^\d+]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  else if (d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? `+91${d}` : "";
}

const phoneField = z
  .string()
  .trim()
  .min(1, "Please enter your mobile number")
  .refine((v) => normalisePhone(v) !== "", {
    message: "Please enter a valid 10-digit mobile number",
  })
  .transform((v) => normalisePhone(v));

const appointmentBase = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter the patient's full name")
    .max(80, "Please enter a shorter name"),
  phone: phoneField,
  ageValue: z.preprocess(
    // "" / null -> undefined so the required message shows, not a coerced 0
    (v) => (v === "" || v == null ? undefined : v),
    z.coerce
      .number({ message: "Please enter the patient's age" })
      .int("Please enter a whole number")
  ),
  ageUnit: z.enum(["years", "months"]),
  doctor: z.enum(DOCTORS, { message: "Please choose a doctor" }),
  reason: z.enum(REASONS, { message: "Please choose a reason for the visit" }),
  date: z.string().optional(),
  timeOfDay: z.enum(TIMES_OF_DAY).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional(),
  guardian: z.boolean().default(false),
  guardianName: z.string().trim().max(80).optional(),
  consent: z.literal(true, { message: "Please tick the consent box to continue" }),
  // spam traps — silently succeed without sending
  company: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.coerce.number().optional(),
  turnstileToken: z.string().optional(),
  sourcePage: z.string().optional(),
});

export const appointmentSchema = appointmentBase.superRefine((v, ctx) => {
  if (v.ageUnit === "years" && (v.ageValue < 0 || v.ageValue > 120)) {
    ctx.addIssue({ code: "custom", path: ["ageValue"], message: "Age must be between 0 and 120 years" });
  }
  if (v.ageUnit === "months" && (v.ageValue < 0 || v.ageValue > 24)) {
    ctx.addIssue({ code: "custom", path: ["ageValue"], message: "Age must be between 0 and 24 months" });
  }
  const under18 = v.ageUnit === "months" || v.ageValue < 18;
  if (under18 && !v.guardian) {
    ctx.addIssue({
      code: "custom",
      path: ["guardian"],
      message: "For a patient under 18, please tick the parent or guardian box",
    });
  }
  if (v.guardian && under18 && (!v.guardianName || v.guardianName.length < 2)) {
    ctx.addIssue({
      code: "custom",
      path: ["guardianName"],
      message: "Please enter the parent or guardian's name",
    });
  }
  if (v.date) {
    const d = new Date(`${v.date}T00:00:00`);
    if (Number.isNaN(d.getTime())) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "Please choose a valid date" });
    } else {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const max = new Date(today); max.setDate(max.getDate() + 60);
      if (d < today) ctx.addIssue({ code: "custom", path: ["date"], message: "Please choose a date from today onwards" });
      else if (d > max) ctx.addIssue({ code: "custom", path: ["date"], message: "Please choose a date within the next 60 days" });
    }
  }
});

export const WORKSHOP_TOPICS = [
  "Mental wellness and stress",
  "Healthy lifestyle and screens",
  "Puberty and growing up",
  "Digital safety",
  "Bullying",
  "Life skills",
  "Career guidance",
  "Other",
] as const;

export const workshopSchema = z.object({
  organisation: z.string().trim().min(2, "Please enter the school or organisation name").max(120),
  audience: z.enum(["Students", "Parents", "Teachers", "Mixed"], { message: "Please choose the audience" }),
  ageRange: z.string().trim().max(60).optional(),
  approxCount: z.string().trim().max(20).optional(),
  preferredDates: z.string().trim().max(200).optional(),
  topics: z.array(z.enum(WORKSHOP_TOPICS)).min(1, "Please choose at least one topic"),
  topicsOther: z.string().trim().max(120).optional(),
  language: z.enum(["English", "Hindi", "Marathi"], { message: "Please choose a language" }),
  contactName: z.string().trim().min(2, "Please enter the contact person's name").max(80),
  phone: phoneField,
  email: z.string().trim().email("Please enter a valid email address").max(120),
  consent: z.literal(true, { message: "Please tick the consent box to continue" }),
  company: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.coerce.number().optional(),
  turnstileToken: z.string().optional(),
  sourcePage: z.string().optional(),
});

/** Raw form values (pre-coercion) — what react-hook-form tracks. */
export type AppointmentInput = z.input<typeof appointmentSchema>;
export type WorkshopInput = z.input<typeof workshopSchema>;
/** Validated + transformed values — what the server action works with. */
export type AppointmentOutput = z.output<typeof appointmentSchema>;
export type WorkshopOutput = z.output<typeof workshopSchema>;
