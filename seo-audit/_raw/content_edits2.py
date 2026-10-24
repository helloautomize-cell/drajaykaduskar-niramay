import re, os, sys
sys.stdout.reconfigure(encoding='utf8')
ROOT = 'resources/content'

def load(rel):
    p = os.path.join(ROOT, rel)
    raw = open(p, encoding='utf8').read()
    m = re.match(r'^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$', raw)
    if not m:
        raise ValueError(f'bad frontmatter: {rel}')
    return p, m.group(1), m.group(2)

def save(p, fm, body):
    open(p, 'w', encoding='utf8', newline='\n').write('---\n' + fm + '\n---\n' + body)

def fm_set(fm, key, val):
    if re.search(rf'^{key}:', fm, re.M):
        return re.sub(rf'^{key}:.*$', f'{key}: "{val}"', fm, count=1, flags=re.M)
    return fm + f'{key}: "{val}"\n'

def linkify_first(body, phrase_re, url):
    lines = body.split('\n')
    pat = re.compile(phrase_re, re.I)
    for i, line in enumerate(lines):
        if line.lstrip().startswith('#') or '](' in line:
            continue
        m = pat.search(line)
        if m:
            lines[i] = line[:m.start()] + f'[{m.group(0)}]({url})' + line[m.end():]
            return '\n'.join(lines), True
    return body, False

def insert_before_faq(body, block):
    if '#### Frequently asked questions' in body:
        return body.replace('#### Frequently asked questions', block.rstrip() + '\n\n#### Frequently asked questions', 1)
    return body.rstrip() + '\n\n' + block.rstrip() + '\n'

def append_section(body, block):
    return body.rstrip() + '\n\n' + block.rstrip() + '\n'

def add_faqs(body, pairs):
    faq_text = ''.join(f'**{q}**\n{a}\n\n' for q, a in pairs)
    if '#### Frequently asked questions' in body:
        return body.rstrip() + '\n\n' + faq_text.rstrip() + '\n'
    return body.rstrip() + '\n\n#### Frequently asked questions\n\n' + faq_text.rstrip() + '\n'

log = []

