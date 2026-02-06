"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "../components/post-card";
import type { PostMeta } from "@/lib/mdx";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
}

export function BlogList({ posts, tags }: BlogListProps) {
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam && tags.includes(tagParam)) {
      setSelectedTag(tagParam);
    }
  }, [searchParams, tags]);

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <>
      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`text-xs px-2.5 py-1 rounded border transition-colors ${
            !selectedTag
              ? "border-accent text-accent bg-accent/10"
              : "border-border text-text-secondary hover:text-text hover:border-border-bright"
          }`}
        >
          all
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`text-xs px-2.5 py-1 rounded border transition-colors ${
              tag === selectedTag
                ? "border-accent text-accent bg-accent/10"
                : "border-border text-text-secondary hover:text-text hover:border-border-bright"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="grid gap-4">
        {filteredPosts.map((post, i) => (
          <PostCard key={post.slug} {...post} index={i} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-text-secondary text-sm">
          <span className="text-accent">$</span> echo &quot;No posts
          found&quot;
        </p>
      )}
    </>
  );
}
