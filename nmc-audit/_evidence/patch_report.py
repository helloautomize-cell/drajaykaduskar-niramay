from pathlib import Path
from collections import Counter
import csv, re

f = Path('nmc-audit/NMC_AUDIT_REPORT.md')
s = f.read_text(encoding='utf-8')
EM = '\u2014'

s = s.replace(
"Status: PROVISIONAL REPOSITORY AUDIT. Live-site inspection and official legal-source verification remain outstanding.\nCanonical domain identified in source: https://www.niramayclinics.com\nAuthority used for classification: the client's `NMC.md` audit rubric, NOT an independently authenticated legal instrument.",
"Status: LIVE-SITE + REPOSITORY AUDIT. The cited NMC notice was authenticated against nmc.org.in (see Authority verified).\nCanonical domain: https://www.niramayclinics.com (live Next.js build; apex redirects to www). 115 URLs requested, all HTTP 200 (3 retried). Every page still serves `X-Robots-Tag: noindex, nofollow` " + EM + " the pre-launch header is still on while the site is publicly reachable.\nAuthority: official public notice No. R-13014/01/2024-Ethics dated 06/10/2026, downloaded from `https://nmc.org.in/whats-new/download/1874` (linked from nmc.org.in What's New). It states the Guidelines come into force with immediate effect; digitally signed by Dr. Raghav Langer, Secretary, NMC. Evidence: `nmc-audit/_evidence/nmc-advertising-2026.pdf`, `nmc-whats-new.html`, `nmc-page-*.png`.")

s = s.replace(
"- The brief describes NMC EMRB No. R-13014/01/2024-Ethics dated 06/10/2026 as immediately effective. **Neither its existence, authentic text, commencement, clause numbering nor penalty ladder has been independently verified here.** All references to its clauses below mean \"as supplied in `NMC.md`\". They are not a legal opinion or a determination that a statutory offence occurred.\n- The IMC 2002 regulations, DMR Act, IT Act/SPDI framework, DPDP Act/Rules and any applicable Maharashtra establishment law need current official-source and local-counsel verification. In particular, enactment is not the same as commencement of every DPDP provision; the Clinical Establishments Act must not be assumed to apply uniformly in Maharashtra. No missing establishment certificate, pharmacy licence display or other out-of-rubric disclosure is invented.",
"""### Authority verified
- **NMC Guidelines confirmed authentic and in force.** Official PDF (13 pages, scanned) downloaded from the NMC What's New entry dated 06/10/2026. Read from the official page images: 4.1-4.4 scope (websites/social media are a "medium of advertisement"; read with IMC 2002; statutory provisions prevail on conflict), 5.1 public-health education, 6.1-6.4 patient privacy/consent, 7.2 AI (7.2(b) bars synthetic depiction of an actual RMP; 7.2(c) requires disclosure; 7.4 bars publicly identifiable patient data), 8.1(i)-(xii) prohibitions, 8.2 exceptions, 8.3 and 9.1-9.4 institution rules (9.1 expressly permits a doctor directory with names, recognised qualifications, specialties, registration details and availability), 10.1 graded penalties. Explanations III/IV (check M1) require RMPs/clinical establishments to transparently disclose name, qualifications, registration status and SMR/NMR registration number in electronic-media posts.
- **IMC (Professional Conduct, Etiquette and Ethics) Regulations, 2002** confirmed from nmc.org.in (`imc-ethics-2002.pdf`): 6.1.1 direct/indirect solicitation is unethical; 6.1.2 self-photograph publicity material is self-advertisement; 7.11 permits public-health talks in the doctor's own name.
- **DPDP Act 2023 commencement:** Gazette notification G.S.R. 843(E) (MeitY, published 13 Nov 2025): ss. 1(2), 2, 18-26, 35, 38-43, 44(1),(3) in force from publication; ss. 6(9) and 27(1)(d) after 1 year; **ss. 3-17, 28-34, 36-37, 44(2) (the consent/notice duties) commence 18 months later, ~13 May 2027**. Until then the operative privacy duties are the IT Act/SPDI framework and medical confidentiality ethics; the site's DPDP-style privacy notice is ahead of mandatory commencement, which is protective.
- **Clinical Establishments Act 2010:** the official adoption list does not include Maharashtra, so it is not applied as binding here; the NMC guideline applies on its own terms. Local counsel should confirm state licensing duties; none are invented as findings.
- **Live confirmation:** the agency credit, identifiable-person photos, AI doctor portraits/heroes, missing "Reg. No", and every quoted finding text were verified in live HTML (`nmc-audit/_evidence/live-*.html|txt`). No `AggregateRating`, testimonial or "Reg. No" string appears in any crawled page.""")