LINKS = {
 'diabetes-heart/obesity.md': [
    (r'thyroid|PCOS|sleep apn', '/thyroid-clinic/'),
    (r'\bdiabetes\b', '/diabetes/'),
    (r'fatty liver', '/diabetes/'),
 ],
 'diabetes-heart/weight-management-medicines.md': [
    (r'obesity|weight management', '/obesity/'),
    (r'nutrition|diet', '/nutrition-lifestyle-counselling/'),
    (r'body composition', '/obesity/body-composition-sarcopenia/'),
    (r'\bdiabetes\b', '/diabetes/'),
 ],
 'diabetes-heart/body-composition-sarcopenia.md': [
    (r'obesity|weight', '/obesity/'),
    (r'nutrition', '/nutrition-lifestyle-counselling/'),
 ],
 'diabetes-heart/heart-care.md': [
    (r'\bdiabetes\b', '/diabetes/'),
    (r'blood pressure|hypertension', '/hypertension-clinic/'),
    (r'cholesterol', '/preventive-health-check-ups/'),
    (r'ECG|Echo|treadmill', '/heart-care/ecg/'),
 ],
 'diabetes-heart/2d-echo.md': [
    (r'heart', '/heart-care/'),
    (r'ECG', '/heart-care/ecg/'),
    (r'treadmill|TMT', '/heart-care/tmt-stress-test/'),
 ],
 'diabetes-heart/ecg.md': [
    (r'heart', '/heart-care/'),
    (r'blood pressure', '/hypertension-clinic/'),
    (r'treadmill|TMT|stress test', '/heart-care/tmt-stress-test/'),
    (r'2D Echo|echocardiograph', '/heart-care/2d-echo/'),
 ],
 'diabetes-heart/tmt-stress-test.md': [
    (r'heart', '/heart-care/'),
    (r'ECG', '/heart-care/ecg/'),
    (r'2D Echo|echocardiograph', '/heart-care/2d-echo/'),
 ],
 'diabetes-heart/preventive-health-check-ups.md': [
    (r'\bdiabetes\b', '/diabetes/'),
    (r'thyroid', '/thyroid-clinic/'),
    (r'heart|ECG', '/heart-care/'),
    (r'lab|laboratory', '/lab/'),
 ],
 'blooming-buds/blooming-buds.md': [
    (r'vaccin', '/vaccination/'),
    (r'well baby|well-baby|baby check', '/blooming-buds/well-baby-clinic/'),
    (r'counsell', '/blooming-buds/teen-mental-health/'),
    (r'workshop', '/blooming-buds/workshops/'),
 ],
 'blooming-buds/well-baby-clinic.md': [
    (r'Blooming Buds', '/blooming-buds/'),
    (r'vaccin', '/vaccination/'),
    (r'adolescen|teen', '/blooming-buds/adolescent-health/'),
 ],
 'blooming-buds/vaccination.md': [
    (r'Blooming Buds|child', '/blooming-buds/'),
    (r'well baby|well-baby', '/blooming-buds/well-baby-clinic/'),
    (r'\bdiabetes\b', '/diabetes/'),
 ],
 'blooming-buds/adolescent-health.md': [
    (r'Blooming Buds', '/blooming-buds/'),
    (r'counsell|mental health', '/blooming-buds/teen-mental-health/'),
    (r'vaccin', '/vaccination/'),
    (r'psychological test|testing', '/blooming-buds/psychological-testing/'),
 ],
 'blooming-buds/teen-mental-health.md': [
    (r'Blooming Buds', '/blooming-buds/'),
    (r'adolescent|physical health', '/blooming-buds/adolescent-health/'),
    (r'psychological test', '/blooming-buds/psychological-testing/'),
    (r'workshop|school', '/blooming-buds/workshops/'),
 ],
 'blooming-buds/psychological-testing.md': [
    (r'Blooming Buds', '/blooming-buds/'),
    (r'counsell', '/blooming-buds/teen-mental-health/'),
    (r'career', '/blooming-buds/career-counselling/'),
 ],
 'blooming-buds/career-counselling.md': [
    (r'Blooming Buds', '/blooming-buds/'),
    (r'aptitude|psychological test', '/blooming-buds/psychological-testing/'),
    (r'workshop', '/blooming-buds/workshops/'),
 ],
 'blooming-buds/workshops.md': [
    (r'Blooming Buds', '/blooming-buds/'),
    (r'counsell|mental wellness', '/blooming-buds/teen-mental-health/'),
    (r'adolescent', '/blooming-buds/adolescent-health/'),
 ],
 'lab-pharmacy/lab.md': [
    (r'home sample|sample collection', '/lab/home-sample-collection/'),
    (r'pharmacy', '/pharmacy/'),
    (r'\bdiabetes\b', '/diabetes/'),
    (r'health check', '/preventive-health-check-ups/'),
 ],
 'lab-pharmacy/home-sample-collection.md': [
    (r'laborator|\blab\b', '/lab/'),
    (r'pharmacy', '/pharmacy/'),
    (r'\bdiabetes\b', '/diabetes/'),
 ],
 'lab-pharmacy/pharmacy.md': [
    (r'laborator|\blab\b', '/lab/'),
    (r'\bdiabetes\b', '/diabetes/'),
    (r'blood pressure|BP medicines', '/hypertension-clinic/'),
 ],
 'patient-info/coming-from-outside-nagpur.md': [
    (r'\bdiabetes\b', '/diabetes/'),
    (r'lab|laborator|tests', '/lab/'),
    (r'pharmacy', '/pharmacy/'),
    (r'plan your visit|Plan your visit', '/plan-your-visit/'),
 ],
}
for rel, pairs in LINKS.items():
    p, fm, body = load(rel)
    n = 0
    for phrase, url in pairs:
        body, ok = linkify_first(body, phrase, url)
        n += ok
    save(p, fm, body)
    log.append(f'{rel}: +{n} links')

