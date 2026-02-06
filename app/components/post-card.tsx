"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime?: number;
  index?: number;
}

export function PostCard({
  slug,
  title,
  date,
  description,
  tags,
  readingTime,
  index = 0,
}: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/blog/${slug}`} className="block group">
        <article className="border border-border rounded-lg p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(var(--glow-rgb),0.08)] hover:scale-[1.01] bg-surface/50 border-t-2 border-t-transparent hover:border-t-accent/50">
          <div className="flex items-center gap-3 mb-3">
            <time className="text-xs text-text-secondary">{date}</time>
            {readingTime && (
              <>
                <span className="text-border">·</span>
                <span className="text-xs text-text-secondary">{readingTime} min</span>
              </>
            )}
            <div className="flex gap-1.5 ml-auto">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-accent/70 bg-accent/5 border border-accent/20 px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-base font-medium text-text-heading mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>

          <p className="text-sm text-text-secondary line-clamp-2">
            {description}
          </p>
        </article>
      </Link>
    </motion.div>
  );
}
