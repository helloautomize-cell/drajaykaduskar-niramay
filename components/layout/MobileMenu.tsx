"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
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
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { ButtonLink } from "@/components/ui/Button";
import { MenuIcon, CloseIcon, ChevronIcon, PhoneIcon } from "@/components/icons";

/**
 * Mobile menu (plan section 6.4): hamburger opens a full-height Sheet with
 * accordion groups (same links as the mega menus, service rows carry the sm
 * badge). Book and Call buttons are pinned to the bottom of the sheet, above
 * the safe-area inset. Radix Dialog traps focus; Escape closes.
 */

function SheetLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="flex min-h-12 items-center gap-3 rounded-[12px] px-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:bg-plum-50 hover:text-plum"
    >
      {link.badge ? (
        <ServiceBadge slug={link.badge} size="sm" alt="" className="-my-2 shrink-0 scale-[0.7]" />
      ) : null}
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
      <Accordion.Trigger className="group flex min-h-12 w-full items-center justify-between gap-2 px-2 py-2 text-left text-[15.5px] font-semibold text-ink">
        {title}
        <ChevronIcon
          size={16}
          className="shrink-0 text-plum-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </Accordion.Trigger>
      <Accordion.Content className="overflow-hidden pb-2 data-[state=closed]:hidden">
        <div className="space-y-0.5">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="grid size-12 place-items-center rounded-[12px] text-ink transition-colors hover:bg-plum-50 lg:hidden"
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
          className="fixed inset-y-0 right-0 z-[61] flex w-[min(380px,92vw)] flex-col bg-white shadow-[-20px_0_60px_-20px_rgba(42,36,64,.3)]"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <Image
              src="/images/brand/niramay-logo.png"
              alt="Niramay Clinics"
              width={512}
              height={339}
              sizes="74px"
              className="h-11 w-auto object-contain"
            />
            <Dialog.Close
              aria-label="Close menu"
              className="grid size-12 place-items-center rounded-[12px] text-ink transition-colors hover:bg-plum-50"
            >
              <CloseIcon size={22} />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3">
            <Accordion.Root type="single" collapsible>
              <Group value="diabetes-heart" title="Diabetes and Heart">
                {diabetesHeartGroups.map((g) => (
                  <div key={g.heading}>
                    <p className="eyebrow px-2 pb-1 pt-3 !text-[11px]">{g.heading}</p>
                    {g.links.map((l) => (
                      <SheetLink key={l.href} link={l} onNavigate={close} />
                    ))}
                  </div>
                ))}
              </Group>

              <Group value="child-teen" title="Child and Teen">
                {childTeenGroups.map((g) => (
                  <div key={g.heading}>
                    <p className="eyebrow px-2 pb-1 pt-3 !text-[11px]">{g.heading}</p>
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
                    className="flex min-h-12 items-center gap-3 rounded-[12px] px-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:bg-plum-50 hover:text-plum"
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
          <div className="border-t border-line bg-white px-4 pb-[calc(14px+env(safe-area-inset-bottom))] pt-3">
            <ButtonLink href="/contact/#book" onClick={close} className="w-full">
              Book Appointment
            </ButtonLink>
            <ButtonLink
              href={site.phone.tel}
              variant="secondary"
              onClick={close}
              className="mt-2 w-full"
            >
              <PhoneIcon size={18} />
              Call {site.phone.display}
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
