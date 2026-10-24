// EEAT-003/004: wire explicit `reviewed` frontmatter ahead of git-modified,
// fix ReviewerBox prop name, import PHYSICIAN_ID + formatDate, legal date.
import { edit, once } from "./io.mjs";

for (const f of [
  "components/templates/ServiceDetail.tsx",
  "components/templates/ServiceHub.tsx",
  "components/templates/Editorial.tsx",
]) {
  edit(f, (s) =>
    s
      .split("nextReview={page.modified").join("nextReviewDue={(page.meta.reviewed || page.modified)")
      .split("lastReviewed={page.modified").join("lastReviewed={(page.meta.reviewed || page.modified)")
  );
}

edit("app/(site)/[...slug]/page.tsx", (s) => {
  s = once(s, `  videoNode,
  SITE_URL,`, `  videoNode,
  PHYSICIAN_ID,
  SITE_URL,`);
  s = once(s, `import { ServiceHubTemplate } from "@/components/templates/ServiceHub";`,
    `import { ServiceHubTemplate } from "@/components/templates/ServiceHub";
import { formatDate } from "@/components/templates/BlogList";`);
  s = once(s,
    `<LegalTemplate page={page} doc={doc} lastUpdated={page.meta.updated || site.legalLastUpdated} />`,
    `<LegalTemplate page={page} doc={doc} lastUpdated={formatDate(page.meta.reviewed || page.modified) || site.legalLastUpdated} />`);
  return s;
});
console.log("ok");
