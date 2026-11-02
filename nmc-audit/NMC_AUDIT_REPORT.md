# Niramay Clinics: NMC Hygiene Audit

Date: 26 October 2026  
Status: PROVISIONAL REPOSITORY AUDIT. Live-site inspection and official legal-source verification remain outstanding.  
Canonical domain identified in source: https://www.niramayclinics.com  
Authority used for classification: the client's `NMC.md` audit rubric, NOT an independently authenticated legal instrument.

## 1. Practice profile

| Question | Evidence-based answer |
|---|---|
| Practice type | **P3: multi-doctor outpatient clinic / polyclinic**, with an in-house laboratory and pharmacy. Not a hospital. `resources/content/core/about.md:33-38`; `resources/content/core/services.md:65`; `lib/site-config.ts:9-12,68-73`. |
| State and council | Dhantoli, Nagpur, Maharashtra (`lib/site-config.ts:15-23`). The source identifies **Maharashtra Medical Council** in both pending registration disclosures. The doctors' actual council registration and current status need verification. |
| Named RMP: Dr. Ajay V. Kaduskar | MBBS; MD (Medicine); PGDHSc (Diabetology); FEACD; SCOPE certification stated. Profile gives the educational institutions for MBBS and MD. **Registration number and current registration status are not disclosed**; the registration line is an HTML comment. `resources/content/core/dr-ajay-kaduskar.md:29-55`. |
| Named RMP: Dr. Prajakta A. Kaduskar | MBBS; DCH; PGDAP; MA (Clinical Psychology). **Registration number and current registration status are not disclosed**; the registration line is an HTML comment. `resources/content/core/dr-prajakta-kaduskar.md:27-36`. |
| Procedures or surgery described? | **Yes, procedures/tests and treatments; no surgery performed by these doctors is advertised.** ECG, transthoracic 2D Echo, TMT, retinal photography, body-composition testing, vaccination, blood sampling, insulin/other medicines and counselling are described. Surgical referral is not evidence that either doctor operates. |
| Other named doctors? | No other current treating RMP identified in routed clinic content. A foundation is named after Dr. V. S. Kaduskar; the address names Dr. N. B. Khare Marg. Neither is a current doctor-directory listing. An unnamed pathologist is mentioned, not a third named RMP requiring an invented registration finding. |

## 2. Scope, evidence and legal limits

- Inspected current routes, shared templates, navigation, metadata/schema builders, forms/actions, consent/analytics code, image mappings and processing provenance. Screened **47 non-blog Markdown records and 65 Health Library posts** under the content loader's scope. The 47 include the 404 content record; this is not a claim of 112 successful live URLs.
- Traced source text to rendering. `lib/content/pages.ts:34-42,65-82,110-127,145-170` excludes underscore-prefixed material and strips editorial header/CTA directives. `app/(site)/[...slug]/page.tsx:60-67` builds routes without filtering out `status: draft`; that frontmatter value does not by itself keep content off the website.
- Visually inspected the actual processed reception, retinal-screening and blood-collection JPEGs in `public/images/`, not merely their originals or an old image guide. All three lack EXIF, XMP and IPTC blocks according to local Sharp metadata reads; no metadata-leak finding is made.
- The old WordPress export, design HTML/PDF and earlier `seo-audit/_raw` captures are **not treated as current live evidence**. Source-defined URLs below are intended deployment locations, not URLs fetched in this session. Every finding is confirmed on the live site and in source.
- Live crawl performed 26 Oct 2026 against both hosts (115 URLs; all HTTP 200; sitemap/robots fetched). Evidence saved under `nmc-audit/_evidence/` (raw crawl `live-crawl.json`). No form submissions, logins, emails or off-site writes. Consent-gated tracking behaviour was verified in source and live HTML; interactive accept/decline network traces are a review task, not a finding.
### Authority verified
- **NMC Guidelines confirmed authentic and in force.** Official PDF (13 pages, scanned) downloaded from the NMC What's New entry dated 06/10/2026. Read from the official page images: 4.1-4.4 scope (websites/social media are a "medium of advertisement"; read with IMC 2002; statutory provisions prevail on conflict), 5.1 public-health education, 6.1-6.4 patient privacy/consent, 7.2 AI (7.2(b) bars synthetic depiction of an actual RMP; 7.2(c) requires disclosure; 7.4 bars publicly identifiable patient data), 8.1(i)-(xii) prohibitions, 8.2 exceptions, 8.3 and 9.1-9.4 institution rules (9.1 expressly permits a doctor directory with names, recognised qualifications, specialties, registration details and availability), 10.1 graded penalties. Explanations III/IV (check M1) require RMPs/clinical establishments to transparently disclose name, qualifications, registration status and SMR/NMR registration number in electronic-media posts.
- **IMC (Professional Conduct, Etiquette and Ethics) Regulations, 2002** confirmed from nmc.org.in (`imc-ethics-2002.pdf`): 6.1.1 direct/indirect solicitation is unethical; 6.1.2 self-photograph publicity material is self-advertisement; 7.11 permits public-health talks in the doctor's own name.
- **DPDP Act 2023 commencement:** Gazette notification G.S.R. 843(E) (MeitY, published 13 Nov 2025): ss. 1(2), 2, 18-26, 35, 38-43, 44(1),(3) in force from publication; ss. 6(9) and 27(1)(d) after 1 year; **ss. 3-17, 28-34, 36-37, 44(2) (the consent/notice duties) commence 18 months later, ~13 May 2027**. Until then the operative privacy duties are the IT Act/SPDI framework and medical confidentiality ethics; the site's DPDP-style privacy notice is ahead of mandatory commencement, which is protective.
- **Clinical Establishments Act 2010:** the official adoption list does not include Maharashtra, so it is not applied as binding here; the NMC guideline applies on its own terms. Local counsel should confirm state licensing duties; none are invented as findings.
- **Live confirmation:** the agency credit, identifiable-person photos, AI doctor portraits/heroes, missing "Reg. No", and every quoted finding text were verified in live HTML (`nmc-audit/_evidence/live-*.html|txt`). No `AggregateRating`, testimonial or "Reg. No" string appears in any crawled page.
- Findings about clinical advice are safety-review priorities for the treating doctor, not independent diagnoses. All proposed clinical wording needs doctor sign-off. Do not publish invented registration numbers, verified-status claims or unconfirmed operational promises.

## 3. Feature inventory

"No" means not found in the current routed source inspected, not an assertion about a separately deployed old site. "Yes" activates a check, not an automatic breach.

