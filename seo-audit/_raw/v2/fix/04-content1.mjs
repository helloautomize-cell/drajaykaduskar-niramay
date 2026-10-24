// FP-001: drop the literal "**H2:**" directive on the About page.
import { edit, once } from "./io.mjs";
edit("resources/content/core/about.md", (s) =>
  once(s, `#### Our team\n**H2:** The people you will meet\n`, `#### The people you will meet\n`)
);
console.log("ok");
