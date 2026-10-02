# Client answers (collected 2 Oct 2026)

## 1. Timings
1. **OPD hours (both doctors):** Monday to Saturday 8:30 am to 6 pm. Sunday closed. Same hours for Dr. Ajay and Dr. Prajakta. On public holidays, timings may change: "Please call before visiting on public holidays."
2. **Lab hours:** Monday to Saturday 7 am to 7 pm. Sunday closed.
3. **Pharmacy hours:** Monday to Saturday 8:30 am to 8 pm. Sunday closed.
4. **Phone answering hours:** 8 am to 9 pm, every day including Sunday (7 days a week).
5. **Online request confirmation time:** 30 to 90 minutes. Thank-you page wording: "We usually confirm within 30 to 90 minutes between 8 am and 9 pm. Requests sent after 9 pm are confirmed the next morning."

## 2. Fees and payments
6. **Consultation fees:** do NOT show fees on the website. Payments: all methods accepted at the clinic (cash, UPI, cards). Suggested line: "Fees are shared when you book. We accept cash, UPI and cards."
7. **Complete Diabetes Care Package:** exists. 12 months: 12 consultations, 4 HbA1c tests, eye and foot screening, 4 diet sessions. Do NOT mention the fee.
8. **Preventive health check-ups:** NO fixed packages. Each check-up is custom designed by the doctor after consultation and physical examination, based on the patient's existing conditions, symptoms and risk, to avoid unnecessary or repeated tests. Remove the proposed package tiers from the page and replace them with this approach.
9. **Insurance:** No cashless for OPD consultations or tests at the clinic; itemised bills and reports are given for reimbursement claims. If hospital admission is needed, the doctors refer to a suitable hospital based on the patient's location and medical need (no fixed hospital is promoted); the hospitals they work with offer cashless insurance and other insurance facilities. Suggested copy: "We do not offer cashless billing for clinic visits or tests, but we give itemised bills and reports for your insurance claim. If you need hospital admission, we help you choose a suitable hospital near you, based on your medical needs. The hospitals we work with offer cashless treatment under most insurance plans." Do not name hospitals or imply any referral arrangement.
   - **Dr. Ajay's patient-first approach (add to the insurance/hospital answer, Plan your visit and FAQs, and a line on Dr. Ajay's profile and About):** "Dr. Ajay does not tie patients to any one hospital. Where you are admitted depends on where you live and the care you need. What matters to him is that your experience is smooth and well looked after, from the first phone call to your recovery." (No "best" or superlative wording, per NMC rules.)
10. **Advance payments:** None. Everything is paid at the clinic. Keep only the simple version of the Cancellation and Refund Policy: no advance payment is taken; you can cancel or reschedule by calling or WhatsApp at any time; refunds only arise for a billing error at the clinic and are processed at the clinic.
11. **Cancellation notice / refund time:** not applicable (no advance payment). Remove these placeholders.
12. **Home sample collection:** earliest 7 am; NO home-visit charge (can say "no extra charge for home collection"). Coverage area: anywhere in Nagpur city within about 15 km of the clinic. Copy: "We collect samples at home anywhere in Nagpur city (within about 15 km of Dhantoli), from 7 am, Monday to Saturday, at no extra charge. Samples are tested in our own lab."
   - **In-house lab:** all samples are processed in the clinic's own lab; no samples are sent to any outside lab. (Feeds the Lab item in section 5; remove "partner lab" wording.)

### Patient catchment (drives local SEO + schema)
- 30% from Nagpur city within 5 km of Dhantoli
- 20% from farther city areas, 6 to 15 km
- 50% from rural areas and towns around Nagpur, 16 to 100 km