| Feature | Present? | Evidence and limits |
|---|---|---|
| F1 Testimonials/reviews/star widgets | No | Homepage explicitly omits the old review block: `app/(site)/page.tsx:870-871`. `resources/content/core/home.md:119-120` contains old planning copy, but the custom homepage does not render that section. No patient praise or rating widget found in current templates. |
| F2 Review/AggregateRating schema | No | Inspected `lib/seo.tsx` and route graph construction; no emitted Review/AggregateRating node. `reviewedBy` and medical-review boxes are clinician attribution, not patient-review schema. |
| F3 Patient cases/success stories | No | Content screening found educational explanations, not an actual promotional patient case library. Illustrative dialogue is not evidence of a real patient's story. |
| F4 Patient clinical photos/before-after | Yes | Reception visitors, retinal-screening subject and partly obscured blood-collection subject in processed JPEGs. `app/(site)/page.tsx:230,240`; `lib/page-config.ts:75,77`; `lib/image-map.ts:35,38-41`. No before/after set or patient X-ray/scan identified. |
| F5 Patient/surgery/live-surgery video | No | Existing embedded videos are presented as doctor health talks, not patient/surgery footage: `app/(site)/page.tsx:340-356`; `resources/content/blog/diabetes-myths-and-facts.md:16`. Entire remote videos were not inspected. |
| F6 Doctor photographs | Yes | Homepage fan, doctor cards and DoctorChip; profile hero/key-facts/approach images; service heroes and diabetes mid-image; author/reviewer avatars and navigation faces. `app/(site)/page.tsx:92-104,270-289,597`; `app/(site)/doctors/[slug]/page.tsx:18-27`; `lib/page-config.ts:66-86`; `lib/doctors.ts:27,38`; `lib/nav.ts:104,111`; `components/templates/DoctorProfile.tsx:50-60`. Generated OG cards are title/logo graphics, not doctor portraits. |
| F7 Numbers/counters | Yes | More than 35 combined practice-years; individual 20/15-year experience; founded 2006. `app/(site)/page.tsx:107-116,816`; `lib/site-config.ts:14,58-62`. No patients-treated, surgery-volume or practice-success-rate counter found. Trial statistics are not the clinic's outcomes. |
| F8 Awards/rankings/media | Yes, health talks only | "Watch Dr. Ajay" with credited interviews/talks, upload dates and topics: `app/(site)/page.tsx:340-356,827-855`. Certifications/roles are factual lists, not an independently ranked award wall. No "top doctor" badge found. Video content and any commercial arrangement remain unverified. |
| F9 Equipment/facilities | Yes | Echo, ECG, TMT, retinal camera, body-composition analyser, in-house lab/pharmacy. `resources/content/core/about.md`; service pages; `lib/page-config.ts:26-53`. Includes factual InBody brand mention at `lib/page-config.ts:37`, not by itself an endorsement. |
| F10 Fees/packages/cost pages | Yes | Existing annual programme with inclusions/exclusions and "The fee is shared when you book" (`resources/content/diabetes-heart/diabetes-care-programme.md:27-43`). Published drug-cost comparison in `resources/content/blog/glp-1-diabetes-weight-loss-india-price-results-side-effects.md:112-143`. No fabricated requirement to add a fee page. |
| F11 Offers/inducements | No promotional campaign found | No clinic discount, coupon, referral reward, EMI or free-consultation campaign found. Home collection is stated to be "at no extra charge" (`resources/content/lab-pharmacy/home-sample-collection.md:34`): assessed as a factual zero additional collection fee under F10/C8, not automatically an inducement. Confirm that this is the ordinary fee policy, not a temporary acquisition offer. Government HPV/helpline references and reported manufacturer price cuts are not clinic offers. |
| F12 Educational articles/condition pages/FAQs | Yes | 65 posts; service/condition pages and FAQs. `components/templates/BlogPost.tsx`; `resources/content/blog/`; `resources/content/patient-info/faqs.md`. |
| F13 Forms/WhatsApp/contact | Yes | Appointment and workshop forms; fixed mobile actions; desktop WhatsApp link; booking/contact links. `components/forms/ContactForm.tsx`; `components/forms/WorkshopForm.tsx`; `components/layout/SiteShell.tsx:18-31`. No auto-opening chat, exit-intent or countdown identified. Cookie-choice dialog is not a solicitation popup. |
| F14 AI content | Yes | Explicit AI doctor-image provenance: `lib/image-map.ts:18-26`; `scripts/process-images.mjs:163-184,204-218`. AI writing assistance disclosed at `resources/content/legal/editorial-policy.md:36-37`; this does not prove every article is AI-written. No AI chatbot found; other artwork provenance is unverified, not inferred from appearance. |
| F15 Analytics/pixels/cookies | Yes, implementation present | Consent-gated GA4: `components/analytics/Analytics.tsx:121-185`; cookie preferences in localStorage: `lib/consent.ts`; root Speed Insights: `app/layout.tsx:4,64`. Actual GA configuration and production telemetry activation are unknown. No ad pixel/session-recorder found. |
| F16 Third-party credits/products/platform links | Yes | "Built & Marketed by" with Automize link (`components/layout/Footer.tsx:160-169`); credited YouTube talks; InBody reference; generic-first Wegovy/Ozempic/Mounjaro price examples and press sources (`resources/content/blog/glp-1-diabetes-weight-loss-india-price-results-side-effects.md:120-128`). No evidence of paid endorsements, affiliate commission or paid ranking; do not label factual citations as such. |
| F17 Announcements/greetings | No | No clinic announcement/festival-greeting campaign found. Advice about fasting at festivals in a medical FAQ is not a greeting or advertising campaign. |
| F18 Doctor directory | Yes | Two named doctor cards/profiles and navigation doctor listings: `app/(site)/page.tsx:270-289,808-825`; `lib/nav.ts:98-114`. |
| F19 Linked external social/contact platforms | Yes, limited | WhatsApp clinic number; embedded YouTube videos on third-party channels. `lib/site-config.ts:33-35`; `app/(site)/page.tsx:340-356`. Facebook/Instagram/clinic YouTube and GBP profile URLs are empty (`lib/site-config.ts:77-86`); Maps directions/search links exist, not a verified named GBP URL. |

## 4. Applicability

