# Niramay Clinics: New Website Content (Master Copy)

**Project:** Rebuild of niramayclinics.com in Next.js
**Prepared:** October 2026
**Companion files:** `niramay-current-website-audit.md` (source of truth on the old site), `resources/images/IMAGE-GUIDE.md` (images)

**How to use this file**
- Every page of the new website is written out below, ready to be placed into the Next.js build.
- Text in square brackets that starts with **[CONFIRM: ...]** is a fact only the clinic can supply or approve. It must be filled in or removed before launch. Part 7 collects all of them in one questionnaire for the doctors.
- Nothing in this file has been published. Every medical page must be read and signed off by the reviewing doctor named on that page before it goes live.

---

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
- **Email:** admin@niramayclinics.com
- **Hours:** **[CONFIRM: OPD days and hours for each doctor. Current listings disagree: appointment line 9 am to 5 pm, Google 8:30 am or 9 am, Justdial 8:30 am to 6 pm]**

**Structured data (for the developer)**
- `MedicalClinic` on Home and Contact
- `Physician` on each doctor page
- `MedicalWebPage` with `reviewedBy` and `lastReviewed` on every medical page
- `FAQPage` only where questions are visibly on the page
- `MedicalTest` for Echo, ECG, TMT and lab pages

---
## Part 1. Core pages

---

### Page 1. Home

- **URL:** `/`
- **SEO title:** Niramay Clinics, Dhantoli, Nagpur | Diabetes, Heart and Child Care
- **Meta description:** Diabetes, obesity, thyroid and heart care with Dr. Ajay Kaduskar, and child and adolescent care with Dr. Prajakta Kaduskar. In-house lab and pharmacy in Dhantoli, Nagpur.
- **Schema:** MedicalClinic (two departments), WebSite
- **Images:** `Dr ajay.jpg` (hero), `Child specialist niramay.jpg`, `Niramay waiting launge.jpg` (faces blurred), `NiramayClinic_Section_bg_img2.jpg` (parallax band), `NiramayClinics_slide_img6.jpg`, service icons

#### Hero
**H1:** Specialist care for diabetes, heart health and growing children, in Dhantoli, Nagpur

Niramay Clinics brings two specialist practices under one roof. Dr. Ajay V. Kaduskar looks after adults with diabetes, obesity, thyroid problems, high blood pressure and heart risk. Dr. Prajakta A. Kaduskar looks after children and teenagers, from baby check-ups and vaccinations to emotional health and career guidance. Each doctor has more than 20 years of clinical practice.

**Buttons:** Book an appointment · Call 0712 2422214

**Small line under buttons:** In-house laboratory · Pharmacy · 2D Echo, ECG and TMT · Retinal screening · Body composition analysis

#### Section: Two centres, one family practice
**H2:** Two clinics, one address

**Card 1: Niramay Diabetes and Heart Care Centre**
For adults living with diabetes or at risk of it, and for anyone concerned about weight, thyroid, blood pressure or heart health. Consultations, tests, eye screening, diet advice and follow-up happen in one place.
[Explore diabetes and heart care →]

**Card 2: Blooming Buds Child and Adolescent Care Centre**
For babies, children and teenagers. Growth and development checks, vaccinations, puberty and health concerns, stress, screen use, confidence and career choices, with parents involved at every step.
[Explore child and teen care →]

#### Section: What to expect here
**H2:** Care that is planned around you

- **Time to understand your situation.** Your first visit includes a detailed history, examination and a clear explanation of what your results mean and what the plan is.
- **Tests under the same roof.** Blood and urine tests in our laboratory, 2D Echo, ECG, treadmill test, retinal photography and body composition analysis are available at the clinic, so most of your work-up does not need another trip across the city.
- **Advice you can follow at home.** Our nutritionist builds diet plans around your routine, your food habits and your family's cooking, not a printed chart.
- **Follow-up that continues.** Diabetes, blood pressure and weight need steady review. We schedule follow-ups and keep your records together so changes are easy to track.
- **Families welcome.** Parents, spouses and adult children are welcome in the consultation. Many decisions are easier when the family understands them too.

#### Section: Services
**H2:** How we can help

Icon grid, each linking to its page:
- Diabetes care (type 1, type 2, pregnancy)
- Diabetes complications screening (eyes, feet, kidneys, heart)
- Obesity and weight management
- Thyroid clinic
- Hypertension clinic
- Heart check: 2D Echo, ECG, TMT
- Preventive health check-ups
- Well baby clinic and vaccinations
- Adolescent health
- Teen mental health and counselling
- Psychological testing and career counselling
- Laboratory, home sample collection and pharmacy

[See all services →]

#### Section: Meet the doctors
**H2:** Your doctors

**Dr. Ajay V. Kaduskar**
MD (Medicine), PGDHSc (Diabetology), Fellow, Euro Asian Academy of Clinical Diabetology (The Netherlands)
Consultant in diabetes, obesity and metabolic diseases. Director, Niramay Diabetes and Heart Care Centre. More than 20 years of practice. SCOPE-certified in obesity management. Special interests: preventing diabetes complications and preventive cardiology.
[Read profile →]

**Dr. Prajakta A. Kaduskar**
MBBS, DCH, PGDAP (Adolescent Pediatrics), MA (Clinical Psychology)
Consultant in child and adolescent health. More than 20 years of practice. Special interests: adolescent health, emotional wellbeing, parenting guidance and school health programmes.
[Read profile →]

#### Section: Inside the clinic (parallax image band)
**H2:** Everything you need for your visit, in one building

Indu Bhaskar Apartments, Dr. N. B. Khare Marg, Dhantoli. Opposite Dinanath High School. Laboratory open 7 am to 7 pm. Pharmacy on the premises. Lift access and a wheelchair-friendly entrance.
[Plan your visit →]

#### Section: A simple idea
**H2:** Keep things simple

A framed note in Dr. Ajay Kaduskar's consulting room says "keep things simple". It describes how we try to work. Explain the condition in plain words. Choose treatment that fits your life. Measure what matters. Review it regularly. Change only what needs changing.

#### Section: Health library teaser
**H2:** Read before your visit
Three latest articles from the Health Library, with author and date.
[Visit the Health Library →]

#### Section: Quick answers (FAQ, 4 items, link to full FAQ)
**Do I need a referral to see the doctors?**
No. You can book directly by phone or WhatsApp.

**Can I get my blood tests done here?**
Yes. Niramay Laboratory is on the premises and is open from 7 am to 7 pm. Home sample collection is available with one day's notice.

**My child and I both need to see a doctor. Can we come together?**
Yes. Both doctors practise at the same address, so many families book back-to-back appointments.

**Is the clinic accessible for elderly patients and wheelchair users?**
Yes. The building has a lift and the clinic is wheelchair friendly. Two-wheeler parking is available at the building. **[CONFIRM: car parking advice]**

#### Section: Reviews (compliant version)
**H2:** What patients say
We do not publish testimonials on this website. You can read independent patient reviews on our Google profiles.
[Read reviews on Google →] (links to both Google Business Profiles)

#### Section: Location and contact
Map embed, address, phones, hours, "Get directions" button.

---

### Page 2. About Niramay Clinics

- **URL:** `/about/`
- **SEO title:** About Niramay Clinics | Family Specialist Practice in Dhantoli, Nagpur
- **Meta description:** Niramay Clinics is a family-run specialist practice in Nagpur for diabetes, heart and metabolic care, and for child and adolescent health. Meet the doctors and the team.
- **Schema:** AboutPage, MedicalClinic
- **Images:** `NiramayClinics_slide_img6.jpg` (hero), `Niramay board.jpg`, `NiramayClinic_Section_bg_img1.jpg`, `NiramayClinics_slide_img7.jpg`, facility photos

**H1:** About Niramay Clinics

#### What "Niramay" means
"Niramay" comes from the Sanskrit word for "free from illness". A prayer on our waiting-room wall says *Sarve bhavantu sukhinah, sarve santu niramayah*: may everyone be happy, may everyone be free from illness. We cannot promise anyone a life without illness. We can help people find problems early, manage long-term conditions well, and raise children who grow up healthy and confident. That is the work this practice was built for.

#### Who we are
Niramay Clinics is a specialist outpatient practice in Dhantoli, Nagpur, run by two doctors.

- **Dr. Ajay V. Kaduskar** leads the **Niramay Diabetes and Heart Care Centre**. He treats adults with type 1 and type 2 diabetes, diabetes in pregnancy, obesity, thyroid disorders, high blood pressure and high cholesterol, with a focus on preventing complications and protecting the heart.
- **Dr. Prajakta A. Kaduskar** leads the **Blooming Buds Child and Adolescent Care Centre**. She looks after babies, children and teenagers, combining paediatric training with a postgraduate qualification in adolescent paediatrics and a master's degree in clinical psychology.

Between them they have more than four decades of clinical experience. **[CONFIRM: year the practice was founded]**

#### Our mission
**For adults with diabetes and metabolic conditions:** to provide complete, long-term care for diabetes and related metabolic diseases, so that complications are prevented or found early.

**For children and adolescents:** to help young people and their families achieve good physical, emotional and mental health through evidence-based care, counselling, education and prevention.

#### Our vision
- To improve quality of life in our community through careful management of metabolic diseases.
- To help adolescents and their families build emotional resilience, healthy habits, confidence and lifelong wellbeing.

#### How we work
1. **We start with a full picture.** Medical history, family history, lifestyle, current medicines and previous reports are reviewed at the first visit.
2. **We test what is needed, not everything.** Investigations are chosen for your situation and explained before they are done.
3. **We agree on a plan with you.** Targets for sugar, weight, blood pressure or behaviour are set together, in writing.
4. **We keep records in one place.** Your test results, prescriptions and progress are kept together, so each visit builds on the last.
5. **We work as a team.** Doctors, our nutritionist, laboratory staff, nursing and front-desk staff each have a defined role in your care.

#### Facilities at the clinic
- Consultation rooms for both doctors
- Niramay Laboratory: automated biochemistry and haematology analysers, 7 am to 7 pm, home sample collection
- Cardiac testing room: 2D Echocardiography, ECG and treadmill stress test (TMT)
- Retinal camera for diabetic eye screening
- Body composition analyser for fat, muscle and visceral fat measurement
- Nutrition and counselling room
- Niramay Pharmacy, with home delivery in Nagpur and parcel dispatch for outstation patients **[CONFIRM: details in Part 6]**
- Lift access, wheelchair-friendly entry, two-wheeler parking

