/**
 * Markdown body -> React, with structural detection:
 *  - "#### Frequently asked questions" sections -> FaqAccordion + FAQ data
 *  - process headings ("How we work", "How it works", ...) + ordered list -> StepTracker
 *  - "How to prepare" / "Before your test" sections -> warning Callout
 *  - emergency paragraphs/sections ("call 108 or 112", "warning signs", "urgently") -> emergency Callout
 *  - blockquotes starting with "Important"/"Note" -> info Callout
 *  - **​[CONFIRM: ...]** markers -> Confirm chips (hidden in production)
 *  - GFM tables -> ContentTable (horizontal scroll, sticky first column)
 *  - h2-h5 get slug ids and feed the table of contents.
 */
import React from "react";
import Link from "next/link";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { Root, RootContent, Heading, List, Paragraph, Blockquote, PhrasingContent } from "mdast";
import type { Element, Root as HastRoot } from "hast";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { Confirm } from "@/components/ui/Confirm";
import { Callout } from "@/components/ui/Callout";
import { FaqAccordion, type FaqItem } from "@/components/sections/FaqAccordion";
import { StepTracker, type Step } from "@/components/sections/StepTracker";
import { ContentTable } from "@/components/ui/ContentTable";
import { VideoFacade } from "@/components/sections/VideoFacade";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

/* ---------------------------------------------------------------- helpers */

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textOf(node: RootContent | PhrasingContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return (node.children as PhrasingContent[]).map(textOf).join("");
  return "";
}

const CONFIRM_RE = /\[CONFIRM(?::\s*([^\]]+))?\]/;

/**
 * Replace any text/strong content matching [CONFIRM...] with a
 * `confirmMarker` mdast node (converted to <confirm-marker> in hast).
 */
function injectConfirmMarkers(node: RootContent): void {
  if (!("children" in node) || !Array.isArray(node.children)) return;
  const children = node.children as RootContent[];
  for (let i = 0; i < children.length; i++) {
    const c = children[i];
    injectConfirmMarkers(c);
    if (c.type === "strong") {
      const t = textOf(c);
      const m = t.match(CONFIRM_RE);
      if (m && m[0] === t.trim()) {
        children[i] = {
          type: "confirmMarker",
          data: { note: m[1]?.trim() ?? "to be confirmed" },
        } as unknown as RootContent;
      }
    } else if (c.type === "text" && CONFIRM_RE.test(c.value)) {
      const parts: RootContent[] = [];
      let rest = c.value;
      let m = rest.match(CONFIRM_RE);
      while (m) {
        const idx = m.index!;
        if (idx > 0) parts.push({ type: "text", value: rest.slice(0, idx) });
        parts.push({
          type: "confirmMarker",
          data: { note: m[1]?.trim() ?? "to be confirmed" },
        } as unknown as RootContent);
        rest = rest.slice(idx + m[0].length);
        m = rest.match(CONFIRM_RE);
      }
      if (rest) parts.push({ type: "text", value: rest });
      children.splice(i, 1, ...parts);
      i += parts.length - 1;
    }
  }
}

function headingSlug(h: Heading): string {
  return slugify(textOf(h));
}

/**
 * Production only: drop sections (#### heading + everything up to the next
 * same-or-higher heading) whose entire text content is [CONFIRM] markers.
 * confirmMarker nodes carry no text, so an empty nodesToText means the section
 * would render as a bare heading in prod (e.g. Awards, Memberships). In dev
 * the section stays so the yellow chips are visible.
 */
function dropEmptyConfirmSections(mdast: Root): void {
  if (process.env.NODE_ENV !== "production") return;
  const children = mdast.children as RootContent[];
  for (let i = 0; i < children.length; i++) {
    const n = children[i];
    if (n.type !== "heading" || (n as Heading).depth < 4) continue;
    const depth = (n as Heading).depth;
    let j = i + 1;
    const nodes: RootContent[] = [];
    while (
      j < children.length &&
      !(children[j].type === "heading" && (children[j] as Heading).depth <= depth)
    ) {
      nodes.push(children[j]);
      j++;
    }
    if (nodes.length > 0 && nodesToText(nodes) === "") {
      children.splice(i, j - i);
      i--;
    }
  }
}

/* -------------------------------------------------------------- segments */