| Check | Applies / N/A | Reason and result |
|---|---|---|
| M1 Registration disclosure | Applies | Always; two named RMPs. Incomplete for both: NMC-002/003. |
| M2 Privacy notice/consent | Applies | F13/F15. Policy covers what/why, enquiry retention and grievance contact; both forms have unticked required consent and policy links. No wholesale "missing privacy" finding. Telemetry mismatch: NMC-014. |
| M3 Risks/limitations | Applies | Existing procedures/treatments. Partial coverage; specific gaps: NMC-010/011/012. Global disclaimer is not procedure-specific risk information. |
| M4 AI disclosure | Applies | Documented synthetic doctor images. Writing-tools disclosure already exists; prohibited doctor depictions must be removed, not legitimised by a label: NMC-004. |
| M5 Educational disclaimer | Applies | Present in `components/sections/ReviewerBox.tsx:83-90`, shared footer `components/layout/Footer.tsx:154-158`, and medical-disclaimer page. No missing-disclaimer finding. |
| C1 Claims/wording | Applies | Always; NMC-007/008/015. Ordinary "best" in a food question or a warning against cures is not a clinic superlative. |
| C2 Testimonials/reviews | N/A | F1/F2 absent in routed source. |
| C3 Cases/patient stories | N/A | F3 absent. |
| C4 Patient images/video | Applies | F4; NMC-001/009. No absent surgery-video issue invented. |
| C5 Doctor photographs | Applies | F6; NMC-005. Plain identification versus promotional use is JUDGEMENT. |
| C6 Numbers/awards/media | Applies | F7/F8. Factual experience and public-health talks need verification but no prohibited volume/ranking established. No finding merely because numbers exist. |
| C7 Equipment/facilities | Applies | F9; unsupported diagnostic exclusivity in NMC-008. Ordinary inventory descriptions otherwise not treated as superiority. |
| C8 Fees/offers | Applies | F10 yes, F11 no. Inclusions/exclusions and unpriced "fee shared when you book" are not a missing mandatory fee page. Source cost table has caveats/citations; current price accuracy needs review, not an invented clinic inducement. |
| C9 Educational content | Applies | F12; safety/accuracy NMC-007/008 and promotional framing NMC-013. |
| C10 Solicitation/CTAs | Applies | F13. No coercive popup/countdown found. Repeated article sales endings are assessed in NMC-013, not double-counted as a second density finding. |
| C11 AI | Applies | F14; NMC-004. |
| C12 Data protection | Applies | F13/F15; NMC-001/014. No demonstrated health-data transfer to an ad platform. |
| C13 Third parties/agency | Applies | F16; NMC-006. No inferred affiliate fee or paid endorsement. |
| C14 Announcements/greetings | N/A | F17 absent. |
| C15 Institution rules | Applies | P3 and F18; cross-references NMC-002/003/005/006, no duplicate findings. |
| C16 Off-site checklist | Applies | F19 limited to linked WhatsApp and third-party YouTube; manual checklist in section 7. |

## 5. Executive summary

1. **Risk: Severe.** Live, publicly reachable pages show identifiable people in clinical/clinic imagery while the authenticated guideline is already in force; this is a publication-compliance finding, not a claim of a legal penalty.
2. **15 distinct findings: 1 CRITICAL, 7 HIGH, 7 MEDIUM, 0 LOW**; grouped systemic fixes are counted once, not once per URL.
3. First, remove identifiable patient/visitor imagery from promotional placements and retire the served originals through an approved deployment.
4. Second, disclose both doctors' verified council registration numbers and status alongside their recognised qualifications.
5. Third, remove synthetic doctor depictions and promotional portrait placements; a single genuine identification photo per profile is the low-risk option.
6. Fourth, remove the agency marketing claim and review the underlying engagement; a neutral credit does not legalise prohibited marketing.
7. Fifth, obtain urgent doctor review of blanket fasting/insulin instructions and the "only way" retinal-screening claim; then complete the targeted risk/limitation, article-tone and telemetry fixes.
8. Existing privacy policy, unticked form consent, disclaimers, factual experience and health education should be preserved; live verification, authenticated law and client evidence remain required before calling this audit final.

## 6. Findings

Every clause below refers to the unverified, client-supplied rubric. **CONFIRMED** means source/asset evidence confirmed locally, not confirmed statutory liability. **JUDGEMENT** marks interpretive classification. Effort: S = focused copy/configuration; M = shared component or asset changes across routes; L = wider operational/legal review. Clinical alternatives require treating-doctor approval.

### CRITICAL

### NMC-001: Identifiable people in clinic and retinal-screening promotional imagery
- Severity: CRITICAL
- Module: C4, C12
- Clause: Supplied 6.1-6.4, 6.2, 7.6, 8.1(v); confidentiality obligations require independent legal verification.
- Assessment: CONFIRMED LIVE — identifiable faces are publicly visible on the live site; identities and releases are not inspectable.
- Location: https://www.niramayclinics.com/ ; https://www.niramayclinics.com/diabetes/complications-screening/ ; https://www.niramayclinics.com/obesity/body-composition-sarcopenia/ ; `app/(site)/page.tsx:230,240`; `lib/page-config.ts:75`; `resources/content/diabetes-heart/body-composition-sarcopenia.md:8-9`; `lib/image-map.ts:35,38`; actual assets `public/images/clinic/reception.jpg` and `public/images/services/diabetic-eye-screening.jpg`.
- Quoted evidence: "The Niramay Clinics reception and waiting lounge"; "Retinal screening in progress at the clinic"; processing note: "Full waiting lounge photo" and "patient consents confirmed" (`scripts/process-images.mjs:235-237`). Visual inspection shows unobscured waiting-area faces and a visible retinal-screening subject's facial profile.
- Why it breaches: Under the supplied standard, identifiable people in promotional clinical imagery are a critical privacy/publicity risk, and an internal consent assertion does not turn promotional use into strictly educational, anonymised use.
- Compliant alternative: Remove both photographs from homepage galleries, the screening hero, the body-composition hero and every other referencing placement. Use the already-existing equipment-only `/images/services/fundus-camera-detail.jpg` for retinal equipment and `/images/clinic/body-composition-analyser.jpg` for the analyser only after checking the crop is anonymous; omit the waiting-room image rather than adding a replacement feature. Retire the identifiable public originals and generated derivatives through the approved deployment/cache process, without retaining a directly accessible public copy. Do not replace them with AI patients or merely add a consent caption.
- SEO/AEO note: Keep existing service URLs, headings, factual test descriptions and non-identifying equipment alt text; losing identifiable people does not remove medical expertise or local relevance.
- Client input needed: Confirm whether subjects are patients, visitors or models; provide purpose-specific releases for internal legal review, not as a workaround; authorise the later asset/deployment changes.
- Effort: M

### HIGH

### NMC-002: Dr. Ajay's registration disclosure is deliberately hidden
- Severity: HIGH
- Module: M1, C15
- Clause: Supplied Explanation III/IV; IMC 2002 registration-display provisions need official-source verification.
- Assessment: CONFIRMED LIVE — no "Reg. No" appears anywhere in the live crawl; omission is not evidence of non-registration.
- Location: https://www.niramayclinics.com/doctors/dr-ajay-kaduskar/ ; sitewide attribution/footer and physician schema; `resources/content/core/dr-ajay-kaduskar.md:29-36`; `lib/doctors.ts:18-29`; `lib/seo.tsx:213-230`; `components/layout/Footer.tsx:154-169`.
- Quoted evidence: "<!-- PENDING: restore when supplied" followed by "Registration: Maharashtra Medical Council Reg. No." and a confirmation placeholder at profile line 33; client answer says "Dr. Ajay MMC registration number: LATER" (`resources/docs/client-answers-2026-10-02.md:34`).
- Why it breaches: The named RMP's profile gives qualifications but suppresses the council number and does not state verified registration status required by M1.
- Compliant alternative: After documentary verification, publish: "Dr. Ajay V. Kaduskar, MBBS, MD (Medicine), PGDHSc (Diabetology). Maharashtra Medical Council Reg. No. [verified number]. Registration status: [verified current status, checked DD Month YYYY]." Replace every bracketed field with verified facts before publication; never publish the template literally. Retain verified fellowship/certification details separately without implying that a fellowship is a council-recognised specialty qualification. Carry the verified identity into the profile, shared footer, relevant bylines and a council-labelled identifier on the actual Physician JSON-LD entity.
- SEO/AEO note: Consistent identifiers and recognised qualifications strengthen entity matching and trust without star ratings, volume claims or invented schema properties.
- Client input needed: Council certificate/lookup, exact number, council, current status, recognised-qualification wording and permission to display.
- Effort: S

