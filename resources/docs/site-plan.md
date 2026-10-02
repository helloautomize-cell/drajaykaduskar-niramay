## Part 0. Site plan, page count and rules

### 0.1 How many pages the new site will have

| Group | Pages | Count |
|---|---|---|
| A. Core | Home, About Niramay Clinics, Dr. Ajay V. Kaduskar, Dr. Prajakta A. Kaduskar, All Services, Contact and Book Appointment | 6 |
| B. Niramay Diabetes and Heart Care Centre | Diabetes and Metabolic Care (hub), Type 2 Diabetes, Type 1 Diabetes, Diabetes in Pregnancy, Diabetes Complications Screening, Complete Diabetes Care Programme, Prediabetes and Diabetes Risk Assessment, Thyroid Clinic, Hypertension Clinic, Nutrition and Lifestyle Counselling, Obesity and Weight Management (hub), Medicines for Weight Management, Body Composition and Sarcopenia Assessment, Heart Care and Preventive Cardiology (hub), 2D Echo, ECG, TMT (Treadmill Stress Test), Preventive Health Check-ups | 18 |
| C. Blooming Buds Child and Adolescent Care Centre | Blooming Buds (hub), Well Baby Clinic, Vaccinations for Children, Teens and Adults, Adolescent Physical Health, Teen Mental Health and Counselling, Psychological Testing (IQ, EQ, Personality), Career Counselling and Aptitude Testing, Workshops for Schools, Parents and Teachers | 8 |
| D. Diagnostics and Pharmacy | Pathology Laboratory, Home Sample Collection, Niramay Pharmacy | 3 |
| E. Patient information | Plan Your Visit, Frequently Asked Questions, Health Library (blog hub), Videos and Health Talks | 4 |
| F. Legal and trust | Privacy Policy, Terms of Use, Medical Disclaimer, Editorial and Medical Review Policy, Patient Rights and Responsibilities, Appointment, Cancellation and Refund Policy, Accessibility Statement | 7 |
| **Total main pages** | | **46** |
| Blog posts migrated from the old site | 4 by Dr. Prajakta, 1 by Dr. Ajay (text in the audit file, Appendix A; migration notes in Part 5) | 5 |
| Utility pages | Appointment request received (thank-you), Page not found (404) | 2 |

**Navigation (header)**
Home · About (Our Clinic, Dr. Ajay Kaduskar, Dr. Prajakta Kaduskar) · Diabetes and Heart Care · Child and Teen Care · Lab and Pharmacy · Patient Info (Plan Your Visit, FAQs, Health Library, Videos) · **Book Appointment** (button) · Call button on mobile

**Footer (every page)**
- Clinic name, full address, map link, phone numbers, email, hours
- Quick links to all service hubs
- Legal links: Privacy Policy, Terms of Use, Medical Disclaimer, Editorial Policy, Patient Rights, Cancellation and Refund, Accessibility
- Emergency line (see 0.4)
- "© 2026 Niramay Clinics, Nagpur. Information on this website is for general education and does not replace a consultation."

### 0.2 URL structure (old URL → new URL redirects are listed in the audit file, section 5)

```
/                                   Home
/about/                             About Niramay Clinics
/doctors/dr-ajay-kaduskar/
/doctors/dr-prajakta-kaduskar/
/services/                          All services
/contact/                           Contact and Book Appointment
/diabetes/                          Diabetes and Metabolic Care hub
/diabetes/type-2-diabetes/
/diabetes/type-1-diabetes/
/diabetes/diabetes-in-pregnancy/
/diabetes/complications-screening/
/diabetes/diabetes-care-programme/
/diabetes/prediabetes-risk-assessment/
/thyroid-clinic/
/hypertension-clinic/
/nutrition-lifestyle-counselling/
/obesity/                           Obesity and Weight Management hub
/obesity/weight-management-medicines/
/obesity/body-composition-sarcopenia/
/heart-care/                        Heart Care hub
/heart-care/2d-echo/
/heart-care/ecg/
/heart-care/tmt-stress-test/
/preventive-health-check-ups/
/blooming-buds/                     Child and Adolescent hub
/blooming-buds/well-baby-clinic/
/vaccination/
/blooming-buds/adolescent-health/
/blooming-buds/teen-mental-health/
/blooming-buds/psychological-testing/
/blooming-buds/career-counselling/
/blooming-buds/workshops/
/lab/                               Pathology Laboratory
/lab/home-sample-collection/
/pharmacy/
/plan-your-visit/
/faqs/
/health-library/                    Blog hub
/health-library/<post-slug>/
/videos/
/privacy-policy/
/terms-of-use/
/medical-disclaimer/
/editorial-policy/
/patient-rights/
/cancellation-refund-policy/
/accessibility/
```

### 0.3 Writing rules used for every page (for anyone editing later)

