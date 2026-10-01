import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { site } from "@/lib/site-config";
import type { ContentPage } from "@/lib/content/pages";

/**
 * Thank-you utility page (noindex; the mobile action bar is hidden on this
 * URL by the shell). No rendered markdown needed — the copy is fixed.
 */
export function ThankYouTemplate({ page }: { page: ContentPage }) {
  return (
    <div className="mx-auto max-w-[680px] px-4 py-16 text-center sm:px-6">
      <Breadcrumbs items={[{ label: "Contact", href: "/contact/" }, { label: "Thank you", href: page.meta.url }]} className="mb-8 justify-center" />
      <h1 className="t-h2 text-ink">Thank you, we have received your request</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-600">
        We will call or message you to confirm your appointment, usually within
        one working day. Your appointment is confirmed only after you hear from
        us.
      </p>
      <Callout variant="emergency" title="If your need is urgent" className="mt-8 text-left">
        <p>
          Please call {site.phone.display} or {site.mobile.display}. In an
          emergency, call {site.emergency.numbers}.
        </p>
      </Callout>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/plan-your-visit/" variant="secondary">Plan your visit</ButtonLink>
        <ButtonLink href="/" variant="primary">Back to home</ButtonLink>
      </div>
    </div>
  );
}