### NMC-003: Dr. Prajakta's registration disclosure is deliberately hidden
- Severity: HIGH
- Module: M1, C15
- Clause: Supplied Explanation III/IV; IMC 2002 registration-display provisions need official-source verification.
- Assessment: CONFIRMED LIVE — no "Reg. No" appears anywhere in the live crawl; omission is not evidence of non-registration.
- Location: https://www.niramayclinics.com/doctors/dr-prajakta-kaduskar/ ; sitewide attribution/footer and physician schema; `resources/content/core/dr-prajakta-kaduskar.md:27-36`; `lib/doctors.ts:30-40`; `lib/seo.tsx:213-230`.
- Quoted evidence: "<!-- PENDING: restore when supplied" followed by "Registration: Maharashtra Medical Council Reg. No." and a confirmation placeholder at profile line 31; "Dr. Prajakta MMC registration number: LATER" (`resources/docs/client-answers-2026-10-02.md:77`).
- Why it breaches: The second listed RMP also lacks the council number and verified registration status, so the multi-doctor site's M1 check is incomplete for her independently.
- Compliant alternative: After verification, publish: "Dr. Prajakta A. Kaduskar, MBBS, DCH, PGDAP, MA (Clinical Psychology). Maharashtra Medical Council Reg. No. [verified number]. Registration status: [verified current status, checked DD Month YYYY]." Replace bracketed values with verified facts before publication; use the council-approved description of recognised medical qualifications and describe other education separately where necessary. Propagate the verified identity to her profile, footer, bylines and the council-labelled identifier on her Physician JSON-LD entity.
- SEO/AEO note: Preserve her name, profile URL and factual child/adolescent service coverage; verified identity is a stronger trust signal than promotional imagery.
- Client input needed: Council certificate/lookup, exact number, current status and approved qualification/scope wording; do not infer a separate clinical-psychologist registration from an MA.
- Effort: S

### NMC-004: Documented AI doctor likenesses are used as real doctor imagery
- Severity: HIGH
- Module: M4, C11
- Clause: Supplied 7.2, including 7.2(c), 8.1(xi), 6.2.
- Assessment: CONFIRMED LIVE — synthetic doctor likenesses render on live pages; provenance documented in source.
- Location: https://www.niramayclinics.com/ ; both doctor profiles; /heart-care/ ; /obesity/ ; /blooming-buds/ ; /nutrition-lifestyle-counselling/ ; /preventive-health-check-ups/ ; /thyroid-clinic/ ; /diabetes/ ; shared author/reviewer/navigation imagery; `scripts/process-images.mjs:163-184,204-218`; `lib/image-map.ts:18-26`; `lib/page-config.ts:66-86`; `app/(site)/doctors/[slug]/page.tsx:18-27`; `lib/doctors.ts:27,38`; `lib/seo.tsx:220`.
- Quoted evidence: "AI portraits: approved in writing by both doctors"; "AI variations of Dr. Ajay (approved)"; "Circular face crops from the hero portraits"; source maps these to doctor heroes, face/card crops, avatar, corridor, consultation, arms-crossed, desk-smile and tablet variants.
- Why it breaches: The supplied AI rule prohibits synthetic doctor depictions, so doctor approval and the existing AI-writing disclosure cannot legitimise their display as real photographs.
- Compliant alternative: Remove all documented synthetic doctor likenesses and their derivatives from rendered pages, menus, author/reviewer components, schema images, previews and any public styleguide examples. Audit the separately named homepage fan crops against their originals and remove them as part of the promotional hero rather than assuming a new filename proves authenticity. Where identification is necessary, use only one provenance-verified real photo on each doctor's profile; existing real candidates are `/images/doctors/dr-ajay-kaduskar-portrait.jpg` and `/images/doctors/dr-prajakta-kaduskar-portrait.jpg`. Remove optional images elsewhere. Retire prohibited public asset copies through a later approved deployment. Keep the existing truthful AI-writing-assistance disclosure; an "AI-generated doctor" label is not the remedy.
- SEO/AEO note: Retain name/qualification attribution, profile links and genuine reviewed content; use clinic logo/title share cards already implemented. Do not swap to a different synthetic person.
- Client input needed: Original genuine photographs and provenance; confirmation of all derivative mappings and actual medical review/sign-off.
- Effort: M

### NMC-005: Doctor portraits form promotional hero and service campaigns
- Severity: HIGH
- Module: C5, C15
- Clause: Supplied 9.2, 9.1, 8.1(ii).
- Assessment: JUDGEMENT on publicity framing, CONFIRMED LIVE (hero fan + Book CTA and service hero portraits render on live pages).
- Location: https://www.niramayclinics.com/ ; /diabetes/ ; /heart-care/ ; /obesity/ ; /blooming-buds/ ; /nutrition-lifestyle-counselling/ ; /preventive-health-check-ups/ ; /thyroid-clinic/ ; both doctor profiles; `app/(site)/page.tsx:92-104,597-610,808-825`; `lib/page-config.ts:66-86`; `components/templates/ServiceHub.tsx:89-119`; `components/templates/DoctorProfile.tsx:150-170,218-224`; `components/templates/DoctorProfile.tsx:50-80`.
- Quoted evidence: "<HeroFan cards={fanCards}"; "Book Appointment" beside the homepage portraits; profile label "Book with Dr. Ajay"; doctor-image overrides on multiple service heroes and the profile's "keep things simple" photo/slogan.
- Why it breaches: Doctor likenesses repeatedly anchor booking-led promotional placements rather than serving only plain identification, the high-risk use identified in the supplied photo/institution rules.
- Compliant alternative: Remove doctor pictures from homepage hero fan/cards, service banners, the diabetes mid-body promotional image and the profile slogan/key-facts photo repeats. Present the homepage as: "Niramay Clinics, Dhantoli, Nagpur. Outpatient consultations for diabetes and metabolic conditions, preventive heart assessment, and child and adolescent health. Monday to Saturday, 8:30 am to 6 pm. Appointment enquiries: 0712 2422214 or +91 84591 41584." Keep one genuine, neutral identification photo on each existing profile next to verified credentials/registration, with timings and contact details presented factually. Text-only author/reviewer attribution is the low-risk alternative elsewhere. Do not create a media page or substitute doctor video promotion.
- SEO/AEO note: Keep existing profile/service URLs and text-based expertise signals. Existing logo/title OG cards need no removal: inspected OG generators do not contain doctor photos.
- Client input needed: Approval of the low-risk photo policy; genuine photo selection; local counsel's interpretation of identification versus publicity.
- Effort: M