BLOG_LINKS = {
 'blog/diabetes-myths-and-facts.md': [(r'type 2 diabetes', '/diabetes/type-2-diabetes/'), (r'prediabetes', '/diabetes/prediabetes-risk-assessment/'), (r'complication', '/diabetes/complications-screening/')],
 'blog/menstrual-hygiene-teenage-girls.md': [(r'adolescent|teen', '/blooming-buds/adolescent-health/')],
 'blog/preparing-child-for-adolescence.md': [(r'adolescen|teen', '/blooming-buds/adolescent-health/'), (r'counsell', '/blooming-buds/teen-mental-health/')],
 'blog/self-esteem-teenagers-with-disabilities.md': [(r'counsell', '/blooming-buds/teen-mental-health/')],
 'blog/smart-love-parenting-teenagers.md': [(r'counsell', '/blooming-buds/teen-mental-health/'), (r'workshop', '/blooming-buds/workshops/')],
}
for rel, pairs in BLOG_LINKS.items():
    p, fm, body = load(rel)
    n = 0
    for phrase, url in pairs:
        body, ok = linkify_first(body, phrase, url)
        n += ok
    save(p, fm, body)
    log.append(f'{rel}: +{n} links')

SAFETY = {
 'diabetes-heart/obesity.md': '#### When to see a doctor\nSee a doctor soon if your weight is rising steadily without a clear reason, you feel unusually tired or thirsty, you snore loudly or stop breathing during sleep, your periods have become irregular, or a child is gaining weight faster than expected. These can point to a medical cause that needs checking.',
 'diabetes-heart/thyroid-clinic.md': '#### When to see a doctor\nSee a doctor if you notice a swelling in the neck, unexplained weight gain or loss with tiredness, a racing or unusually slow heartbeat, feeling too cold or too hot most of the time, or if you have thyroid disease and are pregnant or planning a pregnancy.',
 'diabetes-heart/hypertension-clinic.md': '#### When to see a doctor\nVery high readings with symptoms such as severe headache, chest pain, breathlessness, blurred vision or weakness on one side need emergency care: call 108 or 112. Otherwise, see a doctor if your home readings stay above 140/90 mmHg, or if you are under 30 with high blood pressure.',
 'diabetes-heart/complications-screening.md': '#### When to get screened sooner\nDo not wait for the yearly check if you notice any change in vision, numbness or burning in your feet, a foot wound that is healing slowly, swelling on your face or feet, foamy urine, or chest discomfort on exertion. Tell your doctor at the next visit or call the clinic.',
 'blooming-buds/adolescent-health.md': '#### When to see a doctor\nBring your teenager in if periods are very painful, very heavy or irregular for more than a year after they begin, if weight is changing quickly, acne is worsening despite basic care, or there is ongoing tiredness, dizziness or any breast or genital concern.',
 'diabetes-heart/prediabetes-risk-assessment.md': '#### When to get tested sooner\nDo not wait if your fasting sugar has ever come back borderline or high, you have a parent or sibling with diabetes, you had diabetes in a previous pregnancy, or you notice symptoms such as unusual thirst, frequent urination or unexplained tiredness.',
}
for rel, block in SAFETY.items():
    p, fm, body = load(rel)
    body = insert_before_faq(body, block)
    save(p, fm, body)
    log.append(f'{rel}: +safety')

