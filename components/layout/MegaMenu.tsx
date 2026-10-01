"use client";

import Image from "next/image";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import {
  diabetesHeartGroups,
  childTeenGroups,
  labPharmacyLinks,
  doctorLinks,
  aboutClinicLink,
  patientInfoLinks,
  diabetesHeartFeatured,
  childTeenFeatured,
  type NavLink,
} from "@/lib/nav";
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { ServiceGlassCard } from "@/components/sections/ServiceGlassCard";
import { ChevronIcon, ArrowIcon, iconSet } from "@/components/icons";

/**
 * Desktop mega menus (plan G3 + Appendix A.6), Radix Navigation Menu:
 * opens on hover and click, closes on Escape and outside click, arrow-key
 * navigable. Panels are white glass over the page (180ms fade + 6px slide).
 */

const triggerCls =
  "group inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-[10px] px-2.5 text-[14.5px] font-semibold text-ink transition-colors duration-200 hover:text-plum data-[state=open]:text-plum";

function Trigger({ children }: { children: string }) {
  return (
    <NavigationMenu.Trigger className={triggerCls}>
      {children}
      <ChevronIcon
        size={15}
        className="text-plum-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </NavigationMenu.Trigger>
  );
}

/** Service link with the sm illustrated badge + label. */
function BadgeLink({ link }: { link: NavLink }) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          href={link.href}
          className="group flex min-h-[72px] items-center gap-3 rounded-[14px] p-1.5 pr-2 transition-colors duration-200 hover:bg-plum-50"
        >
          {link.badge ? (
            <ServiceBadge slug={link.badge} size="sm" alt="" className="shrink-0" />
          ) : null}
          <span className="text-[14.5px] font-medium leading-snug text-ink group-hover:text-plum">
            {link.label}
          </span>
        </Link>
      </NavigationMenu.Link>
    </li>
  );
}

function ColumnHeading({ icon, children }: { icon?: string; children: string }) {
  const Icon = icon ? iconSet[icon] : null;
  return (
    <p className="eyebrow mb-2 flex items-center gap-2 !text-[11px]">
      {Icon ? <Icon size={17} className="text-plum" /> : null}
      {children}
    </p>
  );
}

function FeaturedRow({
  items,
  tint,
}: {
  items: readonly { badge: string; title: string; text: string; href: string }[];
  tint: "plum" | "lilac";
}) {
  return (
    <div className="mt-2 border-t border-line pt-5">
      <p className="eyebrow mb-3 !text-[11px]">Featured</p>
      <div className="flex gap-4">
        {items.map((it) => (
          <ServiceGlassCard
            key={it.href}
            badge={it.badge}
            title={it.title}
            text={it.text}
            href={it.href}
            tint={tint}
            className="!w-[200px]"
          />
        ))}
      </div>
    </div>
  );
}

