import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, extractToc } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { useMDXComponents } from "@/app/components/mdx-components";
import { ReadingProgress } from "@/app/components/reading-progress";
import { TableOfContents } from "@/app/components/table-of-contents";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return {
      title: meta.title,
      description: meta.description,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post;
  const components = useMDXComponents({});
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const toc = extractToc(content);

  // Get all posts for prev/next and related
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related posts: share at least one tag, exclude current, max 3
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.tags.some((t) => meta.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <>
      <ReadingProgress wordCount={wordCount} />
      <article className="max-w-3xl md:max-w-4xl mx-auto px-6 pt-24 pb-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-xs text-text-secondary hover:text-accent transition-colors mb-8 inline-block"
        >
          ← ~/writing
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-text-heading mb-4">
            {meta.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            <span>published: {meta.date}</span>
            <span className="text-border">|</span>
            <span>
              tags: [
              {meta.tags.map((tag, i) => (
                <span key={tag}>
                  <Link
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-accent hover:text-accent-dim transition-colors"
                  >
                    {tag}
                  </Link>
                  {i < meta.tags.length - 1 && ", "}
                </span>
              ))}
              ]
            </span>
          </div>
        </header>

        {/* Table of Contents */}
        {toc.length > 0 && <TableOfContents items={toc} />}

        {/* Content */}
        <div className="prose max-w-none">
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                  rehypeKatex,
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: "github-dark",
                        light: "github-light",
                      },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {/* Prev / Next navigation */}
        <nav className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group text-left"
            >
              <span className="text-[10px] text-text-secondary block mb-1">
                ← older
              </span>
              <span className="text-sm text-text-heading group-hover:text-accent transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group text-right"
            >
              <span className="text-[10px] text-text-secondary block mb-1">
                newer →
              </span>
              <span className="text-sm text-text-heading group-hover:text-accent transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-sm text-text-secondary mb-6">
              <span className="text-accent">$</span> grep --related
            </h2>
            <div className="grid gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-2 px-3 -mx-3 rounded hover:bg-surface transition-colors"
                >
                  <span className="text-sm text-text-heading group-hover:text-accent transition-colors line-clamp-1">
                    {r.title}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {r.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-accent/60 bg-accent/5 border border-accent/20 px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-text-secondary">
                      {r.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