1. **Plain, warm, precise.** Short sentences. Explain medical terms the first time they appear. Write for a 60-year-old patient and for a worried parent, at the same time.
2. **No em dashes, no hype, no filler.** Avoid stock phrases such as "state of the art", "world class", "best in Nagpur", "cutting-edge", "one-stop solution", "holistic journey".
3. **YMYL and E-E-A-T.** Every medical page shows:
   - who wrote it and who medically reviewed it (with qualifications);
   - the date it was last reviewed;
   - sources for any statistic;
   - a short "When to see a doctor urgently" note where relevant.
4. **No promises.** We never say "cure", "guaranteed", "permanent", "100%", "no side effects", "reverse diabetes for good". We describe what the clinic does and what patients can reasonably expect.
5. **No medicine promotion.** Medicines are described by type and purpose only. No brand names, no doses, no offers. (Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 lists diabetes, obesity, high or low blood pressure and heart disease among the conditions for which drug advertising is prohibited.)
6. **No testimonials, no "before and after", no superlatives, no comparison with other doctors.** The site states facts: qualifications, experience, services, address, timings. Patients are directed to independent reviews on Google instead.
7. **Children and privacy.** No identifiable child or patient photo without written consent. Forms for children are filled by a parent or guardian.
8. **Emergencies.** The clinic is an outpatient (OPD) practice. Every page that discusses symptoms tells readers what to do in an emergency.

### 0.4 Compliance basis (for the clinic's records)

| Area | Rule followed | How it shows on the site |
|---|---|---|
| Doctor publicity | Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations, 2002, which apply while the NMC Registered Medical Practitioner (Professional Conduct) Regulations, 2023 remain in abeyance | Factual content only: names, qualifications, registration numbers, services, timings, address. No self-praise, testimonials or inducements. |
| Medicine advertising | Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954; Drugs and Cosmetics Act, 1940 | No brand names, no cure claims, no medicine sales promotion. Pharmacy page states that prescription medicines are dispensed only against a valid prescription. |
| Personal and health data | Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 (notified 13 November 2025; most obligations apply from 12 May 2027); Information Technology Act, 2000 and the SPDI Rules, 2011 while they remain in force | Consent notice on every form, a Privacy Policy written to DPDP standards now, parental consent for under-18s, a named Grievance Officer. |
| Remote advice | Telemedicine Practice Guidelines, 2020 | Only if video or phone consultations are offered. **[CONFIRM: does the clinic offer teleconsultation?]** |
| Patient rights | Charter of Patients' Rights (NHRC, adopted by MoHFW, 2019) | Patient Rights and Responsibilities page |
| Emergencies | Not an emergency facility | Banner text: "Medical emergency? Call 108 or 112, or go to the nearest hospital emergency department." |

### 0.5 Global elements

**Top banner (thin bar, all pages)**
`Mon to Sat, [CONFIRM: hours] | Call 0712 2422214 or +91 84591 41584 | Medical emergency? Call 108 or 112`

**Author and reviewer box (bottom of every medical page)**
> **Written by** the Niramay Clinics medical content team. **Medically reviewed by** Dr. Ajay V. Kaduskar, MD (Medicine), PGDHSc (Diabetology), Fellow, Euro Asian Academy of Clinical Diabetology (The Netherlands). [Or Dr. Prajakta A. Kaduskar, MBBS, DCH, PGDAP, MA (Clinical Psychology), for Blooming Buds pages.]
> **Last reviewed:** [CONFIRM: date of sign-off] · **Next review due:** 12 months later
> This page is for general information and is not a substitute for a consultation. [Read our Editorial Policy]

**Standard call to action block**
> **Book a consultation**
> Call 0712 2422214 or +91 84591 41584, message us on WhatsApp, or use the appointment form. Please bring your previous reports and a list of the medicines you take.

**Form consent line (under every form)**
> By submitting this form you agree that Niramay Clinics may use these details to contact you about your appointment. Please do not share detailed medical history here. For patients under 18, a parent or guardian must fill this form. See our Privacy Policy.

**Canonical clinic details (use exactly this everywhere: website, Google profiles, Justdial, schema)**
- **Name:** Niramay Clinics (Niramay Diabetes and Heart Care Centre | Blooming Buds Child and Adolescent Care Centre)
- **Address:** 572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, opposite Dinanath High School, Dhantoli, Nagpur, Maharashtra 440012
- **Phone:** 0712 2422214 · +91 84591 41584 (calls and WhatsApp)
- **Laboratory:** Niramay Laboratory, 7 am to 7 pm **[CONFIRM: days]**
- **Pharmacy:** Niramay Pharmacy (Niramay Medical), +91 90213 51693
- **Email:** ajaykaduskar@gmail.com
- **Hours:** **[CONFIRM: OPD days and hours for each doctor. Current listings disagree: appointment line 9 am to 5 pm, Google 8:30 am or 9 am, Justdial 8:30 am to 6 pm]**

**Structured data (for the developer)**
- `MedicalClinic` on Home and Contact
- `Physician` on each doctor page
- `MedicalWebPage` with `reviewedBy` and `lastReviewed` on every medical page
- `FAQPage` only where questions are visibly on the page
- `MedicalTest` for Echo, ECG, TMT and lab pages
