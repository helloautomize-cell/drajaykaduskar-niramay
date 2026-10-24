// CRAWL-002, SCH-001/002/004/005/006, LINK: catch-all page schema + crumbs.
import { edit, once } from "./io.mjs";
edit("app/(site)/[...slug]/page.tsx", (s) => {
  s = once(s, `  blogPostingNode,
  postMedicalWebPageNode,`, `  blogPostingNode,
  postMedicalWebPageNode,
  topicEntity,
  webPageNode,
  serviceNode,
  serviceIdFor,`);
  s = once(s, `l.href !== "/blooming-buds/" && l.href !== "/vaccination/")`, `l.href !== "/blooming-buds/")`);
  // cluster crumb -> the real pillar URL (no #fragment); omitted on the pillar itself
  s = once(s, `    const cluster = clusterFor(post.meta.cluster);
    const wordCount = post.body.split(/\\s+/).filter(Boolean).length;
    const crumbs = [
      { label: "Health Library", href: "/health-library/" },
      ...(cluster
        ? [{ label: cluster.name, href: \`/health-library/#cluster-\${cluster.n}\` }]
        : []),
      { label: post.meta.title, href: post.meta.url },
    ];`, `    const cluster = clusterFor(post.meta.cluster);
    const pillarUrl = cluster ? \`/health-library/\${cluster.pillar}/\` : null;
    const wordCount = post.body.split(/\\s+/).filter(Boolean).length;
    const crumbs = [
      { label: "Health Library", href: "/health-library/" },
      ...(cluster && pillarUrl !== post.meta.url ? [{ label: cluster.name, href: pillarUrl! }] : []),
      { label: post.meta.title, href: post.meta.url },
    ];
    const topic = topicEntity(post.meta.cluster ?? post.meta.category);
    const reviewed = post.meta.reviewed || post.meta.updated || post.meta.published || undefined;`);
  s = once(s, `        about: cluster?.name || post.meta.category || post.meta.title,
        lastReviewed: post.meta.updated || post.meta.published || undefined,
        reviewedBy: reviewer,
      }),`, `        aboutId: topic?.["@id"],
        lastReviewed: reviewed,
        reviewedBy: reviewer,
      }),
      topic,`);
  s = once(s, `        author,
        reviewedBy: reviewer,
        image: postImage,`, `        author,
        image: postImage,`);
  // non-post pages: always one WebPage-type node; service entity; no fabricated about
  s = once(s, `  const schemaField = page.meta.schema;
  const graph: (object | null)[] = [
    clinicNode(),
    websiteNode(),
    ...(reviewer ? [physicianNode(reviewer)] : []),
    /MedicalTest|DiagnosticLab/i.test(schemaField) ? medicalTestNode(page.meta) : null,
    /MedicalWebPage|MedicalCondition/i.test(schemaField) || template === "service-detail" || template === "hub"
      ? medicalWebPageNode(page.meta, reviewer, { lastReviewed: page.modified })
      : null,`, `  const schemaField = page.meta.schema;
  const isTestPage = /MedicalTest|DiagnosticLab/i.test(schemaField);
  const isMedicalPage =
    /MedicalWebPage|MedicalCondition/i.test(schemaField) || template === "service-detail" || template === "hub";
  // Declared page type from the frontmatter "schema" field, defaulting to
  // WebPage (legal pages carry an empty schema field).
  const declaredPageType = /AboutPage/.test(schemaField)
    ? "AboutPage"
    : /ContactPage/.test(schemaField)
      ? "ContactPage"
      : /CollectionPage|ItemList|Blog\\b/.test(schemaField)
        ? "CollectionPage"
        : "WebPage";
  const reviewed = page.meta.reviewed || page.modified || undefined;
  const graph: (object | null)[] = [
    clinicNode(),
    websiteNode(),
    ...(reviewer && isMedicalPage ? [physicianNode(reviewer)] : []),
    isTestPage ? medicalTestNode(page.meta) : serviceNode(page.meta),
    isMedicalPage
      ? medicalWebPageNode(page.meta, reviewer, {
          lastReviewed: reviewed,
          aboutId: isTestPage ? \`\${SITE_URL}\${page.meta.url}#test\` : serviceIdFor(page.meta.url),
        })
      : template === "blog-list"
        ? null
        : webPageNode(page.meta, declaredPageType),`);
  s = once(s, `<LegalTemplate page={page} doc={doc} />`, `<LegalTemplate page={page} doc={doc} lastUpdated={page.meta.updated || site.legalLastUpdated} />`);
  // blog index: merge into the single page graph (one script)
  s = once(s, `          {ld}
          <JsonLd
            nodes={[
              collectionPageNode({`, `          <JsonLd
            nodes={[
              ...graph,
              collectionPageNode({`);
  return s;
});
console.log("ok");
