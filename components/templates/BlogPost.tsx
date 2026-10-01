import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AuthorChip } from "@/components/sections/AuthorChip";
import { ReviewerBox } from "@/components/sections/ReviewerBox";
import { CtaBand } from "@/components/sections/CtaBand";
import { renderMarkdown } from "@/lib/content/render";
import { readingTime, formatDate } from "./BlogList";
import type { BlogPost } from "@/lib/content/pages";
import type { Doctor } from "@/lib/doctors";

/**
 * Blog post template (plan 3.3): title, author chip with photo, reading
 * time, body at 68ch, author/reviewer box, related posts.
 */
export function BlogPostTemplate({
  post,
  author,
  related,
}: {
  post: BlogPost;
  author: Doctor;
  related: BlogPost[];
}) {
  const doc = renderMarkdown(post.body);

  return (
    <article>
      <div className="mx-auto max-w-[820px] px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Health Library", href: "/health-library/" },
            { label: post.meta.title, href: post.meta.url },
          ]}
        />
        <h1 className="t-h2 mt-8 text-ink">{post.meta.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <AuthorChip
            doctor={author}
            meta={`${readingTime(post.body)} min read${post.meta.published ? ` · ${formatDate(post.meta.published)}` : ""}`}
          />
        </div>

        <div className="mt-8 max-w-[68ch]">{doc.content}</div>

        <ReviewerBox doctor={author} />

        {related.length > 0 && (
          <section aria-label="Related articles" className="mt-12">
            <h2 className="t-h4 text-ink">More from the Health Library</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.slice(0, 2).map((r) => (
                <li key={r.slug}>
                  <Link
                    href={r.meta.url}
                    className="block rounded-[14px] border border-line bg-white p-5 text-[15.5px] font-semibold text-ink shadow-[var(--shadow-card)] transition-colors hover:border-plum/40 hover:text-plum"
                  >
                    {r.meta.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <CtaBand />
      </div>
    </article>
  );
}
