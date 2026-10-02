import type { NextConfig } from "next";

/**
 * 301 redirects from resources/docs/niramay-current-website-audit.md §5.
 * Old WordPress URLs -> new IA. /offer/* items map to the matching service
 * page; lorem/demo leftovers go to /services/ or /.
 */
const offerRedirects: Record<string, string> = {
  "45": "/services/",
  "adolescent-counseling": "/blooming-buds/teen-mental-health/",
  "adult-and-child-immunizations": "/vaccination/",
  "all-necessary-pathology-investigations-under-one-roof": "/lab/",
  "body-composition-analysis": "/obesity/body-composition-sarcopenia/",
  "child-and-adolescent-care": "/blooming-buds/",
  "complete-diabetes-care-package": "/diabetes/diabetes-care-programme/",
  "dentistry-and-prosthetics": "/services/",
  "diabetes-complications-screening": "/diabetes/complications-screening/",
  "diabetes-in-pregnancy-management": "/diabetes/diabetes-in-pregnancy/",
  "eye-care": "/diabetes/complications-screening/",
  "home-sample-collection-with-prior-appointment": "/lab/home-sample-collection/",
  "home-visit-for-sample-collection": "/lab/home-sample-collection/",
  "hypertension-clinic": "/hypertension-clinic/",
  "inhouse-pathology-services": "/lab/",
  "investigating-house-pharmacy": "/pharmacy/",
  "investigating-the-cause-of-obesity": "/obesity/",
  "lifestyle-modification-advice-2": "/nutrition-lifestyle-counselling/",
  "lifestyle-modification-advice": "/nutrition-lifestyle-counselling/",
  "mental-health-services-for-adolescents": "/blooming-buds/teen-mental-health/",
  "nutrition-support": "/nutrition-lifestyle-counselling/",
  "nutritional-advice": "/nutrition-lifestyle-counselling/",
  "nutritional-counseling": "/nutrition-lifestyle-counselling/",
  "parcel-facility-for-outstation-patients": "/pharmacy/",
  "pharmacotherapy-for-obesity-management": "/obesity/weight-management-medicines/",
  "pharmacy-services": "/pharmacy/",
  "physical-health-services-for-adolescents": "/blooming-buds/adolescent-health/",
  "quick-turnaround-time": "/lab/",
  "sarcopenia-assessment": "/obesity/body-composition-sarcopenia/",
  "surgical-operations": "/services/",
  "type-1-diabetes-management": "/diabetes/type-1-diabetes/",
  "type-2-diabetes-management": "/diabetes/type-2-diabetes/",
  "well-baby-clinic": "/blooming-buds/well-baby-clinic/",
  "workshops-for-teachers-parents-and-students": "/blooming-buds/workshops/",
};

const pageRedirects: [string, string][] = [
  ["/diabetes-care-services/", "/diabetes/"],
  ["/obesity-care-service/", "/obesity/"],
  ["/adolescent-health-care-services/", "/blooming-buds/"],
  ["/pathology-pharmacy-services-2/", "/lab/"],
  ["/pathology-pharmacy-services/", "/lab/"],
  ["/blogs/", "/health-library/"],
  ["/specialists/", "/about/"],
  ["/test/", "/"],
  ["/feed/", "/health-library/"],
  ["/comments/feed/", "/health-library/"],
  ["/category/niramay-clinic/", "/health-library/"],
  // old blog slugs
  ["/smart-love/", "/health-library/smart-love-parenting-teenagers/"],
  ["/developing-self-esteem-in-adolescents-with-disability/", "/health-library/self-esteem-teenagers-with-disabilities/"],
  ["/preparing-yourself/", "/health-library/preparing-child-for-adolescence/"],
  ["/menstrual-hygiene/", "/health-library/menstrual-hygiene-teenage-girls/"],
  ["/10-common-misconceptions-about-diabetes-separating-myths-from-facts/", "/health-library/diabetes-myths-and-facts/"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...pageRedirects.map(([source, destination]) => ({
        source: source.replace(/\/$/, ""),
        destination,
        permanent: true,
      })),
      ...Object.entries(offerRedirects).map(([slug, destination]) => ({
        source: `/offer/${slug}`,
        destination,
        permanent: true,
      })),
      // about-page photo slider items -> About
      { source: "/slide/:slug", destination: "/about/", permanent: true },
      // BeTheme builder template leftovers should not be public
      { source: "/template-item/:slug", destination: "/", permanent: true },
      // safety net for any unlisted /offer/ slug
      { source: "/offer/:slug", destination: "/services/", permanent: true },
      // old stub thank-you path -> /thank-you/?type=
      { source: "/contact/thank-you", destination: "/thank-you/", permanent: false },
      // removed Videos page (Phase 6, item 30)
      { source: "/videos", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
