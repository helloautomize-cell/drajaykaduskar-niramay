"use server";

import { z } from "zod";

/**
 * Stub appointment-request action (Phase 3). Validates the submission and
 * returns success; real email delivery is wired in Phase 6.
 */

const schema = z.object({
  name: z.string().trim().min(2, "Please enter the patient's full name"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,15}$/, "Please enter a valid mobile number"),
  age: z.string().trim().min(1, "Please enter the patient's age"),
  doctor: z.enum(["dr-ajay", "dr-prajakta", "not-sure"]),
  reason: z.string().trim().min(1, "Please choose a reason for the visit"),
  preferred: z.string().trim().optional(),
  city: z.string().trim().optional(),
  guardian: z.string().optional(),
  consent: z.literal("on", { message: "Please tick the consent box to continue" }),
});

export interface ContactFormState {
  ok: boolean;
  errors: Record<string, string>;
}

export async function submitAppointment(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { ok: false, errors };
  }
  // Phase 6: send email to the clinic + optional WhatsApp notification.
  return { ok: true, errors: {} };
}
