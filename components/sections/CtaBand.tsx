import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

/**
 * Standard CTA band at the bottom of every medical page (site-plan.md 0.5).
 * White glass over a soft tint; brand gradient only on the buttons.
 */
export function CtaBand({ className }: { className?: string }) {
  const wa = `${site.whatsapp.url}?text=${encodeURIComponent("Hello, I would like to book an appointment at Niramay Clinics.")}`;
  return (
    <section
      aria-label="Book a consultation"
      className={cn(
        "mt-14 rounded-[20px] border border-line bg-gradient-to-br from-plum-50 via-white to-[#fdf3ee] p-8 text-center sm:p-10",
        className
      )}
    >
      <h2 className="t-h3 text-ink">Ready to talk to a specialist?</h2>
      <p className="mx-auto mt-3 max-w-[56ch] text-[17px] leading-relaxed text-ink-600">
        Call {site.phone.display} or {site.mobile.display}, message us on
        WhatsApp, or use the appointment form. Please bring your previous
        reports and a list of the medicines you take.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <BookButton href="/contact/#book" />
        <ButtonLink variant="secondary" href={site.phone.tel} aria-label={`Call the clinic on ${site.phone.display}`}>
          <PhoneIcon size={18} aria-hidden /> {site.phone.display}
        </ButtonLink>
        <ButtonLink
          variant="secondary"
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
        >
          <WhatsAppIcon size={18} aria-hidden className="text-[#1faa53]" /> WhatsApp
        </ButtonLink>
      </div>
    </section>
  );
}
