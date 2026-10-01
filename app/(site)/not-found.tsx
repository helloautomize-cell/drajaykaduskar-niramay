import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site-config";
import { PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const links = [
  { label: "Home", href: "/" },
  { label: "All services", href: "/services/" },
  { label: "Book an appointment", href: "/contact/#book" },
  { label: "Health Library", href: "/health-library/" },
];

/** 404 (copy: resources/content/patient-info/404.md) */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-10">
      <Breadcrumbs items={[{ label: "Page not found", href: "/404" }]} />
      <section className="mt-16 grid place-items-center text-center">
        <div className="bg-soft flex w-full max-w-[720px] flex-col items-center px-6 py-16 sm:py-20">
          <Eyebrow className="mb-4">404</Eyebrow>
          <h1 className="t-h1 text-ink">We could not find that page</h1>
          <p className="t-body mt-4 max-w-[46ch] text-ink-600">
            The page may have moved when we updated our website. Try one of
            these:
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {links.map((l, i) =>
              i === 2 ? (
                <ButtonLink key={l.href} href={l.href}>
                  {l.label}
                </ButtonLink>
              ) : (
                <ButtonLink key={l.href} href={l.href} variant="secondary">
                  {l.label}
                </ButtonLink>
              )
            )}
          </div>
          <p className="mt-8 text-[15px] text-ink-600">
            Or call us on{" "}
            <a href={site.phone.tel} className="inline-flex items-center gap-1.5 font-semibold text-plum">
              <PhoneIcon size={15} />
              {site.phone.display}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
