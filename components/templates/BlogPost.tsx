import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AuthorChip } from "@/components/sections/AuthorChip";
import { ReviewerBox } from "@/components/sections/ReviewerBox";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceGlassCard } from "@/components/sections/ServiceGlassCard";
import { readingTime, formatDate } from "./BlogList";
import { plusYear } from "@/lib/utils";
import type { RenderedDoc } from "@/lib/content/render";
import type { BlogPost } from "@/lib/content/pages";
import type { Doctor } from "@/lib/doctors";
import type { BlogCluster } from "@/lib/blog-clusters";
import type { RelatedService } from "@/components/sections/RelatedServices";

/**
 * Blog post template (plan 3.3): title, author chip with photo + credentials,
 * published/updated dates, body at 68ch, reviewer box, related services and
 * related posts.
 */
export function BlogPostTemplate({
  post,
  doc,
  author,
  reviewer,
  relatedPages,
  relatedPosts,
  cluster,
}: {
  post: BlogPost;
  doc: RenderedDoc;
  author: Doctor;
  reviewer: Doctor;
  relatedPages: RelatedService[];
  relatedPosts: BlogPost[];
  cluster?: BlogCluster;
}) {
  const meta = post.meta;
  const reviewedOn = meta.reviewed || meta.updated || meta.published;
  // the pillar's own breadcrumb is Health Library -> title (no self-crumb)
  const pillarUrl = cluster ? `/health-library/${cluster.pillar}/` : null;

  return (
    <article>
      <div className="mx-auto max-w-[820px] px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Health Library", href: "/health-library/" },
            ...(cluster && pillarUrl !== post.meta.url
              ? [{ label: cluster.name, href: pillarUrl! }]
              : []),
            { label: post.meta.title, href: post.meta.url },
          ]}
        />
        {meta.category && (
          <p className="mt-8 text-[13px] font-semibold uppercase tracking-wide text-plum">
            {meta.category}
          </p>
        )}
        <h1 className="t-h2 mt-2 text-ink">{post.meta.title}</h1>
        <p className="mt-4 text-[15px] text-ink-600">
          Written by{" "}
          <Link
            href={author.profileHref}
            className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum"
          >
            {author.name}
          </Link>
          , {author.bylineRole}, Nagpur
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <AuthorChip
            doctor={author}
            meta={`${meta.author_credentials || author.qualifications} · ${author.registration.council} Reg. No. ${author.registration.number}`}
          />
        </div>
        <p className="mt-3 text-[13.5px] text-ink-600">
          {meta.published && (
            <>
              Published{" "}
              <time dateTime={meta.published}>{formatDate(meta.published)}</time>
            </>
          )}
          {meta.updated && meta.updated !== meta.published && (
            <>
              {meta.published ? " · " : ""}
              Updated{" "}
              <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
            </>
          )}
          {(meta.published || meta.updated) && " · "}
          {meta.reading_time || `${readingTime(post.body)} min read`}
        </p>

        {meta.image && (
          <Image
            src={`/images/${meta.image}`}
            alt={meta.image_alt || meta.title}
            width={1280}
            height={720}
            priority
            sizes="(max-width: 820px) 100vw, 820px"
            className="mt-8 rounded-[18px] border border-line object-cover"
          />
        )}

        <div className="mt-8 max-w-[68ch]">{doc.content}</div>

        <ReviewerBox
          doctor={reviewer}
          author={author}
          lastReviewed={reviewedOn ? formatDate(reviewedOn) : undefined}
          nextReviewDue={reviewedOn ? formatDate(plusYear(reviewedOn)) : undefined}
        />

        {relatedPages.length > 0 && (
          <section aria-label="Related services" className="mt-14">
            <h2 className="t-h4 text-ink">Related services</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.slice(0, 3).map((s) => (
                <ServiceGlassCard
                  key={s.href}
                  badge={s.badge}
                  title={s.title}
                  text={s.text}
                  href={s.href}
                  className="!w-full"
                />
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section aria-label="Related articles" className="mt-12">
            <h2 className="t-h4 text-ink">More from the Health Library</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedPosts.slice(0, 2).map((r) => (
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
