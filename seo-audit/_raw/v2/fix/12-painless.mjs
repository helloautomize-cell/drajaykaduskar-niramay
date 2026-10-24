// CONTENT-006: soften "painless" claims on test pages to factual wording.
import { edit, once } from "./io.mjs";
edit("resources/content/diabetes-heart/ecg.md", (s) => once(
  s
    .replace('meta_description: "A quick, painless ECG at Niramay Clinics', 'meta_description: "A quick ECG at Niramay Clinics')
    .replace('**Meta description:** A quick, painless ECG at Niramay Clinics', '**Meta description:** A quick ECG at Niramay Clinics'),
  "It takes about 5 to 10 minutes, is painless and needs no preparation.",
  "It takes about 5 to 10 minutes and needs no preparation; you will feel nothing more than the sticky pads."
));
edit("resources/content/diabetes-heart/2d-echo.md", (s) =>
  once(s, "It uses sound waves, not radiation, and is painless and safe, including in pregnancy.",
          "It uses sound waves, not radiation, and is safe, including in pregnancy; most people find it comfortable, with only cool gel and light probe pressure."));
edit("resources/content/diabetes-heart/body-composition-sarcopenia.md", (s) =>
  s.split("a very small, painless electrical signal").join("a very small electrical signal you cannot feel"));
edit("resources/content/blog/how-glp-1-injection-pens-work-technology.md", (s) =>
  once(s, "simple, accurate and nearly painless", "simple, accurate and comfortable to use"));
edit("resources/content/blog/metabolic-syndrome-fatty-liver-diabetes-heart-kidney-connection.md", (s) =>
  once(s, "It's painless and takes a few minutes.", "It is non-invasive and takes a few minutes."));
console.log("ok");
