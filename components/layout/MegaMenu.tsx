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
  type NavLink,
} from "@/lib/nav";
import { ChevronIcon, ArrowIcon, iconSet } from "@/components/icons";

/**
 * Desktop mega menus, rebuilt compact: an opaque white panel (98%), 16px
 * radius, light shadow, max 760px wide / 380px tall, aligned under its
 * trigger. Links are plain 15px text, one per line (no PNG badges); column
 * headings use the small eyebrow style with an optional 18px line icon.
 * Opens on hover after 120ms intent delay, closes on mouse leave; fully
 * keyboard navigable (Radix).
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

const contentCls =
  "absolute left-0 top-0 w-auto overflow-y-auto p-5 data-[state=open]:animate-[navmenu-in_.15s_ease-out]";

/** One text link per line, 15px, never wraps (columns widen instead). */
function TextLink({ link }: { link: NavLink }) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          href={link.href}
          className="flex h-9 items-center whitespace-nowrap rounded-[10px] px-2.5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-plum-50 hover:text-plum"
        >
          {link.label}
        </Link>
      </NavigationMenu.Link>
    </li>
  );
}

function ColumnHeading({ icon, children }: { icon?: string; children: string }) {
  const Icon = icon ? iconSet[icon] : null;
  return (
    <p className="eyebrow mb-1.5 flex items-center gap-2 px-2.5 !text-[11px]">
      {Icon ? <Icon size={18} className="text-plum" /> : null}
      {children}
    </p>
  );
}

/** Small doctor card kept on the right of the two service menus. */
function DoctorCardMini({
  face,
  name,
  line,
  href,
}: {
  face: string;
  name: string;
  line: string;
  href: string;
}) {
  return (
    <div className="w-[150px] shrink-0 self-start rounded-[14px] bg-plum-50 p-4 text-center">
      <Image
        src={face}
        alt=""
        width={48}
        height={48}
        className="mx-auto size-12 rounded-full border-2 border-white object-cover shadow-[var(--shadow-card)]"
      />
      <p className="mt-2 text-[13.5px] font-semibold leading-tight text-ink">{name}</p>
      <p className="mt-0.5 text-[12px] leading-snug text-ink-600">{line}</p>
      <Link
        href={href}
        className="group mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-plum"
      >
        View profile
        <ArrowIcon
          size={13}
          className="transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

export function SiteNav() {
  return (
    <NavigationMenu.Root
      className="relative hidden lg:block"
      delayDuration={120}
      skipDelayDuration={200}
    >
      <NavigationMenu.List className="flex items-center gap-0.5">
        {/* Diabetes and Heart */}
        <NavigationMenu.Item>
          <Trigger>Diabetes and Heart</Trigger>
          <NavigationMenu.Content data-nav-content className={contentCls}>
            <div className="flex gap-6">
              <div className="grid grid-cols-4 gap-x-7">
                {diabetesHeartGroups.map((g) => (
                  <div key={g.heading}>
                    <ColumnHeading icon={g.icon}>{g.heading}</ColumnHeading>
                    <ul>
                      {g.links.map((l) => (
                        <TextLink key={l.href} link={l} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <DoctorCardMini
                face={doctorLinks[0].face}
                name={doctorLinks[0].name}
                line={doctorLinks[0].line}
                href={doctorLinks[0].href}
              />
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Child and Teen */}
        <NavigationMenu.Item>
          <Trigger>Child and Teen</Trigger>
          <NavigationMenu.Content data-nav-content className={contentCls}>
            <div className="flex gap-6">
              <div className="grid grid-cols-2 gap-x-7">
                {childTeenGroups.map((g) => (
                  <div key={g.heading}>
                    <ColumnHeading icon={g.icon}>{g.heading}</ColumnHeading>
                    <ul>
                      {g.links.map((l) => (
                        <TextLink key={l.href} link={l} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <DoctorCardMini
                face={doctorLinks[1].face}
                name={doctorLinks[1].name}
                line={doctorLinks[1].line}
                href={doctorLinks[1].href}
              />
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Lab and Pharmacy */}
        <NavigationMenu.Item>
          <Trigger>Lab and Pharmacy</Trigger>
          <NavigationMenu.Content data-nav-content className={cn(contentCls, "w-[240px]")}>
            <ul>
              {labPharmacyLinks.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Doctors */}
        <NavigationMenu.Item>
          <Trigger>Doctors</Trigger>
          <NavigationMenu.Content data-nav-content className={cn(contentCls, "w-[300px]")}>
            <ul className="space-y-0.5">
              {doctorLinks.map((d) => (
                <li key={d.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={d.href}
                      className="group flex items-center gap-3 rounded-[12px] p-2 transition-colors duration-150 hover:bg-plum-50"
                    >
                      <Image
                        src={d.face}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 shrink-0 rounded-full border-2 border-white object-cover shadow-[var(--shadow-card)]"
                      />
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[15px] font-semibold text-ink group-hover:text-plum">
                          {d.name}
                        </span>
                        <span className="block whitespace-nowrap text-[13px] text-ink-600">
                          {d.line}
                        </span>
                      </span>
                    </Link>
                  </NavigationMenu.Link>
                </li>
              ))}
              <li className="border-t border-line pt-1">
                <NavigationMenu.Link asChild>
                  <Link
                    href={aboutClinicLink.href}
                    className="group flex h-9 items-center gap-2 rounded-[10px] px-2.5 text-[15px] font-semibold text-plum"
                  >
                    {aboutClinicLink.label}
                    <ArrowIcon
                      size={14}
                      className="transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1"
                    />
                  </Link>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Patient Info */}
        <NavigationMenu.Item>
          <Trigger>Patient Info</Trigger>
          <NavigationMenu.Content data-nav-content className={cn(contentCls, "w-[220px]")}>
            <ul>
              {patientInfoLinks.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      {/* Opaque white panel under the triggers; content is offset to its
          trigger by Radix automatically */}
      <div className="absolute left-0 right-0 top-full flex justify-center pt-2">
        <NavigationMenu.Viewport
          className={cn(
            "relative overflow-hidden rounded-2xl bg-white/98 shadow-[0_18px_50px_-18px_rgba(42,36,64,.3)] ring-1 ring-line",
            "h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
            "max-h-[380px] max-w-[min(760px,96vw)] transition-[width,height] duration-150 ease-out",
            "data-[state=closed]:hidden"
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}