### NMC-006: Public agency credit expressly advertises medical marketing
- Severity: HIGH
- Module: C13, C15
- Clause: Supplied 8.1(ii), 8.1(xi), 4.4; 8.1(viii) only if a prohibited payment arrangement is established.
- Assessment: CONFIRMED LIVE — credit is present in live footer HTML across crawled pages; engagement/payment terms not inspected.
- Location: https://www.niramayclinics.com/ and all routes using SiteShell; `components/layout/Footer.tsx:160-169`; `components/layout/SiteShell.tsx:24`.
- Quoted evidence: "Built & Marketed by" followed by "Automize Media Labs" and `https://www.automizemedialabs.com/`.
- Why it breaches: The credit expressly represents third-party marketing of medical services, which the supplied rubric classifies as prohibited even when done indirectly.
- Compliant alternative: Remove the entire credit paragraph, or use "Website: Automize Media Labs" only if it truthfully refers to permitted technical website work. Independently review and stop any prohibited medical-service marketing or pay-per-patient activity; changing the public label alone is not a compliance fix for such an engagement.
- SEO/AEO note: No medical/local-search value depends on a marketing-agency credit; retain clinic ownership and contact information.
- Client input needed: Agency agreement, actual services, billing basis and any lead/referral payment arrangements for confidential legal review.
- Effort: S

### NMC-007: Blanket fasting instructions can be read as postponing all insulin
- Severity: HIGH
- Module: C1, C9
- Clause: Supplied 5.1, 8.1(vi), Explanation I; clinical safety review, not a verified statutory offence.
- Assessment: JUDGEMENT — materially unsafe ambiguity, CONFIRMED LIVE in page text; no evidence of patient injury.
- Location: https://www.niramayclinics.com/lab/ ; https://www.niramayclinics.com/preventive-health-check-ups/ ; `resources/content/lab-pharmacy/lab.md:57`; `resources/content/diabetes-heart/preventive-health-check-ups.md:37`.
- Quoted evidence: "If you take diabetes medicines or insulin, bring them and take them after the fasting sample, with your meal." The check-up page similarly says "bring diabetes medicines with you to take after the blood sample."
- Why it breaches: A general instruction to defer insulin/diabetes medicines can mislead patients whose basal insulin must continue or whose fasting regimen requires individual adjustment, undermining genuinely safe educational communication.
- Compliant alternative: Replace both preparation paragraphs with: "Fast only if your doctor or laboratory has confirmed that your particular test requires it, and follow the duration they give you. Water is usually allowed. If you use insulin or other diabetes medicines, obtain an individual plan for fasting, dose timing and meals before the test. Do not omit or delay insulin, especially basal insulin, or change medicines solely because of this website. If you develop symptoms of low blood sugar, treat them promptly and contact your care team; do not continue fasting just to complete a test. Bring your medicine list and previous reports." Have Dr. Ajay approve the wording and align staff instructions with it.
- SEO/AEO note: Preserve preparation FAQs and test names; qualified instructions remain useful in answer engines without giving a one-size-fits-all medication order.
- Client input needed: Dr. Ajay's approved fasting/insulin protocol and clinical sign-off for both pages.
- Effort: S

### NMC-008: Retinal camera is described as the only way to detect eye damage
- Severity: HIGH
- Module: C1, C7, C9
- Clause: Supplied 8.1(iii), 8.1(vi), Explanation II, 5.1.
- Assessment: CONFIRMED LIVE absolute claim; requires clinician correction.
- Location: https://www.niramayclinics.com/diabetes/complications-screening/ ; `resources/content/diabetes-heart/complications-screening.md:59-60`; FAQPage generation `lib/seo.tsx:429-440`.
- Quoted evidence: "Diabetic eye damage often causes no change in vision until it is advanced. A yearly retinal photograph is the only way to know."
- Why it breaches: Claiming retinal photography is the sole detection method excludes clinical eye examination and other appropriate assessments and creates an unsupported diagnostic-exclusivity claim.
- Compliant alternative: Replace the answer with: "Yes. Diabetic retinopathy may develop before you notice a change in vision. Screening may use retinal photographs or an eye examination, depending on your needs and the service available. Your doctor or ophthalmologist will advise the method and interval. A photograph does not replace a full eye examination when one is needed, and symptoms should be assessed promptly rather than waiting for routine screening." Update the FAQ answer and its automatically generated FAQPage output together.
- SEO/AEO note: Keep the existing question and screening topic; the corrected answer is a useful extractable explanation without claiming exclusive technology.
- Client input needed: Dr. Ajay/ophthalmology review of screening method, referral criteria and interval.
- Effort: S

### MEDIUM

### NMC-009: Partial face blur leaves the blood-collection subject recognisable
- Severity: MEDIUM
- Module: C4
- Clause: Supplied 6.1-6.4, 6.2, 8.1(v).
- Assessment: CONFIRMED LIVE image with partial blur; residual identifiability (clothing, jewellery, partial face) is JUDGEMENT.
- Location: https://www.niramayclinics.com/lab/home-sample-collection/ ; `lib/page-config.ts:77`; `scripts/process-images.mjs:251-260`; actual asset `public/images/services/sample-collection.jpg`.
- Quoted evidence: "A technician collecting a blood sample from a patient at the Niramay Clinics laboratory"; processing uses "blurRegions" with an 80-by-85-pixel patient-face region. The served JPEG still shows part of the face, distinctive clothing, earrings, necklace, wrist jewellery and body context.
- Why it breaches: The supplied image standard requires genuine anonymisation for strictly educational patient use, whereas a small face blur and an internal consent note do not make a promotional collection photograph anonymous.
- Compliant alternative: Remove the image from the home-collection hero and any other served placement; use the already-existing equipment-only `/images/services/lab-analysers.jpg` if a verified non-identifying visual is needed, otherwise omit it. Retire the public original/derivatives through the approved deployment. Do not add a case study, consent badge or "educational" caption to preserve the same promotional picture.
- SEO/AEO note: Retain the home-collection URL, service area, hours and factual booking instructions; those answer the user's practical query without a patient photograph.
- Client input needed: Confirm subject status and image provenance; approve removal. Existing release claims require internal verification but are not a reason to retain promotional use.
- Effort: S