#### Our team
**H2:** The people you will meet
Our front desk and nursing team register you, check your weight and blood pressure, and guide you through tests. Our laboratory team collects samples at the clinic and at home. Our nutritionist works with patients on diet plans. **[CONFIRM: names and roles of staff who agree to be named; nutritionist's name and qualification]**

#### Community work
Dr. Prajakta Kaduskar conducts health and life-skills workshops for students, parents and teachers. Dr. Ajay Kaduskar takes part in public education on diabetes, including the "Sugar ki Baat" video series. The **Dr. V. S. Kaduskar Memorial Foundation** is associated with the practice. **[CONFIRM: what the Foundation does, and whether it should be described on the site]**

#### Recognition
**[CONFIRM: list of awards and honours, each with the awarding body and year. Shown as a plain factual list, without ranking or comparison.]**

#### Professional memberships
**[CONFIRM: for example RSSDI, API, IAP, IMA Nagpur, with membership type]**

**CTA:** Book a consultation · Plan your visit

---

### Page 3. Dr. Ajay V. Kaduskar

- **URL:** `/doctors/dr-ajay-kaduskar/`
- **SEO title:** Dr. Ajay V. Kaduskar | Diabetologist and Obesity Specialist, Nagpur
- **Meta description:** Dr. Ajay V. Kaduskar, MD (Medicine), PGDHSc (Diabetology), FEACD (Netherlands). Diabetes, obesity, thyroid and metabolic care in Dhantoli, Nagpur, with 20+ years of practice.
- **Schema:** Physician (name, qualifications, medicalSpecialty: Endocrinology/Diabetes, worksFor, address, sameAs: Google profile), ProfilePage
- **Images:** `Dr ajay.jpg` (hero, vertical), `NiramayClinic_Dr_AjayKaduskar.jpg` (avatar)

**H1:** Dr. Ajay V. Kaduskar

**Sub-heading:** Consultant in Diabetes, Obesity and Metabolic Diseases · Director, Niramay Diabetes and Heart Care Centre, Nagpur

**Key facts box**
- **Qualifications:** MD (Medicine); PGDHSc (Diabetology); Fellow, Euro Asian Academy of Clinical Diabetology (FEACD), The Netherlands
- **Certification:** SCOPE certification in obesity management (World Obesity Federation) **[CONFIRM: year]**
- **Experience:** more than 20 years **[CONFIRM: exact year of starting practice]**
- **Registration:** Maharashtra Medical Council Reg. No. **[CONFIRM]**
- **Languages:** English, Hindi, Marathi **[CONFIRM]**
- **Consults at:** Niramay Clinics, Dhantoli, Nagpur
- **OPD:** **[CONFIRM: days and hours]**

#### About Dr. Kaduskar
Dr. Ajay V. Kaduskar is a consultant in diabetes, obesity and metabolic diseases in Nagpur and the director of the Niramay Diabetes and Heart Care Centre in Dhantoli. He has more than 20 years of experience caring for people with type 2 diabetes, type 1 diabetes, diabetes in pregnancy, obesity, high blood pressure, abnormal cholesterol (dyslipidaemia) and heart disease.

After his MD in internal medicine, he completed a postgraduate diploma in diabetology and a fellowship of the Euro Asian Academy of Clinical Diabetology in the Netherlands. He also holds SCOPE certification in obesity management, a programme of the World Obesity Federation for clinicians who treat obesity as a chronic disease.

His particular interests are **preventing the long-term complications of diabetes** (eye, kidney, nerve, foot and heart damage) and **preventive cardiology**, which means finding and treating heart risk before a heart attack or stroke happens. This is why the clinic has its own retinal camera, Echo, ECG and treadmill testing, and laboratory: so that screening is part of routine care, not an extra errand.

#### Areas of care
- Type 2 diabetes, including newly diagnosed diabetes and long-standing diabetes that is hard to control
- Type 1 diabetes in teenagers and adults, including insulin planning and sugar monitoring
- Diabetes in pregnancy (pre-existing and gestational diabetes)
- Prediabetes and diabetes risk assessment
- Obesity, including medical weight management and body composition analysis
- Thyroid disorders
- High blood pressure
- High cholesterol and triglycerides
- Fatty liver associated with diabetes and obesity
- Heart risk assessment and preventive cardiology

#### Approach to care
Dr. Kaduskar's consulting room has a framed note that reads "keep things simple". In practice, that means explaining the condition in plain language, choosing the simplest treatment that will work, setting clear targets, and adjusting only what the numbers show needs to change. He places weight on diet and daily activity as the foundation of treatment, and works closely with the clinic's nutritionist.

#### Public health education
Dr. Kaduskar contributes to public awareness on diabetes and obesity, including the video series "Sugar ki Baat". **[CONFIRM: other talks, CME lectures, publications, TV or newspaper features]** [Watch his videos →]

#### Awards and recognition
**[CONFIRM: factual list with awarding body and year]**

#### Memberships
**[CONFIRM]**

#### Articles by Dr. Kaduskar
Links to his Health Library posts (starting with "10 Common Misconceptions About Diabetes").

**CTA:** Book an appointment with Dr. Ajay Kaduskar

---

### Page 4. Dr. Prajakta A. Kaduskar

- **URL:** `/doctors/dr-prajakta-kaduskar/`
- **SEO title:** Dr. Prajakta Kaduskar | Child and Adolescent Health Consultant, Nagpur
- **Meta description:** Dr. Prajakta A. Kaduskar, MBBS, DCH, PGDAP, MA (Clinical Psychology). Child and adolescent health, teen counselling, vaccination and career guidance in Dhantoli, Nagpur.
- **Schema:** Physician (medicalSpecialty: Pediatric), ProfilePage
- **Images:** `Child specialist niramay.jpg` (hero), team photo

**H1:** Dr. Prajakta A. Kaduskar

**Sub-heading:** Consultant in Child and Adolescent Health · Blooming Buds Child and Adolescent Care Centre, Nagpur

**Key facts box**
- **Qualifications:** MBBS; DCH (Diploma in Child Health); PGDAP (Post Graduate Diploma in Adolescent Pediatrics); MA (Clinical Psychology)
- **Experience:** more than 20 years **[CONFIRM: start year]**
- **Registration:** Maharashtra Medical Council Reg. No. **[CONFIRM]**
- **Languages:** English, Hindi, Marathi **[CONFIRM]**
- **Consults at:** Niramay Clinics, Dhantoli, Nagpur
- **OPD:** **[CONFIRM: days and hours]**

#### About Dr. Kaduskar
Dr. Prajakta A. Kaduskar is a consultant in child and adolescent health. She trained as a doctor (MBBS), specialised in child health (DCH), completed a postgraduate diploma in adolescent paediatrics, and holds a master's degree in clinical psychology. This combination lets her look at a young person's physical health, emotional health and behaviour together, which is often where the real answer lies.

She has more than 20 years of experience caring for babies, children, teenagers and young adults. Her special interests include academic stress, screen and social media overuse, obesity in young people, self-esteem, emotional resilience, puberty and menstrual health, and career guidance.

#### Areas of care
- Well-baby check-ups, growth and development monitoring
- Vaccinations for children, teenagers and adults
- Puberty, growth and menstrual health
- PCOS, anaemia and nutritional concerns in teenagers
- Weight concerns in children and teenagers
- Stress, anxiety, low mood, anger and behaviour concerns
- Screen time and social media overuse
- Exam stress and study habits
- Self-esteem, bullying and peer pressure
- Psychological testing: IQ, emotional quotient (EQ), personality
- Career counselling and aptitude testing
- Parenting guidance

#### Working with parents
Teenagers need privacy and parents need to be informed. Dr. Kaduskar sees most adolescents partly with their parents and partly alone, and explains at the start what will be shared with the family. Anything that affects the young person's safety is always shared.

#### Schools and community
She conducts workshops for students, parents and teachers on mental wellness, healthy lifestyle, puberty, digital safety, bullying and life skills. **[CONFIRM: schools or organisations worked with, number of workshops]**

#### Writing
Dr. Kaduskar has written on parenting teenagers ("Smart Love"), self-esteem in adolescents with disability, preparing children for adolescence, and menstrual hygiene. [Read her articles →]

#### Awards and recognition
**[CONFIRM: factual list with awarding body and year. Her consulting room shows several awards, including a certificate on advancing mental health]**

#### Memberships
**[CONFIRM: for example IAP, IAP Adolescent Health Academy, IMA]**

**CTA:** Book an appointment with Dr. Prajakta Kaduskar

---

### Page 5. All Services

- **URL:** `/services/`
- **SEO title:** Services | Diabetes, Heart, Child and Teen Care | Niramay Clinics Nagpur
- **Meta description:** All services at Niramay Clinics, Nagpur: diabetes, obesity, thyroid, blood pressure and heart tests for adults; vaccination, adolescent health and counselling for children; lab and pharmacy.
- **Schema:** CollectionPage, ItemList

**H1:** Our services

Niramay Clinics has two specialist centres, a laboratory and a pharmacy at one address. Choose a service to learn what it involves, how to prepare, and how to book.

#### Niramay Diabetes and Heart Care Centre (Dr. Ajay V. Kaduskar)

**Diabetes and metabolic care**
- Type 2 diabetes care
- Type 1 diabetes care
- Diabetes in pregnancy
- Diabetes complications screening: eyes, kidneys, feet, nerves, heart
- Complete Diabetes Care Programme
- Prediabetes and diabetes risk assessment
- Thyroid clinic
- Hypertension clinic
- Nutrition and lifestyle counselling

**Weight management**
- Obesity and weight management
- Medicines for weight management (under medical supervision)
- Body composition analysis and sarcopenia (muscle loss) assessment

**Heart care**
- Preventive cardiology and heart risk assessment
- 2D Echocardiography
- ECG
- Treadmill stress test (TMT)
- Preventive health check-ups

#### Blooming Buds Child and Adolescent Care Centre (Dr. Prajakta A. Kaduskar)
- Well baby clinic
- Vaccinations for children, teenagers and adults
- Adolescent physical health: growth, puberty, periods, PCOS, anaemia, weight, skin, sleep
- Teen mental health and counselling
- Psychological testing: IQ, EQ, personality
- Career counselling and aptitude testing
- Workshops for schools, parents and teachers

#### Diagnostics and pharmacy
- Niramay Laboratory
- Home sample collection
- Niramay Pharmacy, with home delivery and outstation parcel service

**Note at the bottom:** Niramay Clinics is an outpatient clinic and does not provide emergency or inpatient care. In an emergency, call 108 or 112, or go to the nearest hospital emergency department.

---

### Page 6. Contact and Book Appointment

- **URL:** `/contact/`
- **SEO title:** Contact and Book Appointment | Niramay Clinics, Dhantoli, Nagpur
- **Meta description:** Book an appointment at Niramay Clinics, Dhantoli, Nagpur. Call 0712 2422214 or +91 84591 41584, message on WhatsApp, or send a request online.
- **Schema:** ContactPage, MedicalClinic
- **Images:** `Niramay clinic outside.jpg` ("look for this entrance")

**H1:** Contact us and book an appointment

#### Ways to book
- **Phone:** 0712 2422214 · +91 84591 41584 (9 am to 5 pm **[CONFIRM]**)
- **WhatsApp:** +91 84591 41584
- **Online:** use the form below. We will call or message you to confirm a time. Your appointment is confirmed only after you hear from us.
- **Pharmacy:** +91 90213 51693
- **Email (non-urgent):** admin@niramayclinics.com

#### Appointment request form
Fields:
- Patient's full name (required)
- Mobile number (required)
- Patient's age (required)
- Which doctor? (Dr. Ajay Kaduskar / Dr. Prajakta Kaduskar / Not sure) (required)
- Reason for visit, short (dropdown: Diabetes / Weight / Thyroid / Blood pressure / Heart test / Health check-up / Child check-up or vaccination / Teen health / Counselling or testing / Lab test / Other)
- Preferred date and time of day
- City (helps us plan for outstation patients)
- I am a parent or guardian booking for a patient under 18 (checkbox)
- Consent checkbox (required): "I agree that Niramay Clinics may contact me about this appointment by phone, SMS or WhatsApp. I have read the Privacy Policy."
- Button: **Request appointment**

Line under the form: Please do not include detailed medical information or upload reports here. Bring them to your visit.

#### Address
Niramay Clinics
572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg
Opposite Dinanath High School, Dhantoli
Nagpur, Maharashtra 440012
[Get directions on Google Maps]

#### Hours
**[CONFIRM: table by day for each doctor, laboratory (7 am to 7 pm) and pharmacy; Sunday and public holiday status]**

#### Emergency notice (highlighted)
We are an outpatient clinic. If you or someone with you has chest pain, difficulty breathing, signs of stroke (face drooping, arm weakness, slurred speech), very high or very low blood sugar with confusion or drowsiness, a seizure, or any other emergency, **call 108 or 112 now** or go to the nearest hospital emergency department.

---
## Part 2. Niramay Diabetes and Heart Care Centre: diabetes and metabolic pages

All pages in this part: **Medically reviewed by Dr. Ajay V. Kaduskar.** Each page ends with the standard author box, CTA and emergency note from Part 0.

---

### Page 7. Diabetes and Metabolic Care (hub)

- **URL:** `/diabetes/`
- **SEO title:** Diabetes Care in Nagpur | Niramay Diabetes and Heart Care Centre
- **Meta description:** Care for type 1, type 2 and pregnancy diabetes, prediabetes, thyroid and blood pressure with Dr. Ajay Kaduskar in Dhantoli, Nagpur. Tests, eye screening and diet advice in one place.
- **Schema:** MedicalWebPage, MedicalCondition (Diabetes mellitus)
- **Images:** `Dr ajay.jpg`, `NiramayClinics_slide_img2.jpg`, `Diabetes_Care.png`

**H1:** Diabetes and metabolic care in Nagpur

Diabetes is now one of the most common long-term conditions in India. The national ICMR-INDIAB study estimated that about 101 million Indians were living with diabetes in 2021, and another 136 million had prediabetes. Many people with type 2 diabetes have no symptoms for years, which is why diagnosis is often late and complications are sometimes the first sign.

At the Niramay Diabetes and Heart Care Centre, Dr. Ajay V. Kaduskar and the clinic team look after people with diabetes for the long term. The aim is simple: keep blood sugar, blood pressure, cholesterol and weight in a healthy range, and catch any complication early, while keeping treatment practical for daily life.

#### Conditions we care for
- **Type 2 diabetes**, newly diagnosed or long-standing
- **Type 1 diabetes**, in teenagers and adults
- **Diabetes in pregnancy**, including gestational diabetes
- **Prediabetes**, when sugar levels are above normal but not yet in the diabetes range
- **Thyroid disorders**, which are common in people with diabetes
- **High blood pressure** and **high cholesterol**, which add to heart and kidney risk
- **Obesity** and **fatty liver**, which often travel with diabetes

#### What your care includes
1. **A detailed first consultation**: history, examination, review of all reports and medicines.
2. **Baseline tests in our laboratory**: HbA1c, fasting and post-meal sugar, kidney function, urine albumin, cholesterol, liver and thyroid tests as needed.
3. **Complication screening**: retinal photography for the eyes, foot examination, kidney tests, and ECG or Echo where indicated.
4. **A written plan**: your targets, medicines, diet and activity, and when to test at home.
5. **Nutrition counselling** with our nutritionist, based on your usual meals.
6. **Regular review**: usually every 3 months while sugar is being brought under control, and as advised after that.

#### When to get tested
Get your blood sugar checked if you have any of the following:
- Age above 30, especially with a family history of diabetes
- Waist above 90 cm (men) or 80 cm (women)
- Little physical activity, or a desk job
- High blood pressure or high cholesterol
- Diabetes in a previous pregnancy, or PCOS
- Symptoms such as frequent urination, unusual thirst, tiredness, blurred vision, slow-healing wounds or repeated infections

#### Explore
Type 2 diabetes · Type 1 diabetes · Diabetes in pregnancy · Complications screening · Complete Diabetes Care Programme · Prediabetes and risk assessment · Thyroid clinic · Hypertension clinic · Nutrition and lifestyle counselling

#### Frequently asked questions
**What are normal blood sugar levels?**
For most adults without diabetes, fasting blood sugar is below 100 mg/dL and HbA1c is below 5.7%. Diabetes is usually diagnosed when fasting sugar is 126 mg/dL or higher, a 2-hour glucose tolerance test reading is 200 mg/dL or higher, or HbA1c is 6.5% or higher, confirmed on repeat testing. Your doctor will interpret results in context.

**What is HbA1c and do I need to fast for it?**
HbA1c reflects your average blood sugar over roughly the past three months. It does not need fasting. It is one of the most useful numbers for tracking diabetes control.

**Can diabetes be cured?**
Type 1 diabetes cannot be cured at present and always needs insulin. Some people with type 2 diabetes, particularly early in the condition, can bring their sugar back into the normal range without medicines after significant weight loss. Doctors call this remission, not cure, because sugar can rise again, so regular checks continue for life. Whether remission is a realistic goal for you is something to discuss at your consultation.

**Once my sugar is normal, can I stop my medicines?**
Please do not stop or reduce medicines on your own. Normal readings usually mean the treatment is working. Any change should be made by your doctor after reviewing your results.

**Do diabetes medicines damage the kidneys?**
Uncontrolled diabetes is a leading cause of kidney damage. Medicines prescribed for diabetes are chosen with your kidney function in mind, and several protect the kidneys and heart. Your kidney tests are checked regularly so treatment can be adjusted.

**Do you treat diabetes in children?**
Teenagers with type 1 or type 2 diabetes are seen by Dr. Ajay Kaduskar, often together with Dr. Prajakta Kaduskar for growth, school and emotional support. **[CONFIRM: minimum age seen for diabetes]**

---

### Page 8. Type 2 Diabetes

- **URL:** `/diabetes/type-2-diabetes/`
- **SEO title:** Type 2 Diabetes Treatment in Nagpur | Dr. Ajay Kaduskar
- **Meta description:** Personalised type 2 diabetes care in Nagpur: diagnosis, diet, activity, medicines, insulin when needed, and regular complication screening at Niramay Clinics.
- **Schema:** MedicalWebPage, MedicalCondition

**H1:** Type 2 diabetes care

Type 2 diabetes happens when the body does not respond well to insulin (insulin resistance) and the pancreas gradually cannot make enough insulin to keep up. Over time, high blood sugar can damage blood vessels and nerves, which is how complications in the eyes, kidneys, feet and heart develop. Good control, started early, lowers that risk considerably.

#### Why Indians develop diabetes earlier
Many Indians develop type 2 diabetes at a younger age and at a lower body weight than people in Western countries. Doctors call this the "Asian Indian phenotype": more fat around the abdomen and in the liver, and less muscle, even when weight looks normal. This is why waist size matters as much as weight, and why testing should not wait for symptoms.

#### How we manage type 2 diabetes
**1. Understanding where you are.** We look at your HbA1c, home readings, weight, waist, blood pressure, cholesterol, kidney and liver tests, and any existing complications. Body composition analysis shows how much of your weight is fat and how much is muscle.

**2. Setting your targets.** For many adults, an HbA1c below 7% is a reasonable target, but targets are individual. Older adults, people with heart disease, or those prone to low sugar may have different goals.

**3. Food and activity first.** Our nutritionist plans meals around what you already eat: rotis, rice, dal, sabzi, snacks, festival food. Small, steady changes in portion, timing and food quality work better than strict diets that cannot be kept up. Regular walking and simple strength exercises improve insulin sensitivity.

**4. Medicines when needed.** Most people with type 2 diabetes need one or more medicines at some stage, because the condition tends to progress over years. Modern diabetes medicines differ in how they work. Some also help with weight or protect the heart and kidneys. Your doctor will choose based on your sugar levels, weight, kidney function, heart health, cost and preference, and explain the reason for each.

**5. Insulin when it is the right tool.** Insulin is not a punishment or a sign of failure. It is sometimes the safest and most effective way to bring sugar down, for example at diagnosis with very high readings, during illness, surgery or pregnancy, or when tablets are no longer enough. We teach injection technique, dose timing, and how to recognise and treat low sugar.

**6. Home monitoring.** We advise how often to check sugar with a glucometer, and whether a continuous glucose monitor (CGM) sensor would be useful for you.

**7. Screening for complications** at least once a year: eyes, kidneys, feet, nerves, heart and cholesterol.

#### Low blood sugar (hypoglycaemia): know the signs
Shakiness, sweating, sudden hunger, palpitations, confusion, irritability or blurred vision. If you are on insulin or certain tablets and feel these symptoms, check your sugar. If it is below 70 mg/dL, take 15 g of fast-acting sugar (for example 3 teaspoons of sugar or glucose powder in water, or half a glass of fruit juice), recheck after 15 minutes and repeat if still low. Then eat a small snack. If the person is drowsy, confused or unconscious, do not give anything by mouth: call 108 or 112.

#### Frequently asked questions
**Can I eat rice, roti, fruit or mangoes?**
Yes, in the right amounts and combinations. No single food is completely banned. Portion size, what you eat it with (protein, fibre, vegetables) and timing make the difference. Seasonal fruits, including mango, can usually be fitted in as a measured portion in place of another carbohydrate, not on top of a full meal. Our nutritionist will show you how.

**Are jaggery, honey or "sugar-free" sweets safe?**
Jaggery and honey raise blood sugar much like sugar does. Products labelled "sugar-free" often contain refined flour, fat or other sugars. Artificial sweeteners in small amounts are generally acceptable for most adults, but they do not make a sweet healthy. Read labels and discuss with our nutritionist.

**Is a continuous glucose monitor (CGM) worth it?**
A CGM sensor shows how your sugar changes through the day and night, including after meals and during sleep. It is very useful for people on insulin, those with frequent lows, and during the first months of treatment when you are learning how food affects you. It is not needed for everyone. We will advise whether it helps in your case.

**I am fasting for a festival or religious reason. What should I do?**
Treatment should be adjusted, not stopped. Talk to us at least two weeks before planned fasts such as Navratri, Ramzan or Ekadashi so that medicine timing and doses can be changed safely and you know when to break the fast.

**How often should I see the doctor?**
Usually every 3 months until your targets are reached, then every 3 to 6 months. Sooner if readings change or you feel unwell.

**What about diabetes and fatty liver?**
Fatty liver is common in people with type 2 diabetes and obesity and often has no symptoms. We check liver tests and assess liver fat risk, and weight management helps both conditions.

---

### Page 9. Type 1 Diabetes

- **URL:** `/diabetes/type-1-diabetes/`
- **SEO title:** Type 1 Diabetes Care in Nagpur | Insulin, CGM and Family Support
- **Meta description:** Type 1 diabetes care for teenagers and adults in Nagpur: insulin planning, sugar monitoring, sick-day rules, diet and emotional support for the whole family.
- **Schema:** MedicalWebPage, MedicalCondition

**H1:** Type 1 diabetes care

In type 1 diabetes, the body's immune system destroys the cells in the pancreas that make insulin. It usually begins in childhood, adolescence or early adulthood, but can start at any age. It is not caused by eating sugar or by anything the person or parents did. Insulin is needed every day, for life.

Living well with type 1 diabetes is entirely possible. It takes a good insulin plan, regular monitoring, understanding of food, and a team the family can reach when questions come up.

#### What type 1 care at Niramay includes
- **Diagnosis and education** at the start, for the patient and family: what insulin does, how to inject, where to inject, how to store insulin
- **Insulin plan** matched to meals, school or work, sports and sleep
- **Monitoring**: glucometer technique and when to test; guidance on continuous glucose monitoring (CGM) sensors
- **Carbohydrate awareness**: our nutritionist teaches how to estimate carbohydrates in Indian meals and match insulin to them
- **Low sugar (hypoglycaemia) plan**: recognising and treating lows, and a written plan for school or the workplace
- **Sick-day rules**: what to do with insulin and testing during fever, vomiting or diarrhoea, and when to come to hospital
- **Screening** for thyroid problems and coeliac disease, which are more common with type 1 diabetes, and yearly complication checks as advised
- **Emotional support**: diabetes burnout, fear of lows and teenage struggles with routine are common and treatable. Dr. Prajakta Kaduskar supports teenagers and families when needed.

#### Warning signs of diabetic ketoacidosis (DKA)
Nausea, vomiting, stomach pain, deep or fast breathing, fruity-smelling breath, extreme tiredness or confusion, and high sugar readings. DKA is an emergency. **Go to a hospital emergency department immediately, or call 108 or 112.** Never stop insulin during illness, even if not eating.

#### Frequently asked questions
**Can type 1 diabetes be managed with tablets or diet alone?**
No. People with type 1 diabetes always need insulin. Diet and activity help, but cannot replace insulin.

**Can my child play sports and go on school trips?**
Yes. With planning around insulin, snacks and testing, children and teenagers with type 1 diabetes can take part in sports, trips and normal school life. We provide a written plan for the school.

**Is an insulin pump or CGM available?**
We advise on whether a CGM sensor or an insulin pump suits you and help you start and adjust. **[CONFIRM: whether pump initiation is offered at the clinic]**

**Will my child be able to marry and have a career?**
Yes. People with well-managed type 1 diabetes study, work in almost every profession, marry and have healthy children. Women with type 1 diabetes should plan pregnancy with their doctor in advance.

---

### Page 10. Diabetes in Pregnancy

- **URL:** `/diabetes/diabetes-in-pregnancy/`
- **SEO title:** Gestational Diabetes and Diabetes in Pregnancy | Nagpur
- **Meta description:** Care for gestational diabetes and pre-existing diabetes in pregnancy in Nagpur, in coordination with your obstetrician: testing, diet, insulin, monitoring and follow-up after delivery.
- **Schema:** MedicalWebPage, MedicalCondition (Gestational diabetes)

**H1:** Diabetes in pregnancy

When a woman has diabetes during pregnancy, two people are being cared for at once. Well-controlled sugar lowers the risk of complications for both mother and baby, including a very large baby, difficult delivery, low sugar in the newborn and high blood pressure in the mother.

Dr. Ajay Kaduskar works alongside your obstetrician. Your gynaecologist remains in charge of your pregnancy; we take care of the sugar.

#### Two situations
**Gestational diabetes (GDM):** high blood sugar that is first found during pregnancy. India's national guidelines recommend testing all pregnant women with a glucose test at the first antenatal visit and again at 24 to 28 weeks. Most women with GDM return to normal sugar after delivery, but have a higher chance of type 2 diabetes later in life.

**Pre-existing diabetes:** a woman with type 1 or type 2 diabetes who becomes pregnant, or plans to. Planning before conception is ideal. Sugar control, a review of all medicines (some must be changed before pregnancy), folic acid and eye and kidney checks should be done before trying to conceive.

#### How we help
- Interpreting your glucose test and confirming the diagnosis
- A pregnancy-specific diet plan from our nutritionist, with enough nourishment for you and the baby
- Home sugar monitoring: when to test (usually fasting and after meals) and what targets to aim for
- Medicines or insulin if diet alone is not enough. Insulin does not harm the baby. Medicines are chosen only from those considered appropriate in pregnancy.
- Regular sharing of readings and plans with your obstetrician
- **After delivery:** a sugar test about 6 to 12 weeks after the baby is born, then regular checks every 1 to 3 years, because the risk of type 2 diabetes stays higher. Breastfeeding and a return to a healthy weight help lower that risk.

#### Frequently asked questions
**Will my baby be born with diabetes?**
No. Babies are not born with diabetes because the mother had gestational diabetes. Newborns may have low sugar in the first hours, which the hospital team checks. Good sugar control in pregnancy reduces this.

**Is insulin safe during pregnancy?**
Yes. Insulin does not cross the placenta in significant amounts and has been used safely in pregnancy for decades.

**Can I breastfeed if I had diabetes in pregnancy?**
Yes, and it is encouraged. Breastfeeding helps lower blood sugar after delivery. If you have pre-existing diabetes, doses may need adjustment while breastfeeding.

**I had gestational diabetes before. What about my next pregnancy?**
The chance of GDM in a later pregnancy is higher. Get your sugar checked before planning the next pregnancy and early in it.

---

### Page 11. Diabetes Complications Screening

- **URL:** `/diabetes/complications-screening/`
- **SEO title:** Diabetes Complications Screening in Nagpur | Eyes, Kidneys, Feet, Heart
- **Meta description:** Yearly diabetes complication checks under one roof in Nagpur: retinal photography, kidney tests, foot and nerve examination, ECG and heart assessment.
- **Schema:** MedicalWebPage, MedicalTest
- **Images:** `NiramayClinics_slide_img2.jpg` (hero), `NirmayClinics_Diabetes_Complication_Screening1.jpg`, `NirmayClinics_Diabetes_Complication_Screening2.jpg`

**H1:** Diabetes complications screening

High blood sugar over years can quietly affect the small blood vessels of the eyes, kidneys and nerves, and the large blood vessels of the heart, brain and legs. Early damage usually causes no symptoms. Found early, much of it can be slowed or treated. Found late, it can lead to vision loss, kidney failure, foot ulcers or heart attack.

Screening is a central part of diabetes care at Niramay Clinics, and most of it can be completed in one visit at the clinic.

#### What we check, and why

| Area | Test | What it looks for | How often (typical) |
|---|---|---|---|
| Eyes | Retinal photograph with a fundus camera | Diabetic retinopathy: changes in the blood vessels at the back of the eye | Every year, more often if changes are found |
| Kidneys | Urine albumin to creatinine ratio, blood creatinine with eGFR | Early protein leak and reduced kidney filtering | Every year |
| Feet | Foot examination: skin, pulses, sensation tests | Nerve damage (neuropathy), poor circulation, pressure points | Every year, every visit if high risk |
| Heart | Blood pressure, cholesterol, ECG; Echo or TMT if indicated | Heart strain, silent heart disease, risk factors | BP every visit, cholesterol yearly, ECG as advised |
| Liver | Liver tests and fatty liver assessment | Fatty liver disease | As advised |

#### About the eye screening
We use a retinal camera that photographs the back of the eye. It takes a few minutes and is painless. If changes are found, you will be referred to an eye specialist (ophthalmologist) for further assessment and treatment. Screening does not replace a full eye examination by an ophthalmologist when that is needed. **[CONFIRM: whether drops to widen the pupil are used; who reads the images]**

#### Looking after your feet at home
- Look at your feet every day, including between the toes. Use a mirror or ask a family member.
- Wash and dry carefully, especially between toes.
- Never walk barefoot, even at home or at a temple.
- Wear well-fitting footwear with closed heels.
- Do not cut corns or use corn plasters. Show them to us.
- Seek care the same day for any wound, blister, redness, swelling or colour change.

#### Frequently asked questions
**I see clearly. Do I still need eye screening?**
Yes. Diabetic eye damage often causes no change in vision until it is advanced. A yearly retinal photograph is the only way to know.

**My urine report says "protein nil". Are my kidneys fine?**
Routine urine tests miss small amounts of protein. The urine albumin to creatinine ratio (UACR) is a more sensitive test and is part of yearly screening.

**Why is my heart checked if I have no chest pain?**
People with diabetes can have heart disease without typical chest pain. Checking blood pressure, cholesterol and ECG regularly, and doing an Echo or treadmill test when indicated, helps find problems earlier.

---

### Page 12. Complete Diabetes Care Programme

- **URL:** `/diabetes/diabetes-care-programme/`
- **SEO title:** Complete Diabetes Care Programme | Niramay Clinics Nagpur
- **Meta description:** A structured yearly diabetes care programme in Nagpur: planned consultations, tests, complication screening and nutrition sessions, organised in one place.
- **Schema:** MedicalWebPage

> **[CONFIRM: The old site mentions a "Complete Diabetes Care Package" but never described it. The structure below is a proposal based on standard yearly diabetes care. The clinic must confirm the components, the number of visits, validity, and whether a price is shown. If a price is shown, list exactly what is included and excluded.]**

**H1:** Complete Diabetes Care Programme

Diabetes is a lifelong condition, and good care follows a rhythm: regular reviews, tests at the right intervals, and yearly screening for complications. The Complete Diabetes Care Programme organises a full year of that care in advance, so nothing is missed and costs are clear from the start.

#### What the programme includes (proposed)
- **Consultations:** an initial detailed consultation with Dr. Ajay Kaduskar and follow-up consultations through the year **[CONFIRM: number, e.g. 4]**
- **Quarterly tests:** HbA1c and fasting and post-meal blood sugar
- **Yearly tests:** lipid profile, kidney function with eGFR, urine albumin to creatinine ratio, liver tests, thyroid test (TSH), complete blood count, vitamin B12 for people on certain long-term diabetes medicines **[CONFIRM list]**
- **Complication screening:** retinal photography, foot and nerve examination, ECG
- **Body composition analysis** at the start and end of the year
- **Nutrition counselling sessions** **[CONFIRM: number]**
- **A personal diabetes record**: your targets, results and medicine changes kept in one place

#### Who it is for
- People newly diagnosed with diabetes who want a structured first year
- People with long-standing diabetes who have missed regular screening
- Families who prefer planned, predictable costs

#### What is not included
Medicines, insulin, glucometer strips and CGM sensors, specialist referrals (for example to an eye surgeon or nephrologist), and any tests beyond the list above are charged separately. **[CONFIRM]**

#### Frequently asked questions
**Can I join at any time of year?**
Yes. The programme runs for 12 months from your first visit. **[CONFIRM]**

**Is it covered by health insurance?**
Outpatient coverage depends on your policy. We provide bills and reports for claims. **[CONFIRM]**

---

### Page 13. Prediabetes and Diabetes Risk Assessment

- **URL:** `/diabetes/prediabetes-risk-assessment/`
- **SEO title:** Prediabetes and Diabetes Risk Check in Nagpur | Niramay Clinics
- **Meta description:** Find out your diabetes risk and act early. Prediabetes testing, Indian Diabetes Risk Score, waist and body composition check, and a practical prevention plan in Nagpur.
- **Schema:** MedicalWebPage, MedicalCondition (Prediabetes)
- **Developer note:** add an interactive Indian Diabetes Risk Score (IDRS) calculator (age, waist, physical activity, family history), with the result shown as low, moderate or high risk and a "book a test" button. The calculator must state that it is a screening tool, not a diagnosis.

**H1:** Prediabetes and diabetes risk assessment

Prediabetes means your blood sugar is higher than normal but not yet in the diabetes range. In India, more people have prediabetes than diabetes. It is the stage where action pays off most: lifestyle changes started now can delay or prevent type 2 diabetes for many people.

#### How prediabetes is identified
- **Fasting blood sugar:** 100 to 125 mg/dL
- **2-hour glucose tolerance test:** 140 to 199 mg/dL
- **HbA1c:** 5.7% to 6.4%

#### Are you at risk?
Answer these four questions, a simplified version of the Indian Diabetes Risk Score developed by the Madras Diabetes Research Foundation:
1. Are you 35 or older?
2. Is your waist 90 cm or more (men), or 80 cm or more (women)?
3. Do you get less than 30 minutes of physical activity on most days?
4. Do one or both of your parents have diabetes?

If you answered yes to two or more, a blood sugar test is worthwhile, even if you feel well. **[Developer: link to calculator]**

#### What the risk assessment at Niramay includes
- Consultation with history and examination
- Fasting sugar, HbA1c, and a glucose tolerance test when needed
- Waist measurement and body composition analysis (fat, muscle and visceral fat)
- Blood pressure, cholesterol and liver tests if indicated
- A practical prevention plan with our nutritionist

#### What helps
- Losing 5% to 7% of body weight, if overweight, lowers the risk of progressing to diabetes
- At least 150 minutes of brisk walking or similar activity per week, plus some strength exercise
- Fewer refined carbohydrates and sugary drinks; more vegetables, pulses and protein
- Regular sleep, and attention to stress
- Re-testing every year

#### Frequently asked questions
**I am thin. Can I still get diabetes?**
Yes. Many Indians develop diabetes at a normal body weight because of fat stored around the abdomen and liver, and lower muscle mass. Waist size and family history matter.

**Will prediabetes always turn into diabetes?**
No. Many people return to normal sugar levels with lifestyle changes. Without changes, the risk of progression over the coming years is high.

**Do I need medicines for prediabetes?**
Lifestyle change is the first step. In some higher-risk situations, your doctor may discuss medicines. This is decided individually.

---

### Page 14. Thyroid Clinic

- **URL:** `/thyroid-clinic/`
- **SEO title:** Thyroid Clinic in Nagpur | Hypothyroidism and Hyperthyroidism Care
- **Meta description:** Diagnosis and treatment of thyroid disorders in Nagpur: underactive and overactive thyroid, thyroid in pregnancy, and thyroid problems with diabetes. In-house thyroid tests.
- **Schema:** MedicalWebPage, MedicalCondition

**H1:** Thyroid clinic

The thyroid is a small gland in the neck that controls how fast the body uses energy. Thyroid disorders are common in India, especially in women, and are more common in people with diabetes. Most are easily diagnosed with a blood test and well controlled with treatment.

#### Common thyroid conditions we treat
- **Hypothyroidism (underactive thyroid):** tiredness, weight gain, feeling cold, constipation, dry skin, hair fall, slow thinking, heavy or irregular periods, low mood
- **Hyperthyroidism (overactive thyroid):** weight loss despite good appetite, palpitations, tremor, sweating, anxiety, poor sleep, loose stools
- **Subclinical thyroid disease:** abnormal TSH with normal thyroid hormone levels, which may or may not need treatment
- **Thyroid in pregnancy and planning pregnancy**, where targets are stricter
- **Goitre and thyroid nodules**: initial evaluation and referral for scans or specialist surgery where needed

#### Tests
TSH, free T4 and, when needed, free T3 and thyroid antibodies, all available at Niramay Laboratory. Thyroid ultrasound is arranged through a referral when required.

#### Frequently asked questions
**Do I need to fast for a thyroid test?**
Usually no. If you already take a thyroid tablet, ask whether to take it before or after the blood sample on the test day.

**Will I need thyroid tablets for life?**
Many people with hypothyroidism need long-term treatment, but the dose is reviewed regularly. Some conditions, such as thyroid changes after pregnancy, can be temporary.

**Can I take my thyroid tablet with tea, coffee or other medicines?**
Thyroid hormone tablets are best taken on an empty stomach with water, usually 30 to 60 minutes before breakfast. Calcium, iron and some other medicines should be taken at a different time. Follow the timing your doctor gives you.

**Can a thyroid problem cause weight gain?**
An underactive thyroid can add a few kilograms, mostly from fluid, and can make weight loss harder. Treating it helps, but it is rarely the only cause of significant weight gain.

---

### Page 15. Hypertension Clinic

- **URL:** `/hypertension-clinic/`
- **SEO title:** High Blood Pressure Treatment in Nagpur | Hypertension Clinic
- **Meta description:** Diagnosis and long-term care of high blood pressure in Nagpur: accurate measurement, tests for causes and organ damage, lifestyle and medicines, ECG and Echo on site.
- **Schema:** MedicalWebPage, MedicalCondition (Hypertension)

**H1:** Hypertension clinic

High blood pressure is often called a silent condition because most people feel nothing until it causes damage. The ICMR-INDIAB study estimated that more than a third of Indian adults have high blood pressure, and many do not know it. Over years, uncontrolled blood pressure strains the heart, kidneys, eyes and brain and raises the risk of heart attack and stroke.

#### When is blood pressure "high"?
In Indian and international guidelines, a clinic reading of **140/90 mmHg or higher** on repeated occasions is usually diagnosed as hypertension. At home, the threshold is lower: an average of **135/85 mmHg or higher**. Readings between 120/80 and 139/89 are above the ideal range and deserve attention, especially with diabetes.

#### What the hypertension clinic includes
- Accurate measurement in the clinic, and guidance on home blood pressure monitoring
- Tests to look for causes in younger patients or difficult cases: kidney function, electrolytes, thyroid, urine tests, and others as indicated
- Checks for organ effects: ECG, 2D Echo when indicated, kidney tests, retinal photograph
- Assessment of overall heart risk: cholesterol, sugar, smoking, weight and family history
- A treatment plan: salt and diet changes with our nutritionist, activity, weight, sleep and stress, and medicines when needed
- Regular follow-up until blood pressure is at target, then periodic review

#### How to check blood pressure at home
- Use an automatic upper-arm monitor, not a wrist monitor
- Sit quietly for 5 minutes, back supported, feet flat, arm resting at heart level
- No tea, coffee, smoking or exercise for 30 minutes before
- Take two readings one minute apart, morning and evening, for 7 days before your visit, and bring the record

#### Frequently asked questions
**My blood pressure is normal now. Can I stop the tablets?**
Normal readings on treatment usually mean the treatment is working. Stopping suddenly can make pressure rise again. Discuss any change with your doctor.

**I feel fine. Why do I need treatment?**
High blood pressure damages blood vessels whether or not you feel symptoms. Treatment lowers the risk of stroke, heart attack and kidney disease.

**Are low-sodium salt substitutes safe?**
They help many people reduce sodium, but they contain potassium, which can be unsafe if you have kidney disease or take certain blood pressure medicines. Ask before switching.

**Is 130/85 high blood pressure?**
It is above the ideal range. With diabetes, kidney disease or high heart risk, your doctor may aim for lower targets.

---

### Page 16. Nutrition and Lifestyle Counselling

- **URL:** `/nutrition-lifestyle-counselling/`
- **SEO title:** Diet and Nutrition Counselling for Diabetes and Weight | Nagpur
- **Meta description:** Personalised diet plans for diabetes, weight, thyroid, blood pressure and pregnancy in Nagpur, built around Indian home food, your routine and family habits.
- **Schema:** MedicalWebPage
- **Images:** nutrition photo **[re-shoot needed]**

**H1:** Nutrition and lifestyle counselling

Food is the first and most neglected part of treatment for diabetes, weight, blood pressure and cholesterol. There is no single diet that suits everyone. A plan that works is one you can follow on a busy weekday, at a family function and during festivals.

Our nutritionist works with Dr. Ajay Kaduskar's patients to build eating plans around their own food, culture and routine. **[CONFIRM: nutritionist's name and qualification]**

