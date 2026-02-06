"use client";

import { motion } from "framer-motion";

interface ExperimentCardProps {
  title: string;
  description: string;
  tags: string[];
  url?: string | null;
  index?: number;
}

export function ExperimentCard({
  title,
  description,
  tags,
  url,
  index = 0,
}: ExperimentCardProps) {
  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Wrapper
        {...wrapperProps}
        className="block group border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(var(--glow-rgb),0.08)] hover:scale-[1.01] bg-surface/50 border-t-2 border-t-transparent hover:border-t-accent/50"
      >
        {/* Preview area */}
        <div className="h-32 bg-bg border-b border-border flex items-center justify-center relative">
          <div className="text-text-secondary text-xs">
            <span className="text-accent">$</span> ./run {title.toLowerCase().replace(/\s+/g, "-")}
          </div>
          {!url && (
            <div className="absolute top-2 right-2 text-[10px] text-yellow border border-yellow/30 px-1.5 py-0.5 rounded">
              coming soon
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-text-heading mb-1.5 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-xs text-text-secondary mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-text-secondary bg-surface border border-border px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}