export function SiteNav() {
  return (
    <NavigationMenu.Root className="relative hidden lg:block" delayDuration={120}>
      <NavigationMenu.List className="flex items-center gap-0.5">
        {/* Diabetes and Heart */}
        <NavigationMenu.Item>
          <Trigger>Diabetes and Heart</Trigger>
          <NavigationMenu.Content data-nav-content className="absolute left-0 top-0 w-auto p-6">
            <div className="grid grid-cols-4 gap-6">
              {diabetesHeartGroups.map((g) => (
                <div key={g.heading}>
                  <ColumnHeading icon={g.icon}>{g.heading}</ColumnHeading>
                  <ul className="space-y-0.5">
                    {g.links.map((l) => (
                      <BadgeLink key={l.href} link={l} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <FeaturedRow items={diabetesHeartFeatured} tint="plum" />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Child and Teen */}
        <NavigationMenu.Item>
          <Trigger>Child and Teen</Trigger>
          <NavigationMenu.Content data-nav-content className="absolute left-0 top-0 w-auto p-6">
            <div className="flex gap-8">
              <div className="grid grid-cols-2 gap-6">
                {childTeenGroups.map((g) => (
                  <div key={g.heading}>
                    <ColumnHeading icon={g.icon}>{g.heading}</ColumnHeading>
                    <ul className="space-y-0.5">
                      {g.links.map((l) => (
                        <BadgeLink key={l.href} link={l} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Dr. Prajakta promo card */}
              <div className="w-[220px] shrink-0">
                <div className="rounded-[20px] bg-plum-50 p-5 text-center">
                  <Image
                    src="/images/doctors/dr-prajakta-kaduskar-face.jpg"
                    alt="Dr. Prajakta Kaduskar"
                    width={72}
                    height={72}
                    className="mx-auto rounded-full border-2 border-white object-cover shadow-[var(--shadow-card)]"
                  />
                  <p className="mt-3 text-[15px] font-semibold text-ink">Dr. Prajakta A. Kaduskar</p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-600">
                    Child, adolescent and psychological care
                  </p>
                  <Link
                    href="/doctors/dr-prajakta-kaduskar/"
                    className="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-plum"
                  >
                    View profile
                    <ArrowIcon size={15} className="transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            <FeaturedRow items={childTeenFeatured} tint="lilac" />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Lab and Pharmacy */}
        <NavigationMenu.Item>
          <Trigger>Lab and Pharmacy</Trigger>
          <NavigationMenu.Content data-nav-content className="absolute left-0 top-0 w-[300px] p-4">
            <ul className="space-y-0.5">
              {labPharmacyLinks.map((l) => (
                <BadgeLink key={l.href} link={l} />
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Doctors */}
        <NavigationMenu.Item>
          <Trigger>Doctors</Trigger>
          <NavigationMenu.Content data-nav-content className="absolute left-0 top-0 w-[400px] p-4">
            <ul className="space-y-1">
              {doctorLinks.map((d) => (
                <li key={d.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={d.href}
                      className="group flex items-center gap-3 rounded-[14px] p-2 transition-colors duration-200 hover:bg-plum-50"
                    >
                      <Image
                        src={d.face}
                        alt=""
                        width={52}
                        height={52}
                        className="size-[52px] shrink-0 rounded-full border-2 border-white object-cover shadow-[var(--shadow-card)]"
                      />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold text-ink group-hover:text-plum">
                          {d.name}
                        </span>
                        <span className="block text-[13px] text-ink-600">{d.line}</span>
                      </span>
                      <ServiceBadge slug={d.badge} size="sm" alt="" className="ml-auto shrink-0 scale-75" />
                    </Link>
                  </NavigationMenu.Link>
                </li>
              ))}
              <li className="border-t border-line pt-1.5">
                <NavigationMenu.Link asChild>
                  <Link
                    href={aboutClinicLink.href}
                    className="group flex min-h-12 items-center gap-2 rounded-[14px] px-2 text-[14.5px] font-semibold text-plum"
                  >
                    {aboutClinicLink.label}
                    <ArrowIcon size={15} className="transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1" />
                  </Link>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Patient Info */}
        <NavigationMenu.Item>
          <Trigger>Patient Info</Trigger>
          <NavigationMenu.Content data-nav-content className="absolute left-0 top-0 w-[260px] p-4">
            <ul>
              {patientInfoLinks.map((l) => (
                <li key={l.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={l.href}
                      className="group flex min-h-12 items-center justify-between gap-2 rounded-[14px] px-3 text-[14.5px] font-medium text-ink transition-colors duration-200 hover:bg-plum-50 hover:text-plum"
                    >
                      {l.label}
                      <ArrowIcon size={15} className="text-plum-500 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      {/* Panel viewport: white glass, sits under the header */}
      <div className="absolute left-0 right-0 top-full flex justify-center pt-2">
        <NavigationMenu.Viewport
          className={cn(
            "relative overflow-y-auto rounded-[20px] glass",
            "h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
            "max-h-[calc(100svh-140px)] max-w-[96vw] transition-[width,height] duration-200 ease-out",
            "data-[state=closed]:hidden"
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}