#### Who it helps
- Type 1, type 2 and pregnancy diabetes
- Prediabetes
- Weight management, including people on weight-loss medicines, to protect muscle and nutrition
- High blood pressure and cholesterol
- Fatty liver
- Thyroid disorders
- Teenagers with weight concerns or PCOS (with Blooming Buds)

#### What a session covers
- A review of what you eat on a typical day, including tea, snacks and weekends
- Your test results and the targets set by your doctor
- A practical plan: portion sizes using everyday utensils, food swaps, meal timing, protein at every meal, fibre, and smart snacks
- Eating out, travel, shift work, fasting days and festivals
- Activity: a realistic walking and strength routine
- Sleep, stress and alcohol or tobacco, where relevant
- Follow-up sessions to adjust the plan

#### Principles we follow
- No crash diets and no starvation
- No forbidden foods, but clear guidance on how often and how much
- Plans for the whole family where possible, so you do not cook separately
- No supplements or products are sold or promoted in counselling sessions **[CONFIRM]**

#### Frequently asked questions
**Is intermittent fasting good for diabetes?**
Some people do well with time-restricted eating, but it can cause low sugar in people on insulin or certain tablets. Discuss it with your doctor before trying it.

**Should I go keto or low-carb?**
Reducing refined carbohydrates helps most people with diabetes. Very strict diets are hard to maintain and are not suitable for everyone, for example in pregnancy or kidney disease. We help you find a level you can sustain.

