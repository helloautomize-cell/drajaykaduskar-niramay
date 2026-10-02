import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { site } from "@/lib/site-config";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thank you | Niramay Clinics, Nagpur",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/thank-you/` },
};

const COPY = {
  appointment: {
    h1: "Thank you. We have received your request.",
    body: "This is not a confirmed appointment yet. We usually confirm within 30 to 90 minutes between 8 am and 9 pm. Requests sent after 9 pm are confirmed the next morning.",
  },
  workshop: {
    h1: "Thank you. We have received your workshop request.",
    body: "We will contact you within 2 working days.",
  },
} as const;

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const variant = type === "workshop" ? COPY.workshop : COPY.appointment;
  return (
    <div className="mx-auto max-w-[680px] px-4 py-16 text-center sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Contact", href: "/contact/" },
          { label: "Thank you", href: "/thank-you/" },
        ]}
        className="mb-8 justify-center"
      />
      <h1 className="t-h2 text-ink">{variant.h1}</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-600">{variant.body}</p>
      <Callout variant="emergency" title="If your need is urgent" className="mt-8 text-left">
        <p>
          In an emergency, call {site.emergency.numbers}. For anything else, call{" "}
          {site.phone.display} or {site.mobile.display}.
        </p>
      </Callout>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/plan-your-visit/" variant="secondary">
          Plan your visit
        </ButtonLink>
        <ButtonLink href="/" variant="primary">
          Back to home
        </ButtonLink>
      </div>
    </div>
  );
}
