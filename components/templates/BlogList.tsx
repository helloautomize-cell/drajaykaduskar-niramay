import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AuthorChip } from "@/components/sections/AuthorChip";
import { Chip } from "@/components/ui/Chip";
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";
import { postBadgeFor } from "@/lib/service-badges";
import { BLOG_CLUSTERS } from "@/lib/blog-clusters";
import { renderNodesPublic, splitBody } from "@/lib/content/render";
import type { ContentPage, BlogPost } from "@/lib/content/pages";
import { reviewerFor } from "@/lib/doctors";
import { cn } from "@/lib/utils";

function readingTime(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

/**
 * Health Library index: intro from the page body, then a card for each post
 * (newest first) with category chip, image, author avatar, published date
 * and reading time. Stretched-link pattern: the title is the only anchor,
 * its ::after covers the card; the author link sits above it.
 */
export function BlogListTemplate({
  page,
  posts,
}: {
  page: ContentPage;
  posts: BlogPost[];
}) {
  const h1 = page.h1 || page.meta.title;
  const { intro } = splitBody(page.body);

  // Group posts into the 10 content clusters, pillar first in each; posts
  // without a cluster fall into a trailing group at the end.
  const groups: { id?: string; name: string; posts: BlogPost[] }[] = BLOG_CLUSTERS.map(
    (c) => {
      const inCluster = posts.filter((p) => Number(p.meta.cluster) === c.n);
      const pillar = inCluster.find((p) => p.slug === c.pillar || p.meta.pillar);
      const rest = inCluster
        .filter((p) => p !== pillar)
        .sort((a, b) => a.slug.localeCompare(b.slug));
      return {
        id: `cluster-${c.n}`,
        name: c.name,
        posts: pillar ? [pillar, ...rest] : rest,
      };
    }
  ).filter((g) => g.posts.length > 0);
  const clustered = new Set(groups.flatMap((g) => g.posts.map((p) => p.slug)));
  const others = posts
    .filter((p) => !clustered.has(p.slug))
    .sort((a, b) => (b.meta.published || "").localeCompare(a.meta.published || ""));
  if (others.length) groups.push({ name: "More articles", posts: others });

  const card = (p: BlogPost) => {
    const doctor =
      p.meta.author.includes("Prajakta") ? reviewerFor("blooming-buds", p.meta.author) : reviewerFor("diabetes-heart", p.meta.author);
    return (
              <article
                key={p.slug}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white",
                  "shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]",
                  "focus-within:border-plum/50 focus-within:shadow-[var(--shadow-hover)]"
                )}
              >
                <span className="relative block aspect-[16/9] bg-gradient-to-br from-plum-100 via-plum-50 to-[#fdf3ee]">
                  {p.meta.image ? (
                    <Image
                      src={`/images/${p.meta.image}`}
                      alt={p.meta.image_alt || p.meta.title}
                      width={1280}
                      height={720}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center">
                      <ServiceBadge slug={postBadgeFor(p.slug)} size="md" alt="" />
                    </span>
                  )}
                </span>
                <div className="flex flex-1 flex-col p-6">
                  {p.meta.category && (
                    <Chip className="self-start">{p.meta.category}</Chip>
                  )}
                  <h2 className="mt-3 text-[19px] font-bold leading-snug text-ink transition-colors group-hover:text-plum">
                    <Link
                      href={p.meta.url}
                      className="outline-none after:absolute after:inset-0 after:rounded-[20px] focus-visible:after:outline-3 focus-visible:after:outline-plum-500 focus-visible:after:outline-offset-3"
                    >
                      {p.meta.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-600">
                    {p.meta.excerpt || excerptOf(p.body)}
                  </p>
                  <div className="relative z-[1] mt-5">
                    {doctor && (
                      <AuthorChip
                        doctor={doctor}
                        meta={`Published ${formatDate(p.meta.published)} · ${p.meta.reading_time || `${readingTime(p.body)} min`} read`}
                      />
                    )}
                  </div>
                </div>
              </article>
    );
  };

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={[{ label: "Health Library", href: page.meta.url }]} />
        <h1 className="t-h2 mt-8 text-ink">{h1}</h1>
        <div className="mt-3 max-w-[720px]">{renderNodesPublic(intro, "lib-intro")}</div>

        {groups.map((g) => (
          <section key={g.id ?? g.name} id={g.id} className="mt-14 scroll-mt-28">
            <h2 className="t-h4 text-ink">{g.name}</h2>
            {/* >3 posts: swipe carousel on mobile, grid on md+; designed covers
                (gradient + per-post badge), never video thumbnails */}
            <SwipeCarousel
              label={`${g.name} articles`}
              gridAt="md"
              gridCols="md:grid-cols-2 lg:grid-cols-3"
              className="mt-6"
            >
              {g.posts.map(card)}
            </SwipeCarousel>
          </section>
        ))}
      </div>
    </article>
  );
}

function excerptOf(body: string): string {
  const para = body
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("#") && !l.startsWith("-") && !/^(Introduction|Fact:)/.test(l));
  return (para ?? "").replace(/\*\*/g, "").slice(0, 160);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export { readingTime };
