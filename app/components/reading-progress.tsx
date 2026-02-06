"use client";

import { useEffect, useState, useRef } from "react";

interface ReadingProgressProps {
  wordCount: number;
}

export function ReadingProgress({ wordCount }: ReadingProgressProps) {
  const [currentLine, setCurrentLine] = useState(1);
  const [totalLines, setTotalLines] = useState(1);
  const [percent, setPercent] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);

  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 230));

  useEffect(() => {
    articleRef.current = document.querySelector("article");

    function update() {
      const article = articleRef.current;
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = rect.height;

      // Estimate lines: ~24px per line at 15px font + 1.7 line-height
      const lineHeight = 25.5;
      const total = Math.max(1, Math.round(articleHeight / lineHeight));
      setTotalLines(total);

      // Current scroll position within article
      const scrollInArticle = Math.max(0, window.scrollY - articleTop);
      const current = Math.min(
        total,
        Math.max(1, Math.round(scrollInArticle / lineHeight) + 1)
      );
      setCurrentLine(current);

      // Percent through article
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setPercent(Math.round((window.scrollY / docHeight) * 100));
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-border/30">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Bottom neovim status bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-7 flex items-center justify-between text-[11px]">
          {/* Left: mode + file indicator (like neovim) */}
          <div className="flex items-center gap-0">
            <span className="bg-accent text-bg px-2 py-0.5 font-bold">
              READ
            </span>
            <span className="bg-surface border-y border-r border-border px-2 py-0.5 text-text-secondary">
              {readingTimeMin} min read
            </span>
          </div>

          {/* Right: line position + percentage (like neovim) */}
          <div className="flex items-center gap-0">
            <span className="bg-surface border border-border px-2 py-0.5 text-text-secondary">
              Ln {currentLine}, Col 1
            </span>
            <span className="bg-accent text-bg px-2 py-0.5 font-bold">
              {percent === 0 ? "Top" : percent >= 99 ? "Bot" : `${percent}%`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
