"use server";

import {
  appointmentSchema,
  workshopSchema,
  type AppointmentInput,
  type WorkshopInput,
} from "@/lib/forms/schemas";
import { sendClinicEmail, sendWorkshopAck } from "@/lib/email";
import { site } from "@/lib/site-config";

export interface FormState {
  ok: boolean;
  errors: Record<string, string>;
  /** "send" = delivery failed -> show call/WhatsApp fallback */
  fatal?: "send";
}

const MIN_FILL_MS = 3000;

/** Turnstile server verification — skipped unless keys are configured. */
async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured -> widget off
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });
  if (!res.ok) return false;
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

function trapTriggered(formData: FormData): boolean {
  // honeypot field or sub-3-second fill -> pretend success, send nothing
  if ((formData.get("company") || "").toString().trim() !== "") return true;
  const started = Number(formData.get("startedAt") || 0);
  if (started && Date.now() - started < MIN_FILL_MS) return true;
  return false;
}

function issuesToErrors(issues: { path: PropertyKey[]; message: string }[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const i of issues) {
    const key = String(i.path[0] ?? "form");
    if (!errors[key]) errors[key] = i.message;
  }
  return errors;
}

const DOCTOR_LABELS: Record<string, string> = {
  "dr-ajay": "Dr. Ajay Kaduskar",
  "dr-prajakta": "Dr. Prajakta Kaduskar",
  "not-sure": "Not sure",
};

export async function submitAppointment(_prev: FormState, formData: FormData): Promise<FormState> {
  if (trapTriggered(formData)) return { ok: true, errors: {} };

  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    ageValue: formData.get("ageValue"),
    ageUnit: formData.get("ageUnit") || "years",
    doctor: formData.get("doctor"),
    reason: formData.get("reason"),
    date: formData.get("date") || undefined,
    timeOfDay: formData.get("timeOfDay") || undefined,
    city: formData.get("city") || undefined,
    guardian: formData.get("guardian") === "on" || formData.get("guardian") === "true",
    guardianName: formData.get("guardianName") || undefined,
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    company: formData.get("company") || "",
    startedAt: formData.get("startedAt") || undefined,
    turnstileToken: formData.get("cf-turnstile-response") || formData.get("turnstileToken") || undefined,
    sourcePage: formData.get("sourcePage") || undefined,
  };

  const parsed = appointmentSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, errors: issuesToErrors(parsed.error.issues) };

  const v: AppointmentInput = parsed.data;

  if (!(await verifyTurnstile(v.turnstileToken, null))) {
    return { ok: false, errors: {}, fatal: "send" };
  }

  // Test mode (previews/dev only — never honoured in production)
  if (process.env.FORM_TEST_MODE === "1" && process.env.VERCEL_ENV !== "production") {
    return { ok: true, errors: {} };
  }

  const age = `${v.ageValue} ${v.ageUnit === "months" ? "months" : "years"}`;
  const when = [v.date, v.timeOfDay].filter(Boolean).join(" · ") || "Any";
  const consentText = v.guardian ? site.guardianConsentLine : site.consentLine;

  const result = await sendClinicEmail({
    subject: `Appointment request · ${DOCTOR_LABELS[v.doctor]} · ${v.name}`,
    phone: v.phone,
    sourcePage: v.sourcePage || "/contact/",
    consentText,
    rows: [
      { label: "Patient", value: v.name },
      { label: "Mobile", value: v.phone },
      { label: "Age", value: age },
      { label: "Doctor", value: DOCTOR_LABELS[v.doctor] },
      { label: "Reason", value: v.reason },
      { label: "Preferred", value: when },
      { label: "City", value: v.city || "Not given" },
      ...(v.guardian ? [{ label: "Parent/guardian", value: v.guardianName || "Not given" }] : []),
    ],
  });

  if (!result.ok) return { ok: false, errors: {}, fatal: "send" };
  return { ok: true, errors: {} };
}

export async function submitWorkshop(_prev: FormState, formData: FormData): Promise<FormState> {
  if (trapTriggered(formData)) return { ok: true, errors: {} };

  const raw = {
    organisation: formData.get("organisation"),
    audience: formData.get("audience"),
    ageRange: formData.get("ageRange") || undefined,
    approxCount: formData.get("approxCount") || undefined,
    preferredDates: formData.get("preferredDates") || undefined,
    topics: formData.getAll("topics").map(String),
    topicsOther: formData.get("topicsOther") || undefined,
    language: formData.get("language"),
    contactName: formData.get("contactName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    company: formData.get("company") || "",
    startedAt: formData.get("startedAt") || undefined,
    turnstileToken: formData.get("cf-turnstile-response") || formData.get("turnstileToken") || undefined,
    sourcePage: formData.get("sourcePage") || undefined,
  };

  const parsed = workshopSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, errors: issuesToErrors(parsed.error.issues) };

  const v: WorkshopInput = parsed.data;

  if (!(await verifyTurnstile(v.turnstileToken, null))) {
    return { ok: false, errors: {}, fatal: "send" };
  }

  if (process.env.FORM_TEST_MODE === "1" && process.env.VERCEL_ENV !== "production") {
    return { ok: true, errors: {} };
  }

  const result = await sendClinicEmail({
    subject: `Workshop request · ${v.organisation}`,
    phone: v.phone,
    replyTo: v.email,
    sourcePage: v.sourcePage || "/blooming-buds/workshops/",
    consentText: site.workshopConsentLine,
    rows: [
      { label: "School / organisation", value: v.organisation },
      { label: "Audience", value: v.audience },
      { label: "Class / age range", value: v.ageRange || "Not given" },
      { label: "Approximate number", value: v.approxCount || "Not given" },
      { label: "Preferred dates", value: v.preferredDates || "Not given" },
      {
        label: "Topics",
        value: v.topics.join(", ") + (v.topicsOther ? ` (${v.topicsOther})` : ""),
      },
      { label: "Language", value: v.language },
      { label: "Contact person", value: v.contactName },
      { label: "Mobile", value: v.phone },
      { label: "Email", value: v.email },
    ],
  });
  if (!result.ok) return { ok: false, errors: {}, fatal: "send" };

  // acknowledgement to the requester; failure here must not hide success
  await sendWorkshopAck({ to: v.email, organisation: v.organisation }).catch(() => undefined);
  return { ok: true, errors: {} };
}
