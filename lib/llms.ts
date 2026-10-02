import { allPages, allPosts } from "@/lib/content/pages";
import { site } from "@/lib/site-config";
import { doctors } from "@/lib/doctors";
import { SITE_URL } from "@/lib/seo";

/**
 * llms.txt / llms-full.txt content, generated at build time from the same
 * content source as the pages so it can never drift out of date.
 * Facts come only from site-config and page frontmatter; no claims beyond
 * what the site itself states.
 */

const N = "\n";

export function llmsTxt(): string {
  const pages = allPages()
    .filter((p) => p.meta.url && p.meta.url !== "-")
    .sort((a, b) => a.meta.url.localeCompare(b.meta.url));
  const posts = allPosts().sort((a, b) => a.meta.url.localeCompare(b.meta.url));

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.tagline} Outpatient clinic run by Dr. Ajay V. Kaduskar (diabetes, obesity, thyroid, blood pressure and heart care) and Dr. Prajakta A. Kaduskar (child and adolescent health, counselling and vaccination), with an in-house laboratory and pharmacy.`,
    "",
    "## Contact",
    `- Address: ${site.address.full}`,
    `- Phone (OPD and appointments): ${site.phone.display} (${site.hours.phone})`,
    `- Mobile and WhatsApp: ${site.mobile.display}`,
    `- Pharmacy: ${site.pharmacy.display}`,
    `- Email: ${site.email}`,
    `- OPD hours: ${site.hours.opd}. Lab: ${site.hours.lab}. Pharmacy: ${site.hours.pharmacy}. Sundays closed.`,
    `- Website: ${SITE_URL}/`,
    "",
    "## Doctors",
    `- ${doctors.ajay.name}, ${doctors.ajay.qualifications}. ${doctors.ajay.role}. ${SITE_URL}${doctors.ajay.profileHref}`,
    `- ${doctors.prajakta.name}, ${doctors.prajakta.qualifications}. ${doctors.prajakta.role}. ${SITE_URL}${doctors.prajakta.profileHref}`,
    "",
    "## Pages",
    ...pages.map(
      (p) =>
        `- [${p.meta.title}](${SITE_URL}${p.meta.url}): ${p.meta.meta_description || p.h1}`
    ),
    "",
    "## Articles",
    ...posts.map(
      (p) =>
        `- [${p.meta.title}](${SITE_URL}${p.meta.url})${p.meta.excerpt ? `: ${p.meta.excerpt}` : ""}`
    ),
    "",
    "## Editorial and medical review policy",
    "Every medical page and article is reviewed and approved by a qualified doctor before publication. Pages on diabetes, weight, thyroid, blood pressure and heart health are reviewed by Dr. Ajay V. Kaduskar, MD (Medicine). Pages on child and adolescent health are reviewed by Dr. Prajakta A. Kaduskar, MBBS, DCH, PGDAP, MA (Clinical Psychology). Each page shows its reviewer. Full policy: " +
      `${SITE_URL}/editorial-policy/`,
    "",
    "The information on this site is general education, not a diagnosis or a prescription. Please consult the doctors for advice about your own health. " +
      `Medical disclaimer: ${SITE_URL}/medical-disclaimer/`,
    "",
  ];
  return lines.join(N);
}

/** Full text of every public page and post, for deeper AI ingestion. */
export function llmsFullTxt(): string {
  const pages = allPages().filter((p) => p.meta.url && p.meta.url !== "-");
  const posts = allPosts();
  // Markdown HTML comments carry editorial placeholders ([CONFIRM] lines);
  // never publish them.
  const clean = (body: string) => body.replace(/<!--[\s\S]*?-->/g, "");
  const section = (title: string, url: string, body: string) =>
    [`## ${title}`, `URL: ${SITE_URL}${url}`, "", clean(body).trim(), "", "---", ""].join(N);

  return [
    `# ${site.name}: full site text`,
    "",
    "Generated from the same content source as the website. Facts about the clinic, doctors, hours and services are listed in llms.txt.",
    "",
    ...pages
      .sort((a, b) => a.meta.url.localeCompare(b.meta.url))
      .map((p) => section(p.meta.title, p.meta.url, p.body)),
    ...posts
      .sort((a, b) => a.meta.url.localeCompare(b.meta.url))
      .map((p) => section(p.meta.title, p.meta.url, p.body)),
  ].join(N);
}