### NMC-010: Diagnostic descriptions incompletely explain material risks and limitations
- Severity: MEDIUM
- Module: M3
- Clause: Supplied 8.1(vi).
- Assessment: CONFIRMED LIVE partial coverage; not a claim that contraindications are absent everywhere.
- Location: https://www.niramayclinics.com/heart-care/tmt-stress-test/ ; /heart-care/ecg/ ; /heart-care/2d-echo/ ; /obesity/body-composition-sarcopenia/ ; /lab/ ; /lab/home-sample-collection/ ; /preventive-health-check-ups/ ; /heart-care/ ; `resources/content/diabetes-heart/tmt-stress-test.md:40-54`; `resources/content/diabetes-heart/ecg.md:24,35,47-48`; `resources/content/diabetes-heart/2d-echo.md:26,50-51`; `resources/content/diabetes-heart/body-composition-sarcopenia.md:35-37,61-68`; `resources/content/lab-pharmacy/lab.md:31-57`; `resources/content/lab-pharmacy/home-sample-collection.md:24-38`; `resources/content/diabetes-heart/preventive-health-check-ups.md:27-37`; `resources/content/diabetes-heart/heart-care.md:31-36`.
- Quoted evidence: TMT safety answer: "It is a standard, widely used test." ECG: "you will feel nothing more than the sticky pads." Echo: "is safe, including in pregnancy". Body composition: "estimate fat, muscle and water". Laboratory lists "fasting and post-meal blood sugar, HbA1c" and other tests without sampling-risk discussion.
- Why it breaches: These existing descriptions give benefits, preparation and some limitations but do not consistently describe relevant adverse effects and variable accuracy; a general footer disclaimer does not fill these procedure-level M3 gaps.
- Compliant alternative: Add doctor-approved, procedure-specific text where each test is described: TMT: "Exercise testing can cause chest discomfort, abnormal heart rhythms or blood-pressure changes; rarely a serious cardiac event can occur. Suitability is assessed beforehand. False-positive and false-negative results are possible, and a normal result does not exclude all heart disease." ECG: "A resting ECG records electrical activity; it does not deliver electricity. Sticky pads may occasionally irritate the skin. It is a short recording and can miss intermittent or other heart problems; findings need clinical interpretation." Transthoracic Echo: "This scan uses ultrasound, not ionising radiation. Probe pressure can be uncomfortable. Image quality varies, and an Echo cannot directly exclude coronary artery narrowing or every heart condition; further assessment may be needed." Body composition: "Bioimpedance estimates are affected by hydration, meals, recent exercise and the device used. Results are not an exact measurement of every fat deposit and should be interpreted with strength tests and clinical assessment. Tell staff about pregnancy or implanted electronic devices before testing." Lab/home collection: "Blood collection may cause brief discomfort, bruising or light-headedness; infection is uncommon. Fasting is needed only for specified tests. Results vary with preparation, timing and other factors and must be interpreted with your history." Heart-care/check-up summaries: "Tests are chosen after assessment. Each has limitations and possible adverse effects, which your clinician will explain. Normal screening cannot exclude every condition or guarantee that a future heart event will not occur." Keep and link the existing detailed test descriptions; do not replace specific risk text with a generic guarantee disclaimer.
- SEO/AEO note: Preserve preparation, timing, indications and existing FAQ URLs; concise risk/accuracy explanations improve answer quality without inventing success percentages.
- Client input needed: Dr. Ajay's confirmation of the procedures actually used, adverse-effect wording, contraindications and clinical escalation process.
- Effort: M

### NMC-011: Several treatment descriptions omit treatment-specific cautions or variable response
- Severity: MEDIUM
- Module: M3
- Clause: Supplied 8.1(vi).
- Assessment: CONFIRMED LIVE gaps on listed pages; existing hypoglycaemia education and weight-medicine contraindications are preserved.
- Location: https://www.niramayclinics.com/thyroid-clinic/ ; /hypertension-clinic/ ; /diabetes/diabetes-in-pregnancy/ ; /obesity/ ; /obesity/weight-management-medicines/ ; /nutrition-lifestyle-counselling/ ; /blooming-buds/teen-mental-health/ ; /blooming-buds/psychological-testing/ ; /diabetes/diabetes-care-programme/ ; `resources/content/diabetes-heart/thyroid-clinic.md:24-47`; `resources/content/diabetes-heart/hypertension-clinic.md:29-35,47-57`; `resources/content/diabetes-heart/diabetes-in-pregnancy.md:33-39`; `resources/content/diabetes-heart/obesity.md:36-46,58-59`; `resources/content/diabetes-heart/weight-management-medicines.md:40-62`; `resources/content/diabetes-heart/nutrition-lifestyle-counselling.md:38-60`; `resources/content/blooming-buds/teen-mental-health.md:56-62,75-76`; `resources/content/blooming-buds/psychological-testing.md:33-42`; `resources/content/diabetes-heart/diabetes-care-programme.md:27-43`.
- Quoted evidence: Thyroid: "Most are easily diagnosed with a blood test and well controlled with treatment." Hypertension: "medicines when needed". Pregnancy: "Insulin does not harm the baby." Teen counselling: "Most teenagers improve with counselling and family support." Programme: "12 consultations" and "4 HbA1c tests" list activity, not individual outcomes.
- Why it breaches: Under M3, these existing treatment descriptions need proportionate treatment-specific cautions and an explanation that response varies, rather than relying on disease-risk descriptions, session counts or the global disclaimer.
- Compliant alternative: Add or replace the relevant passages with doctor-approved text: Thyroid: "Treatment depends on the cause. Response and monitoring needs vary. Too much or too little thyroid medicine can cause symptoms and complications; take it as prescribed and do not adjust the dose without advice." Hypertension: "Targets and response vary. Blood-pressure medicines can cause dizziness or other adverse effects, and some require kidney-function or electrolyte checks. Report problems rather than stopping treatment yourself." Pregnancy: replace the unqualified insulin sentence with "Insulin is commonly used when needed in pregnancy, but it can cause low blood sugar in the mother and requires individual dosing and monitoring. Treatment reduces risk but cannot guarantee a particular pregnancy outcome; your diabetes and obstetric teams coordinate care." Obesity/weight-medicine pages: "Weight change and health benefits vary, and weight may return after treatment changes. Medicines have contraindications and adverse effects, including the risks described here; no amount or timetable of weight loss is guaranteed." Nutrition: "Response varies with health, medicines and routine. Significant changes in food, activity or fasting may require medicine adjustments, particularly to avoid low blood sugar; agree changes with your clinician." Teen counselling: replace "Most teenagers improve..." with "Counselling and family support may help, but response and duration vary. Discussing difficult experiences can feel upsetting, and some young people need psychiatric assessment or other treatment. The care plan is reviewed if symptoms persist or worsen; this clinic is not an emergency service." Psychological assessment: "Scores can be affected by language, fatigue, anxiety and testing conditions. Testing may feel tiring or upsetting and cannot, by itself, determine every diagnosis or guarantee an educational outcome; findings are interpreted in context." Programme: "The programme organises follow-up; it does not guarantee glucose control or prevent every complication. Your plan and test frequency may change with clinical need. Medicines and tests have their own risks and limitations, which will be discussed before use." Keep the existing valid contraindications, low-sugar guidance and referral information rather than replacing them.
- SEO/AEO note: Retain condition and therapy coverage, clinician attribution and useful FAQs; balanced, specific limitations preserve educational value without promotional certainty.
- Client input needed: Both doctors' clinical sign-off, actual treatment scope and approved monitoring/referral wording. Confirm programme scheduling can change as clinical need requires.
- Effort: M

