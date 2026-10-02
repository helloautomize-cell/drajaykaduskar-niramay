"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
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
 * Desktop mega menus (no Radix Viewport): each panel is absolutely
 * positioned under its own Item, sized by an explicit grid so columns can
 * never collapse into each other. On open a layout effect clamps the
 * panel's left edge so it always stays inside the nav container. Panels
 * are opaque white, 16px radius, light shadow, max 380px tall. Opens on
 * hover after a 120ms intent delay, closes on mouse leave (200ms), fully
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

const panelCls =
  "absolute top-full z-50 mt-2 max-h-[380px] overflow-y-auto rounded-2xl bg-white/98 p-5 shadow-[0_18px_50px_-18px_rgba(42,36,64,.3)] ring-1 ring-line data-[state=open]:animate-[navmenu-in_.15s_ease-out]";

/**
 * Panel anchored to its Item. `estimatedWidth` must roughly match the
 * grid's real width so the clamp can keep the panel inside the List.
 */
function Panel({
  estimatedWidth,
  children,
}: {
  estimatedWidth: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const item = el?.parentElement;
    const list = item?.parentElement;
    if (!el || !item || !list) return;
    const clamp = () => {
      const w = el.offsetWidth || estimatedWidth;
      const shell =
        el.closest("header")?.querySelector("[data-header-shell]") ?? list;
      const shellR = shell.getBoundingClientRect();
      const listR = list.getBoundingClientRect();
      const itemR = item.getBoundingClientRect();
      const desired = Math.max(
        shellR.left + 4,
        Math.min(itemR.left, shellR.right - w - 4)
      );
      el.style.left = `${desired - listR.left}px`;
    };
    clamp();
    const ro = new ResizeObserver(clamp);
    ro.observe(list);
    return () => ro.disconnect();
  }, [estimatedWidth]);

  return (
    <NavigationMenu.Content
      ref={ref}
      data-nav-content
      className={panelCls}
      style={{ left: 4 }}
    >
      {children}
    </NavigationMenu.Content>
  );
}

/** One text link per line, 15px, 40px rows, never wraps. */
function TextLink({ link }: { link: NavLink }) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          href={link.href}
          className="flex h-10 items-center whitespace-nowrap rounded-[10px] px-2.5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-plum-50 hover:text-plum"
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
    <p className="eyebrow mb-1.5 flex items-center gap-2 whitespace-nowrap px-2.5 !text-[11px]">
      {Icon ? <Icon size={18} className="text-plum" /> : null}
      {children}
    </p>
  );
}

/** Small doctor card, a normal grid item in the panel's last column. */
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
    <div
      data-doctor-card
      className="self-start rounded-[14px] bg-plum-50 p-4 text-center"
    >
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

export const NAV_ITEMS = [
  { value: "diabetes-heart", label: "Diabetes and Heart" },
  { value: "child-teen", label: "Child and Teen" },
  { value: "lab-pharmacy", label: "Lab and Pharmacy" },
  { value: "doctors", label: "Doctors" },
  { value: "patient-info", label: "Patient Info" },
] as const;

export function SiteNav({ openOn }: { openOn?: string }) {
  return (
    <NavigationMenu.Root
      className="relative hidden lg:block"
      delayDuration={120}
      skipDelayDuration={200}
      defaultValue={openOn}
    >
      <NavigationMenu.List className="relative flex items-center gap-0.5">
        {/* Diabetes and Heart: 4 link columns + doctor card, ~960px */}
        <NavigationMenu.Item value="diabetes-heart">
          <Trigger>Diabetes and Heart</Trigger>
          <Panel estimatedWidth={960}>
            <div
              className="grid items-start gap-x-7"
              style={{ gridTemplateColumns: "repeat(4, minmax(170px, auto)) 220px" }}
            >
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
              <DoctorCardMini
                face={doctorLinks[0].face}
                name={doctorLinks[0].name}
                line={doctorLinks[0].line}
                href={doctorLinks[0].href}
              />
            </div>
          </Panel>
        </NavigationMenu.Item>

        {/* Child and Teen: 2 link columns + doctor card, ~640px */}
        <NavigationMenu.Item value="child-teen">
          <Trigger>Child and Teen</Trigger>
          <Panel estimatedWidth={640}>
            <div
              className="grid items-start gap-x-7"
              style={{ gridTemplateColumns: "repeat(2, minmax(190px, auto)) 220px" }}
            >
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
              <DoctorCardMini
                face={doctorLinks[1].face}
                name={doctorLinks[1].name}
                line={doctorLinks[1].line}
                href={doctorLinks[1].href}
              />
            </div>
          </Panel>
        </NavigationMenu.Item>

        {/* Lab and Pharmacy: single column, no doctor card */}
        <NavigationMenu.Item value="lab-pharmacy">
          <Trigger>Lab and Pharmacy</Trigger>
          <Panel estimatedWidth={240}>
            <ul className="w-[220px]">
              {labPharmacyLinks.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
            </ul>
          </Panel>
        </NavigationMenu.Item>

        {/* Doctors */}
        <NavigationMenu.Item value="doctors">
          <Trigger>Doctors</Trigger>
          <Panel estimatedWidth={320}>
            <ul className="w-[280px] space-y-0.5">
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
                    className="group flex h-10 items-center gap-2 rounded-[10px] px-2.5 text-[15px] font-semibold text-plum"
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
          </Panel>
        </NavigationMenu.Item>

        {/* Patient Info */}
        <NavigationMenu.Item value="patient-info">
          <Trigger>Patient Info</Trigger>
          <Panel estimatedWidth={240}>
            <ul className="w-[220px]">
              {patientInfoLinks.map((l) => (
                <TextLink key={l.href} link={l} />
              ))}
            </ul>
          </Panel>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
