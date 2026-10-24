import { edit, once } from "./io.mjs";
const FIX = {
  "diabetes-diet-for-weight-loss":
    ["Balanced Indian thali with dal, vegetables, a small portion of rice and roti, and salad. fresh",
     "Balanced Indian thali with dal, vegetables, a small portion of rice and roti, and a fresh salad"],
  "dual-triple-agonists-after-semaglutide-tirzepatide":
    ["Diabetologist pointing to a simple diagram of three hormone pathways on a whiteboard, with a patient",
     "Diabetologist pointing to a simple diagram of three hormone pathways on a whiteboard while a patient watches"],
  "first-signs-of-type-2-diabetes":
    ["Adult drinking water at a kitchen counter looking tired in a Nagpur home, with a glucometer",
     "Adult drinking water at a kitchen counter looking tired in a Nagpur home, with a glucometer beside them"],
  "history-of-glp-1-drugs-natural-discovery-to-medicines":
    ["Laboratory bench with glass vials, a microscope and handwritten research notes, with a diabetologist",
     "Laboratory bench with glass vials, a microscope and handwritten research notes, with a diabetologist reviewing them"],
  "prediabetes-weight-loss-how-much-helps":
    ["Adult measuring waist circumference with a tape at home in Nagpur healthy lifestyle setting",
     "Adult measuring waist circumference with a tape at home in a Nagpur apartment"],
  "is-glp-1-medicine-worth-the-cost":
    ["Indian couple sitting with a diabetologist reviewing a treatment plan and a notebook on a clinic",
     "Indian couple sitting with a diabetologist reviewing a treatment plan and a notebook on a clinic desk"],
};
for (const [slug, [a, b]] of Object.entries(FIX)) {
  const f = `resources/content/blog/${slug}.md`;
  edit(f, (s) => once(s, `image_alt: "${a}"`, `image_alt: "${b}"`, slug));
}
console.log("ok");
