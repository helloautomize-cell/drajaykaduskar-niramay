import { ogImage } from "@/lib/og-image";
import { pageByUrl, postBySlug } from "@/lib/content/pages";

/**
 * Per-page Open Graph image generator: /og/<page path> renders the branded
 * 1200x630 card (title + gradient + logo). Linked from each page's
 * openGraph.images metadata. (The opengraph-image file convention cannot
 * sit inside a catch-all segment, so this route handler plays that role.)
 */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const pages = [...pageByUrl().keys()]
    .map((u) => u.split("/").filter(Boolean))
    .filter((s) => s.length > 0);
  const posts = [...postBySlug().keys()].map((s) => ["health-library", s]);
  return [...pages, ...posts].map((slug) => ({ slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug = [] } = await params;

  if (slug[0] === "health-library" && slug.length === 2) {
    const post = postBySlug().get(slug[1]);
    if (!post) return new Response("not found", { status: 404 });
    return ogImage(post.meta.title, "Health Library");
  }

  const url = "/" + slug.join("/") + "/";
  const page = pageByUrl().get(url);
  if (!page) return new Response("not found", { status: 404 });

  const eyebrow: Record<string, string> = {
    "diabetes-heart": "Diabetes and heart care",
    "blooming-buds": "Child and teen care",
    "lab-pharmacy": "Lab and pharmacy",
    "patient-info": "Patient information",
  };
  return ogImage(
    page.h1 || page.meta.title,
    eyebrow[page.meta.section] ?? "Niramay Clinics"
  );
}
