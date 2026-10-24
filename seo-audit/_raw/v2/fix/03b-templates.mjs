import { edit } from "./io.mjs";
for (const f of [
  "components/templates/ServiceDetail.tsx",
  "components/templates/ServiceHub.tsx",
  "components/templates/Editorial.tsx",
]) {
  edit(f, (s) =>
    s
      .split("(page.meta.reviewed || page.modified) ? formatDate(plusYear(page.modified)) : undefined")
      .join("formatDate(plusYear(page.meta.reviewed || page.modified))")
      .split("(page.meta.reviewed || page.modified) ? formatDate(page.modified) : undefined")
      .join("formatDate(page.meta.reviewed || page.modified)")
  );
}
console.log("ok");