SOURCES = {
 'diabetes-heart/diabetes.md': '#### Sources and further reading\n- [ICMR–INDIAB study: metabolic non-communicable disease health report of India](https://doi.org/10.1016/S2213-8587(23)00119-5) (The Lancet Diabetes & Endocrinology, 2023)\n- [Diabetes — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/diabetes)',
 'diabetes-heart/type-2-diabetes.md': '#### Sources and further reading\n- [Standards of Care in Diabetes — American Diabetes Association](https://professional.diabetes.org/standards-of-care)\n- [Diabetes — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/diabetes)',
 'diabetes-heart/type-1-diabetes.md': '#### Sources and further reading\n- [Type 1 diabetes — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/diabetes)\n- [Standards of Care in Diabetes — American Diabetes Association](https://professional.diabetes.org/standards-of-care)',
 'diabetes-heart/diabetes-in-pregnancy.md': '#### Sources and further reading\n- [Diabetes — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/diabetes)\n- [ICMR–INDIAB study](https://doi.org/10.1016/S2213-8587(23)00119-5) (The Lancet Diabetes & Endocrinology, 2023)',
 'diabetes-heart/prediabetes-risk-assessment.md': '#### Sources and further reading\n- [ICMR–INDIAB study](https://doi.org/10.1016/S2213-8587(23)00119-5) (The Lancet Diabetes & Endocrinology, 2023)\n- [Diabetes — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/diabetes)',
 'diabetes-heart/hypertension-clinic.md': '#### Sources and further reading\n- [Hypertension — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/hypertension)',
 'diabetes-heart/obesity.md': '#### Sources and further reading\n- [Obesity and overweight — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)',
 'diabetes-heart/thyroid-clinic.md': '#### Sources and further reading\n- [Thyroid diseases — MedlinePlus (US National Library of Medicine)](https://medlineplus.gov/thyroiddiseases.html)',
 'diabetes-heart/weight-management-medicines.md': '#### Sources and further reading\n- [Obesity and overweight — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)',
 'blooming-buds/vaccination.md': '#### Sources and further reading\n- [Essential Programme on Immunization — WHO](https://www.who.int/teams/immunization-vaccines-and-biologicals/essential-programme-on-immunization)\n- [Indian Academy of Pediatrics](https://iapindia.org/) — the IAP schedule our doctors follow',
 'blooming-buds/adolescent-health.md': '#### Sources and further reading\n- [Adolescent health — WHO fact sheet](https://www.who.int/news-room/fact-sheets/detail/adolescents-health-risks-and-solutions)',
}
for rel, block in SOURCES.items():
    p, fm, body = load(rel)
    body = append_section(body, block)
    save(p, fm, body)
    log.append(f'{rel}: +sources')

p, fm, body = load('blooming-buds/vaccination.md')
needle = '#### Frequently asked questions'
entity_block = ('#### Which vaccines are available\n'
 'The IAP schedule covers BCG, hepatitis B, polio (OPV and IPV), DPT/DTaP, Hib, rotavirus, pneumococcal, MMR, typhoid, hepatitis A and chickenpox for children, HPV for teenagers, and flu and Tdap boosters for teens and adults. We will tell you which ones apply to you or your child and plan any catch-up doses.\n\n')
body = body.replace(needle, entity_block + needle, 1) if needle in body else body.rstrip() + '\n\n' + entity_block
save(p, fm, body); log.append('vaccination: +entities')

p, fm, body = load('diabetes-heart/obesity.md')
body = body.replace(
 '#### Explore',
 '**A note on surgery and teenagers.** Weight-loss (bariatric) surgery is not done at our clinic; when it is the right option we refer and coordinate care. Teenagers with weight concerns are usually seen together with Dr. Prajakta so that growth, hormones and emotional health are covered.\n\n#### Explore', 1)
save(p, fm, body); log.append('obesity: +entities')

p, fm, body = load('blooming-buds/blooming-buds.md')
addition = ('#### One centre, one record\n'
 'The advantage of a single centre is that nothing falls through the cracks. The baby who came for growth checks becomes the teenager who comes for exam stress, and the same doctor sees the full picture: growth, vaccination, periods, screens, studies and mood. Parents can usually discuss physical and emotional concerns in the same visit.\n\n')
needle = '#### Frequently asked questions'
body = body.replace(needle, addition + needle, 1) if needle in body else body.rstrip() + '\n\n' + addition
save(p, fm, body); log.append('blooming-buds: +section')

