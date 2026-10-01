import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AuthorChip } from "@/components/sections/AuthorChip";
import { renderNodesPublic, splitBody } from "@/lib/content/render";
import type { ContentPage, BlogPost } from "@/lib/content/pages";
import { reviewerFor } from "@/lib/doctors";
import { cn } from "@/lib/utils";

function readingTime(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

/**
 * Health Library index: intro from the page body, then a card for each
 * migrated post with author and reading time.
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

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={[{ label: "Health Library", href: page.meta.url }]} />
        <h1 className="t-h2 mt-8 text-ink">{h1}</h1>
        <div className="mt-3 max-w-[720px]">{renderNodesPublic(intro, "lib-intro")}</div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const doctor =
              p.meta.author.includes("Prajakta") ? reviewerFor("blooming-buds", p.meta.author) : reviewerFor("diabetes-heart", p.meta.author);
            return (
              <li key={p.slug}>
                <Link
                  href={p.meta.url}
                  className={cn(
                    "group block h-full rounded-[18px] border border-line bg-white p-6",
                    "shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
                  )}
                >
                  <h2 className="text-[19px] font-bold leading-snug text-ink transition-colors group-hover:text-plum">
                    {p.meta.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-600">
                    {excerptOf(p.body)}
                  </p>
                  <div className="mt-5">
                    {doctor && (
                      <AuthorChip
                        doctor={doctor}
                        meta={`${readingTime(p.body)} min read${p.meta.published ? ` · ${formatDate(p.meta.published)}` : ""}`}
                      />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
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
