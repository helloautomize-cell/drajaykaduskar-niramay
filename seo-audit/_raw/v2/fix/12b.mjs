import { edit } from "./io.mjs";
edit("resources/content/diabetes-heart/body-composition-sarcopenia.md", (s) =>
  s.split("A very small, painless electrical signal").join("A very small electrical signal you cannot feel"));
console.log("ok");