**Plan (Phase 6, Part 2B):**
1. Schema `areaServed` on MedicalClinic + both Physicians: City Nagpur; AdministrativeArea Nagpur district, Bhandara district, Wardha district; plus a GeoCircle (clinic geo, radius 100 km). Named towns within ~100 km in `site-config.serviceArea`: Kamptee, Hingna, Butibori, Kalmeshwar, Saoner, Katol, Narkhed, Umred, Bhiwapur, Kuhi, Mauda, Ramtek, Parseoni, Bhandara, Tumsar, Wardha, Hinganghat, Pandhurna. Nagpur localities within 15 km for the city list: Dhantoli, Ramdaspeth, Congress Nagar, Sitabuldi, Civil Lines, Dharampeth, Shankar Nagar, Bajaj Nagar, Pratap Nagar, Manish Nagar, Trimurti Nagar, Sadar, Mahal, Itwari, Medical Square, Sakkardara, Nandanvan, Wardhaman Nagar, Hudkeshwar, Besa, Wadi, Koradi road. (schema/site-config only; no [CONFIRM])
2. ONE genuinely useful page, `/plan-your-visit/coming-from-outside-nagpur/` (no doorway pages per town): travel and parking, arrive by 7 am for fasting tests, consultation + lab + pharmacy in one visit, same-day reports, follow-up by phone/WhatsApp where clinically appropriate, pick up medicines at our pharmacy before you leave, the town list as plain text "Patients regularly visit us from…".
3. Contact + Plan your visit + footer: "Patients come to us from across Nagpur and from towns up to 100 km away, including Wardha, Bhandara, Umred, Katol, Saoner and Ramtek."
4. Opening hours schema: OPD Mo-Sa 08:30-18:00; lab Mo-Sa 07:00-19:00 (department); pharmacy Mo-Sa 08:30-20:00 (department); phone 08:00-21:00 daily (ContactPoint hoursAvailable).
5. Do NOT create thin per-town or per-locality landing pages (Google doorway-page policy).

## 3. Registrations and legal
13. **Dr. Ajay MMC registration number:** LATER (still ★ launch blocker). Keep the hidden placeholder.

### Dr. Ajay profile enrichment (supplied with Q13) — apply to `/doctors/dr-ajay-kaduskar/`, About, Physician JSON-LD
**Title line:** Diabetologist and metabolic diseases consultant · Director, Niramay Diabetes and Heart Care Centre, Nagpur

**Education (timeline):**
- MBBS, Government Medical College, Nagpur
- MD (Medicine), Lokmanya Tilak Municipal Medical College, Sion, Mumbai
- PG Diploma in Health Sciences (Diabetology)
- Fellowship, Euro Asian Academy of Clinical Diabetology (FEACD)

**Certifications and continuing education:**
- SCOPE certified obesity management specialist (World Obesity Federation), no year
- "AI for Healthcare" programme, Yong Loo Lin School of Medicine, National University of Singapore (completed)
- Recent CME topics attended: latest hypertension guidelines; SGLT2 inhibitors in practice; kidney and heart complications in type 2 diabetes. (Topics only, no sponsor or event-organiser names.)

**Leadership and community roles:**
- Former President, Diabetic Association of India, Nagpur
- Former Chairman, Association of Physicians of India (API), Vidarbha Chapter
- Joint Organising Secretary, MAPCON 2023, Nagpur
- President, Dr. V. S. Kaduskar Memorial Foundation, a trust for diabetes care and diabetes education in rural Nagpur district

**How Dr. Ajay works (principles block, from the list + his patient-first approach):**
- Diabetes education at every visit
- A whole-person approach: sugar, blood pressure, weight, heart, kidneys, mood and sleep looked at together
- Most related conditions managed in one place, with referral only when it is truly needed
- Personalised diet plan and exercise prescription
- Not tied to any hospital; admission advice based on where you live and what care you need

**Conditions and services (NON-clickable chips on his profile only, grouped; NOT in the menu; add to JSON-LD):**
- *Diabetes care:* Type 2 diabetes · Type 1 diabetes · Diabetes in children and teens (with Dr. Prajakta) · Diabetes in pregnancy and gestational diabetes · Prediabetes and diabetes prevention · Insulin treatment · Insulin pump guidance · Continuous glucose monitoring (CGM) · Diabetic diet counselling · Exercise in diabetes · Vaccination for people with diabetes · Depression and emotional health in diabetes
- *Diabetes complications:* Diabetic kidney disease · Diabetic nerve damage (neuropathy) · Diabetic eye disease (retinopathy) screening · Diabetic foot ulcer care · Complications management
- *Heart and metabolism:* High blood pressure · Secondary hypertension evaluation · Cholesterol and lipid disorders · ECG · Obesity management · Lifestyle disease management · Obstructive sleep apnoea · Gout · Metabolic bone disease · Vitamin D and B12 deficiency
- *Hormones and thyroid:* Hypothyroidism · Goitre and thyroid swelling · Parathyroid disorders · Calcium disorders · Adrenal disorders · PCOS / PCOD · Hormonal menstrual problems · Erectile dysfunction
- *General medicine:* Fever · Respiratory infections · Abdominal pain · Skin allergies · Piles · Filariasis · Blood tests

