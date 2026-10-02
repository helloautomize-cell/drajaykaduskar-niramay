/**
 * 301 redirects from resources/docs/niramay-current-website-audit.md §5.
 * Old WordPress URLs -> new IA. /offer/* items map to the matching service
 * page; lorem/demo leftovers go to /services/ or /.
 *
 * Shared table consumed by next.config redirects().
 */
export const offerRedirects: Record<string, string> = {
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

export const pageRedirects: [string, string][] = [
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

/**
 * Note: with trailingSlash: true the framework normalizes a slash-less hit
 * before config redirects run, so e.g. /offer/45 (no slash) is a two-hop
 * chain (/offer/45 -> /offer/45/ -> /services/). Every destination below is
 * already the canonical trailing-slash URL, so slashed old URLs are one hop.
 */
