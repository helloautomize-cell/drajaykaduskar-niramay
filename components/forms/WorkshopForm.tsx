"use client";

import { useActionState, useEffect, useRef, startTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { track } from "@/lib/track";
import { submitWorkshop, type FormState } from "@/app/actions/forms";
import {
  workshopSchema,
  WORKSHOP_TOPICS,
  type WorkshopInput,
  type WorkshopOutput,
} from "@/lib/forms/schemas";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

const input =
  "w-full rounded-[12px] border border-line bg-white px-4 py-3 text-[17px] text-ink placeholder:text-ink-600/50 focus:border-plum focus:outline-2 focus:outline-plum/40 aria-[invalid=true]:border-red-600";
const label = "mb-1.5 block text-[15px] font-semibold text-ink";
const err = "mt-1 text-[13.5px] font-medium text-red-700";

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
      <label htmlFor={`w-${name}`} className={label}>
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

/** Workshop request form (Blooming Buds) — client-answers item 42 fields. */
export function WorkshopForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<FormState, FormData>(submitWorkshop, {
    ok: false,
    errors: {},
  });
  const startedAtRef = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<WorkshopInput, unknown, WorkshopOutput>({
    resolver: zodResolver(workshopSchema),
    defaultValues: { topics: [] },
  });

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.ok) {
      track("generate_lead", { form_type: "workshop" });
      router.push("/thank-you/?type=workshop");
    }
  }, [state.ok, router]);

  const fieldErrors: Record<string, string> = {};
  for (const [k, v] of Object.entries(errors)) fieldErrors[k] = String(v?.message || "");
  for (const [k, v] of Object.entries(state.errors)) fieldErrors[k] = v;
  const errorEntries = Object.entries(fieldErrors).filter(([, m]) => m);

  const fieldIds: Record<string, string> = {
    organisation: "w-organisation",
    audience: "w-audience",
    ageRange: "w-ageRange",
    approxCount: "w-approxCount",
    preferredDates: "w-preferredDates",
    topics: "w-topics",
    language: "w-language",
    contactName: "w-contactName",
    phone: "w-phone",
    email: "w-email",
    consent: "w-consent",
  };

  useEffect(() => {
    if (errorEntries.length > 0 && summaryRef.current) summaryRef.current.focus();
  }, [state, errorEntries.length]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the native POST — it triggers an RSC refresh that remounts this
    // form and clears entered values. action= remains the no-JS fallback.
    e.preventDefault();
    const form = e.currentTarget;
    const stamp = form.querySelector<HTMLInputElement>("[name=startedAt]");
    if (stamp && !stamp.value) stamp.value = String(startedAtRef.current || Date.now());
    const valid = await trigger();
    if (!valid) {
      const first = errorEntries[0]?.[0];
      if (first && fieldIds[first]) setFocus(first as keyof WorkshopInput);
      summaryRef.current?.focus();
      return;
    }
    startTransition(() => formAction(new FormData(form)));
  };

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label="Workshop request form"
      className="rounded-[20px] border border-line bg-white/70 p-6 sm:p-8"
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
                <a href={`#${fieldIds[k] || "w-organisation"}`} className="underline underline-offset-2">
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
                "Hello, I would like to request a workshop by Niramay Clinics."
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
        <Field name="organisation" label="School or organisation name" required error={fieldErrors.organisation}>
          <input id="w-organisation" type="text" autoComplete="organization" className={input} {...register("organisation")} />
        </Field>
        <Field name="audience" label="Audience" required error={fieldErrors.audience}>
          <select id="w-audience" className={input} {...register("audience")}>
            <option value="" disabled>
              Choose one
            </option>
            {["Students", "Parents", "Teachers", "Mixed"].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field name="ageRange" label="Class or age range">
          <input id="w-ageRange" type="text" placeholder="e.g. Class 8 to 10" className={input} {...register("ageRange")} />
        </Field>
        <Field name="approxCount" label="Approximate number of people">
          <input id="w-approxCount" type="text" inputMode="numeric" placeholder="e.g. 60" className={input} {...register("approxCount")} />
        </Field>
        <Field name="preferredDates" label="Preferred dates">
          <input id="w-preferredDates" type="text" placeholder="e.g. second week of next month" className={input} {...register("preferredDates")} />
        </Field>
        <Field name="language" label="Preferred language" required error={fieldErrors.language}>
          <select id="w-language" className={input} {...register("language")}>
            <option value="" disabled>
              Choose one
            </option>
            {["English", "Hindi", "Marathi"].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-5" id="w-topics">
        <legend className={label}>
          Topics <span className="text-plum" aria-hidden>*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {WORKSHOP_TOPICS.map((t) => (
            <label key={t} className="flex min-h-[48px] items-center gap-3 text-[15.5px] text-ink-600">
              <input type="checkbox" value={t} className="size-4 accent-[#734569]" {...register("topics")} />
              {t}
            </label>
          ))}
        </div>
        {fieldErrors.topics && (
          <p className={err} role="alert">
            {fieldErrors.topics}
          </p>
        )}
      </fieldset>
      <div className="mt-4">
        <Field name="topicsOther" label="If Other, which topic?">
          <input id="w-topicsOther" type="text" className={input} {...register("topicsOther")} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field name="contactName" label="Contact person's name" required error={fieldErrors.contactName}>
          <input id="w-contactName" type="text" autoComplete="name" className={input} {...register("contactName")} />
        </Field>
        <Field name="phone" label="Mobile" required error={fieldErrors.phone}>
          <input id="w-phone" type="tel" autoComplete="tel" inputMode="tel" className={input} {...register("phone")} />
        </Field>
        <Field name="email" label="Email" required error={fieldErrors.email}>
          <input id="w-email" type="email" autoComplete="email" className={input} {...register("email")} />
        </Field>
      </div>

      <div className="mt-5">
        <label className="flex min-h-[48px] items-start gap-3 text-[15.5px] text-ink-600">
          <input
            id="w-consent"
            type="checkbox"
            className="mt-1 size-4 accent-[#734569]"
            aria-invalid={!!fieldErrors.consent}
            {...register("consent")}
          />
          <span>
            I agree that Niramay Clinics may contact me about this workshop request. I have read the{" "}
            <Link href="/privacy-policy/" className="font-medium text-plum underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {fieldErrors.consent && (
          <p className={err} role="alert">
            {fieldErrors.consent}
          </p>
        )}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" defaultValue="" />
          <input type="hidden" name="sourcePage" defaultValue="/blooming-buds/workshops/" />

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
        {pending ? "Sending…" : "Request a workshop"}
      </button>
      <p className="mt-4 text-[14px] leading-relaxed text-ink-600">We will contact you within 2 working days.</p>
    </form>
  );
}