**EXCLUDED on purpose (compliance / accuracy):**
- "Stem Cell Therapy for Diabetes": not approved standard treatment in India (ICMR stem cell guidelines allow it only within approved clinical trials); listing it is a regulatory risk.
- "Insulin Free Treatment": reads as a cure claim for diabetes (Drugs and Magic Remedies Act / NMC).
- "Endocrinology Children", "Diabetologist Juvenile": implies a paediatric endocrinology specialty; merged into "Diabetes in children and teens (with Dr. Prajakta)".
- Duplicates merged (CGM/CGMS, PCOS/PCOD, neuropathy x2, type 2 x3, gestational x2, obesity x2, nephropathy/renal failure).
- MediSage activity ("read and liked" journals/videos on unrelated topics): not credentials; not used. Molnupiravir event: dated; not used.

14. **Dr. Prajakta MMC registration number:** LATER (still ★). Profile stays as it is on the current site: MBBS, DCH, PGDAP (Adolescent), MA (Clinical Psychology). No extra roles or memberships to add for now. (DCH = Diploma in Child Health, confirmed.)
15. **Drug licence numbers / pharmacist:** do NOT publish. Remove the "Drug licence numbers" and "Registered pharmacist" lines from the Pharmacy page and from launch-check. Replace with: "Our pharmacy is a licensed retail pharmacy. Licences are displayed at the pharmacy, and medicines are dispensed by a registered pharmacist." (Note for later: if the pharmacy ever takes orders online, licence display on the site would be required.)
16. **Legal entity:** sole proprietorship of Dr. Ajay V. Kaduskar, but do NOT print "sole proprietorship" anywhere. In Privacy Policy and Terms use: "This website is run by Niramay Clinics, 572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, Dhantoli, Nagpur 440012 ("Niramay Clinics", "we")." That is enough to identify the data fiduciary under DPDP.
17. **Privacy contact + ALL email:** the clinic uses ONE email for everything: **ajaykaduskar@gmail.com**. Replace `ajaykaduskar@gmail.com` EVERYWHERE (site-config, Contact, footer, Privacy Policy, Terms, Patient rights, Cancellation policy, JSON-LD `email`, FORM_TO_EMAIL default). Privacy contact: "Dr. Ajay Kaduskar, ajaykaduskar@gmail.com".
   - Also answers item 9.2 ("Email address for the website").
   - Forms: `FORM_TO_EMAIL=ajaykaduskar@gmail.com`. Sending still needs a verified domain (`appointments@niramayclinics.com` via Resend DNS records), because Gmail addresses cannot be used as a sender. Tell the doctor to mark the first form email "Not spam" and add the sender to contacts.
   - Resend domain/DNS setup: LATER (user will set up). Until then forms run in test mode / `onboarding@resend.dev` on preview only.
   - Show the email as a `mailto:` link but render it in a way that resists scraping (e.g. assemble it client-side), to limit spam.
18. **"Last updated" date (Privacy Policy, Terms of Use):** 21 August 2026. Store it in `site-config.legalLastUpdated` so it can be changed in one place if the policy text changes before launch.
19. **Processors:** clinic uses no software processors; all records are manual (paper) and kept securely. Privacy Policy list = website services only: Vercel (hosting), Resend (form email delivery), Cloudflare Turnstile (spam protection), Google Analytics (only with consent), Google Maps and YouTube (load only when clicked), WhatsApp/Meta and Gmail/Google (when you contact us by WhatsApp or email). Add: "Clinic records are kept on paper and stored securely at the clinic."
20. **Medical records retention:** 3 years from the last visit (the minimum under the MCI/NMC regulations). Copy: "We keep medical records for at least 3 years from your last visit, as required by medical regulations."
21. **Enquiry retention (no visit):** 12 months, then deleted. Copy: "If you contact us but do not visit, we delete your enquiry within 12 months."
22. **Complaints:** acknowledged within 24 hours, resolved within 3 days. Copy: "We acknowledge every complaint within 24 hours and aim to resolve it within 3 days." (use "aim to" so a complex case is not a broken promise)
23. **Charter of Patients' Rights:** displayed at reception. Keep the line.