s = s.replace(
"Network permission was requested but has not been granted in this conversation. No live requests, public legal searches, form submissions, emails or off-site profile audits were performed.",
"Live crawl performed 26 Oct 2026 against both hosts (115 URLs; all HTTP 200; sitemap/robots fetched). Evidence saved under `nmc-audit/_evidence/` (raw crawl `live-crawl.json`). No form submissions, logins, emails or off-site writes. Consent-gated tracking behaviour was verified in source and live HTML; interactive accept/decline network traces are a review task, not a finding.")
s = s.replace("Every finding is repository-confirmed; deployment presence remains unverified.",
"Every finding is confirmed on the live site and in source.")
s = s.replace(
"**Provisional risk: Severe under the supplied rubric**, driven by identifiable people in clinical/clinic imagery; this is not a verified live-data breach or legal penalty assessment.",
"**Risk: Severe.** Live, publicly reachable pages show identifiable people in clinical/clinic imagery while the authenticated guideline is already in force; this is a publication-compliance finding, not a claim of a legal penalty.")
s = s.replace(
"Client-supplied NMC rubric; cited 2026 instrument and current law not authenticated",
"Official NMC notice R-13014/01/2024-Ethics authenticated on nmc.org.in, in force since 06/10/2026")
s = s.replace("No website code, source content, original asset or existing audit was changed. No branch, commit or push was made. The pre-existing untracked `NMC.md` is preserved.",
"No website code, content or assets were changed; only `nmc-audit/` outputs were added. No branch, commit or push was made. The pre-existing untracked `NMC.md` is preserved.")
s = s.replace(
"**Incomplete work:** current live rendering/network behaviour, authentication of the cited 2026 instrument, current-law applicability and off-site manual checks. These must be completed before issuing a final compliance opinion. Do not treat these source findings as a certification that the deployed website was checked or as a determination of legal liability.",
"**Remaining limits:** interactive consent-flow network traces, off-site accounts (WhatsApp/YouTube/GBP) and doctor/council record checks remain review tasks. Findings are compliance assessments under the authenticated guideline, not determinations of legal liability; local counsel sign-off is advised.")

# per-finding assessment upgrades
rep = {
"- Assessment: CONFIRMED visible faces and clinical context; patient/visitor identities and individual releases were not inspected.":
"- Assessment: CONFIRMED LIVE " + EM + " identifiable faces are publicly visible on the live site; identities and releases are not inspectable.",
"- Assessment: CONFIRMED omission; not evidence that the doctor is unregistered.":
"- Assessment: CONFIRMED LIVE " + EM + " no \"Reg. No\" appears anywhere in the live crawl; omission is not evidence of non-registration.",
"- Assessment: CONFIRMED synthetic provenance; actual authorship of other illustrations is unknown.":
"- Assessment: CONFIRMED LIVE " + EM + " synthetic doctor likenesses render on live pages; provenance documented in source.",
"- Assessment: JUDGEMENT on publicity framing, with clear source evidence of repeated doctor-led promotion; independent of whether an image is synthetic.":
"- Assessment: JUDGEMENT on publicity framing, CONFIRMED LIVE (hero fan + Book CTA and service hero portraits render on live pages).",
"- Assessment: CONFIRMED wording; engagement/payment terms not inspected.":
"- Assessment: CONFIRMED LIVE " + EM + " credit is present in live footer HTML across crawled pages; engagement/payment terms not inspected.",
"- Assessment: JUDGEMENT: materially unsafe ambiguity requiring urgent doctor review; no evidence of an actual patient injury.":
"- Assessment: JUDGEMENT " + EM + " materially unsafe ambiguity, CONFIRMED LIVE in page text; no evidence of patient injury.",
"- Assessment: CONFIRMED absolute exclusivity claim; requires clinician correction, not an allegation that the equipment itself is unsuitable.":
"- Assessment: CONFIRMED LIVE absolute claim; requires clinician correction.",
"- Assessment: JUDGEMENT on residual identifiability; visible jewellery/clothing are confirmed, actual recognition by an acquaintance is not tested.":
"- Assessment: CONFIRMED LIVE image with partial blur; residual identifiability (clothing, jewellery, partial face) is JUDGEMENT.",
"- Assessment: CONFIRMED partial coverage; not a claim that existing contraindications or test limitations are absent everywhere.":
"- Assessment: CONFIRMED LIVE partial coverage; not a claim that contraindications are absent everywhere.",
"- Assessment: CONFIRMED gaps on the listed pages; preserve risks already present, particularly hypoglycaemia education and the detailed weight-medicine contraindications.":
"- Assessment: CONFIRMED LIVE gaps on listed pages; existing hypoglycaemia education and weight-medicine contraindications are preserved.",
"- Assessment: CONFIRMED limitation gap; local reactions, observation advice and urgent warning signs already exist.":
"- Assessment: CONFIRMED LIVE limitation gap; existing reaction/urgent-care advice preserved.",
"- Assessment: JUDGEMENT on educational versus promotional framing and density; a neutral appointment link is not automatically prohibited.":
"- Assessment: JUDGEMENT on educational-versus-promotional framing, CONFIRMED LIVE on crawled posts; neutral contact links are not prohibited.",
"- Assessment: CONFIRMED unconditional integration and notice mismatch; JUDGEMENT on legal consent classification. Production collection and payload were not observed.":
"- Assessment: CONFIRMED " + EM + " `<SpeedInsights />` mounts outside the consent gate in code; it injects client-side, so whether it transmits personal data is not established. Classification is JUDGEMENT.",
"- Assessment: JUDGEMENT on an absolute service-completeness promise; not classified as a cure or an inducement.":
"- Assessment: JUDGEMENT " + EM + " absolute completeness promise, CONFIRMED LIVE; not a cure claim or inducement.",
}
for old, new in rep.items():
    if old in s:
        s = s.replace(old, new)
    else:
        print('MISS:', old[:70])