export type Segment =
  | { kind: "md"; nodes: RootContent[] }
  | { kind: "faq"; heading: string; items: { q: string; a: RootContent[] }[] }
  | { kind: "steps"; label: string; steps: Step[] }
  | { kind: "callout"; variant: "emergency" | "info" | "warning"; title?: string; nodes: RootContent[] }
  | { kind: "summary"; items: string[] }
  | { kind: "video"; caption: string };

export interface RenderedDoc {
  /** rendered React content */
  content: React.ReactNode;
  /** TOC entries from h3-h5 headings that survived as plain sections */
  toc: { id: string; text: string; depth: number }[];
  /** FAQ items for JSON-LD */
  faq: FaqItem[];
}

const FAQ_HEADING = /frequently asked questions/i;
const STEPS_HEADING = /how we work|what the process includes|how counselling works|how it works|what happens at|what to expect|on the day/i;
const PREPARE_HEADING = /how to prepare|before your test|preparing for/i;
const EMERGENCY_HEADING = /emergency|urgently|warning signs|when to see a doctor|seek (urgent|immediate)/i;
const EMERGENCY_TEXT = /call 108 or 112|call 108|call 112|medical emergency|seek emergency|go to the emergency/i;
const INFO_QUOTE = /^(important|note)\b/i;
const WHEN_TO_SEE_DOCTOR = /when to see a doctor/i;
const VIDEO_MARKER = /^\[?\s*video\s*:/i;

/** Paragraph that is only an emphasised "[Video: ...]" marker. */
function isVideoMarker(p: Paragraph): string | null {
  const kids = p.children;
  if (kids.length !== 1 || kids[0].type !== "emphasis") return null;
  const t = textOf(kids[0]).trim();
  if (!VIDEO_MARKER.test(t)) return null;
  const m = t.match(/"([^"]+)"/);
  return m ? m[1] : "Clinic video";
}

function isFaqQuestionParagraph(p: Paragraph, strict = false): boolean {
  // A question line: paragraph whose first child is a strong (bold) node.
  // In strict mode (group auto-detection) the question must end with "?" so
  // standalone bold labels like "**Information you give us**" on legal pages
  // are not treated as questions.
  const first = p.children[0];
  if (first?.type !== "strong") return false;
  const q = textOf(first).trim();
  if (q.length < 4) return false;
  if (q.endsWith("?")) return true;
  if (strict) return false;
  return p.children.slice(1).every((c) => c.type === "text" && !c.value.trim());
}

/** Does the run starting at i look like a FAQ group (>=2 question paragraphs)? */
function looksLikeFaqRun(children: RootContent[], start: number, depth: number): number {
  let count = 0;
  for (let j = start; j < children.length; j++) {
    const c = children[j];
    if (c.type === "heading" && (c as Heading).depth <= depth) break;
    if (c.type === "paragraph" && isFaqQuestionParagraph(c, true)) count++;
  }
  return count;
}

