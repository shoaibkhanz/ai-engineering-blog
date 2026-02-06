"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  viewAllHref?: string;
}

export function Section({
  title,
  children,
  className = "",
  viewAllHref,
}: SectionProps) {
  return (
    <motion.section
      className={`py-16 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section divider */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm text-text-secondary">
            <span className="text-accent">$</span> {title}
          </h2>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-xs text-text-secondary hover:text-accent transition-colors"
            >
              view all →
            </a>
          )}
        </div>
        {children}
      </div>
    </motion.section>
  );
}