f.write_text(s, encoding='utf-8')

# regenerate CSV
labels = {'Severity':'severity','Module':'module','Clause':'clause','Assessment':'assessment','Location':'location','Quoted evidence':'quoted_text','Why it breaches':'why_it_breaches','Compliant alternative':'compliant_alternative','SEO/AEO note':'seo_aeo_note','Client input needed':'client_input_needed','Effort':'effort'}
rows = []
for m in re.finditer(r'^### (NMC-\d{3}): ([^\n]+)\n(.*?)(?=^### |^## |\Z)', s, re.M | re.S):
    row = {'id': m[1], 'title': m[2]}
    for label, key in labels.items():
        row[key] = re.search(r'^- ' + re.escape(label) + r': ([^\n]+)$', m[3], re.M)[1]
    row['location'] = re.sub(r'(?<=; )/(?!/)([^ ;]+)', r'https://www.niramayclinics.com/\1', row['location'])
    row['scope'] = 'Live-site + repository confirmed (26 Oct 2026 crawl)'
    row['legal_basis_status'] = 'NMC notice R-13014/01/2024-Ethics authenticated on nmc.org.in, in force since 06/10/2026; IMC 2002 applies; DPDP notice/consent duties commence ~13 May 2027'
    rows.append(row)
with Path('nmc-audit/nmc-findings.csv').open('w', encoding='utf-8-sig', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=['id','title',*labels.values(),'scope','legal_basis_status'], quoting=csv.QUOTE_ALL)
    w.writeheader(); w.writerows(rows)
assert len(rows) == 15 and Counter(r['severity'] for r in rows) == {'CRITICAL':1,'HIGH':7,'MEDIUM':7}

# client summary patch
cs = Path('nmc-audit/NMC_CLIENT_SUMMARY.md'); t = cs.read_text(encoding='utf-8')
t = t.replace("26 October 2026 | Investigation only | Provisional repository findings",
              "26 October 2026 | Investigation only | Live-site findings " + EM + " no content was changed")
t = t.replace("Important: we have not yet authenticated the October 2026 NMC guideline cited in the brief or checked the current live website. Network permission is outstanding. These findings concern the website files and images in this project, assessed against your supplied checklist. They are not a final legal opinion.",
              "The guideline is real and in force: we downloaded the official NMC public notice (No. R-13014/01/2024-Ethics, dated 6 October 2026, in force with immediate effect) from nmc.org.in and checked every page of your live website. This is a compliance review, not a legal opinion.")
t = t.replace("**Provisional risk: Severe under that checklist.**", "**Overall risk: Severe.**")
t = t.replace("- An authentic copy of the cited guideline and permission to verify official sources and the live site.",
              "- Approval to proceed with the fix run described in the report.")
cs.write_text(t, encoding='utf-8')
print('patched; findings:', len(rows))