/** Split top-level mdast children into typed segments. */
export function segment(mdast: Root): Segment[] {
  const children = mdast.children;
  const out: Segment[] = [];
  let buf: RootContent[] = [];
  const flush = () => {
    if (buf.length) out.push({ kind: "md", nodes: buf });
    buf = [];
  };

  for (let i = 0; i < children.length; i++) {
    const node = children[i];

    if (node.type === "heading") {
      const text = textOf(node);
      const depth = node.depth;

      if (FAQ_HEADING.test(text) || looksLikeFaqRun(children, i + 1, depth) >= 2) {
        flush();
        // consume until next heading of depth <= this one
        const items: { q: string; a: RootContent[] }[] = [];
        let j = i + 1;
        while (j < children.length && !(children[j].type === "heading" && (children[j] as Heading).depth <= depth)) {
          const c = children[j];
          if (c.type === "paragraph" && isFaqQuestionParagraph(c)) {
            const q = textOf(c.children[0] as PhrasingContent).trim();
            const rest = c.children.slice(1);
            const a: RootContent[] = rest.length
              ? [{ ...c, children: rest } as Paragraph]
              : [];
            j++;
            while (
              j < children.length &&
              !(children[j].type === "heading" && (children[j] as Heading).depth <= depth) &&
              !(children[j].type === "paragraph" && isFaqQuestionParagraph(children[j] as Paragraph))
            ) {
              a.push(children[j]);
              j++;
            }
            items.push({ q, a });
          } else {
            j++;
          }
        }
        i = j - 1;
        out.push({ kind: "faq", heading: text, items });
        continue;
      }

      if (STEPS_HEADING.test(text)) {
        // look ahead: heading followed by an ordered list
        const next = children[i + 1];
        if (next?.type === "list" && next.ordered) {
          flush();
          const steps: Step[] = (next as List).children.map((li) => {
            const firstPara = li.children.find((c): c is Paragraph => c.type === "paragraph");
            if (!firstPara) return { title: textOf(li).slice(0, 40), body: textOf(li) };
            const first = firstPara.children[0];
            if (first?.type === "strong") {
              const title = textOf(first).replace(/[.:]\s*$/, "");
              const rest = firstPara.children.slice(1);
              const body = textOf({ ...firstPara, children: rest } as Paragraph).trim();
              return { title, body };
            }
            const full = textOf(firstPara);
            const dot = full.indexOf(". ");
            if (dot > 0 && dot < 60) return { title: full.slice(0, dot), body: full.slice(dot + 1).trim() };
            return { title: full.slice(0, 60), body: full };
          });
          i += 1;
          out.push({ kind: "steps", label: text, steps });
          continue;
        }
      }

      if (PREPARE_HEADING.test(text) || EMERGENCY_HEADING.test(text)) {
        flush();
        // "When to see a doctor" lists are routine-care guidance -> warning.
        // A trailing "seek emergency care" line inside such a section gets its
        // own emergency callout (e.g. toxic-shock warning on menstrual hygiene).
        const variant = PREPARE_HEADING.test(text) || WHEN_TO_SEE_DOCTOR.test(text) ? "warning" : "emergency";
        const nodes: RootContent[] = [];
        let j = i + 1;
        while (j < children.length && !(children[j].type === "heading" && (children[j] as Heading).depth <= depth)) {
          nodes.push(children[j]);
          j++;
        }
        i = j - 1;
        if (variant === "warning") {
          // a "seek emergency care" paragraph inside the section gets its own
          // emergency callout; anything after it returns to normal flow
          const ei = nodes.findIndex(
            (n) => n.type === "paragraph" && EMERGENCY_TEXT.test(textOf(n))
          );
          if (ei >= 0) {
            const tail = nodes.splice(ei);
            const emerg = [tail.shift()!];
            out.push({ kind: "callout", variant, title: text, nodes });
            out.push({ kind: "callout", variant: "emergency", title: "In an emergency", nodes: emerg });
            if (tail.length) out.push({ kind: "md", nodes: tail });
            continue;
          }
        }
        out.push({ kind: "callout", variant, title: text, nodes });
        continue;
      }

      // plain heading: give it a slug id and keep it in the markdown run
      const h = node as Heading;
      h.data = { ...h.data, hProperties: { id: headingSlug(h) } };
      buf.push(node);
      continue;
    }

    if (node.type === "blockquote") {
      const bq = textOf(node);
      if (EMERGENCY_TEXT.test(bq)) {
        flush();
        out.push({ kind: "callout", variant: "emergency", title: "In an emergency", nodes: (node as Blockquote).children });
        continue;
      }
      if (INFO_QUOTE.test(bq)) {
        flush();
        const inner = (node as Blockquote).children;
        out.push({ kind: "callout", variant: "info", title: undefined, nodes: inner });
        continue;
      }
    }

    if (node.type === "paragraph") {
      const p = node as Paragraph;
      const videoCaption = isVideoMarker(p);
      if (videoCaption) {
        flush();
        out.push({ kind: "video", caption: videoCaption });
        continue;
      }
      // "**Summary box:**" + bullet list -> "In brief" card at the top of a post
      const first = p.children[0];
      if (first?.type === "strong" && /^summary box/i.test(textOf(first))) {
        const next = children[i + 1];
        if (next?.type === "list") {
          flush();
          out.push({
            kind: "summary",
            items: (next as List).children.map((li) => textOf(li).trim()),
          });
          i += 1;
          continue;
        }
      }
      if (EMERGENCY_TEXT.test(textOf(p))) {
        flush();
        out.push({ kind: "callout", variant: "emergency", title: "In an emergency", nodes: [node] });
        continue;
      }
    }

    buf.push(node);
  }
  flush();
  return out;
}

/* ------------------------------------------------------------- rendering */

