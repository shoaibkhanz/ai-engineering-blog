"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

interface WritingMapProps {
  posts: Post[];
}

export function WritingMap({ posts }: WritingMapProps) {
  // Sort posts newest → oldest
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by year
  const byYear = new Map<number, Post[]>();
  for (const post of sorted) {
    const year = new Date(post.date).getFullYear();
    const existing = byYear.get(year) || [];
    existing.push(post);
    byYear.set(year, existing);
  }

  const years = [...byYear.keys()].sort((a, b) => b - a);

  // All years expanded by default
  const [openYears, setOpenYears] = useState<Set<number>>(
    () => new Set(years)
  );

  function toggleYear(year: number) {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  }

  return (
    <div className="relative">
      {/* Timeline spine */}
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {years.map((year, yi) => {
          const isOpen = openYears.has(year);
          const yearPosts = byYear.get(year)!;

          return (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: yi * 0.1 }}
            >
              {/* Year marker — clickable */}
              <button
                onClick={() => toggleYear(year)}
                className="flex items-center gap-3 w-full text-left group"
              >
                <div className="relative z-10 w-[15px] h-[15px] rounded-full border border-accent/50 bg-bg flex items-center justify-center group-hover:border-accent transition-colors">
                  <div className="w-[7px] h-[7px] rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                </div>
                <span className="text-xs text-accent font-medium">
                  {year}
                </span>
                <span className="text-[10px] text-text-secondary">
                  {yearPosts.length} post
                  {yearPosts.length !== 1 ? "s" : ""}
                </span>
                <span
                  className={`text-[10px] text-text-secondary transition-transform duration-200 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Collapsible posts list */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-[7px] pl-6 border-l border-transparent space-y-1 mt-3">
                      {yearPosts.map((post) => {
                        const d = new Date(post.date);
                        const month = d.toLocaleString("en", {
                          month: "short",
                        });
                        const day = d.getDate();

                        return (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex items-center gap-3 py-1.5 -ml-[25px]"
                          >
                            {/* Node dot */}
                            <div className="relative z-10 w-[9px] h-[9px] rounded-full bg-surface border border-border group-hover:border-accent group-hover:bg-accent/20 transition-all shrink-0">
                              <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/30 transition-all" />
                            </div>

                            {/* Date */}
                            <span className="text-[10px] text-text-secondary w-[44px] shrink-0 tabular-nums">
                              {month} {day}
                            </span>

                            {/* Title */}
                            <span className="text-sm text-text-secondary group-hover:text-accent transition-colors truncate">
                              {post.title}
                            </span>

                            {/* Tags */}
                            <div className="hidden md:flex items-center gap-1.5 ml-auto shrink-0">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] text-accent/40 group-hover:text-accent/60 transition-colors"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Terminal prompt at end */}
      <div className="flex items-center gap-3 mt-6 ml-0">
        <div className="relative z-10 w-[15px] h-[15px] rounded-full border border-border bg-bg" />
        <span className="text-xs text-text-secondary">
          <span className="text-accent">$</span> _
        </span>
      </div>
    </div>
  );
}