**Can the plan include my family's food?**
Yes. We usually plan around the meals cooked at home, with changes in portions and combinations rather than separate cooking.

---
## Part 3. Weight management and heart care pages

All pages: **Medically reviewed by Dr. Ajay V. Kaduskar.**

---

### Page 17. Obesity and Weight Management (hub)

- **URL:** `/obesity/`
- **SEO title:** Medical Weight Management in Nagpur | Obesity Clinic, Niramay Clinics
- **Meta description:** Doctor-led obesity care in Nagpur with a SCOPE-certified consultant: finding the cause, diet and activity plans, medicines when appropriate, and body composition tracking.
- **Schema:** MedicalWebPage, MedicalCondition (Obesity)
- **Images:** `Obesity_Care.png` (to be redrawn without a body silhouette), body composition photo **[re-shoot needed]**

**H1:** Obesity and weight management

Obesity is a long-term medical condition, not a lack of willpower. Genes, hormones, sleep, stress, medicines, work patterns and the food around us all play a part. Excess body fat, especially around the abdomen, raises the risk of type 2 diabetes, high blood pressure, fatty liver, sleep apnoea, joint pain, PCOS, heart disease and some cancers.

At Niramay Clinics, weight management is led by Dr. Ajay V. Kaduskar, who holds SCOPE certification in obesity management from the World Obesity Federation. The focus is on health, not a number on the scale: lowering harmful fat, protecting muscle, and improving sugar, blood pressure, liver health and energy.

#### How obesity is measured in Indians
Indians tend to carry more fat, especially abdominal fat, at a lower body weight. Indian guidelines therefore use lower cut-offs than Western charts:
- **Body mass index (BMI):** 23 to 24.9 is overweight; 25 and above is obesity
- **Waist:** 90 cm or more in men, 80 cm or more in women indicates abdominal obesity, which carries the most risk
- **Body composition analysis** adds detail: fat percentage, visceral (deep abdominal) fat and muscle mass

#### Our approach, step by step
1. **Find the cause.** History, medicines, sleep, eating pattern and tests for thyroid, hormones, sugar and other contributors. Finding the reason matters before starting treatment.
2. **Measure what matters.** Weight, waist, blood pressure, sugar, cholesterol, liver tests and body composition.
3. **Set realistic goals.** Losing 5% to 10% of body weight improves sugar, blood pressure and liver fat for many people. Goals are agreed together.
4. **Nutrition plan** with our nutritionist, based on your food and routine.
5. **Activity plan** that you can actually start, including strength exercise to protect muscle.
6. **Medicines, when appropriate.** For some people, approved medicines for weight management are added under supervision.
7. **Referral for bariatric (weight-loss) surgery** when it is the right option, and care before and after surgery.
8. **Regular follow-up** with body composition tracking, so we know whether weight lost is fat or muscle.

#### Explore
Medicines for weight management · Body composition and sarcopenia assessment · Nutrition and lifestyle counselling · Prediabetes and risk assessment

#### Frequently asked questions
**I eat very little but still cannot lose weight. Why?**
Weight is affected by more than calories: sleep, stress hormones, some medicines, thyroid function, muscle mass and past dieting all play a role. A medical assessment helps find what is working against you.

**How fast should I lose weight?**
For most people, about 0.5 to 1 kg per week is a safe pace. Faster loss often includes muscle loss and is harder to maintain.

**Can obesity in teenagers be treated here?**
Yes. Teenagers are seen at Blooming Buds by Dr. Prajakta Kaduskar, together with Dr. Ajay Kaduskar when medical treatment is needed.

**Is my weight the reason for my fatty liver?**
Excess weight and insulin resistance are the most common causes of fatty liver in India. Losing weight, especially abdominal fat, improves it.

---

### Page 18. Medicines for Weight Management

- **URL:** `/obesity/weight-management-medicines/`
- **SEO title:** Weight Loss Medicines and Injections: Doctor-Supervised Care, Nagpur
- **Meta description:** Thinking about weight-loss injections or tablets? Learn who they may suit, why medical supervision matters, side effects to know and how Niramay Clinics, Nagpur assesses you.
- **Schema:** MedicalWebPage
- **Compliance note for editors:** no brand or molecule names, no doses, no prices, no "before and after", no promise of a specific weight loss.

**H1:** Medicines for weight management: what you should know

Newer medicines, including weekly injections, have changed obesity treatment and are widely discussed in the news and on social media. They can help some people lose a meaningful amount of weight and improve sugar, blood pressure and other health markers. They are also prescription medicines with side effects, costs and limits, and they work best as part of a full plan.

At Niramay Clinics, these medicines are considered only after a medical assessment, and only for people for whom the expected benefit outweighs the risk.

#### Who may be considered
Medicines for weight management are generally considered for adults whose body weight is in the obesity range, or who are overweight and have weight-related conditions such as type 2 diabetes, prediabetes, high blood pressure, fatty liver or sleep apnoea, and for whom diet and activity changes alone have not been enough. Final eligibility follows current Indian guidelines and the approved use of each medicine.

#### Who should not take them, or needs extra care
- Pregnancy, planning pregnancy, or breastfeeding
- A personal or family history of certain thyroid cancers or endocrine tumours (applies to some medicines)
- Past pancreatitis or gallbladder disease
- Eating disorders
- Under 18, except in specific situations under specialist care
- People taking insulin or certain diabetes tablets, who need dose changes to avoid low sugar

#### What supervision at the clinic involves
- Assessment of weight, waist, body composition, sugar, kidney and liver function before starting
- Choice of medicine based on your health, other conditions and budget
- Gradual dose increases to reduce side effects
- Nutrition guidance to keep enough protein and protect muscle, with regular body composition checks
- Monitoring for side effects and adjustment of other medicines
- A plan for what happens after stopping

#### Common side effects to know about
Nausea, reduced appetite, fullness, vomiting, constipation or loose stools, especially in the first weeks and after dose increases. Less commonly, gallbladder problems or pancreatitis. **Seek urgent care for severe, persistent stomach pain, repeated vomiting, or signs of dehydration.**

#### A warning about fake and unsupervised use
Counterfeit and unregulated "weight-loss injections" are being sold online and through informal channels. They can be ineffective or dangerous. Take these medicines only on a doctor's prescription, buy them only from a licensed pharmacy, and never share pens.

#### Frequently asked questions
**Will I regain weight if I stop?**
Many people regain some weight after stopping, because appetite returns. This is why a long-term plan for food, activity and muscle strength matters, and why stopping should be planned with your doctor.

**Will I lose muscle?**
Some of the weight lost on any treatment can be muscle, which is not desirable. Adequate protein, strength exercise and body composition monitoring help limit this.

**Are injections better than tablets?**
It depends on the person, the medicine and the goal. Your doctor will explain the options that suit you.

**Can I start without seeing a doctor if a friend is using it?**
No. These are prescription medicines that need a medical assessment, monitoring and adjustment of other medicines.

---

### Page 19. Body Composition and Sarcopenia Assessment

- **URL:** `/obesity/body-composition-sarcopenia/`
- **SEO title:** Body Composition Analysis and Sarcopenia Check in Nagpur
- **Meta description:** Know your body fat, visceral fat and muscle mass with body composition analysis at Niramay Clinics, Nagpur. Screening for sarcopenia (age-related muscle loss).
- **Schema:** MedicalWebPage, MedicalTest
- **Images:** `Niramay waiting launge.jpg` crop showing the analyser **[re-shoot recommended]**

**H1:** Body composition analysis and sarcopenia assessment

Weight alone does not tell the full story. Two people with the same weight can have very different amounts of fat and muscle. Body composition analysis measures what your weight is made of, and helps us track whether treatment is reducing fat while protecting muscle.

#### What body composition analysis measures
- Total body fat and body fat percentage
- **Visceral fat**: fat deep in the abdomen around the organs, closely linked to diabetes, fatty liver and heart risk
- Skeletal muscle mass, and how it is distributed between arms, legs and trunk
- Body water

#### How the test is done
You stand barefoot on a platform and hold two handles for about a minute. A very small, painless electrical signal passes through the body to estimate fat, muscle and water. **[CONFIRM: analyser model if to be named; the clinic uses a body composition analyser at reception]**

**How to prepare:** come without a heavy meal in the previous 2 to 3 hours, empty your bladder, avoid exercise before the test, and remove metal jewellery. **This test is not done for people with a pacemaker or other implanted electronic device, or during pregnancy.**

#### Sarcopenia: when muscle is lost
Sarcopenia is the loss of muscle mass and strength. It happens with age, inactivity, illness and sometimes with rapid weight loss, and it is more common in people with diabetes. It leads to weakness, falls, slower recovery and worse sugar control.

Assessment at the clinic combines muscle mass from body composition analysis with simple tests of strength and physical performance, following the Asian Working Group for Sarcopenia criteria. **[CONFIRM: tests used, for example hand grip strength, chair stand test, walking speed]**

#### Who should get checked
- People with diabetes, especially over 50
- Anyone on a weight-loss programme or weight-loss medicine
- Older adults with weakness, falls or slowed walking
- People with a "normal" weight but a large waist

#### What helps protect muscle
Enough protein through the day, regular strength exercise, adequate vitamin D, staying active, and treating underlying conditions. Your plan will be based on your results.

---

### Page 20. Heart Care and Preventive Cardiology (hub)

- **URL:** `/heart-care/`
- **SEO title:** Heart Check-up and Preventive Cardiology in Nagpur | Niramay Clinics
- **Meta description:** Find heart risk early: blood pressure, cholesterol, sugar, ECG, 2D Echo and treadmill test (TMT) at Niramay Clinics, Dhantoli, Nagpur, with a clear prevention plan.
- **Schema:** MedicalWebPage
- **Images:** `NirmayClinics_Diabetes_Complication_Screening2.jpg` (cardiac room)

**H1:** Heart care and preventive cardiology

Heart attacks and strokes are among the leading causes of death in India, and they are striking people at younger ages. Most are linked to risk factors that can be found and treated years earlier: high blood pressure, diabetes, high cholesterol, smoking, abdominal obesity, inactivity and family history.

Preventive cardiology means finding those risks early and lowering them before they cause harm. It is one of Dr. Ajay Kaduskar's special interests, and the clinic has 2D Echo, ECG and treadmill testing (TMT) on site.

> **Important:** Niramay Clinics provides heart risk assessment and non-invasive heart tests. We are not an emergency or cardiac catheterisation facility. When a test shows significant heart disease, we refer you to a cardiologist or hospital promptly.

#### Heart risk assessment includes
- Blood pressure, pulse, weight, waist and body composition
- Fasting sugar and HbA1c, full lipid profile, kidney function
- ECG
- 2D Echo or TMT when indicated by symptoms or risk
- A calculation of your overall cardiovascular risk and a written plan to lower it

#### Who should get a heart check
- Adults with diabetes, high blood pressure or high cholesterol
- Smokers or former smokers
- A parent or sibling who had a heart attack or stroke at a young age (men under 55, women under 65)
- Breathlessness, chest discomfort on exertion, palpitations, or unexplained tiredness (see a doctor promptly)
- Anyone planning to start vigorous exercise after years of inactivity

#### Heart attack warning signs: call 108 or 112
Chest pain, pressure or tightness lasting more than a few minutes, pain spreading to the arm, jaw, neck or back, breathlessness, sweating, nausea, or sudden fainting. People with diabetes, women and older adults may have milder or unusual symptoms. **Do not drive yourself. Do not wait for a clinic appointment.**

#### Explore
2D Echo · ECG · TMT (treadmill stress test) · Hypertension clinic · Preventive health check-ups

#### Frequently asked questions
**My cholesterol is "slightly high". Do I need treatment?**
It depends on your overall heart risk, not on one number. Diabetes, blood pressure, smoking and family history change the target. Your doctor will explain.

**Is a heart check-up needed if I feel fit?**
If you have risk factors, yes. Many heart conditions develop without symptoms.

---

### Page 21. 2D Echo (Echocardiography)

- **URL:** `/heart-care/2d-echo/`
- **SEO title:** 2D Echo Test in Nagpur | Echocardiography at Niramay Clinics
- **Meta description:** 2D Echo (heart ultrasound) in Dhantoli, Nagpur. What it shows, how long it takes, how to prepare, and when your doctor may advise it.
- **Schema:** MedicalTest

> **[CONFIRM: who performs and reports the 2D Echo (name and qualification); appointment process; report turnaround time]**

**H1:** 2D Echo (echocardiography)

