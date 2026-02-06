import { Suspense } from "react";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { BlogList } from "./blog-list";

export const metadata = {
  title: "Writing",
  description: "Technical writing on ML engineering, infrastructure, and healthcare AI.",
};

function BlogSkeleton() {
  return (
    <div>
      {/* Tag filter skeleton */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-7 rounded" style={{ width: `${50 + i * 10}px` }} />
        ))}
      </div>
      {/* Post card skeletons */}
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border border-border rounded-lg p-5 space-y-3">
            <div className="flex gap-3">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-4 w-12" />
            </div>
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-sm text-text-secondary mb-8">
        <span className="text-accent">$</span> ls ~/writing/
      </h1>
      <Suspense fallback={<BlogSkeleton />}>
        <BlogList posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