NEW_FAQS = {
 'blooming-buds/workshops.md': [
  ('Who conducts the workshops?', 'Dr. Prajakta Kaduskar conducts them herself, sometimes with the clinic team. Sessions are planned with the school beforehand so the content fits the age group and the time available.'),
  ('What topics can a school choose?', 'Common choices are puberty and growing up, mental wellness, screen and social media use, cyber safety, exam stress, study habits, bullying and life skills. A school can also request a custom topic.'),
  ('How far in advance should we book?', 'Two to three weeks is usually comfortable so dates and content can be planned properly. Send the workshop request form or call the clinic and we will get back within two working days.'),
  ('Is there a charge for workshops?', 'Charges depend on the session, the group size and the format. Schools can share their requirement through the request form or by phone and we will quote before confirming.'),
 ],
 'diabetes-heart/ecg.md': [
  ('Do I need an appointment for an ECG?', 'An appointment helps us keep your waiting time short, but an ECG is quick and we try to fit in patients who walk in during OPD hours. Call ahead if you are in a hurry.'),
  ('Is an ECG safe?', "Yes. An ECG only records your heart's electrical signals through sticky pads on the skin. Nothing enters the body, there is no radiation, and it is safe in pregnancy and for children."),
  ('How long does an ECG take?', 'The recording itself takes a few minutes. Including preparation and a short discussion of the report, plan for about 15 to 20 minutes at the clinic.'),
  ('When will I get my ECG report?', 'The tracing is available almost immediately and Dr. Ajay usually reviews it during the same visit, so you leave with the report and its meaning explained.'),
 ],
 'diabetes-heart/tmt-stress-test.md': [
  ('Is the treadmill stress test safe?', 'It is done under supervision with your ECG and blood pressure watched continuously, and the test is stopped at the first sign of a problem. It is a standard, widely used test.'),
  ('How should I prepare for a TMT?', 'Wear comfortable clothes and walking shoes, avoid a heavy meal for two to three hours before, and bring your medicine list. We will tell you beforehand if any medicine needs to be paused.'),
  ('How long does the test take?', 'Plan for 45 to 60 minutes at the clinic. The treadmill part itself is usually under 15 minutes, with time before and after for preparation, monitoring and discussion.'),
  ('Who should not take a TMT?', 'People with recent heart attack, unstable chest pain, severe valve disease or uncontrolled blood pressure are usually not tested this way. Dr. Ajay decides after reviewing your history, and may choose a different evaluation instead.'),
 ],
 'diabetes-heart/body-composition-sarcopenia.md': [
  ('Is body composition analysis safe?', 'Yes. It uses a very small, painless electrical signal to estimate fat, muscle and water. It is not done if you have a pacemaker or implanted device, and we will ask first.'),
  ('Do I need to fast or prepare?', 'Best readings come on an empty bladder, a few hours after a meal, without heavy exercise just before. Normal morning clothing is fine; you will remove footwear and socks.'),
  ('Who benefits from this test?', 'Anyone managing weight, people with diabetes or sarcopenia risk, older adults losing strength, and patients who want to track real fat and muscle change rather than only the weighing scale.'),
 ],
 'lab-pharmacy/lab.md': [
  ('Do I need an appointment for lab tests?', 'Walk-ins are welcome during lab hours (Monday to Saturday, 7 am to 7 pm). Fasting tests are easiest early in the morning. Home collection needs prior booking.'),
  ('How do I get my reports?', 'Reports are shared once ready, usually the same day for routine tests. They can be collected from the clinic or sent to you, and they reach your Niramay doctor directly if your consultation is with us.'),
  ('Are fasting tests done early in the morning?', 'Yes, the lab opens at 7 am so fasting samples are convenient. For a fasting test, avoid eating for 8 to 12 hours; water and regular medicines are usually fine unless your doctor says otherwise.'),
 ],
 'lab-pharmacy/home-sample-collection.md': [
  ('How do I book a home collection?', 'Call or WhatsApp the clinic with your test list or prescription. We schedule a trained phlebotomist, confirm the time the previous day, and collect at your doorstep.'),
  ('Which areas do you cover?', 'We cover Dhantoli and most of Nagpur city. For areas further out, call and we will confirm whether a visit is possible at your location.'),
  ('How will I receive my reports?', 'Reports are delivered as soon as they are ready, usually the same day for routine tests, and are also available to your doctor if you consult at Niramay.'),
 ],
 'lab-pharmacy/pharmacy.md': [
  ('Do you deliver medicines?', 'Yes, within Nagpur, and parcels can be arranged for outstation patients who take medicines regularly. Call the pharmacy with your prescription to confirm details.'),
  ('Do you stock diabetes and blood pressure medicines?', 'Yes. As a clinic pharmacy we keep the medicines our doctors prescribe most, including diabetes, blood pressure, thyroid and cardiac medicines, along with common general medicines.'),
  ('Can someone else collect my medicines?', 'Yes, a family member can collect with your prescription or a photo of it. If you need repeated monthly supplies, ask the pharmacist about parcel or delivery options.'),
 ],
 'blooming-buds/blooming-buds.md': [
  ('Which ages do you see at Blooming Buds?', 'From newborns to young adults: well-baby and toddler care, school-age health, the full teenage years, and guidance through the transition into adult care.'),
  ('Do you give vaccinations?', 'Yes, for children, teenagers and adults, following the IAP schedule. Vaccination is available at the centre as part of regular visits or as a planned visit.'),
  ('Can a teenager come alone or speak privately?', 'Teenagers can be seen partly on their own, which often helps them speak freely. Dr. Prajakta explains at the start what stays private and what must be shared with parents for safety.'),
  ('Do you see children with special needs?', 'Yes. Children with disabilities and developmental concerns are welcome, and care is planned patiently with the family. Please tell us about any specific needs when you book.'),
 ],
 'patient-info/coming-from-outside-nagpur.md': [
  ('Can consultation, tests and medicines be done in one trip?', 'Usually yes. If you share your reports and requirements in advance, we plan the consultation, lab work and pharmacy so that most patients finish in a single day.'),
  ('Should I bring my previous reports?', 'Yes, bring previous prescriptions, recent lab reports, discharge summaries and your medicine list. They help the doctor avoid repeating tests and understand your history quickly.'),
  ('Do I need to come fasting?', 'Come fasting only if a fasting test is planned; we will tell you when you book. Fasting usually means no food for 8 to 12 hours, with water and regular medicines allowed unless advised.'),
 ],
}
for rel, pairs in NEW_FAQS.items():
    p, fm, body = load(rel)
    body = add_faqs(body, pairs)
    save(p, fm, body)
    log.append(f'{rel}: +{len(pairs)} FAQs')