A 2D Echo is an ultrasound scan of the heart. It shows the heart's chambers, walls and valves moving in real time, and measures how well the heart pumps. It uses sound waves, not radiation, and is painless and safe, including in pregnancy.

#### What a 2D Echo can show
- How strongly the heart pumps (ejection fraction)
- Thickening of the heart muscle, often from long-standing high blood pressure
- Valve problems: narrowing or leaking
- Areas of the heart wall that move poorly, which can suggest past or current reduced blood supply
- Fluid around the heart, and other structural problems

#### When your doctor may advise it
Breathlessness, swelling of the feet, a heart murmur, palpitations, long-standing high blood pressure or diabetes, an abnormal ECG, chest pain evaluation, or before certain treatments.

#### How it is done
You lie on your left side. Gel is applied to the chest and a small probe is moved over it. The test usually takes 20 to 30 minutes.

#### How to prepare
No fasting is needed. Take your usual medicines. Wear a two-piece outfit. Bring previous Echo or ECG reports for comparison.

#### Frequently asked questions
**Is an Echo the same as an ECG?**
No. An ECG records the heart's electrical activity. An Echo is an ultrasound picture of the heart's structure and pumping. They give different information and are often done together.

**Can an Echo detect blocked arteries?**
Not directly. It can show effects of reduced blood supply on the heart muscle. A treadmill test, or other tests at a cardiac centre, may be needed to assess blockages.

---

### Page 22. ECG (Electrocardiogram)

- **URL:** `/heart-care/ecg/`
- **SEO title:** ECG Test in Nagpur | Electrocardiogram at Niramay Clinics
- **Meta description:** A quick, painless ECG at Niramay Clinics, Dhantoli, Nagpur. What it records, when it is needed, and what to expect.
- **Schema:** MedicalTest

**H1:** ECG (electrocardiogram)

An ECG records the electrical signals of your heart through small sticky pads placed on the chest, arms and legs. It takes about 5 to 10 minutes, is painless and needs no preparation.

#### What an ECG can show
- Heart rate and rhythm, including irregular rhythms such as atrial fibrillation
- Signs of a previous heart attack, or strain on the heart
- Thickening of the heart muscle
- Effects of some medicines and of potassium or other salt imbalances

#### When it is done
As part of diabetes and blood pressure check-ups, before some treatments, for palpitations, dizziness or chest discomfort, and in preventive health check-ups.

#### Good to know
A normal resting ECG does not rule out all heart disease, because some problems appear only during exertion. Your doctor may then advise a treadmill test or Echo.

**If you have chest pain right now, do not book an ECG. Call 108 or 112 or go to the nearest emergency department.**

---

### Page 23. TMT (Treadmill Stress Test)

- **URL:** `/heart-care/tmt-stress-test/`
- **SEO title:** TMT Test (Treadmill Stress Test) in Nagpur | Niramay Clinics
- **Meta description:** Treadmill stress test (TMT) in Dhantoli, Nagpur. Why it is done, how to prepare, what happens during the test and how results are used.
- **Schema:** MedicalTest

> **[CONFIRM: who supervises the TMT (doctor present throughout); protocol used; emergency equipment available, e.g. defibrillator and oxygen]**

**H1:** TMT (treadmill stress test)

A treadmill stress test shows how your heart responds to exercise. You walk on a treadmill while your ECG, heart rate and blood pressure are recorded. The speed and slope increase every few minutes. Some heart problems, particularly reduced blood flow from narrowed arteries, show up only when the heart is working harder.

#### Why it is done
- To evaluate chest discomfort or breathlessness on exertion
- To assess heart risk in people with diabetes or several risk factors
- To check exercise capacity and blood pressure response
- Before starting a vigorous exercise programme, when advised

#### How to prepare
- Have only a light meal 2 to 3 hours before the test; no tea or coffee for a few hours before
- Wear comfortable clothes and walking shoes
- Bring all your medicines and previous reports. **Some heart and blood pressure medicines may need to be paused before a TMT, but only if your doctor tells you to.** Do not stop anything on your own.
- If you have diabetes, ask how to adjust your diabetes medicines on the test day

#### During the test
The test usually lasts 10 to 15 minutes, including recovery. A doctor and trained staff watch your ECG and blood pressure throughout. Tell them at once if you feel chest pain, severe breathlessness, dizziness or leg pain. The test is stopped when you reach the target heart rate, feel unable to continue, or if the readings show a reason to stop.

#### Who should not have a TMT
A TMT is not done if you have had a recent heart attack, have unstable chest pain, certain severe valve problems, uncontrolled high blood pressure, or cannot walk on a treadmill. Your doctor will check this before the test.

#### Results
A "positive" TMT suggests reduced blood flow to the heart muscle during exertion and usually leads to referral to a cardiologist for further tests. A "negative" test is reassuring but does not rule out every heart problem. Your doctor will explain your result in context.

---

### Page 24. Preventive Health Check-ups

- **URL:** `/preventive-health-check-ups/`
- **SEO title:** Preventive Health Check-up Packages in Nagpur | Niramay Clinics
- **Meta description:** Doctor-reviewed health check-ups in Nagpur: diabetes, heart, thyroid, kidney and liver screening, with a consultation to explain your results and plan next steps.
- **Schema:** MedicalWebPage

> **[CONFIRM: The poster in the clinic lists "Preventive Health Check-ups". The packages below are proposals. Confirm names, test lists and whether prices are shown.]**

**H1:** Preventive health check-ups

A check-up is useful only if someone reads the results with you and explains what to do next. Every check-up at Niramay Clinics ends with a doctor's consultation, not just a printed report.

#### Proposed packages

**1. Essential Health Check**
For adults who want a basic annual review.
Consultation, BP, BMI and waist, fasting sugar, HbA1c, lipid profile, kidney function, liver function, TSH, complete blood count, urine routine.

**2. Diabetes and Heart Risk Check**
For adults over 30 with a family history of diabetes or heart disease, or with high blood pressure, high cholesterol or a large waist.
Everything in the Essential Health Check, plus ECG, urine albumin to creatinine ratio, body composition analysis, and 2D Echo or TMT if advised by the doctor.

**3. Women's Health Check**
Essential Health Check, plus haemoglobin and iron studies, vitamin D and vitamin B12, and advice on age-appropriate screening for breast and cervical cancer, with referral where needed.

**4. Senior Health Check (60 and above)**
Essential Health Check, plus ECG, vitamin D and B12, body composition with sarcopenia screening, and a review of all current medicines and vaccination status.

#### How to prepare
Fast for 10 to 12 hours before the visit (water is allowed). Take your usual medicines unless told otherwise, but bring diabetes medicines with you to take after the blood sample. Bring previous reports.

#### Frequently asked questions
**How long does a check-up take?**
Usually 2 to 3 hours including the post-meal sample and consultation. Some reports may be shared later the same day. **[CONFIRM]**

**Can I add tests?**
Yes, the doctor may suggest additional tests based on your history.

---
## Part 4. Blooming Buds Child and Adolescent Care Centre

All pages: **Medically reviewed by Dr. Prajakta A. Kaduskar**, except the adult section of the vaccination page (reviewed by both doctors).
**Image rule for this section:** no identifiable children in photos without written parental consent. Use `Child specialist niramay.jpg`, `Adolescent_Health_Care.png`, `Career_Counselling.png`, and illustrations.

---

### Page 25. Blooming Buds (hub)

- **URL:** `/blooming-buds/`
- **SEO title:** Child and Adolescent Health Clinic in Nagpur | Blooming Buds
- **Meta description:** Blooming Buds at Niramay Clinics, Nagpur: baby check-ups, vaccination, teen health, counselling, psychological testing and career guidance with Dr. Prajakta Kaduskar.
- **Schema:** MedicalClinic (department), MedicalWebPage

**H1:** Blooming Buds Child and Adolescent Care Centre

Children grow fast, and every stage brings new questions. A newborn's feeding, a toddler's first words, a ten-year-old's school stress, a fourteen-year-old's moods, a seventeen-year-old's career choices. Blooming Buds is a clinic for all of these, led by Dr. Prajakta A. Kaduskar, who is trained in child health, adolescent paediatrics and clinical psychology.

Adolescence, roughly 10 to 19 years, is a period of rapid physical, emotional and social change. It is also when many lifelong habits around food, sleep, screens and relationships are formed. We care for the body and the mind together, with parents as partners.

#### What we offer
- **Well baby clinic:** growth, development, feeding and sleep from birth
- **Vaccinations** for babies, children, teenagers and adults
- **Adolescent physical health:** growth and puberty, periods, PCOS, anaemia, weight, skin, sleep
- **Teen mental health and counselling:** stress, anxiety, low mood, anger, screens, bullying, self-esteem
- **Psychological testing:** IQ, emotional quotient (EQ) and personality assessment
- **Career counselling and aptitude testing**
- **Workshops** for schools, parents and teachers

#### How we work with families
- The first visit includes time with the parent and child together. With teenagers, part of the consultation is with the young person alone, so they can speak freely.
- We explain at the start what stays confidential and what will be shared. Anything that affects a young person's safety is always shared with parents, and where the law requires, with the appropriate authorities.
- Plans are practical and agreed with both the young person and the parents.

#### Our mission
To help adolescents and their families achieve good physical, emotional and mental wellbeing through compassionate, evidence-based healthcare, counselling, education and preventive care that support healthy lifestyles, emotional resilience, confidence and positive life choices.

---

### Page 26. Well Baby Clinic

- **URL:** `/blooming-buds/well-baby-clinic/`
- **SEO title:** Well Baby Clinic in Nagpur | Baby Growth and Development Check-ups
- **Meta description:** Regular baby check-ups in Nagpur: weight and growth charts, milestones, feeding, sleep, and vaccination reminders with Dr. Prajakta Kaduskar.
- **Schema:** MedicalWebPage

**H1:** Well baby clinic

Healthy babies need regular check-ups too. Well-baby visits track growth and development, catch problems early, and give parents a place to ask the questions that come up every week in the first years.

#### What happens at a well-baby visit
- Weight, length and head size, plotted on growth charts
- Developmental milestones: holding the head up, sitting, crawling, first words, walking, play and social smiles
- Feeding: breastfeeding support, formula when needed, and starting solid food at around six months
- Sleep, crying and safe sleep habits
- Vaccinations due, and a reminder for the next ones
- Vision, hearing and dental checks as appropriate for age
- Time for your questions

#### Suggested visit schedule
Usually at birth or in the first week, then at 6, 10 and 14 weeks, and 6, 9, 12, 15, 18 and 24 months, often combined with vaccination visits. After 2 years, once or twice a year. **[CONFIRM]**

#### When to see a doctor urgently
In a baby under 3 months: any fever. At any age: poor feeding, unusual drowsiness or floppiness, fast or difficult breathing, bluish lips, repeated vomiting, fewer wet nappies, a bulging soft spot, a seizure, or a rash that does not fade when pressed. **Go to the nearest children's emergency department.**

#### Frequently asked questions
**My baby is smaller than other babies. Should I worry?**
Babies grow at different rates. What matters most is steady growth along their own curve on the chart. We will tell you if the pattern needs attention.

**When should I start solid food?**
Around six months, while continuing breastfeeding. Start with soft, mashed home food and add variety gradually.

**How much screen time is safe for a baby or toddler?**
The Indian Academy of Pediatrics advises no screen time under 2 years, except video calls with family, and no more than 1 hour a day of good-quality content for ages 2 to 5, with a parent watching alongside.

---

### Page 27. Vaccinations for Children, Teenagers and Adults

- **URL:** `/vaccination/`
- **SEO title:** Vaccination Clinic in Nagpur | Child, Teen and Adult Vaccines
- **Meta description:** Vaccinations at Niramay Clinics, Nagpur, following the IAP schedule for children and current guidance for teenagers and adults, including HPV, flu and catch-up doses.
- **Schema:** MedicalWebPage
- **Reviewed by:** Dr. Prajakta A. Kaduskar (children and teenagers) and Dr. Ajay V. Kaduskar (adults)

**H1:** Vaccinations for children, teenagers and adults

Vaccines are one of the safest and most effective ways to protect against serious infections. We give vaccines for babies, children, teenagers and adults, following the Indian Academy of Pediatrics (IAP) immunisation schedule for children and current national and professional guidance for adults.

#### For babies and children
All vaccines in the IAP schedule, from birth through childhood, including the vaccines given in the national programme and the optional vaccines recommended by IAP. We keep a vaccination record for your child and remind you when the next dose is due. **[CONFIRM: reminder system, e.g. SMS or WhatsApp]**

#### For teenagers
- **Tdap or Td** booster around 10 and 16 years
- **HPV vaccine**, which protects against the virus that causes most cervical cancers and some other cancers. It works best when given before any exposure, so it is advised in early adolescence. In February 2026 the Government of India began a nationwide programme offering a free single dose of HPV vaccine to 14-year-old girls at government health facilities. For other ages and for boys, we will advise on the schedule.
- **Catch-up doses** for any vaccines missed in childhood
- Typhoid, hepatitis A, chickenpox and others as recommended

#### For adults
- **Influenza (flu)** every year, especially for people with diabetes, heart or lung disease, pregnant women and adults over 60
- **Pneumococcal** vaccines for older adults and for younger adults with diabetes or certain other long-term conditions, as advised
- **Tetanus-diphtheria (Td)** booster every 10 years, and during pregnancy as advised by your obstetrician
- **Hepatitis B** if not immune
- **Shingles (herpes zoster)** vaccine for adults over 50
- **HPV** for young adults who missed it

#### Before and after vaccination
- Bring the vaccination record card.
- Tell us about any previous reaction, allergy, fever, or medicines that affect immunity.
- Wait at the clinic for 15 to 30 minutes after the vaccine, as advised.
- Mild fever, soreness or swelling at the injection site for a day or two is common. Ask us about fever and pain relief at the visit.
- Seek help urgently for difficulty breathing, swelling of the face, a widespread rash, persistent high fever, or unusual drowsiness.

#### Frequently asked questions
**My child missed some vaccines. Is it too late?**
Usually not. Most vaccines can be given later as catch-up doses. Bring the record and we will plan a schedule.

**Can my child be vaccinated with a cold?**
A mild cold without high fever is usually not a reason to delay. We will check on the day.

**Is the HPV vaccine only for girls?**
HPV infects both sexes. The national programme currently covers 14-year-old girls. The vaccine can also be given to boys and to older girls and young women. Ask us what is suitable.

**Why do adults with diabetes need vaccines?**
Diabetes makes some infections, such as flu and pneumonia, more serious. Vaccination lowers that risk.

---

### Page 28. Adolescent Physical Health

- **URL:** `/blooming-buds/adolescent-health/`
- **SEO title:** Adolescent Health Clinic in Nagpur | Puberty, Periods, PCOS, Growth
- **Meta description:** Teen health care in Nagpur: growth and puberty, periods and PCOS, anaemia, weight, acne, sleep and nutrition, with Dr. Prajakta Kaduskar, adolescent health consultant.
- **Schema:** MedicalWebPage

**H1:** Adolescent physical health

The teenage years bring the fastest growth since infancy. Bodies change, appetites change, sleep shifts later, and new health concerns appear. Many teenagers find these topics awkward to raise. Our clinic gives them a private, respectful place to ask.

#### What we help with
- **Growth and development:** height, weight, delayed or early puberty
- **Puberty and menstrual health:** irregular, painful or heavy periods, period hygiene and myths
- **PCOS (polycystic ovary syndrome):** irregular periods, acne, excess hair, weight gain; evaluation and long-term support
- **Nutrition and healthy eating**, including fussy eating, skipping breakfast and junk-food habits
- **Weight concerns:** obesity, and also underweight or unhealthy dieting
- **Fitness and lifestyle counselling**
- **Anaemia**, which is very common in Indian adolescents, especially girls: screening and treatment
- **Vitamin deficiencies**, such as vitamin D and B12
- **Acne and skin health guidance**
- **Sleep problems**, including late nights linked to phones
- **Immunisation and preventive care**
- **Sexual and reproductive health education**, age-appropriate and confidential
- **Substance use awareness and prevention:** tobacco, vaping, alcohol and drugs

#### What a visit looks like
A head-to-toe check including growth charts, blood pressure and pubertal development, a conversation with the teenager and parents, and blood tests only when needed (for example haemoglobin, thyroid, vitamin D or hormone tests).

#### Frequently asked questions
**At what age should periods start, and when should we worry?**
Most girls start between 10 and 15 years. See a doctor if periods have not started by 15, if there are no signs of puberty by 13, or if periods are very heavy, very painful, or more than three months apart after the first two years.

**Can PCOS be treated in teenagers?**
Yes. Treatment depends on symptoms and may include lifestyle changes, skin and period management, and medicines when needed. Early diagnosis helps prevent later problems with weight, sugar and fertility.

