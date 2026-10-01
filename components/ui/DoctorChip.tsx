import Image from "next/image";
import { cn } from "@/lib/utils";

/** Glass pill with two overlapping doctor avatars. Sits over the hero fan. */
export function DoctorChip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "glass inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-5",
        className
      )}
    >
      <span className="flex -space-x-3">
        <Image
          src="/images/doctors/dr-ajay-kaduskar-face.jpg"
          alt="Dr. Ajay Kaduskar"
          width={36}
          height={36}
          className="size-9 rounded-full border-2 border-white object-cover"
        />
        <Image
          src="/images/doctors/dr-prajakta-kaduskar-face.jpg"
          alt="Dr. Prajakta Kaduskar"
          width={36}
          height={36}
          className="size-9 rounded-full border-2 border-white object-cover"
        />
      </span>
      <span className="text-[13px] font-medium leading-tight text-ink">
        Specialist-led care
        <span className="block text-ink-600">Dr. Ajay and Dr. Prajakta Kaduskar</span>
      </span>
    </div>
  );
}
