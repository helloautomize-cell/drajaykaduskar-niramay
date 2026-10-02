import Image from "next/image";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export interface Doctor {
  name: string;
  shortName: string; // e.g. "Dr. Ajay"
  qualifications: string;
  role: string;
  /** shown as a chip, e.g. "20+ years" */
  experience: string;
  photo: { src: string; alt: string };
  languages: string[];
  bookHref: string;
  profileHref: string;
}

/**
 * Doctor card. Both cards share an identical, top-aligned structure:
 * photo (fixed crop), name, qualifications, role line, experience chip,
 * language chips, buttons. Mobile is a compact horizontal card: 120px 3:4
 * photo on the left, ~240px tall.
 */
export function DoctorCard({ doctor, className }: { doctor: Doctor; className?: string }) {
  return (
    <article
      className={cn(
        "group grid grid-cols-[120px_1fr] overflow-hidden rounded-[20px] border border-line bg-card shadow-[var(--shadow-card)] transition-all duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:grid-cols-[42%_1fr]",
        className
      )}
    >
      <div className="relative min-h-[190px] overflow-hidden bg-plum-50">
        <Image
          src={doctor.photo.src}
          alt={doctor.photo.alt}
          fill
          sizes="(max-width: 640px) 120px, 42vw"
          className="object-cover object-[50%_15%] transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-center p-4 sm:p-7">
        <h3 className="mb-0.5 text-[17px] font-bold tracking-tight text-plum sm:mb-1 sm:text-[22px]">
          {doctor.name}
        </h3>
        <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-ink-600 sm:text-[13.5px]">
          {doctor.qualifications}
        </p>
        <p className="mb-4 mt-1 hidden text-[15px] leading-relaxed text-ink-600 sm:block">
          {doctor.role}
        </p>
        <div className="mb-4 mt-2 flex flex-wrap gap-1.5 sm:mb-5 sm:mt-0">
          <Chip className="px-3 py-1 text-[12px] font-semibold text-plum">
            {doctor.experience}
          </Chip>
          <span className="hidden flex-wrap gap-1.5 sm:flex">
            {doctor.languages.map((l) => (
              <Chip key={l} className="px-3 py-1 text-[12px]">
                {l}
              </Chip>
            ))}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <ButtonLink href={doctor.bookHref} className="h-10 px-4 text-[13.5px] sm:h-11 sm:px-5 sm:text-[14px]">
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book with {doctor.shortName}</span>
          </ButtonLink>
          <ButtonLink href={doctor.profileHref} variant="link" arrow className="text-[13.5px] sm:text-[14.5px]">
            <span className="sm:hidden">Profile</span>
            <span className="hidden sm:inline">View profile</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