**My teenager wants to diet or take protein supplements from the gym. Is that safe?**
Growing bodies need enough energy and nutrients. Crash diets and unregulated supplements can be harmful. We help set safe goals.

**Is vaping less harmful than smoking for teens?**
No. Vapes contain nicotine, which is addictive and affects the developing brain, and other harmful chemicals. Sale of e-cigarettes is banned in India. We support teenagers who want to stop.

---

### Page 29. Teen Mental Health and Counselling

- **URL:** `/blooming-buds/teen-mental-health/`
- **SEO title:** Teen Counselling and Mental Health Support in Nagpur
- **Meta description:** Confidential counselling for teenagers in Nagpur: exam stress, anxiety, low mood, anger, screen and social media overuse, bullying and self-esteem, with parent guidance.
- **Schema:** MedicalWebPage

**Crisis box at the top of the page (highlighted)**
> **If you or someone you know is thinking about suicide or self-harm, or is in immediate danger,** call 112 or go to the nearest hospital emergency department. You can also call **Tele-MANAS, the Government of India's free 24-hour mental health helpline, on 14416 or 1-800-891-4416**. Our clinic is not an emergency service.

**H1:** Teen mental health and counselling

Most teenagers go through periods of stress, moodiness or conflict. That is part of growing up. Sometimes it goes further: a teenager who has stopped enjoying things, cannot sleep, avoids school, has angry outbursts, cannot put the phone down, or talks about feeling worthless needs support, and the earlier the better.

Dr. Prajakta Kaduskar combines medical training in child and adolescent health with a postgraduate qualification in clinical psychology. She assesses whether a physical cause, such as thyroid problems, anaemia or poor sleep, is contributing, and offers counselling for the teenager and guidance for parents.

#### Concerns we help with
- Stress management, and academic stress and exam anxiety
- Anxiety and mood support
- Depression screening and early intervention
- Behavioural assessment and guidance
- Anger management
- Self-esteem and confidence building
- Emotional regulation
- Social media, gaming and screen overuse
- Relationship and peer pressure concerns
- Bullying and cyberbullying
- Sleep and mental wellness
- Career anxiety and goal setting
- Group sessions and peer support **[CONFIRM: whether group sessions run currently]**
- Mindfulness and relaxation training
- Crisis support and referral to a psychiatrist or hospital when needed

#### Signs that a teenager may need help
- Persistent sadness, irritability or withdrawal for more than two weeks
- Loss of interest in friends, hobbies or school
- Big changes in sleep or appetite
- Falling marks, refusing to go to school
- Frequent headaches or stomach aches with no medical cause
- Anger outbursts, risk-taking, or self-harm
- Saying they feel hopeless or that others would be better off without them (seek help immediately)

#### How counselling works here
1. **First consultation** with the teenager and parents: history, concerns, and a medical check.
2. **Assessment** using standard screening tools where useful.
3. **Counselling sessions** with the teenager, typically weekly or fortnightly at first. **[CONFIRM: session length and frequency]**
4. **Parent sessions** on communication, boundaries and support at home.
5. **Referral to a psychiatrist** when medicines or specialised care may be needed, with continued support from us.

#### Frequently asked questions
**Will what my teenager says be kept private?**
We keep sessions confidential so teenagers can talk openly. We explain at the start that information about safety, such as risk of self-harm or abuse, will always be shared with parents and, where the law requires, with authorities.

**How much screen time is too much for a teenager?**
There is no single number. Warning signs are screens affecting sleep, schoolwork, mood, family time or physical activity, or distress when the device is taken away. We help families set realistic rules together.

**My child gets very anxious before exams. Is that normal?**
Some nervousness is normal and can even help. When anxiety causes panic, sleeplessness, physical symptoms or avoidance, counselling and simple techniques can help a great deal.

**Do you prescribe medicines for anxiety or depression?**
Most teenagers improve with counselling and family support. If medicines may help, we refer to a child and adolescent psychiatrist and continue to support the family.

---

### Page 30. Psychological Testing (IQ, EQ, Personality)

- **URL:** `/blooming-buds/psychological-testing/`
- **SEO title:** IQ, EQ and Personality Testing for Children and Teens in Nagpur
- **Meta description:** Standardised psychological testing in Nagpur: IQ, emotional quotient (EQ), personality and aptitude assessment for children and teenagers, with a feedback session for parents.
- **Schema:** MedicalWebPage

**H1:** Psychological testing for children and teenagers

Psychological tests help answer specific questions. Why is a bright child struggling at school? What are a teenager's strengths? How does a young person handle emotions and relationships? Results are most useful when they are explained carefully and turned into a practical plan.

#### Assessments offered
- **Intelligence (IQ) testing:** understanding thinking and learning abilities, strengths and weaker areas
- **Emotional quotient (EQ):** how a young person recognises and manages emotions and relates to others
- **Personality assessment:** temperament and working style, useful in counselling and career planning
- **Aptitude testing:** natural abilities relevant to subject and career choice (see Career Counselling)
- **Behavioural and attention screening**, with referral for a full evaluation where needed

All tests use standardised, age-appropriate tools. **[CONFIRM: list of tests used, and who administers them]**

#### How it works
1. A consultation to understand the question you want answered
2. Testing session or sessions, usually 1 to 3 hours depending on the tests **[CONFIRM]**
3. A written report
4. A feedback session with parents and, where appropriate, the young person

#### Good to know
- A test score describes how a child performed on a particular day and is one piece of information, not a label.
- Assessment reports from the clinic are for guidance and planning. **Formal certification of a learning disability for school or board exam concessions is issued by government-designated centres.** We can guide you on the process. **[CONFIRM]**

#### Frequently asked questions
**At what age can IQ be tested?**
Standardised tests exist for young children through to adults. The right test is chosen by age and purpose.

**Can my child prepare for the test?**
No preparation is needed. Ensure a good night's sleep and a meal beforehand, and bring glasses or hearing aids if used.

---

### Page 31. Career Counselling and Aptitude Testing

- **URL:** `/blooming-buds/career-counselling/`
- **SEO title:** Career Counselling and Aptitude Test for Students in Nagpur
- **Meta description:** Career guidance for students in classes 8 to 12 and graduates in Nagpur: aptitude, interest and personality assessment, stream and course selection, with parents involved.
- **Schema:** MedicalWebPage, Service
- **Images:** `Career_Counselling.png` (to be redrawn with a student figure)

**H1:** Career counselling and aptitude testing

Choosing a stream after class 10, or a course after class 12, is one of the first big decisions a young person makes, often under pressure from marks, relatives, friends and social media. Good career counselling does not tell a student what to become. It helps them understand their abilities, interests and personality, and match them with realistic options.

Career counselling at Blooming Buds is led by Dr. Prajakta Kaduskar, who brings training in adolescent health and clinical psychology. That matters because career confusion often comes with anxiety, low confidence or family conflict, and those are addressed too.

#### Who it is for
- Students in classes 8 to 10 choosing a stream (science, commerce, arts, vocational)
- Students in classes 11 and 12 choosing courses and entrance exams
- Graduates unsure about the next step
- Students who are struggling in a chosen stream and considering a change

#### What the process includes
1. **Initial meeting** with the student and parents: marks, interests, hobbies, worries and expectations
2. **Assessments:** aptitude (reasoning, numerical, verbal, spatial and other abilities), interest inventory, and personality profile
3. **Report and counselling session:** strengths, suitable career clusters, and options to explore, including less familiar careers
4. **Planning:** subject choices, courses, entrance exams and next steps
5. **Follow-up** if needed, including support for exam stress

#### Frequently asked questions
**What is the right time for career counselling?**
Class 9 or 10 is ideal before stream selection, but it is useful at any stage.

**Do you use fingerprint-based (DMIT) tests?**
No. Fingerprint-based "multiple intelligence" tests do not have scientific evidence behind them. We use standardised psychological assessments. **[CONFIRM]**

**Will the test tell my child exactly which career to choose?**
No test can do that. The assessment gives evidence about strengths and interests. The final decision is made by the student and family, with guidance.

**My child and I disagree about the career. Can you help?**
Yes. Parent sessions are part of the process, and helping families reach a decision together is often the most important outcome.

---

### Page 32. Workshops for Schools, Parents and Teachers

- **URL:** `/blooming-buds/workshops/`
- **SEO title:** Adolescent Health Workshops for Schools and Parents | Nagpur
- **Meta description:** Workshops by Dr. Prajakta Kaduskar for schools, parents and teachers in Nagpur: puberty, mental wellness, screen use, cyber safety, bullying, life skills and exam stress.
- **Schema:** MedicalWebPage, Service

**H1:** Workshops for schools, parents and teachers

Some health topics are best discussed in groups: with a class of students, a parents' meeting or a teachers' staff room. Dr. Prajakta Kaduskar conducts interactive workshops that give accurate, age-appropriate information and practical skills.

#### Workshop topics
**For students**
- Growing up: puberty and body changes (separate sessions for girls and boys where appropriate)
- Menstrual health and hygiene
- Managing exam stress and study habits
- Healthy eating, sleep and physical activity
- Digital detox and social media awareness
- Anti-bullying and cyber safety
- Life skills: decision-making, communication, handling peer pressure, emotional regulation
- Substance use awareness: tobacco, vaping, alcohol and drugs
- Self-esteem and confidence

**For parents**
- Parenting adolescents: communication, boundaries and trust
- Screens at home: setting family rules that work
- Recognising stress, anxiety and low mood in children
- Supporting children through exams and career decisions

**For teachers**
- Recognising emotional and behavioural warning signs in students
- Responding to bullying and cyberbullying
- School health programmes and referral pathways

#### Format
Typically 45 to 90 minutes, with talks, discussion and question boxes for anonymous questions. Sessions can be held at your school or organisation in Nagpur. Materials are available in English, Hindi and Marathi. **[CONFIRM: languages, fees or free, how to request]**

**CTA:** Request a workshop (form: school or organisation name, audience, approximate number, preferred dates, topics, contact person)

---
## Part 5. Laboratory, pharmacy and patient information

---

### Page 33. Pathology Laboratory

- **URL:** `/lab/`
- **SEO title:** Pathology Lab in Dhantoli, Nagpur | Niramay Laboratory, 7 am to 7 pm
- **Meta description:** Niramay Laboratory, Dhantoli, Nagpur: blood and urine tests with automated analysers, open 7 am to 7 pm, with home sample collection and reports reviewed alongside your consultation.
- **Schema:** MedicalWebPage, DiagnosticLab
- **Images:** `NirmayClinics_Inhouse_pathology.jpg`, `NiramayClinics_slide_img3.jpg` (patient face blurred)
- **Reviewed by:** Dr. Ajay V. Kaduskar and **[CONFIRM: pathologist who signs reports, name and qualification]**

**H1:** Niramay Laboratory

Niramay Laboratory is on the premises of Niramay Clinics, so most tests can be done on the day of your consultation and reviewed by your doctor without another trip.

**Timings:** 7 am to 7 pm **[CONFIRM: days, Sunday hours]**
**Home sample collection:** available with one day's prior booking

#### Tests available
- **Diabetes:** fasting and post-meal blood sugar, HbA1c, glucose tolerance test, urine albumin to creatinine ratio
- **Heart and cholesterol:** lipid profile **[CONFIRM: other cardiac markers]**
- **Kidney:** creatinine, urea, eGFR, electrolytes, uric acid, urine routine
- **Liver:** liver function tests
- **Thyroid:** TSH, free T4, free T3 **[CONFIRM: in-house or outsourced]**
- **Blood:** complete blood count, ESR, iron studies
- **Vitamins:** vitamin D, vitamin B12 **[CONFIRM]**
- **Pregnancy:** glucose tolerance test for gestational diabetes
- **Others** on request. Tests not done in-house are sent to a partner laboratory. **[CONFIRM: partner laboratory name and accreditation]**

#### Quality
- Automated biochemistry and haematology analysers
- Daily internal quality control **[CONFIRM]**
- Participation in an external quality assurance programme **[CONFIRM]**
- Accreditation: **[CONFIRM: NABL or other. Do not mention accreditation unless held]**
- Reports signed by **[CONFIRM: pathologist]**

#### How to prepare for common tests
| Test | Preparation |
|---|---|
| Fasting blood sugar, lipid profile | 10 to 12 hours of fasting; water is allowed. Your doctor may say a non-fasting lipid test is acceptable. |
| Post-meal (PP) blood sugar | Sample exactly 2 hours after starting your usual breakfast or lunch. Note the time you started eating. |
| HbA1c, thyroid, CBC | No fasting needed |
| Glucose tolerance test | Arrive fasting; you will drink a glucose solution and stay at the clinic for about 2 hours |
| Urine tests | A mid-stream sample in the container we provide; first morning sample if advised |

Take your usual medicines unless your doctor has told you otherwise. If you take diabetes medicines or insulin, bring them and take them after the fasting sample, with your meal.

#### Reports
Reports are usually available the same day for routine tests. **[CONFIRM: turnaround time and how reports are shared, e.g. printed copy, WhatsApp or email]** Please discuss abnormal results with your doctor rather than starting or stopping treatment on your own.

---

### Page 34. Home Sample Collection

- **URL:** `/lab/home-sample-collection/`
- **SEO title:** Home Blood Sample Collection in Nagpur | Niramay Laboratory
- **Meta description:** Book home blood sample collection in Nagpur with Niramay Laboratory. One day's prior booking, trained phlebotomists, reports shared with your doctor.
- **Schema:** MedicalWebPage, Service

**H1:** Home sample collection

For elderly patients, people with limited mobility, busy families, or anyone who prefers not to travel, our laboratory team can collect blood and urine samples at home.