## 4. Doctor credentials
24. **Experience:** Dr. Ajay "more than 20 years"; **Dr. Prajakta "more than 15 years"** (CHANGE from the current 20+ everywhere: her profile, About, Blooming Buds, Home, doctor cards, JSON-LD, meta descriptions). Exact start years LATER; store as `experienceYears` in site-config so it can switch to a computed value later.
25. **Clinic founded:** 2006. Use on About ("Caring for Nagpur since 2006"), footer, and Organization/MedicalClinic JSON-LD `foundingDate: "2006"`.
26. **SCOPE year:** do not show a year. Remove the [CONFIRM year] marker.
27. **Languages:** English, Hindi and Marathi for both doctors (confirmed). JSON-LD `knowsLanguage: ["en","hi","mr"]`.
28. **Awards:** Dr. Ajay: use what was supplied with Q13 (SCOPE certification, NUS programme, leadership roles); show under "Certifications and roles", not as "Awards". Dr. Prajakta: none to add; hide the Awards section on her profile and About. Remove the ★ from this item.
29. **Memberships:** Dr. Ajay: as supplied with Q13 (Diabetic Association of India Nagpur, API Vidarbha, MAPCON 2023, the Foundation). Dr. Prajakta: none to add; hide the section.
30. **Talks / media:** drop the "Sugar ki Baat" references. Doctor-approved video for the HOME page:
   - https://youtu.be/G2I1fNgxzkE · "The Pillars of Health, Episode 05: Dr. Ajay Kaduskar" · channel: Loktantra Mirror (interview on a media channel).
   - Home placement: a "Watch Dr. Ajay" band after the doctors section (or inside Dr. Ajay's doctor card area): title "Dr. Ajay on The Pillars of Health", one line "Dr. Ajay talks about diabetes and long-term health.", click-to-load youtube-nocookie facade (reuse VideoFacade), thumbnail downloaded and self-hosted (no Google request before click), "Video: Loktantra Mirror" credit under it.
   - **FINAL (user):** keep BOTH videos and embed BOTH on the Home page, in the "Watch Dr. Ajay" section after the doctors section: `G2I1fNgxzkE` and `YjXtEOQ724Y`. Two facades side by side on desktop (2 columns), stacked on mobile. Each with its own real YouTube title, self-hosted thumbnail and "Video: [channel name]" credit; VideoObject JSON-LD for each (real uploadDate and title from YouTube). The diabetes-myths blog post keeps its existing `YjXtEOQ724Y` embed. Do not add them to the profile or a Videos page.
   - **Check first:** my lookup returned the same title ("The Pillars of Health, Episode 05", Loktantra Mirror) for both IDs. Open both URLs. If they are two different videos, show both. If they are the same video uploaded twice, show it ONCE and tell me.
   - (Talks/columns/TV: nothing else to add.)
31. **Staff names:** do not name anyone (team photo caption = "Our team at Niramay Clinics"; Nutrition page = "our trained nutrition team", no name or qualification).
32. **Minimum age for diabetes care (Dr. Ajay):** no fixed limit. Copy: "Dr. Ajay treats diabetes at any age. Children and teenagers are often seen together with Dr. Prajakta, so growth, school and emotional needs are covered too."

## 5. Services
33. **2D Echo:** performed and reported in-house by Dr. Ajay Kaduskar; available the same day; report in about 30 minutes. Copy: "Dr. Ajay performs and reports your 2D Echo here at the clinic. It can usually be done the same day, and the report is ready in about 30 minutes."
34. **TMT:** Dr. Ajay supervises every test, assisted by a trained technician; Bruce protocol; defibrillator, oxygen and emergency medicines available on site. Copy: "Dr. Ajay supervises every treadmill test himself, with a trained technician assisting. We follow the standard Bruce protocol, and a defibrillator, oxygen and emergency medicines are kept ready throughout."
35. **Retinal screening:** both methods available (with and without eye drops); modern retinal camera. No machine names. Copy: "We photograph the back of your eye with a modern retinal camera. Most of the time no eye drops are needed. If a clearer view is needed, we use drops to widen the pupil, and your vision may be blurry for a few hours, so it is best not to drive yourself home that day. The photos are reviewed at the clinic, and if we see any changes we guide you to an eye specialist."
36. **Body composition / sarcopenia:** no machine name. Steps: body composition analyser (stand on it for about a minute; measures muscle, fat and water), hand grip strength, chair stand test (stand up from a chair 5 times), walking speed over a short distance. Copy as a 4-step list. Add a prep line: "Wear light clothes, avoid a heavy meal just before, and remove socks and metal items for the scan. If you have a pacemaker, please tell us first."

### RULE for all remaining service details (items 37 to 45): decided by us, no client questions
Principle from the client: Dr. Ajay is a senior, experienced physician; every patient is different; treatment is decided by the doctor after examining the patient, following NMC guidelines and using modern equipment. The website describes WHAT is offered and HOW the visit feels, never treatment protocols, test names, session counts or machine models. Windsurf must:
- REMOVE every `[CONFIRM]` that asks for a treatment modality, protocol, test name, session length or frequency, machine/model, or internal process. Replace each with the patient-friendly generic line below or a sentence of the form "Dr. [name] decides the right [tests / treatment / plan] for you after examining you."
- Never invent specifics to fill a gap.

37. **Insulin pump:** "If an insulin pump may suit you, Dr. Ajay explains the options and guides your care." (No start/refer detail.)
38. **Psychological testing:** no test names, no session length. "Dr. Prajakta chooses standardised assessments based on your child's needs and explains the results to you in plain words. Our reports help parents and schools plan support. Official disability certificates are issued by government medical boards."
39. **Teen counselling:** remove any mention of group sessions, session length and frequency. "Sessions are private, unhurried and planned around your teenager's needs."
40. **Vaccination reminders:** "We note the next due date on your child's vaccination record at every visit." (No SMS/WhatsApp reminder claim.)
41. **Well-baby schedule:** keep the schedule as written (it follows the national/IAP schedule); covered by Dr. Prajakta's page sign-off. Remove the [CONFIRM].
42. **Workshops:** "Workshops can be held in English, Hindi or Marathi. Call or use the form to plan one for your school or group." No fee, no school names, no counts. Workshop form reply time: "We will contact you within 2 working days."
43. **Lab:** all tests processed in our own in-house lab (client confirmed). "Reports are checked and signed by a qualified pathologist. Most routine reports are ready the same day. Collect them at the clinic or ask us to send them to you." No NABL or accreditation claim, no partner lab, no pathologist name, no QC/EQAS detail.
44. **Pharmacy:** keep "Home delivery available in Nagpur" (it is on the pharmacy signboard). REMOVE outstation parcel/courier dispatch everywhere (including the "coming from outside Nagpur" page plan in item 12): "Pick up your medicines at our pharmacy right after your consultation." Stock line: "Diabetes supplies such as glucometers, strips and other everyday health products are available." No delivery charges or areas.
45. **Career counselling:** remove the fingerprint/"multiple intelligence" statement; "Guidance is based on standardised aptitude and interest assessments and a conversation with your teenager and you."

### Section 6 to 10: resolved without asking
- 46/47 Videos: done (item 30). 48 Photo consent: confirmed earlier (marketing contract).
- 49/50 Google Maps link and review links: the agency copies them from GBP manager (no Places API). GBP A = clinic, GBP B = Dr. Ajay. No GBP exists for Dr. Prajakta / Blooming Buds (create one at launch, Phase 7).
- WhatsApp numbers: confirmed from signboards and GBPs: clinic +91 84591 41584 (WhatsApp), landline 0712 2422214, pharmacy +91 90213 51693.
- Approvals (medical and legal sign-off): process items, not questions; stay ★ until launch.
- **Domain + accounts:** the agency (user) has DNS access to niramayclinics.com and will create the Resend, Cloudflare and GA4 accounts. Recommend adding ajaykaduskar@gmail.com as an owner/admin on GA4 and Search Console so the clinic owns its data.
- **Google rating:** NO rating or count on the site. Links only: "See us on Google Maps" per profile. No Places API, no API key. The agency copies the Maps share link and review link from GBP manager.
- **Logo:** no vector file exists. Windsurf redraws the current logo as SVG, faithfully (no redesign), for approval.
- **Social media:** none; keep icons hidden. `sameAs` = the two GBP Maps links only.
- Time-of-day options on the booking form: Morning (8:30 am to 12 pm), Afternoon (12 to 3 pm), Late afternoon (3 to 6 pm).

**Schema (Dr. Ajay):** Physician `medicalSpecialty` (Endocrine, Cardiovascular, PrimaryCare), `knowsAbout` = conditions, `availableService` = MedicalTherapy/MedicalTest/MedicalProcedure items for services (ECG = MedicalTest, CGM = MedicalTest, insulin treatment = MedicalTherapy, etc.), `alumniOf` (GMC Nagpur, LTMMC Sion), `hasCredential` (MBBS, MD, PGDHSc, FEACD, SCOPE), `memberOf` (DAI Nagpur, API Vidarbha), `affiliation` (Dr. V. S. Kaduskar Memorial Foundation).