const mdToHast = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, {
    allowDangerousHtml: false,
    handlers: {
      confirmMarker(_state: unknown, node: { data?: { note?: string } }) {
        return {
          type: "element",
          tagName: "confirm-marker",
          properties: { note: node.data?.note ?? "to be confirmed" },
          children: [],
        } as Element;
      },
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

function mdastToHast(nodes: RootContent[]): HastRoot {
  const tree = mdToHast.runSync({ type: "root", children: nodes } as unknown as Root);
  return tree as HastRoot;
}

/* components map for hast-util-to-jsx-runtime */

function AnchorTag({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const h = href ?? "";
  // `[email](mailto:)` in markdown -> client-assembled email link
  // (anti-scrape): bare "email" text shows the address after mount, any
  // other text becomes the link label.
  if (h === "mailto:" || h === "mailto:EMAIL") {
    const bare = typeof children === "string" && children.trim() === "email";
    return (
      <ObfuscatedEmail className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum">
        {bare ? undefined : children}
      </ObfuscatedEmail>
    );
  }
  if (h.startsWith("/")) {
    return (
      <Link href={h} className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum">
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(h);
  return (
    <a
      href={h}
      className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

const components = {
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...p} className={cn("t-h3 mt-10 text-ink", p.className)} />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...p} className={cn("t-h3 mt-10 scroll-mt-28 text-ink", p.className)} />
  ),
  // Source markdown uses #### for top-level sections (the H1 comes from the
  // template), so remap 4->h2, 5->h3, 6->h4 to keep a sequential outline.
  h4: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...p} className={cn("t-h4 mt-9 scroll-mt-28 text-ink", p.className)} />
  ),
  h5: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...p} className={cn("mb-2 mt-8 scroll-mt-28 text-[19px] font-bold text-ink", p.className)} />
  ),
  h6: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 {...p} className={cn("mb-2 mt-6 scroll-mt-28 text-[17px] font-bold text-ink", p.className)} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...p} className={cn("mt-4 text-[17px] leading-relaxed text-ink-600 first:mt-0", p.className)} />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...p} className={cn("mt-4 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-ink-600 marker:text-plum", p.className)} />
  ),
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...p} className={cn("mt-4 list-decimal space-y-2 pl-6 text-[17px] leading-relaxed text-ink-600 marker:font-semibold marker:text-plum", p.className)} />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li {...p} className={cn("pl-1", p.className)} />,
  a: AnchorTag,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong {...p} className={cn("font-semibold text-ink", p.className)} />,
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...p} className={cn("mt-6 border-l-4 border-plum/30 bg-plum-50 px-5 py-4 text-[17px] italic text-ink-600", p.className)} />
  ),
  hr: () => <hr className="my-10 border-line" />,
  table: (p: React.TableHTMLAttributes<HTMLTableElement> & { node?: Element }) => (
    <ContentTable>{p.children as React.ReactNode}</ContentTable>
  ),
  thead: (p: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...p} />,
  tbody: (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...p} />,
  tr: (p: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...p} className={cn("border-b border-line last:border-0", p.className)} />
  ),
  th: (p: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th {...p} className={cn("bg-plum-50 px-4 py-3 text-left text-[15px] font-semibold text-ink", p.className)} />
  ),
  td: (p: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...p} className={cn("px-4 py-3 text-[15px] text-ink-600", p.className)} />
  ),
  img: (p: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...p} alt={p.alt ?? ""} loading="lazy" className={cn("mt-6 w-full rounded-[16px]", p.className)} />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code {...p} className={cn("rounded bg-plum-50 px-1.5 py-0.5 text-[0.9em] text-plum", p.className)} />
  ),
  "confirm-marker": (p: { note?: string }) => <Confirm>{p.note ?? "to be confirmed"}</Confirm>,
} as unknown as Record<string, React.ElementType>;

function renderNodes(nodes: RootContent[], key: string): React.ReactNode {
  if (!nodes.length) return null;
  const hast = mdastToHast(nodes);
  return (
    <Fragment key={key}>
      {toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        components,
        passNode: true,
      })}
    </Fragment>
  );
}

/** Convert answer mdast nodes to plain text for FAQPage JSON-LD. */
function nodesToText(nodes: RootContent[]): string {
  return nodes.map(textOf).join(" ").replace(/\s+/g, " ").trim();
}