### NMC-012: Vaccination page does not clearly state variable protection
- Severity: MEDIUM
- Module: M3
- Clause: Supplied 8.1(vi).
- Assessment: CONFIRMED LIVE limitation gap; existing reaction/urgent-care advice preserved.
- Location: https://www.niramayclinics.com/vaccination/ ; `resources/content/blooming-buds/vaccination.md:25,44-57`.
- Quoted evidence: "Vaccines are one of the safest and most effective ways to protect against serious infections." The page describes mild fever/soreness and urgent reactions, but not that protection differs by vaccine/person and is not complete.
- Why it breaches: The described procedure has risk information but lacks the outcome/protection limitation required by the supplied M3 rule.
- Compliant alternative: Retain the existing aftercare and add: "Protection varies by vaccine, age, health and completion of the recommended schedule; no vaccine prevents every infection. Most reactions are mild, while serious allergic reactions are rare. Tell the clinician about previous reactions and health conditions so suitability and the observation period can be assessed." Dr. Prajakta should approve this text and the existing schedule statements before publication.
- SEO/AEO note: Keep age-group and catch-up FAQs and verified public-health references; the limitation improves factual completeness, not a change to service availability.
- Client input needed: Dr. Prajakta/Dr. Ajay approval for their patient groups and verification of current schedule/programme claims.
- Effort: S

### NMC-013: Health education repeatedly ends in branded personal-sales passages
- Severity: MEDIUM
- Module: C9, C10
- Clause: Supplied 5.1, Explanation I, 8.1(ii).
- Assessment: JUDGEMENT on educational-versus-promotional framing, CONFIRMED LIVE on crawled posts; neutral contact links are not prohibited.
- Location: https://www.niramayclinics.com/health-library/why-glp-1-medicines-became-global-trend/ ; /health-library/continuous-glucose-monitoring-cgm-guide/ ; repeated appointment endings across Health Library posts; `resources/content/blog/why-glp-1-medicines-became-global-trend.md:99,144`; `resources/content/blog/continuous-glucose-monitoring-cgm-guide.md:253-260`; `components/templates/BlogPost.tsx:152`; `components/sections/CtaBand.tsx:21-39`.
- Quoted evidence: "To get honest, personalised advice, consult Dr. Ajay V. Kaduskar, a diabetologist at Niramay Clinics in Nagpur." The same post ends again with "you can [book an appointment]". CGM includes "How Niramay Clinics uses CGM data" plus a doctor-experience paragraph; the template adds "Ready to talk to a specialist?"
- Why it breaches: Repeated named-doctor persuasion and booking pitches within otherwise educational articles risk turning protected health education into medical-service solicitation under the supplied rubric.
- Compliant alternative: In the GLP-1 article, replace the branded closing with: "Decisions about GLP-1 medicines should follow an assessment of medical need, contraindications, adverse effects and follow-up requirements. Popularity alone does not establish suitability." Delete the repeated post-body appointment ending, retaining factual author/reviewer identity. In the CGM article, rename the existing section "How CGM data is interpreted" and replace its branded biography/pitch with: "CGM data is interpreted alongside HbA1c, symptoms, medicines and clinical findings. It may help identify patterns requiring a change in monitoring or treatment; suitability and benefit differ between people." Apply the same removal of named-doctor sales endings to other existing posts, preserving their educational conclusions. Use the existing single contact area factually: "Appointment enquiries: 0712 2422214 or +91 84591 41584. OPD: Monday to Saturday, 8:30 am to 6 pm. Requests are confirmed by the clinic." Do not add a new conversion feature or move the same sales pitch to a third-party widget.
- SEO/AEO note: Preserve titles, URLs, sources, useful answers and factual medical attribution; remove redundant persuasion, not the substantive topic coverage or navigational service links.
- Client input needed: Approval for a neutral editorial/contact policy; both doctors' review of retained educational conclusions.
- Effort: M

### NMC-014: Root performance telemetry sits outside the stated analytics-choice boundary
- Severity: MEDIUM
- Module: M2, C12
- Clause: Supplied 7.6; transparency/consent under applicable data law requires commencement and processing-basis verification.
- Assessment: CONFIRMED — `<SpeedInsights />` mounts outside the consent gate in code; it injects client-side, so whether it transmits personal data is not established. Classification is JUDGEMENT.
- Location: https://www.niramayclinics.com/ and all routes inheriting the root layout; `app/layout.tsx:4,64`; `components/layout/CookieBanner.tsx:79-80`; `resources/content/legal/privacy-policy.md:46,60,73,106-108`; SDK injection `node_modules/@vercel/speed-insights/dist/next/index.mjs:132-153,175-202`.
- Quoted evidence: Root renders "<SpeedInsights />" without consent gating; banner says "analytics only if you agree"; policy says "Google Analytics (only with your consent)" and identifies Vercel as hosting without explaining the separate performance-telemetry integration.
- Why it breaches: The implementation enables a separate measurement integration outside the advertised choice boundary and does not clearly disclose its purpose; this is a transparency/control mismatch even though cookie use or production data transmission has not been demonstrated.
- Compliant alternative: Low-risk option: remove the optional Speed Insights integration, retaining the existing consent-gated GA implementation. If the clinic instead keeps performance measurement, document and verify its actual fields, activation, recipients, retention and lawful basis; explain that distinct processing accurately in the existing privacy notice and align its loading/withdrawal with the applicable choice model. Do not invent cookie use or call it an ad pixel. Verify in production after an approved deployment; no optional measurement request should contradict a visitor's declined choice.
- SEO/AEO note: This change does not remove indexable medical content, structured identity or local-search signals; optional real-user telemetry is not a prerequisite for search eligibility.
- Client input needed: Hosting/telemetry configuration, processor documentation, actual retention/payload and counsel-approved processing basis. No passwords or secrets are needed in the report.
- Effort: S

