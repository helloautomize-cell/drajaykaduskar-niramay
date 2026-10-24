// CONTENT-003: "when to see a doctor" blocks on condition/test pages,
// inserted before the FAQ section (same position as obesity/heart-care).
import { edit, once } from "./io.mjs";

const A = "\n#### Frequently asked questions";
const add = (f, block) =>
  edit(f, (s) => once(s, A, "\n" + block + A, f));

add("resources/content/diabetes-heart/diabetes.md",
`#### When to see a doctor
See a doctor if you notice increased thirst, frequent urination, unexplained weight loss, constant tiredness, blurred vision, slow-healing cuts, or tingling in the feet. If your blood sugar is very high or very low with confusion, drowsiness or vomiting, treat it as urgent and seek immediate care.`);
add("resources/content/diabetes-heart/type-1-diabetes.md",
`#### When to see a doctor
Excessive thirst, frequent urination, weight loss despite eating, vomiting, stomach pain or rapid breathing can mean very high sugar or ketoacidosis and need urgent care - call 108 or go to the nearest emergency department. Routine concerns like frequent lows, growth worries or device problems are best raised at your regular review.`);
add("resources/content/diabetes-heart/diabetes-in-pregnancy.md",
`#### When to see a doctor
Contact your doctor if your readings stay above target, if you notice reduced baby movements, leaking fluid, bleeding, severe headache, blurred vision or pain under the right ribs - these can signal complications that need same-day assessment.`);
add("resources/content/diabetes-heart/complications-screening.md",
`#### When to see a doctor
Do not wait for your yearly screen if you notice new blurring or loss of vision, foot numbness, a non-healing foot wound, burning or tingling in the feet, swelling, or foam in the urine. These can be early signs of nerve, eye or kidney involvement and deserve a prompt review.`);
add("resources/content/diabetes-heart/prediabetes-risk-assessment.md",
`#### When to see a doctor
Book a check if you have a parent or sibling with diabetes, a waist size above 90 cm (men) or 80 cm (women), had diabetes in pregnancy, or routinely feel very thirsty, very tired or hungry soon after meals. One abnormal reading deserves a repeat test and a plan, not panic.`);
add("resources/content/diabetes-heart/ecg.md",
`#### When to see a doctor
An ECG is routine, but chest pain or pressure, sudden breathlessness, fainting, a racing or irregular heartbeat with dizziness, or pain spreading to the arm, jaw or back needs urgent attention - call 108 or 112 rather than booking a routine test.`);
add("resources/content/diabetes-heart/2d-echo.md",
`#### When to see a doctor
Seek urgent care for chest pain, severe breathlessness, fainting or swelling of both legs with breathlessness. A 2D Echo is usually a planned test; your doctor will advise it for a murmur, breathlessness on exertion, palpitations, or before and during certain treatments.`);
add("resources/content/diabetes-heart/tmt-stress-test.md",
`#### When to see a doctor
Chest discomfort that comes on with walking or climbing stairs and eases with rest should be assessed soon. Chest pain at rest, severe breathlessness or fainting is urgent - call 108 or 112. A treadmill test is scheduled to find out, not to be done while symptoms are unstable.`);
add("resources/content/diabetes-heart/nutrition-lifestyle-counselling.md",
`#### When to see a doctor
See a doctor if you are losing weight without trying, feel unusually tired, or your sugar, blood pressure or cholesterol reports keep drifting up despite your efforts. Food changes work best when they are planned around your reports, not only around generic diet charts.`);
add("resources/content/diabetes-heart/preventive-health-check-ups.md",
`#### When to see a doctor
Screening is for people who feel well. If you already have symptoms - chest discomfort, unusual breathlessness, unexplained weight loss, a breast lump, blood in urine or stool, or persistent pain - do not wait for a routine check-up; book a consultation promptly.`);
add("resources/content/blooming-buds/blooming-buds.md",
`#### When to see a doctor
Bring your child or teenager in if you notice falling growth percentiles, early or delayed puberty changes, poor weight gain, persistent tiredness, repeated headaches, or ongoing worry, sadness or behaviour changes. Most of these deserve a calm evaluation rather than urgent worry - but they should not be ignored for months.`);
add("resources/content/blooming-buds/teen-mental-health.md",
`#### When to see a doctor
Seek help early for low mood, anxiety, sleep problems, falling grades or social withdrawal lasting more than two weeks. If your teenager talks about self-harm, feels hopeless, or you are worried about their safety, treat it as urgent and contact a doctor or helpline the same day.`);
add("resources/content/blooming-buds/psychological-testing.md",
`#### When to see a doctor
Consider an assessment when a child's learning, attention, behaviour or development concerns persist at school or at home - for example falling behind in reading despite effort, extreme restlessness, or regression after a stressful event. Testing is a way to understand, not to label.`);
console.log("ok");
