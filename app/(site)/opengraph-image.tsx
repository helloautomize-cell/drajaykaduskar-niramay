import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

/** Default branded OG card (Home and any route without its own image). */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Niramay Clinics, Dhantoli, Nagpur";

export default function Image() {
  return ogImage(
    "Diabetes, heart, child and adolescent care",
    "Niramay Clinics"
  );
}