TOPUPS = {
 'blooming-buds/well-baby-clinic.md': [
  ("What should I bring to the well-baby visit?", "Bring your child's health record or vaccination book, any previous reports, and a short list of questions. It also helps to note feeding, sleep and anything new you have noticed since the last visit."),
 ],
 'blooming-buds/psychological-testing.md': [
  ('Will my child be labelled after testing?', 'No. Testing is done to understand how your child learns and where support will help, not to label. Results are explained to parents in a feedback session with practical next steps.'),
  ('How long does testing take?', "Most assessments need one to two sessions depending on the tests chosen and the child's pace. We tell you the plan before starting so you can schedule the visits."),
 ],
 'diabetes-heart/heart-care.md': [
  ('I feel fine. Do I still need a heart check?', 'Many heart risks, such as high blood pressure, cholesterol and early sugar problems, cause no symptoms for years. A check finds them while they are still easy to treat, especially with diabetes or family history.'),
  ('Which test will the doctor choose for me?', 'It depends on your symptoms and risk. Many patients start with an ECG; a 2D Echo looks at structure and pumping, and a treadmill test shows how the heart behaves under load. Dr. Ajay explains which is useful for you.'),
 ],
 'diabetes-heart/2d-echo.md': [
  ("How is a 2D Echo different from an ECG?", "An ECG records the heart's electrical rhythm, while a 2D Echo is an ultrasound that shows the heart's chambers, valves and pumping action. They answer different questions and are often used together."),
  ('Do I need any preparation for a 2D Echo?', 'No special preparation is needed. You can eat, drink and take your usual medicines. The scan takes about 20 to 30 minutes, and the report is discussed with you.'),
 ],
 'diabetes-heart/diabetes-care-programme.md': [
  ('Is the programme only for people whose sugar is uncontrolled?', 'No. It is built for steady, planned care at any stage, including people whose sugar is currently fine. The point is to stay ahead of complications rather than react to them.'),
  ('Can I join if I already see another doctor?', 'Yes. The programme can run alongside your existing care, and records are shared with your doctor if you wish. Many patients use it for the yearly screening and structured reviews.'),
 ],
 'diabetes-heart/preventive-health-check-ups.md': [
  ('Which check-up is right for me?', 'It depends on your age, family history and existing conditions. A short discussion with the doctor narrows it to the tests that are actually useful for you, rather than a fixed package for everyone.'),
  ('How often should I repeat a check-up?', 'For most healthy adults, once a year is reasonable; more often if a result needs tracking or you have a condition like diabetes or hypertension. Your doctor sets the interval from your results.'),
 ],
 'diabetes-heart/complications-screening.md': [
  ('How often should complications screening be done?', 'For most people with diabetes, once a year covers eyes, kidneys, feet and heart. Some findings need more frequent checks, and your doctor will tell you the interval after reviewing results.'),
 ],
 'diabetes-heart/nutrition-lifestyle-counselling.md': [
  ('Do I have to give up rice and roti?', 'No. Plans are built around your own food, including rice, roti and festival meals. The focus is on portion, timing and combinations rather than banning familiar foods.'),
 ],
 'diabetes-heart/prediabetes-risk-assessment.md': [
  ('Can prediabetes become diabetes even with a good lifestyle?', 'Lifestyle change lowers the risk considerably and many people return to the normal range, but it does not fall to zero. That is why periodic testing continues even when things look good.'),
 ],
}
for rel, pairs in TOPUPS.items():
    p, fm, body = load(rel)
    body = add_faqs(body, pairs)
    save(p, fm, body)
    log.append(f'{rel}: +{len(pairs)} FAQs')