export function renderMarkdown(markdown: string, ctx?: { videoId?: string }): RenderedDoc {
  const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown) as unknown as Root;
  // [CONFIRM] markers first, drop all-CONFIRM sections in prod, then segment
  injectConfirmMarkers(mdast as unknown as RootContent);
  dropEmptyConfirmSections(mdast);
  const segments = segment(mdast);

  const toc: RenderedDoc["toc"] = [];
  const faq: FaqItem[] = [];
  const out: React.ReactNode[] = [];

  const collectToc = (nodes: RootContent[]) => {
    for (const n of nodes) {
      if (n.type === "heading") {
        const h = n as Heading;
        if (h.depth >= 3 && h.depth <= 5) {
          toc.push({ id: headingSlug(h), text: textOf(h), depth: h.depth });
        }
      }
    }
  };

  segments.forEach((seg, i) => {
    switch (seg.kind) {
      case "md":
        collectToc(seg.nodes);
        out.push(renderNodes(seg.nodes, `md-${i}`));
        break;
      case "faq": {
        const items: FaqItem[] = seg.items.map((it) => ({
          q: it.q,
          a: renderNodes(it.a, `faq-${i}-${it.q}`),
          aText: nodesToText(it.a),
        }));
        faq.push(...items);
        out.push(
          <FaqAccordion
            key={`faq-${i}`}
            heading={seg.heading}
            id={slugify(seg.heading)}
            items={items}
            className="mt-12"
          />
        );
        toc.push({ id: slugify(seg.heading), text: seg.heading, depth: 4 });
        break;
      }
      case "steps":
        out.push(<StepTracker key={`steps-${i}`} label={seg.label} steps={seg.steps} className="mt-10" />);
        toc.push({ id: slugify(seg.label), text: seg.label, depth: 4 });
        break;
      case "callout":
        out.push(
          <Callout key={`co-${i}`} variant={seg.variant} title={seg.title} className="mt-6">
            {renderNodes(seg.nodes, `co-n-${i}`)}
          </Callout>
        );
        break;
      case "summary":
        out.push(
          <div key={`sum-${i}`} className="mb-8 rounded-[18px] bg-plum-50 p-6">
            <p className="text-[15px] font-bold text-plum">In brief</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[15.5px] leading-relaxed text-ink-600 marker:text-plum">
              {seg.items.map((it, k) => (
                <li key={k} className="pl-1">{it}</li>
              ))}
            </ul>
          </div>
        );
        break;
      case "video":
        if (ctx?.videoId) {
          out.push(<VideoFacade key={`vid-${i}`} id={ctx.videoId} title={seg.caption} />);
        }
        break;
    }
  });

  return { content: <>{out}</>, toc, faq };
}

/** Plain-text render of a markdown run (for meta snippets etc.) */
export function mdToPlain(nodes: RootContent[]): string {
  return nodes.map(textOf).join(" ").replace(/\s+/g, " ").trim();
}

/* ------------------------------------------------- structured split utils
 * Used by hand-composed templates (doctor profiles) that need sections as
 * separate chunks rather than one rendered flow.
 */

export interface BodySection {
  title: string;
  id: string;
  depth: number;
  nodes: RootContent[];
}

export interface SplitBody {
  intro: RootContent[];
  sections: BodySection[];
}

/** Parse a body and split on level-4+ headings. */
export function splitBody(markdown: string): SplitBody {
  const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown) as unknown as Root;
  injectConfirmMarkers(mdast as unknown as RootContent);
  dropEmptyConfirmSections(mdast);
  const intro: RootContent[] = [];
  const sections: BodySection[] = [];
  let cur: BodySection | null = null;
  for (const node of mdast.children) {
    if (node.type === "heading" && (node as Heading).depth >= 4) {
      cur = { title: textOf(node), id: headingSlug(node as Heading), depth: (node as Heading).depth, nodes: [] };
      sections.push(cur);
    } else if (cur) {
      cur.nodes.push(node);
    } else {
      intro.push(node);
    }
  }
  return { intro, sections };
}

/** Render mdast nodes to React (exposed for hand-composed templates). */
export function renderNodesPublic(nodes: RootContent[], key = "n"): React.ReactNode {
  return renderNodes(nodes, key);
}

/** Plain text of mdast nodes. */
export function nodesText(nodes: RootContent[]): string {
  return nodes.map(textOf).join(" ").replace(/\s+/g, " ").trim();
}

export { site };