#### How it works
1. **Book at least one day in advance** by phone or WhatsApp on +91 84591 41584 **[CONFIRM: lab booking number]**.
2. Tell us the tests (or share the doctor's prescription), the patient's age and address, and whether the test needs fasting.
3. Our trained staff member visits at the agreed time with sealed, single-use collection material.
4. Samples are brought to Niramay Laboratory and processed.
5. Reports are shared with you and, if you wish, with your doctor.

#### Service area and charges
**[CONFIRM: areas of Nagpur covered, earliest collection time, home visit fee]**

#### Tips
- For fasting tests, the collection will be early in the morning. Do not eat until the sample is taken.
- Keep the prescription, ID and previous reports ready.
- Keep the arm sleeve loose.

---

### Page 35. Niramay Pharmacy

- **URL:** `/pharmacy/`
- **SEO title:** Niramay Pharmacy, Dhantoli, Nagpur | Home Delivery and Outstation Dispatch
- **Meta description:** Niramay Pharmacy at Niramay Clinics, Dhantoli, Nagpur: prescribed medicines dispensed by a registered pharmacist, home delivery in Nagpur and dispatch for outstation patients.
- **Schema:** Pharmacy
- **Images:** `NirmayClinics_Pharmacy.jpg`
- **Compliance note for editors:** no medicine names, discounts or offers. No online ordering form for prescription medicines unless legal advice confirms the process complies with the Drugs and Cosmetics Act and Rules.

**H1:** Niramay Pharmacy

Niramay Pharmacy (Niramay Medical) is located at the clinic, so you can collect your prescribed medicines right after your consultation.

**Phone:** +91 90213 51693
**Timings:** **[CONFIRM]**
**Drug licence numbers:** **[CONFIRM: retail drug licence numbers, displayed as required]**
**Registered pharmacist:** **[CONFIRM: name and registration number]**

#### Services
- Medicines dispensed against a valid prescription by a registered pharmacist
- **Home delivery in Nagpur** **[CONFIRM: areas, charges]**
- **Dispatch for outstation patients**, against a valid prescription, for patients under the clinic's care **[CONFIRM: process and legal compliance]**
- Insulin and other temperature-sensitive medicines stored in refrigeration and packed appropriately for transport
- Glucometers, test strips and lancets **[CONFIRM: other supplies]**
- Help with understanding how and when to take your medicines

#### Important
- Prescription medicines are dispensed only against a valid prescription from a registered medical practitioner.
- Always check the name, strength and expiry date when you receive your medicines.
- Do not change doses or stop medicines without talking to your doctor.
- Store insulin as instructed. Do not freeze it.

---

### Page 36. Plan Your Visit

- **URL:** `/plan-your-visit/`
- **SEO title:** Plan Your Visit | Niramay Clinics, Dhantoli, Nagpur
- **Meta description:** Everything you need for your visit to Niramay Clinics, Nagpur: how to reach us, timings, what to bring, fasting tests, parking, accessibility and fees.
- **Schema:** WebPage
- **Images:** `Niramay clinic outside.jpg`, `NiramayClinic_Section_bg_img1.jpg`, `Niramay board.jpg`

**H1:** Plan your visit

#### Finding us
572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, opposite Dinanath High School, Dhantoli, Nagpur 440012. Look for the Niramay Clinics boards at the gate.

- **Nearby landmarks:** Dinanath High School (opposite) **[CONFIRM: 1 or 2 more well-known landmarks, e.g. nearest hospital or chowk]**
- **Metro:** **[CONFIRM: nearest Nagpur Metro station and walking time]**
- **Parking:** two-wheeler parking at the building. **[CONFIRM: car parking advice]**

#### Accessibility
The clinic has lift access and a wheelchair-friendly entrance. If you need help on arrival, call the front desk and a staff member will meet you.

#### Before you come
1. **Book an appointment** by phone or WhatsApp.
2. **Check if your tests need fasting.** If your doctor has advised fasting tests, eat nothing for 10 to 12 hours before; water is fine.
3. **Bring your diabetes medicines** to take after the fasting sample.

#### What to bring
- All previous reports, prescriptions and discharge summaries, in date order if possible
- All your current medicines, including supplements and ayurvedic or homeopathic products, or clear photos of their labels
- Your glucometer or home BP monitor readings, or the device itself
- Vaccination card for children
- Glasses or hearing aids if used
- Any insurance or corporate health card

#### On the day
1. Register at the front desk. First visits take about 10 minutes for registration.
2. Our staff record weight, height, waist and blood pressure.
3. Consultation with the doctor.
4. Tests in the laboratory or cardiac room, if needed.
5. Collect medicines from the pharmacy if prescribed.
6. Book your next follow-up before you leave.

Allow 1 to 2 hours for a first visit, and longer if fasting and post-meal tests or an Echo or TMT are planned.

#### Fees and payment
**[CONFIRM: consultation fees for first and follow-up visits for each doctor, payment methods (cash, UPI, cards), and whether fees are shown publicly]**

#### Insurance
Outpatient consultations and tests are covered only under some health insurance policies. We provide itemised bills and reports for reimbursement claims. **[CONFIRM: any cashless tie-ups]**

---

### Page 37. Frequently Asked Questions

- **URL:** `/faqs/`
- **SEO title:** FAQs | Appointments, Tests, Timings and Services | Niramay Clinics
- **Meta description:** Answers to common questions about appointments, timings, lab tests, home sample collection, pharmacy, children's care, reports, fees and privacy at Niramay Clinics, Nagpur.
- **Schema:** FAQPage

**H1:** Frequently asked questions

#### Appointments and timings
**How do I book an appointment?**
Call 0712 2422214 or +91 84591 41584 between 9 am and 5 pm **[CONFIRM]**, message us on WhatsApp, or use the appointment request form. Online requests are confirmed by phone or message.

**What are the clinic timings?**
**[CONFIRM: by doctor and day]** The laboratory is open from 7 am to 7 pm.

**Do I need a referral?**
No. You can book directly.

**Can I see both doctors on the same day?**
Yes. Families often book back-to-back appointments with Dr. Ajay Kaduskar and Dr. Prajakta Kaduskar.

**Do you offer online or video consultations?**
**[CONFIRM. If yes: "Follow-up consultations can be done by video for existing patients, in line with the Telemedicine Practice Guidelines. First consultations are best done in person."]**

**What if I am late or need to cancel?**
Please call as early as possible so another patient can be seen. See our Cancellation and Refund Policy.

#### Tests and reports
**What are the laboratory timings?**
7 am to 7 pm. **[CONFIRM days]**

**Is home sample collection available?**
Yes, with at least one day's prior booking.

**Do I need to fast for my blood test?**
Fasting sugar and some cholesterol tests need 10 to 12 hours of fasting. HbA1c, thyroid and blood counts do not. Check the Laboratory page or ask us.

**How do I get my reports?**
**[CONFIRM: printed, WhatsApp, email]**

**Do you do 2D Echo, ECG and TMT?**
Yes, at the clinic. Some need an appointment.

#### Pharmacy
**Is there a pharmacy at the clinic?**
Yes, Niramay Pharmacy, phone +91 90213 51693. Medicines are dispensed against a valid prescription.

**Do you deliver medicines?**
Home delivery is available in Nagpur, and dispatch to outstation patients under our care. **[CONFIRM]**

#### Children and teenagers
**From what age do you see children?**
From birth, at Blooming Buds with Dr. Prajakta Kaduskar.

**Will my teenager's counselling be confidential?**
Yes, with the exception of safety concerns, which are always shared with parents.

**Do you give all vaccines?**
We follow the Indian Academy of Pediatrics schedule. Ask us about specific vaccines.

#### Facilities and access
**Is the facility disabled-friendly?**
Yes.

**Is a lift available?**
Yes.

**Is parking available?**
Ample two-wheeler parking is available at the building. **[CONFIRM: car parking]**

#### Fees, insurance and records
**What are the consultation fees?**
**[CONFIRM]**

**Do you accept health insurance?**
We provide itemised bills and reports for claims. **[CONFIRM: cashless]**

**Can I get a copy of my medical records?**
Yes. Request them at the front desk or by email. We provide copies within the time required by medical regulations (usually 72 hours of a written request).

**How is my personal information protected?**
We collect only what is needed for your care and protect it as described in our Privacy Policy.

#### Emergencies
**Do you handle emergencies?**
No. Niramay Clinics is an outpatient clinic. In an emergency, call 108 or 112, or go to the nearest hospital emergency department.

**Still have questions?** Call us on +91 84591 41584.

---

### Page 38. Health Library (blog hub)

- **URL:** `/health-library/`
- **SEO title:** Health Library | Diabetes, Heart, Child and Teen Health Articles
- **Meta description:** Articles by Dr. Ajay Kaduskar and Dr. Prajakta Kaduskar on diabetes, weight, heart health, parenting, adolescence and mental wellbeing.
- **Schema:** Blog, CollectionPage

**H1:** Health Library

Clear, reliable information written or reviewed by our doctors. Each article shows its author, reviewer and the date it was last checked. Articles are for general education and do not replace a consultation.

**Categories:** Diabetes · Weight and metabolism · Heart health · Child health · Adolescent health · Parenting · Mental wellbeing

**Listing card fields:** featured image, category, title, 2-line summary, author photo and name, reading time, last reviewed date.

#### 5.1 Migration notes for the 5 existing posts
Full original text is in the audit file, Appendix A. **Each post needs a copy-edit (spelling, grammar, formatting) and the corrections below before republishing.** Every post gets an author box, "last reviewed" date and the medical disclaimer.

| Old URL | New title and URL | Author | Required changes |
|---|---|---|---|
| `/10-common-misconceptions-about-diabetes-separating-myths-from-facts/` | **10 Common Myths About Diabetes, and the Facts** · `/health-library/diabetes-myths-and-facts/` | Dr. Ajay V. Kaduskar | Good content. Change the screening age line to "from age 30, or earlier with risk factors" to match the rest of the site. Embed the YouTube video (`YjXtEOQ724Y`) with a caption. Add 3 FAQs and links to Type 2 Diabetes and Prediabetes pages. |
| `/smart-love/` | **Smart Love: Parenting Teenagers with Connection, Not Control** · `/health-library/smart-love-parenting-teenagers/` | Dr. Prajakta A. Kaduskar | The nine principles are drawn from the book *Smart Love* (Martha Heineman Pieper and William J. Pieper). **Credit the book clearly** and summarise in her own words rather than reproducing the list. The "India Today / AIIMS teen suicide" statistic has no date or source: replace it with a cited current source or remove it. Add the Tele-MANAS helpline (14416) box. Split into shorter sections with subheadings. |
| `/developing-self-esteem-in-adolescents-with-disability/` | **Building Self-Esteem in Teenagers with Disabilities** · `/health-library/self-esteem-teenagers-with-disabilities/` | Dr. Prajakta A. Kaduskar | The employment statistics (30 to 50 percent; 40 to 45 percent) need a source or should be removed, since they appear to come from non-Indian studies. Fix the duplicated heading "On the other hand, a person with low self-esteem will:" before the three "spheres". Use person-first, respectful language throughout. |
| `/preparing-yourself/` | **Preparing Your Child, and Yourself, for Adolescence** · `/health-library/preparing-child-for-adolescence/` | Dr. Prajakta A. Kaduskar | Heavy copy-edit for grammar and typos ("habitués", "dairy" should be "diary", "renewed system rather then"). Keep her personal voice ("When I am home, I am a mother"); it is a strong E-E-A-T signal. Add a short summary box at the top. |
| `/menstrual-hygiene/` | **Menstrual Hygiene for Teenage Girls: A Practical Guide** · `/health-library/menstrual-hygiene-teenage-girls/` | Dr. Prajakta A. Kaduskar | **Medical correction required:** the post says a tampon should be changed "once every two hours". Correct guidance is every 4 to 8 hours and never more than 8 hours, because of the risk of toxic shock syndrome. Also: replace "wash your vagina" with "wash the outer genital area (vulva)", since the vagina should not be washed internally; add menstrual cups and period underwear as options; add when to see a doctor (very heavy bleeding, severe pain, periods more than 3 months apart). |

#### 5.2 New articles to write next (trending questions, ranked by search demand and fit)
1. HbA1c explained: what your number means and how often to test
2. Prediabetes: the window when diabetes can still be prevented
3. Weight-loss injections: what patients should know before asking for them
4. Can type 2 diabetes go into remission? What the evidence says
5. Continuous glucose monitors (CGM): who benefits
6. Eating for diabetes during Indian festivals and fasting days
7. Fatty liver: the silent partner of diabetes and obesity
8. Heart attack in young Indians: risk factors you can check today
9. Thyroid and weight: what is myth and what is real
10. HPV vaccine for your daughter: the 2026 national programme explained
11. Exam stress: a practical guide for parents of board-exam students
12. Screen time and sleep in teenagers: setting family rules that work
13. PCOS in teenagers: early signs and what helps
14. Anaemia in adolescent girls: why it matters and how to fix it
15. Choosing a stream after class 10: how aptitude testing helps

Each new article: 1,000 to 1,500 words, written by the clinic or a medical writer, reviewed and signed off by the relevant doctor, with sources (ICMR, IAP, RSSDI, WHO, MoHFW) listed at the end.

---

### Page 39. Videos and Health Talks

- **URL:** `/videos/`
- **SEO title:** Health Videos by Dr. Ajay Kaduskar and Dr. Prajakta Kaduskar
- **Meta description:** Short health videos and talks from Niramay Clinics, Nagpur, including the "Sugar ki Baat" diabetes series with Dr. Ajay Kaduskar.
- **Schema:** CollectionPage, VideoObject for each video

**H1:** Videos and health talks

Short, practical talks on diabetes, weight, heart health and growing up, by our doctors.

#### Sugar ki Baat with Dr. Ajay Kaduskar
**Diabetes and Obesity: Myth vs Fact.** Dr. Ajay Kaduskar answers common myths about diabetes and weight.
[Embedded video: `YjXtEOQ724Y`]
**[CONFIRM: who produces "Sugar ki Baat", permission to embed and to use the thumbnail artwork, and links to other episodes]**

#### More videos
**[CONFIRM: any other videos, TV appearances or recorded talks by either doctor]**

Note under the videos: Videos are for general information and do not replace a consultation.

---

### Utility page A. Appointment request received

- **URL:** `/contact/thank-you/` (noindex)

**H1:** Thank you, we have received your request

We will call or message you to confirm your appointment, usually within one working day **[CONFIRM]**. Your appointment is confirmed only after you hear from us.

If your need is urgent, please call 0712 2422214 or +91 84591 41584. **In an emergency, call 108 or 112.**

[Plan your visit →] [Back to home →]

### Utility page B. Page not found (404)

**H1:** We could not find that page

The page may have moved when we updated our website. Try one of these:
[Home] · [All services] · [Book an appointment] · [Health Library]
Or call us on 0712 2422214.

---
## Part 6. Legal and trust pages

> **Before publishing:** these pages are drafted to current Indian law as understood in October 2026. Because they are legal documents, they **must be reviewed by a lawyer** before going live, and the **[CONFIRM]** items filled in. Each page shows "Last updated: [date]".

---

### Page 40. Privacy Policy

- **URL:** `/privacy-policy/`
- **SEO title:** Privacy Policy | Niramay Clinics, Nagpur
- **Meta description:** How Niramay Clinics collects, uses, protects and shares personal and health information, and how you can exercise your rights.

**H1:** Privacy Policy

**Last updated:** [CONFIRM: date]

Niramay Clinics ("we", "us") respects your privacy. Health information is among the most sensitive information a person can share, and we treat it that way. This policy explains what personal data we collect through our website, phone, WhatsApp and at the clinic, why we collect it, who we share it with, how long we keep it, and the rights you have.

We follow the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025, the Information Technology Act, 2000 and its rules on sensitive personal data, and the confidentiality duties that apply to doctors under the Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations, 2002.

#### 1. Who we are
Niramay Clinics, comprising the Niramay Diabetes and Heart Care Centre, the Blooming Buds Child and Adolescent Care Centre, Niramay Laboratory and Niramay Pharmacy, 572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, Dhantoli, Nagpur, Maharashtra 440012. For the purposes of data protection law, Niramay Clinics is the "Data Fiduciary". **[CONFIRM: legal entity name, e.g. proprietorship or partnership]**

**Grievance Officer / contact for privacy matters:**
**[CONFIRM: name]**, Niramay Clinics, address as above
Email: **[CONFIRM: e.g. privacy@niramayclinics.com]** · Phone: 0712 2422214

#### 2. What we collect
**Information you give us**
- Identity and contact details: name, age or date of birth, gender, phone number, email, address, city
- Appointment details: preferred doctor, reason for visit, preferred time
- Health information: medical history, symptoms, examination findings, test results, prescriptions, images such as retinal photographs, and other clinical records created during your care
- For children: the child's details and the parent's or guardian's details
- Billing and payment details (we do not store full card numbers)
- Insurance details, if you ask us to help with a claim

**Information collected automatically when you use our website**
- Technical data such as device type, browser, pages visited and approximate location derived from IP address, collected through essential cookies and, only if you agree, analytics cookies (see section 10)

**We do not ask for** detailed medical information through website forms. Please do not upload reports or describe medical history in the online form. Bring them to your visit.

#### 3. Why we use it
| Purpose | Basis |
|---|---|
| Providing medical care, tests, medicines and follow-up | Your consent, and uses permitted by law for medical treatment |
| Booking, confirming and reminding you about appointments | Your consent |
| Sharing reports and prescriptions with you | Your consent |
| Billing, receipts and insurance paperwork | Your consent and legal obligations |
| Keeping medical records as required by law | Legal obligation |
| Responding to medical emergencies | Permitted by law |
| Sending health reminders (for example vaccine due dates) | Your separate consent, which you can withdraw at any time |
| Improving our website | Your consent to analytics cookies |

We do **not** sell your data, use it for advertising, or share it with pharmaceutical companies or marketers.

#### 4. Children's data
For patients under 18, we collect and use personal data with the consent of a parent or lawful guardian, who must fill in any online form. We process a child's data only to the extent needed to provide health care and related services, as permitted for healthcare providers under the DPDP Rules. We do not track children's behaviour online or show them targeted advertising.

Adolescents in counselling: what is said in counselling sessions is kept confidential as explained to the young person and parents at the first visit. Information that concerns a child's safety is shared with parents and, where the law requires (for example under the Protection of Children from Sexual Offences Act, 2012), with the appropriate authorities.

#### 5. Who we share it with
Only when needed, and only the minimum necessary:
- **Our doctors and clinic staff** involved in your care, who are bound by confidentiality
- **Partner laboratories** for tests not done in-house **[CONFIRM: name]**
- **Other doctors or hospitals** you are referred to, with your consent
- **Service providers** who help us run the clinic and website (for example appointment software, cloud hosting, messaging), under contracts that require them to protect your data and use it only on our instructions **[CONFIRM: list of processors]**
- **Your insurer or employer** only if you ask us to
- **Government authorities or courts** when required by law, for example disease notification or a court order

Some of our service providers may store data on servers outside India. Where this happens, we transfer data only as permitted under Indian law.

#### 6. WhatsApp, SMS and email
We use WhatsApp, SMS and email for appointment reminders and, if you agree, to share reports. These services are run by third parties with their own privacy terms. Please avoid sending detailed medical information over WhatsApp or email unless we have agreed this with you.

#### 7. How long we keep it
- **Medical records** are kept for at least the period required by medical regulations (a minimum of 3 years from the start of treatment under the 2002 Regulations), and longer where needed for continuity of care, for records of children, or for legal reasons. **[CONFIRM: clinic retention period, for example 10 years, and longer for minors]**
- **Website enquiries** that do not lead to a visit are deleted within **[CONFIRM: e.g. 12 months]**.
- **Analytics data** is kept in aggregated form.

When data is no longer needed, it is securely deleted or anonymised.

#### 8. How we protect it
Access to records is limited to staff who need it. We use password-protected systems, secure storage of paper records, encrypted connections (HTTPS) on our website, and contracts with service providers that require reasonable security safeguards. If a personal data breach occurs, we will inform affected people and the Data Protection Board of India as required by law.

#### 9. Your rights
You can ask us to:
- **Access** a summary of your personal data and how it is used
- **Correct, complete or update** inaccurate information
- **Erase** personal data that is no longer needed, except medical records we must keep by law
- **Withdraw consent** for optional uses, such as reminders. This does not affect care already provided.
- **Nominate** a person to exercise these rights if you are unable to
- **Raise a grievance** with our Grievance Officer

You can also request a **copy of your medical records**, which we provide within 72 hours of a written request, as required by medical regulations.

To exercise any right, contact the Grievance Officer. We will acknowledge your request promptly and respond within the time required by law. If you are not satisfied, you may complain to the **Data Protection Board of India**.

#### 10. Cookies
- **Essential cookies** make the website work (for example, remembering your cookie choice). They cannot be switched off.
- **Analytics cookies** help us understand which pages are useful. They are used only if you click "Accept" on the cookie banner, and you can change your choice at any time from the "Cookie settings" link in the footer.
- We do **not** use advertising or retargeting cookies.

#### 11. Changes to this policy
We will update this page when our practices or the law change, and show the date of the latest version at the top.

---

### Page 41. Terms of Use

- **URL:** `/terms-of-use/`
- **SEO title:** Terms of Use | Niramay Clinics, Nagpur

**H1:** Terms of Use

**Last updated:** [CONFIRM: date]

These terms apply to your use of niramayclinics.com. By using the website you agree to them.

1. **About the website.** This website gives information about Niramay Clinics, our doctors and services, and lets you request appointments. It is owned and operated by Niramay Clinics, Dhantoli, Nagpur. **[CONFIRM: legal entity]**
2. **Not medical advice.** Content on this website is for general education. It does not create a doctor-patient relationship and is not a substitute for a consultation, diagnosis or treatment. See our Medical Disclaimer.
3. **Not for emergencies.** Do not use the website, the online form, email or WhatsApp for emergencies. Call 108 or 112, or go to the nearest hospital emergency department.
4. **Appointment requests.** Submitting a request does not guarantee an appointment. An appointment is confirmed only when we contact you. We may need to reschedule due to medical emergencies or unforeseen circumstances.
5. **Accurate information.** Please give accurate details when you contact us. For patients under 18, a parent or guardian must make the request.
6. **Communication.** By sharing your phone number you agree that we may contact you by call, SMS or WhatsApp about your appointment. Optional reminders are sent only with your consent.
7. **Intellectual property.** Text, photographs, logos and design on this website belong to Niramay Clinics or are used with permission. You may share links and print pages for personal, non-commercial use. Do not copy content for commercial use without written permission.
8. **External links.** Links to other websites, such as Google Maps or YouTube, are provided for convenience. We are not responsible for their content or privacy practices.
9. **Accuracy.** We review medical content regularly (see our Editorial Policy), but medicine changes and errors can occur. Please tell us if you find a mistake.
10. **Liability.** To the extent permitted by law, Niramay Clinics is not liable for any loss arising from use of, or reliance on, information on this website. Nothing in these terms limits rights you have under the Consumer Protection Act, 2019 or other law.
11. **Privacy.** Our Privacy Policy explains how we handle personal data.
12. **Changes.** We may update these terms. The latest version will be on this page.
13. **Governing law.** These terms are governed by the laws of India. Courts at Nagpur, Maharashtra have jurisdiction.
14. **Contact.** admin@niramayclinics.com · 0712 2422214

---

### Page 42. Medical Disclaimer

- **URL:** `/medical-disclaimer/`

**H1:** Medical Disclaimer

The information on this website, including articles, videos, service descriptions and FAQs, is provided for general education and awareness. It is not a substitute for professional medical advice, diagnosis or treatment by a qualified doctor who has examined you.

- Do not start, stop or change any medicine, insulin dose, diet or treatment based on information on this website. Always consult your doctor.
- Every person's health is different. Results of tests and treatments vary, and no outcome is guaranteed.
- Normal ranges and targets mentioned on this website are general guides. Your doctor may set different targets for you.
- Mention of a test, treatment or type of medicine is not a recommendation that it is right for you.
- **If you think you have a medical emergency, call 108 or 112, or go to the nearest hospital emergency department immediately.**

Content is written or reviewed by our doctors and dated (see our Editorial Policy). If you have questions about your own health, please book a consultation.

---

### Page 43. Editorial and Medical Review Policy

- **URL:** `/editorial-policy/`

**H1:** Editorial and Medical Review Policy

Health decisions deserve reliable information. This page explains how content on this website is created, checked and kept up to date.

#### Who writes and reviews our content
- Medical pages and articles are written by our doctors or by medical writers working with them.
- **Every medical page is reviewed and approved by a qualified doctor before it is published.** Pages on diabetes, weight, thyroid, blood pressure and heart health are reviewed by Dr. Ajay V. Kaduskar, MD (Medicine). Pages on child and adolescent health are reviewed by Dr. Prajakta A. Kaduskar, MBBS, DCH, PGDAP, MA (Clinical Psychology).
- Each page shows the name of the reviewer and the date it was last reviewed.

#### Sources we rely on
We base content on current guidance from recognised bodies such as the Indian Council of Medical Research (ICMR), the Ministry of Health and Family Welfare, the Research Society for the Study of Diabetes in India (RSSDI), the Indian Academy of Pediatrics (IAP), the World Health Organization and peer-reviewed medical journals. Statistics are cited with their source.

#### What we do not do
- We do not publish patient testimonials, "before and after" claims or promises of results.
- We do not name or promote medicine brands, and we do not accept sponsorship or advertising from pharmaceutical or health product companies on this website.
- We do not describe any treatment as a cure for long-term conditions where that would be misleading.

#### Use of writing tools
We may use software tools, including AI-based writing assistants, to help draft or edit text. Every page is checked for accuracy and approved by our doctors before publication, and the doctors remain responsible for the medical content.

#### Updates and corrections
Medical pages are reviewed at least once a year, and sooner when guidelines change. If you find an error, email admin@niramayclinics.com. We will review it and correct it promptly, and note significant corrections on the page.

---

### Page 44. Patient Rights and Responsibilities

- **URL:** `/patient-rights/`

**H1:** Patient rights and responsibilities

This charter is based on the Charter of Patients' Rights adopted by the Ministry of Health and Family Welfare, Government of India, on the recommendation of the National Human Rights Commission. It is also displayed at our reception. **[CONFIRM: display at reception]**

#### Your rights
1. **Information.** To know your diagnosis, the nature and purpose of investigations and treatment, likely benefits and risks, and alternatives, in language you understand.
2. **Records and reports.** To receive copies of your case papers, test reports and bills. Copies of records are provided within 72 hours of a written request.
3. **Emergency care.** Niramay Clinics is an outpatient clinic. If you need emergency care while at the clinic, we will provide first aid within our facilities and help arrange transfer to a hospital.
4. **Informed consent.** To give or refuse consent for tests and procedures after they have been explained to you.
5. **Confidentiality, privacy and dignity.** To be examined in privacy, with a chaperone of your choice where appropriate, and to have your information kept confidential.
6. **Second opinion.** To seek a second opinion from another doctor. We will provide your records for this.
7. **Transparency in charges.** To know the charges for consultations, tests and services in advance, and to receive itemised bills.
8. **Non-discrimination.** To receive care without discrimination on the basis of illness, religion, caste, gender, age, disability, sexual orientation or social or economic status.
9. **Safety and quality.** To receive care that meets accepted standards of safety and hygiene.
10. **Choice of pharmacy and laboratory.** **To buy medicines from any registered pharmacy and to have tests done at any accredited laboratory of your choice.** Our pharmacy and laboratory are a convenience, not a requirement.
11. **Proper referral.** To be referred to another doctor or hospital with a clear explanation and the necessary records.
12. **Grievance redressal.** To raise a complaint and receive a response.

#### Your responsibilities
1. Give complete and accurate information about your health, medicines and previous treatment.
2. Follow the treatment plan you have agreed to, and tell us if you cannot.
3. Inform us if you do not understand advice, or if you wish to stop treatment.
4. Arrive on time and inform us early if you need to cancel.
5. Treat doctors, staff and other patients with respect. Violence or abuse towards healthcare workers is a criminal offence.
6. Pay charges as agreed.
7. Respect the privacy of other patients. Do not photograph or record other patients or staff without permission.

#### Feedback and complaints
Speak to the front desk manager or write to admin@niramayclinics.com. We will acknowledge your complaint within **[CONFIRM: e.g. 2 working days]** and respond within **[CONFIRM: e.g. 15 days]**.

---

### Page 45. Appointment, Cancellation and Refund Policy

- **URL:** `/cancellation-refund-policy/`

> **[CONFIRM: whether fees are ever paid in advance (online booking, programmes, packages). If not, keep sections 1 and 4 only.]**

**H1:** Appointment, cancellation and refund policy

#### 1. Appointments
- Appointments are confirmed by phone or message.
- Please arrive 10 to 15 minutes early for a first visit.
- Doctors may occasionally be delayed by patients who need urgent attention. We will try to let you know in advance.

#### 2. Cancelling or rescheduling
Please let us know at least **[CONFIRM: e.g. 4 hours]** before your appointment by phone or WhatsApp, so another patient can be seen.

#### 3. Refunds for prepaid services (if applicable)
- **Consultation paid in advance, cancelled with notice:** full refund or rescheduling. **[CONFIRM]**
- **Cancelled by the clinic:** full refund or rescheduling at your choice.
- **Packages and programmes:** services not yet used may be refunded on a pro-rata basis within the validity period. **[CONFIRM]**
- **Laboratory tests:** if the sample has not been collected, a full refund. Once a sample has been processed, no refund.
- Refunds are made to the original payment method within **[CONFIRM: e.g. 7 to 10 working days]**.

#### 4. Pharmacy returns
For safety, medicines cannot be returned once they leave the pharmacy, except when the wrong medicine was supplied, the product is damaged, or it is past its expiry date. Insulin and other refrigerated medicines cannot be returned. Please check your medicines before leaving the counter. **[CONFIRM]**

#### 5. Contact
admin@niramayclinics.com · 0712 2422214

---

### Page 46. Accessibility Statement

- **URL:** `/accessibility/`

**H1:** Accessibility statement

We want everyone to be able to use this website and visit our clinic, including older patients and people with disabilities.

#### Website
This website aims to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. It includes:
- Text that can be enlarged up to 200% without breaking the layout, and a minimum body text size of 17px
- Good colour contrast between text and background
- Descriptive text for images
- Full keyboard navigation and visible focus indicators
- Clear headings and labelled form fields
- Click-to-call phone numbers and a simple appointment form
- Captions or summaries for videos **[CONFIRM]**

#### At the clinic
- Lift access to the clinic
- Wheelchair-friendly entrance
- Seating in the waiting area
- Staff assistance on request: call the front desk before you arrive and we will meet you

#### Feedback
If you find any part of the website or clinic difficult to use, please tell us at admin@niramayclinics.com or 0712 2422214. We will try to fix it, or provide the information in another way.

---
## Part 7. Questionnaire for the doctors (fills every [CONFIRM] item)

Send this to Dr. Ajay and Dr. Prajakta Kaduskar. One answered questionnaire fills all open items in this file. Items marked ★ block launch.

### A. Practice and legal
1. ★ Legal name of the practice (proprietorship, partnership, LLP or company) and year it was founded.
2. ★ Maharashtra Medical Council registration numbers for both doctors.
3. ★ Name and email of the person who will act as Grievance Officer for privacy and complaints.
4. ★ Retail drug licence numbers and the registered pharmacist's name and registration number.
5. Is Niramay Laboratory accredited (NABL or other)? Which pathologist signs reports? Which partner laboratory is used for outsourced tests?
6. Should the Dr. V. S. Kaduskar Memorial Foundation appear on the site? If yes, a short description of its work.
7. Is "Niramay Clinics" a registered trademark (the board shows ™)?

### B. Timings and fees
8. ★ OPD days and hours for each doctor, Sunday and public holiday status.
9. ★ Laboratory days (7 am to 7 pm on which days?) and pharmacy hours.
10. ★ Phone line hours for appointments.
11. Consultation fees (first visit and follow-up) for each doctor, and whether they should be shown on the website.
12. Payment methods accepted. Any cashless insurance tie-ups?
13. Cancellation notice period and refund rules, if any fees are paid in advance.

### C. Doctors' credentials (factual, with dates)
14. ★ Year each doctor started practice (to state experience accurately).
15. Year of SCOPE certification (Dr. Ajay) and year of FEACD fellowship.
16. Awards and honours for each doctor: title, awarding body, year. A photo of each certificate or trophy helps.
17. Professional memberships (for example RSSDI, API, ESI, IAP, IAP Adolescent Health Academy, IMA) and any office held.
18. Publications, conference talks, CME lectures, TV, radio or newspaper features.
19. Languages each doctor consults in.
20. Hospital affiliations or visiting consultant roles, if any.

### D. Services
21. ★ Complete Diabetes Care Programme: number of consultations, test list, nutrition sessions, validity, price (or "contact us"), and what is excluded.
22. Preventive health check-up packages: confirm or edit the four proposed packages, test lists and prices.
23. Who performs and reports the 2D Echo? Who supervises the TMT? What emergency equipment is in the TMT room?
24. Retinal screening: are pupil-dilating drops used? Who reads the images? Referral eye specialist?
25. Minimum age for diabetes care with Dr. Ajay. Is insulin pump initiation offered?
26. Sarcopenia tests used (hand grip, chair stand, walking speed?).
27. Nutritionist's name and qualification. Are any supplements sold in sessions?
28. Teleconsultation: offered or not? If yes, for whom?
29. Psychological tests used for IQ, EQ, personality and aptitude, and who administers them. Testing time. Is fingerprint (DMIT) testing used? (The text says no.)
30. Teen counselling: session length, frequency, and whether group sessions currently run.
31. Workshops: schools or organisations worked with, approximate number held, languages, fees, how schools request one.
32. Vaccination reminder system (SMS, WhatsApp?). Well-baby visit schedule.

### E. Lab, pharmacy and logistics
33. Report turnaround time and how reports are shared (print, WhatsApp, email).
34. Home sample collection: areas covered, earliest time, fee, booking number.
35. Pharmacy home delivery: areas and charges. Outstation dispatch: process and legal basis.
36. Car parking advice, nearest metro station and one or two more landmarks.

### F. People and media
37. Names and roles of staff who agree to be named on the About page.
38. "Sugar ki Baat": who produces it, permission to embed and use the artwork, links to other episodes. Any other videos?
39. Retention period for medical records and website enquiries (for the Privacy Policy).
40. Data processors used: appointment software, hosting, messaging (for the Privacy Policy).

### G. Approvals
41. ★ Each doctor to read and sign off every page they are named as reviewer on, with the sign-off date (this becomes the "Last reviewed" date).
42. ★ Written consent from every identifiable person in photos used on the site (staff and patients), or faces blurred.
43. ★ Approval (or rejection) of the AI-generated headshot of Dr. Ajay.
44. ★ Legal review of Part 6 (Privacy Policy, Terms, Cancellation and Refund).

---

## Part 8. Changes from the old website (summary)

| Old site | New site |
|---|---|
| 10 real pages, 5 thin service cards, 18 placeholder "lorem ipsum" items, a fake Specialists page | 46 complete pages, each with purpose, SEO data, reviewer and CTA |
| Doctors' credentials hidden behind "Read more" | Dedicated doctor profile pages with credentials, registration and experience |
| "Blooming Buds" name never used | Full section of 8 pages for child and adolescent care |
| Pathology and pharmacy descriptions in lorem ipsum | Full lab, home collection and pharmacy pages |
| 2D Echo, ECG, TMT, thyroid clinic, IQ/EQ/aptitude, check-ups missing | Each has its own page |
| 6 FAQs, one unanswered | About 35 FAQs across a central FAQ page and every service page |
| No privacy, terms or disclaimer | 7 legal and trust pages, written to DPDP, IT Act, 2002 Regulations and Patients' Charter |
| No emergency guidance | Emergency banner and condition-specific warning signs on medical pages |
| No author or review dates | Author, reviewer and last-reviewed date on every medical page |

---

*End of master content file.*
