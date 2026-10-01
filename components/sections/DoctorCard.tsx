import Image from "next/image";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export interface Doctor {
  name: string;
  shortName: string; // e.g. "Dr. Ajay"
  qualifications: string;
  role: string;
  photo: { src: string; alt: string };
  languages: string[];
  bookHref: string;
  profileHref: string;
}

/** Photo left (42%), details right. Photo zooms 1.03 on card hover. */
export function DoctorCard({ doctor, className }: { doctor: Doctor; className?: string }) {
  return (
    <article
      className={cn(
        "group grid overflow-hidden rounded-[20px] border border-line bg-card shadow-[var(--shadow-card)] transition-all duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:grid-cols-[42%_1fr]",
        className
      )}
    >
      <div className="relative overflow-hidden bg-plum-50">
        <div className="relative aspect-[4/5] sm:h-full">
          <Image
            src={doctor.photo.src}
            alt={doctor.photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, 42vw"
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center p-7">
        <h3 className="mb-1 text-[22px] font-bold tracking-tight text-plum">{doctor.name}</h3>
        <p className="mb-1 text-[13.5px] font-medium leading-snug text-ink-600">
          {doctor.qualifications}
        </p>
        <p className="mb-4 text-[15px] leading-relaxed text-ink-600">{doctor.role}</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {doctor.languages.map((l) => (
            <Chip key={l} className="px-3 py-1 text-[12px]">
              {l}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <ButtonLink href={doctor.bookHref} className="h-11 px-5 text-[14px]">
            Book with {doctor.shortName}
          </ButtonLink>
          <ButtonLink href={doctor.profileHref} variant="link" arrow className="text-[14.5px]">
            View profile
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
