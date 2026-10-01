/** Doctor data used by reviewer boxes, author chips, profiles and JSON-LD. */

export interface Doctor {
  id: "ajay" | "prajakta";
  name: string;
  shortName: string;
  role: string;
  qualifications: string;
  profileHref: string;
  /** square avatar for bylines and reviewer boxes */
  avatar: string;
  avatarAlt: string;
}

export const doctors: Record<Doctor["id"], Doctor> = {
  ajay: {
    id: "ajay",
    name: "Dr. Ajay V. Kaduskar",
    shortName: "Dr. Ajay Kaduskar",
    role: "Physician: diabetes, obesity, thyroid, blood pressure and heart care",
    qualifications:
      "MD (Medicine), PGDHSc (Diabetology), Fellow, Euro Asian Academy of Clinical Diabetology (The Netherlands)",
    profileHref: "/doctors/dr-ajay-kaduskar/",
    avatar: "/images/doctors/dr-ajay-kaduskar-avatar.jpg",
    avatarAlt: "Dr. Ajay Kaduskar",
  },
  prajakta: {
    id: "prajakta",
    name: "Dr. Prajakta A. Kaduskar",
    shortName: "Dr. Prajakta Kaduskar",
    role: "Child and adolescent health, counselling and vaccination",
    qualifications: "MBBS, DCH, PGDAP, MA (Clinical Psychology)",
    profileHref: "/doctors/dr-prajakta-kaduskar/",
    avatar: "/images/doctors/dr-prajakta-kaduskar-face.jpg",
    avatarAlt: "Dr. Prajakta Kaduskar",
  },
};

/** Which doctor reviews which content section. */
const sectionReviewer: Record<string, Doctor["id"]> = {
  "diabetes-heart": "ajay",
  "blooming-buds": "prajakta",
  "lab-pharmacy": "ajay",
};

/** reviewed_by frontmatter strings -> doctor. Mixed/unclear -> by section. */
export function reviewerFor(section: string, reviewedBy: string): Doctor | null {
  const r = reviewedBy.replace(/\*\*/g, "");
  if (/Prajakta/.test(r) && /Ajay/.test(r)) {
    return section === "blooming-buds" ? doctors.prajakta : doctors.ajay;
  }
  if (/Prajakta/.test(r)) return doctors.prajakta;
  if (/Ajay/.test(r)) return doctors.ajay;
  const fallback = sectionReviewer[section];
  return fallback ? doctors[fallback] : null;
}