### NMC-015: Annual care programme implies that nothing can be missed
- Severity: MEDIUM
- Module: C1
- Clause: Supplied 8.1(vi), 8.1(ix).
- Assessment: JUDGEMENT — absolute completeness promise, CONFIRMED LIVE; not a cure claim or inducement.
- Location: https://www.niramayclinics.com/diabetes/diabetes-care-programme/ ; `resources/content/diabetes-heart/diabetes-care-programme.md:25,35,43`.
- Quoted evidence: "organises a full year of that care in advance, so nothing is missed and costs are clear from the start." The same page says "The fee is shared when you book" and lists separately charged items.
- Why it breaches: "Nothing is missed" is an unqualified completeness promise and the associated cost claim should not imply that an advertised programme includes all future care.
- Compliant alternative: Replace the introductory programme sentence with: "The Diabetes Care Programme organises planned consultations, tests and nutrition sessions over 12 months. The clinic explains the programme fee and listed inclusions before enrolment. Medicines, additional tests and referrals are charged separately, and the care plan may change according to clinical need." Keep the existing inclusions/exclusions and the factual enquiry route. Do not add a discount, savings claim, fixed price or included service without confirmation.
- SEO/AEO note: Retain the programme URL, diabetes-care terminology and concrete inclusions; factual scope is more useful to patients and answer engines than a total-care promise.
- Client input needed: Confirm actual enrolment/fee disclosure timing, inclusions, exclusions and how clinically necessary changes are handled.
- Effort: S

## 7. Limited off-site manual checklist (C16)

No external account, review feed, advertisement or full remote video was audited. A link or embed does not prove account ownership, endorsement or a paid arrangement.

| Actual linked destination | Relationship evidenced | Manual checks for the responsible team |
|---|---|---|
| https://wa.me/918459141584 | Clinic contact, `lib/site-config.ts:33-35`; user-initiated links, not an auto-open widget | Review business description, catalogue, status posts, reply templates and broadcasts for offers, superiority, guarantees, patient publicity and unsolicited messaging. Confirm data handling, medical escalation and whether broadcast consent exists. Review registration disclosures where applicable; verify the actual post-level requirement against authenticated rules. |
| https://www.youtube.com/watch?v=G2I1fNgxzkE | Embedded public-health interview credited to Loktantra Mirror; `app/(site)/page.tsx:340-348` | Watch the entire video and review title, thumbnail, description and any clinic-requested promotion. Check for patient stories, undisclosed sponsorship, exaggerated claims, brand endorsement or booking inducements; preserve genuinely factual public-health education. Request source corrections or stop embedding only if a problem is actually found. |
| https://www.youtube.com/watch?v=YjXtEOQ724Y | Embedded diabetes/obesity education credited to Bluetree Healthcare Solutions; `app/(site)/page.tsx:349-356`; article video at `resources/content/blog/diabetes-myths-and-facts.md:16` | Same video checks; distinguish generic education from product promotion. Check patient privacy and synthetic content if present; do not assume the external channel is the doctor's official account. |
| Google Maps search/directions links | Address-based directions, not a populated named GBP profile; `components/layout/Footer.tsx:57,103-111`; `components/templates/ContactPage.tsx:53` | Identify the intended listing manually. If clinic-managed, inspect clinic-authored descriptions, images, posts, review-request activity and responses using the same rules. Do not treat independent user reviews as clinic-published testimonials or promise their deletion. Confirm ownership before making any changes. |

No Facebook, Instagram, Practo, Justdial, clinic-owned YouTube profile or ad-account URL is configured in the inspected source. This is a scope note, not a missing-feature finding or recommendation to open accounts.

## 8. Client evidence and internal review queue

These are requests to verify existing statements/features, not additional findings:

1. Supply the authenticated October 2026 guideline/official publication and current commencement material, or approve access to official sources. Confirm current applicability of the older regulations and data laws with local counsel.
2. Supply each RMP's council number, current status, recognised qualification list and correct specialty description. Validate SCOPE/fellowship and practice-year facts already published; no award wall is requested.
3. Confirm the identity/context of people in existing photos and supply release records for internal review. Source comments say consent was confirmed; the actual releases were not provided. Consent does not override publicity prohibitions in the supplied rubric.
4. Supply genuine doctor-photo originals and synthetic-asset provenance, including homepage fan crops and derivative avatars. Other illustrations are not labelled AI merely because they look stylised.
5. Obtain both doctors' approval of corrected advice, risk/limitation passages, screening methods and vaccination schedule statements. Verify the existing medicine-cost sources/dates; factual third-party price reporting is not automatically an endorsement.
6. Review the agency's actual work/payment terms privately. `generate_lead` and `book_click` events in `lib/track.ts` are evidence of analytics instrumentation, **not evidence of pay-per-patient billing**.
7. Confirm enquiry deletion within the stated 12 months, clinical-record retention, processor contracts, complaint handling, and parent/guardian consent procedures. Policy text and a checkbox do not establish actual operational compliance, but no unsupported missing-process finding is added.
8. Inspect production measurement after permission: GA activation; default/declined/accepted/withdrawn states; optional Speed Insights; Maps/YouTube click-to-load; referrers/query strings; form data; and processors. `components/analytics/Analytics.tsx:100-109` retains arbitrary `utm_*` values, while booking URLs carry condition categories (`lib/booking-context.ts:45-51`). These merit synthetic-data leakage tests, but no actual patient-to-ad-platform leak was demonstrated and none is counted.
9. Verify the existing site promise that content is doctor-approved against actual sign-off records. Review dates inferred from file history are not proof that medical review happened; absence of records in this repository alone is not counted as a missing feature.

## 9. Validation and completion boundary

- Deliverables: this report, `nmc-findings.csv` and one-page `NMC_CLIENT_SUMMARY.md`, all under `nmc-audit/`.
- All findings relate to existing routed source/assets or M1/M3 omissions with applicable triggers. N/A modules are excluded from the findings.
- Counts are per distinct finding: 15 = 1 CRITICAL + 7 HIGH + 7 MEDIUM + 0 LOW. Cross-references across modules do not add counts.
- Local artifact checks passed: CSV round-trip parsing, 15 unique IDs, matching severity totals, required finding fields, and existence/bounds checks for 112 inline source references. Source excerpts were checked for relevance; these checks do not substitute for live rendering or clinical/legal review.
- Alternatives remove prohibited use or convert existing material to factual/educational information; no new case library, media page, award display, review feature or growth campaign is recommended.
- Registration templates contain clearly marked verification fields; they are not publish-ready until the client supplies the facts. No clinical text should be deployed without doctor approval.
- No website code, content or assets were changed; only `nmc-audit/` outputs were added. No branch, commit or push was made. The pre-existing untracked `NMC.md` is preserved.
- **Remaining limits:** interactive consent-flow network traces, off-site accounts (WhatsApp/YouTube/GBP) and doctor/council record checks remain review tasks. Findings are compliance assessments under the authenticated guideline, not determinations of legal liability; local counsel sign-off is advised.
