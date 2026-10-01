"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { submitAppointment, type ContactFormState } from "@/app/actions/contact";

const input =
  "w-full rounded-[12px] border border-line bg-white px-4 py-3 text-[16px] text-ink placeholder:text-ink-600/50 focus:border-plum focus:outline-2 focus:outline-plum/40";
const label = "mb-1.5 block text-[14.5px] font-semibold text-ink";
const err = "mt-1 text-[13px] font-medium text-red-700";

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
        <p className={err} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const REASONS = [
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
];

/**
 * Appointment request form — fields and consent line exactly as in
 * content/core/contact.md. Submits to a stub Server Action until Phase 6.
 */
export function ContactForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState<ContactFormState, FormData>(
    submitAppointment,
    { ok: false, errors: {} }
  );

  useEffect(() => {
    if (state.ok) router.push("/contact/thank-you/");
  }, [state.ok, router]);

  return (
    <form id="book" action={action} className="scroll-mt-28" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Patient's full name" required error={state.errors.name}>
          <input id="f-name" name="name" type="text" autoComplete="name" required className={input} />
        </Field>
        <Field name="phone" label="Mobile number" required error={state.errors.phone}>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={input} />
        </Field>
        <Field name="age" label="Patient's age" required error={state.errors.age}>
          <input id="f-age" name="age" type="text" inputMode="numeric" required className={input} />
        </Field>
        <Field name="doctor" label="Which doctor?" required error={state.errors.doctor}>
          <select id="f-doctor" name="doctor" required className={input} defaultValue="not-sure">
            <option value="dr-ajay">Dr. Ajay Kaduskar</option>
            <option value="dr-prajakta">Dr. Prajakta Kaduskar</option>
            <option value="not-sure">Not sure</option>
          </select>
        </Field>
        <Field name="reason" label="Reason for visit" required error={state.errors.reason}>
          <select id="f-reason" name="reason" required className={input} defaultValue="">
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
        <Field name="preferred" label="Preferred date and time of day">
          <input id="f-preferred" name="preferred" type="text" placeholder="e.g. Saturday morning" className={input} />
        </Field>
        <Field name="city" label="City">
          <input id="f-city" name="city" type="text" autoComplete="address-level2" className={input} />
        </Field>
      </div>

      <div className="mt-5 space-y-3">
        <label className="flex min-h-[44px] items-start gap-3 text-[15px] text-ink-600">
          <input type="checkbox" name="guardian" className="mt-1 size-4 accent-[#734569]" />I am a parent or
          guardian booking for a patient under 18
        </label>
        <label className="flex min-h-[44px] items-start gap-3 text-[15px] text-ink-600">
          <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[#734569]" />
          <span>
            I agree that Niramay Clinics may contact me about this appointment by phone, SMS or
            WhatsApp. I have read the{" "}
            <Link href="/privacy-policy/" className="font-medium text-plum underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {state.errors.consent && (
          <p className={err} role="alert">
            {state.errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "mt-6 inline-flex h-[52px] items-center justify-center rounded-[14px] px-8 text-[15.5px] font-semibold text-white",
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
