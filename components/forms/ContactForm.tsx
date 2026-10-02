"use client";

import { Suspense, useActionState, useEffect, useMemo, useRef, startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { track } from "@/lib/track";
import { submitAppointment, type FormState } from "@/app/actions/forms";
import {
  appointmentSchema,
  REASONS,
  DOCTORS,
  TIMES_OF_DAY,
  type AppointmentInput,
  type AppointmentOutput,
} from "@/lib/forms/schemas";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

const input =
  "w-full rounded-[12px] border border-line bg-white px-4 py-3 text-[17px] text-ink placeholder:text-ink-600/50 focus:border-plum focus:outline-2 focus:outline-plum/40 aria-[invalid=true]:border-red-600";
const label = "mb-1.5 block text-[15px] font-semibold text-ink";
const err = "mt-1 text-[13.5px] font-medium text-red-700";

const DOCTOR_LABELS: Record<(typeof DOCTORS)[number], string> = {
  "dr-ajay": "Dr. Ajay Kaduskar",
  "dr-prajakta": "Dr. Prajakta Kaduskar",
  "not-sure": "Not sure",
};

function isoToday(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function Field({
  name,
  label: text,
  required,
  error,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className={label}>
        {text} {required && <span className="text-plum" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p className={err} id={`f-${name}-err`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [state, formAction, pending] = useActionState<FormState, FormData>(submitAppointment, {
    ok: false,
    errors: {},
  });
  const startedAtRef = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  const defaults = useMemo(() => {
    const doctor = params.get("doctor");
    const reason = params.get("reason");
    return {
      ageUnit: "years" as const,
      doctor: (DOCTORS as readonly string[]).includes(doctor || "")
        ? (doctor as AppointmentInput["doctor"])
        : "not-sure",
      reason: (REASONS as readonly string[]).includes(reason || "")
        ? (reason as AppointmentInput["reason"])
        : undefined,
    };
  }, [params]);

  const {
    register,
    trigger,
    control,
    setFocus,
    formState: { errors },
  } = useForm<AppointmentInput, unknown, AppointmentOutput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaults,
  });

  // start the fill-time trap once mounted
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const guardian = useWatch({ control, name: "guardian" });
  const ageValue = useWatch({ control, name: "ageValue" });
  const ageUnit = useWatch({ control, name: "ageUnit" });
  const date = useWatch({ control, name: "date" });
  const timeOfDay = useWatch({ control, name: "timeOfDay" });

  const ageNum = Number(ageValue);
  const under18 =
    ageUnit === "months" || (Number.isFinite(ageNum) && ageNum >= 0 && ageNum < 18 && String(ageValue) !== "");
  const showGuardianName = guardian === true;
  const isSunday = useMemo(() => {
    if (!date) return false;
    return new Date(`${date}T00:00:00`).getDay() === 0;
  }, [date]);

  useEffect(() => {
    if (state.ok) {
      track("generate_lead", { form_type: "appointment" });
      router.push("/thank-you/?type=appointment");
    }
  }, [state.ok, router]);

  // merge client (RHF) and server errors for the summary
  const fieldErrors: Record<string, string> = {};
  for (const [k, v] of Object.entries(errors)) fieldErrors[k] = String(v?.message || "");
  for (const [k, v] of Object.entries(state.errors)) fieldErrors[k] = v;
  const errorEntries = Object.entries(fieldErrors).filter(([, m]) => m);

  const fieldIds: Record<string, string> = {
    name: "f-name",
    phone: "f-phone",
    ageValue: "f-ageValue",
    doctor: "f-doctor",
    reason: "f-reason",
    date: "f-date",
    timeOfDay: "f-timeOfDay",
    city: "f-city",
    guardian: "f-guardian",
    guardianName: "f-guardianName",
    consent: "f-consent",
  };

  useEffect(() => {
    if (errorEntries.length > 0 && summaryRef.current) summaryRef.current.focus();
  }, [state, errorEntries.length]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Always take over submission: a native POST triggers a full RSC refresh
    // that remounts this Suspense-wrapped form and clears entered values.
    // Without JS the same action= attribute still posts and validates.
    e.preventDefault();
    const form = e.currentTarget;
    const stamp = form.querySelector<HTMLInputElement>("[name=startedAt]");
    if (stamp && !stamp.value) stamp.value = String(startedAtRef.current || Date.now());
    const valid = await trigger();
    if (!valid) {
      const first = errorEntries[0]?.[0];
      if (first && fieldIds[first]) setFocus(first as keyof AppointmentInput);
      summaryRef.current?.focus();
      return;
    }
    startTransition(() => formAction(new FormData(form)));
  };

  return (
    <form
      id="book"
      action={formAction}
      onSubmit={onSubmit}
      className="scroll-mt-28"
      noValidate
      aria-label="Appointment request form"
    >
      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-[12px] border border-red-300 bg-red-50 p-4 text-[14.5px] text-red-800 focus:outline-2 focus:outline-red-500"
        >
          <p className="font-semibold">Please fix the following:</p>
          <ul className="mt-1 list-disc pl-5">
            {errorEntries.map(([k, m]) => (
              <li key={k}>
                <a href={`#${fieldIds[k] || "book"}`} className="underline underline-offset-2">
                  {m}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.fatal === "send" && (
        <div
          role="alert"
          className="mb-6 rounded-[12px] border border-amber-300 bg-amber-50 p-4 text-[14.5px] text-amber-900"
        >
          <p className="font-semibold">
            We could not send your request just now. Please call {site.phone.display} or message us
            on WhatsApp.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={site.phone.tel}
              className="inline-flex min-h-[48px] items-center rounded-[12px] bg-plum px-5 text-[15px] font-semibold text-white"
            >
              Call {site.phone.display}
            </a>
            <a
              href={`${site.whatsapp.url}?text=${encodeURIComponent(
                `Hello, I would like to book an appointment at Niramay Clinics. My preferred date/time: ${
                  [date, timeOfDay].filter(Boolean).join(" · ") || "any"
                }.`
              )}`}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[48px] items-center rounded-[12px] border border-line bg-white px-5 text-[15px] font-semibold text-ink"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Patient's full name" required error={fieldErrors.name}>
          <input
            id="f-name"
            type="text"
            autoComplete="name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "f-name-err" : undefined}
            className={input}
            {...register("name")}
          />
        </Field>
        <Field name="phone" label="Mobile number" required error={fieldErrors.phone}>
          <input
            id="f-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "f-phone-err" : undefined}
            className={input}
            {...register("phone")}
          />
        </Field>
        <div>
          <span id="f-age-label" className={label}>
            Patient&rsquo;s age <span className="text-plum" aria-hidden>*</span>
          </span>
          <div className="flex gap-3">
            <input
              id="f-ageValue"
              type="number"
              min={0}
              max={ageUnit === "months" ? 24 : 120}
              inputMode="numeric"
              aria-labelledby="f-age-label"
              aria-invalid={!!fieldErrors.ageValue}
              aria-describedby={fieldErrors.ageValue ? "f-age-err" : undefined}
              className={cn(input, "w-28")}
              {...register("ageValue")}
            />
            <select
              id="f-ageUnit"
              aria-label="Age unit"
              className={cn(input, "w-auto")}
              {...register("ageUnit")}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
          {(fieldErrors.ageValue || fieldErrors.ageUnit) && (
            <p className={err} id="f-age-err" role="alert">
              {fieldErrors.ageValue || fieldErrors.ageUnit}
            </p>
          )}
        </div>
        <Field name="doctor" label="Which doctor?" required error={fieldErrors.doctor}>
          <select
            id="f-doctor"
            aria-invalid={!!fieldErrors.doctor}
            className={input}
            {...register("doctor")}
          >
            {DOCTORS.map((d) => (
              <option key={d} value={d}>
                {DOCTOR_LABELS[d]}
              </option>
            ))}
          </select>
        </Field>
        <Field name="reason" label="Reason for visit" required error={fieldErrors.reason}>
          <select
            id="f-reason"
            aria-invalid={!!fieldErrors.reason}
            className={input}
            {...register("reason")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
        <div>
          <Field name="date" label="Preferred date" error={fieldErrors.date}>
            <input
              id="f-date"
              type="date"
              min={isoToday()}
              max={isoToday(60)}
              aria-invalid={!!fieldErrors.date}
              className={input}
              {...register("date")}
            />
          </Field>
          {isSunday && (
            <p className="mt-1 text-[13.5px] font-medium text-amber-800" role="status">
              We are closed on Sundays. Please choose another day.
            </p>
          )}
        </div>
        <Field name="timeOfDay" label="Time of day">
          <select id="f-timeOfDay" className={input} {...register("timeOfDay")}>
            <option value="">Any time</option>
            {TIMES_OF_DAY.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field name="city" label="City" error={fieldErrors.city}>
          <input
            id="f-city"
            type="text"
            autoComplete="address-level2"
            placeholder="Helps us plan for outstation patients"
            className={input}
            {...register("city")}
          />
        </Field>
      </div>

      <div className="mt-5 space-y-3">
        {under18 && !guardian && (
          <p className="rounded-[10px] bg-amber-50 px-3 py-2 text-[13.5px] font-medium text-amber-800" role="status">
            This patient is under 18, a parent or legal guardian must make the booking. Please tick
            the box below.
          </p>
        )}
        <label className="flex min-h-[48px] items-start gap-3 text-[15.5px] text-ink-600">
          <input
            id="f-guardian"
            type="checkbox"
            className="mt-1 size-4 accent-[#734569]"
            aria-invalid={!!fieldErrors.guardian}
            aria-describedby={fieldErrors.guardian ? "f-guardian-err" : undefined}
            {...register("guardian")}
          />
          I am a parent or guardian booking for a patient under 18
        </label>
        {fieldErrors.guardian && (
          <p className={err} id="f-guardian-err" role="alert">
            {fieldErrors.guardian}
          </p>
        )}
        {showGuardianName && (
          <Field name="guardianName" label="Parent or guardian's name" required error={fieldErrors.guardianName}>
            <input
              id="f-guardianName"
              type="text"
              autoComplete="name"
              className={input}
              {...register("guardianName")}
            />
          </Field>
        )}
        <label className="flex min-h-[48px] items-start gap-3 text-[15.5px] text-ink-600">
          <input
            id="f-consent"
            type="checkbox"
            className="mt-1 size-4 accent-[#734569]"
            aria-invalid={!!fieldErrors.consent}
            aria-describedby={fieldErrors.consent ? "f-consent-err" : undefined}
            {...register("consent")}
          />
          <span>
            {showGuardianName || guardian
              ? "I am the parent or legal guardian of the patient. I agree that Niramay Clinics may contact me about this appointment by phone, SMS or WhatsApp. I have read the "
              : "I agree that Niramay Clinics may contact me about this appointment by phone, SMS or WhatsApp. I have read the "}
            <Link
              href="/privacy-policy/"
              className="font-medium text-plum underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {fieldErrors.consent && (
          <p className={err} id="f-consent-err" role="alert">
            {fieldErrors.consent}
          </p>
        )}
      </div>

      {/* honeypot — invisible to humans */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" defaultValue="" />
          <input type="hidden" name="sourcePage" defaultValue="/contact/" />

      <TurnstileWidget />

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-[14px] px-8 text-[15.5px] font-semibold text-white sm:w-auto",
          "bg-[linear-gradient(90deg,var(--plum),var(--indigo))] bg-[length:160%_100%] bg-[position:0%_0]",
          "transition-all duration-300 hover:bg-[position:100%_0] hover:-translate-y-px",
          "focus-visible:outline-3 focus-visible:outline-plum-500 focus-visible:outline-offset-3",
          "disabled:opacity-60"
        )}
      >
        {pending ? "Sending…" : "Request appointment"}
      </button>
      <p className="mt-4 text-[14px] leading-relaxed text-ink-600">
        Please do not include detailed medical information or upload reports here. Bring them to
        your visit.
      </p>
    </form>
  );
}

/**
 * Appointment request form — fields and consent line exactly as in
 * content/core/contact.md + client-answers items 5–11.
 */
export function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-line bg-white p-6 text-[15px] text-ink-600">
          Loading the form…
        </div>
      }
    >
      <FormInner />
    </Suspense>
  );
}
