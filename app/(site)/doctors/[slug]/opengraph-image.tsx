import { notFound } from "next/navigation";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";
import { doctors } from "@/lib/doctors";

/** Per-doctor OG card: name, role, brand gradient + logo. */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Niramay Clinics";

const bySlug: Record<string, (typeof doctors)[keyof typeof doctors]> = {
  "dr-ajay-kaduskar": doctors.ajay,
  "dr-prajakta-kaduskar": doctors.prajakta,
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = bySlug[slug];
  if (!doctor) notFound();
  return ogImage(doctor.name, doctor.role);
}
