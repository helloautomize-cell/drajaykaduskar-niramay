// FAQ-001: top up 3-FAQ pages to 5; also fixes the stray FAQ after Sources
// in prediabetes (it was being dropped from the FAQ block).
import { edit, once } from "./io.mjs";

edit("resources/content/diabetes-heart/body-composition-sarcopenia.md", (s) =>
  once(s,
`**Who benefits from this test?**
Anyone managing weight, people with diabetes or sarcopenia risk, older adults losing strength, and patients who want to track real fat and muscle change rather than only the weighing scale.`,
`**Who benefits from this test?**
Anyone managing weight, people with diabetes or sarcopenia risk, older adults losing strength, and patients who want to track real fat and muscle change rather than only the weighing scale.

**How long does the analysis take?**
The scan itself takes only a few minutes. Most of the visit is spent going through your report with the doctor or nutritionist so you understand what the fat, muscle and water numbers mean for you.

**How is this different from checking weight or BMI?**
Weight and BMI cannot separate fat from muscle. The analysis shows how much of your weight is fat, where it sits, and whether you have enough muscle - so progress is measured by real body change, not only the scale.`)
);

edit("resources/content/diabetes-heart/prediabetes-risk-assessment.md", (s) => {
  // pull the stray FAQ back into the FAQ block, then add one more
  const stray = `\n\n**Can prediabetes become diabetes even with a good lifestyle?**\nLifestyle change lowers the risk considerably and many people return to the normal range, but it does not fall to zero. That is why periodic testing continues even when things look good.`;
  s = s.replace(stray, "");
  return once(s,
`**Do I need medicines for prediabetes?**
Lifestyle change is the first step. In some higher-risk situations, your doctor may discuss medicines. This is decided individually.`,
`**Do I need medicines for prediabetes?**
Lifestyle change is the first step. In some higher-risk situations, your doctor may discuss medicines. This is decided individually.

**How often should I repeat the blood sugar test?**
If your result is normal and your risk is low, testing every one to three years is usually enough. With prediabetes or ongoing risk factors, your doctor will usually repeat HbA1c or fasting sugar every 6 to 12 months.

**Can prediabetes become diabetes even with a good lifestyle?**
Lifestyle change lowers the risk considerably and many people return to the normal range, but it does not fall to zero. That is why periodic testing continues even when things look good.`);
});

edit("resources/content/lab-pharmacy/home-sample-collection.md", (s) =>
  once(s,
`**How will I receive my reports?**
Reports are delivered as soon as they are ready, usually the same day for routine tests, and are also available to your doctor if you consult at Niramay.`,
`**How will I receive my reports?**
Reports are delivered as soon as they are ready, usually the same day for routine tests, and are also available to your doctor if you consult at Niramay.

**Do I need to be fasting for a home visit?**
Only for tests that need fasting, such as fasting sugar or a fasting lipid profile. Tell us when you book; we schedule early-morning visits so your fast is not longer than needed.

**Can I book a collection for an elderly parent?**
Yes. Many bookings are for parents and patients who find travel difficult. Share the test list and a convenient time, and our phlebotomist will collect the sample at their doorstep.`)
);

edit("resources/content/lab-pharmacy/lab.md", (s) =>
  once(s,
`**Are fasting tests done early in the morning?**
Yes, the lab opens at 7 am so fasting samples are convenient. For a fasting test, avoid eating for 8 to 12 hours; water and regular medicines are usually fine unless your doctor says otherwise.`,
`**Are fasting tests done early in the morning?**
Yes, the lab opens at 7 am so fasting samples are convenient. For a fasting test, avoid eating for 8 to 12 hours; water and regular medicines are usually fine unless your doctor says otherwise.

**What should I bring for a lab test?**
Bring your prescription or the doctor's test list. If you are monitoring a condition like diabetes or thyroid, carrying your previous report helps compare results. No other preparation is needed for most routine tests.

**Is the laboratory open on Sundays?**
No, the lab is open Monday to Saturday, 7 am to 7 pm. For urgent needs on a Sunday, call the clinic and we will guide you on the best option.`)
);

edit("resources/content/lab-pharmacy/pharmacy.md", (s) =>
  once(s,
`**Can someone else collect my medicines?**
Yes, a family member can collect with your prescription or a photo of it. If you need repeated monthly supplies, ask the pharmacist about parcel or delivery options.`,
`**Can someone else collect my medicines?**
Yes, a family member can collect with your prescription or a photo of it. If you need repeated monthly supplies, ask the pharmacist about parcel or delivery options.

**Do I need a Niramay prescription to buy medicines?**
No. We dispense against any valid prescription. Medicines that legally require a prescription are supplied only against one, whichever doctor has written it.

**Is the pharmacy open on Sundays?**
No, the pharmacy is open Monday to Saturday, 8:30 am to 8 pm. If you are on regular medicines, we recommend keeping a few days' buffer so a Sunday does not interrupt a dose.`)
);

edit("resources/content/patient-info/coming-from-outside-nagpur.md", (s) =>
  once(s,
`**Do I need to come fasting?**
Come fasting only if a fasting test is planned; we will tell you when you book. Fasting usually means no food for 8 to 12 hours, with water and regular medicines allowed unless advised.`,
`**Do I need to come fasting?**
Come fasting only if a fasting test is planned; we will tell you when you book. Fasting usually means no food for 8 to 12 hours, with water and regular medicines allowed unless advised.

**Which towns do patients usually come from?**
Patients visit us from across Nagpur and from towns up to about 100 km away, including Wardha, Bhandara, Umred, Katol, Saoner and Ramtek.

**How far in advance should I book?**
A few days' notice is enough for most visits. Booking early helps us schedule your consultation, tests and pharmacy so everything fits into one trip.`)
);
console.log("ok");
