"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TocItem } from "@/lib/mdx";

export type { TocItem };

interface TableOfContentsProps {
  items: TocItem[];
}

function useActiveHeading(items: TocItem[]): string {
  const [activeSlug, setActiveSlug] = useState("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.slug))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return activeSlug;
}

function scrollToHeading(slug: string) {
  const el = document.getElementById(slug);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const activeSlug = useActiveHeading(items);
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <nav className="border border-border rounded-lg bg-surface/50 mb-10 overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-surface-hover transition-colors"
      >
        <span className="text-xs text-text-secondary">
          <span className="text-accent">$</span> cat TOC
          <span className="text-text-secondary ml-2">
            ({items.length} sections)
          </span>
        </span>
        <span
          className={`text-text-secondary text-xs transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Collapsible list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ul className="px-5 pb-4 space-y-1.5 border-t border-border pt-3">
              {items.map((item) => (
                <li
                  key={item.slug}
                  style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
                >
                  <a
                    href={`#${item.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHeading(item.slug);
                    }}
                    className={`text-sm block py-0.5 transition-colors ${
                      activeSlug === item.slug
                        ? "text-accent"
                        : "text-text-secondary hover:text-text"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/** Always-visible TOC for the wide-screen sidebar — no collapse chrome. */
export function SidebarToc({ items }: TableOfContentsProps) {
  const activeSlug = useActiveHeading(items);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs text-text-secondary mb-3">
        <span className="text-accent">$</span> cat TOC
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(item.slug);
              }}
              style={{ paddingLeft: `${12 + (item.level - 2) * 14}px` }}
              className={`text-xs block py-1 leading-relaxed border-l-2 transition-colors ${
                activeSlug === item.slug
                  ? "text-accent border-accent"
                  : "text-text-secondary border-border hover:text-text hover:border-border-bright"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
