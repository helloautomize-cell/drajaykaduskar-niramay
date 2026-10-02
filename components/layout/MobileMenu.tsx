"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { useEffect, useRef } from "react";
import {
  diabetesHeartGroups,
  childTeenGroups,
  labPharmacyLinks,
  doctorLinks,
  aboutClinicLink,
  patientInfoLinks,
  type NavLink,
} from "@/lib/nav";
import { site } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { FontSizeToggle } from "@/components/ui/FontSizeToggle";
import { MenuIcon, CloseIcon, ChevronIcon, PhoneIcon } from "@/components/icons";

/**
 * Full-screen mobile menu: solid white sheet, top-level groups are
 * accordions (all collapsed by default) with plain 48px text links — no PNG
 * badges. "Book Appointment" and "Call" are pinned to the bottom above the
 * safe-area inset, with a one-line hours summary. Radix Dialog traps focus;
 * closes via X, Esc, or the browser back gesture.
 */

function SheetLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="flex min-h-12 items-center rounded-[12px] px-3 text-[17px] font-medium text-ink transition-colors hover:bg-plum-50 hover:text-plum"
    >
      {link.label}
    </Link>
  );
}

function Group({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion.Item value={value} className="border-b border-line">
      <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-2 px-3 py-2 text-left text-[16.5px] font-semibold text-ink">
        {title}
        <ChevronIcon
          size={16}
          className="shrink-0 text-plum-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </Accordion.Trigger>
      <Accordion.Content className="overflow-hidden pb-3 data-[state=closed]:hidden">
        <div>{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

function SubHeading({ children }: { children: string }) {
  return <p className="eyebrow px-3 pb-1 pt-3 !text-[11px]">{children}</p>;
}

export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const pushed = useRef(false);

  // Close on the browser/gesture back button: push a history entry while the
  // sheet is open and unwind it when the sheet closes via UI instead.
  useEffect(() => {
    if (!open || pushed.current) return;
    pushed.current = true;
    history.pushState({ nmMenu: true }, "");
    const onPop = () => {
      pushed.current = false;
      onOpenChange(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [open, onOpenChange]);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next && pushed.current) {
      pushed.current = false;
      history.back();
    }
  };

  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="grid size-11 place-items-center rounded-[12px] text-ink transition-colors hover:bg-plum-50 lg:hidden"
      >
        <MenuIcon size={24} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          data-sheet-overlay
          className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-[2px]"
        />
        <Dialog.Content
          data-sheet-panel
          aria-label="Site menu"
          className="fixed inset-0 z-[61] flex w-full flex-col bg-white"
        >
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-line px-4">
            <Image
              src="/images/brand/niramay-logo.png"
              alt="Niramay Clinics"
              width={512}
              height={339}
              sizes="74px"
              className="h-9 w-auto object-contain"
            />
            <Dialog.Close
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-[12px] text-ink transition-colors hover:bg-plum-50"
            >
              <CloseIcon size={22} />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2">
            <Accordion.Root type="single" collapsible>
              <Group value="diabetes-heart" title="Diabetes and Heart">
                {diabetesHeartGroups.map((g) => (
                  <div key={g.heading}>
                    <SubHeading>{g.heading}</SubHeading>
                    {g.links.map((l) => (
                      <SheetLink key={l.href} link={l} onNavigate={close} />
                    ))}
                  </div>
                ))}
              </Group>

              <Group value="child-teen" title="Child and Teen">
                {childTeenGroups.map((g) => (
                  <div key={g.heading}>
                    <SubHeading>{g.heading}</SubHeading>
                    {g.links.map((l) => (
                      <SheetLink key={l.href} link={l} onNavigate={close} />
                    ))}
                  </div>
                ))}
              </Group>

              <Group value="lab-pharmacy" title="Lab and Pharmacy">
                {labPharmacyLinks.map((l) => (
                  <SheetLink key={l.href} link={l} onNavigate={close} />
                ))}
              </Group>

              <Group value="doctors" title="Doctors">
                {doctorLinks.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={close}
                    className="flex min-h-12 items-center gap-3 rounded-[12px] px-3 py-1.5 text-[17px] font-medium text-ink transition-colors hover:bg-plum-50 hover:text-plum"
                  >
                    <Image
                      src={d.face}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-full border border-white object-cover shadow-[var(--shadow-card)]"
                    />
                    {d.name}
                  </Link>
                ))}
                <SheetLink link={aboutClinicLink} onNavigate={close} />
              </Group>

              <Group value="patient-info" title="Patient Info">
                {patientInfoLinks.map((l) => (
                  <SheetLink key={l.href} link={l} onNavigate={close} />
                ))}
              </Group>
            </Accordion.Root>
          </div>

          {/* Pinned actions, above the safe-area inset */}
          <div className="shrink-0 border-t border-line bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3">
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <ButtonLink href="/contact/#book" onClick={close} className="h-12">
                Book Appointment
              </ButtonLink>
              <ButtonLink
                href={site.phone.tel}
                variant="secondary"
                onClick={close}
                className="h-12 px-5"
              >
                <PhoneIcon size={18} />
                Call
              </ButtonLink>
            </div>
            <div className="mt-2.5 flex items-center justify-center gap-3">
              <p className="text-[13px] text-ink-600">
                OPD Mon to Sat, 8:30 am to 6 pm · Phone 8 am to 9 pm daily
              </p>
              <FontSizeToggle />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
