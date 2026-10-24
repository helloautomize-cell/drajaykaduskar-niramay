// AI-004 + em-dash tell: last phrase-level cleanups.
import { edit, once } from "./io.mjs";
edit("resources/content/blog/glp-1-diabetes-weight-loss-india-price-results-side-effects.md", (s) =>
  once(s, "prices at the time of writing — pharmacies", "prices at the time of writing - pharmacies"));
edit("resources/content/blog/diabetes-diet-for-indians.md", (s) =>
  once(s, "The good news is that managing diabetes", "Managing diabetes"));
edit("resources/content/blog/prediabetes-hba1c-blood-sugar-symptoms-prevention.md", (s) =>
  once(s, "The good news is that prediabetes does", "Prediabetes does"));
edit("resources/content/blog/gestational-diabetes-diet-indian-foods-meal-timing.md", (s) =>
  once(s,
    `excerpt: "Food is the most powerful tool for controlling gestational diabetes. The good news is that you do not need to give up Indian food.`,
    `excerpt: "Food is the most powerful tool for controlling gestational diabetes. You do not need to give up Indian food.`));
edit("resources/content/blog/gestational-diabetes-diet-indian-foods-meal-timing.md", (s) =>
  once(s, "gestational diabetes. The good news is that you do not need to give up Indian food.",
          "gestational diabetes. You do not need to give up Indian food."));
console.log("ok");