LEGAL_DESC = {
 'legal/accessibility.md': 'How the Niramay Clinics website is built to be usable by everyone: text size, contrast, keyboard access, and how to report a problem.',
 'legal/cancellation-refund-policy.md': 'How appointment booking, cancellation, rescheduling and refunds work at Niramay Clinics, Dhantoli, Nagpur.',
 'legal/editorial-policy.md': 'How medical content at Niramay Clinics is written, reviewed by our doctors, corrected and kept up to date.',
 'legal/medical-disclaimer.md': 'The Niramay Clinics website gives general health information only. It is not a diagnosis or a substitute for a consultation.',
 'legal/patient-rights.md': 'Your rights and responsibilities as a patient at Niramay Clinics, Nagpur, and how to raise a concern or complaint.',
 'legal/terms-of-use.md': 'The terms for using the Niramay Clinics website, booking appointments online and using our content.',
}
for rel, desc in LEGAL_DESC.items():
    p, fm, body = load(rel)
    fm = fm_set(fm, 'meta_description', desc)
    save(p, fm, body)
    log.append(f'{rel}: +desc')

p, fm, body = load('legal/editorial-policy.md')
fm = fm_set(fm, 'seo_title', 'Editorial and Review Policy | Niramay Clinics')
save(p, fm, body); log.append('editorial-policy: title')

p, fm, body = load('legal/patient-rights.md')
fm = fm_set(fm, 'seo_title', 'Patient Rights | Niramay Clinics, Nagpur')
save(p, fm, body); log.append('patient-rights: title')

print('\n'.join(log))
print('done:', len(log), 'files touched')
