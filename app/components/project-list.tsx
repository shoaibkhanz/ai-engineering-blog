"use client";

import { motion } from "framer-motion";
import { TerminalWindow } from "./terminal-window";

export interface Project {
  name: string;
  description: string;
  tags: string[];
  status: "active" | "shipped" | "wip";
  url?: string;
}

interface ProjectListProps {
  projects: Project[];
}

const statusColors: Record<string, string> = {
  active: "text-green",
  shipped: "text-cyan",
  wip: "text-yellow",
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <TerminalWindow title="~/major-projects — zsh">
      <div className="space-y-1">
        <p className="text-text-secondary mb-3">
          <span className="text-accent">$</span> ls -la major-projects/
        </p>
        <div className="text-text-secondary text-xs mb-2">
          total {projects.length}
        </div>
        {[...projects].sort((a, b) => {
          const order: Record<string, number> = { active: 0, wip: 1, shipped: 2 };
          return (order[a.status] ?? 1) - (order[b.status] ?? 1);
        }).map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
          >
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 py-2 px-2 -mx-2 rounded hover:bg-surface-hover transition-colors group"
              >
                <ProjectRow project={project} />
              </a>
            ) : (
              <div className="flex items-start gap-3 py-2 px-2 -mx-2">
                <ProjectRow project={project} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </TerminalWindow>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <>
      <span className={`text-xs shrink-0 ${statusColors[project.status]}`}>
        [{project.status}]
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-text-heading font-medium text-sm">
          {project.name}
        </span>
        <span className="text-text-secondary text-xs ml-3">
          {project.description}
        </span>
      </div>
      <div className="flex gap-1.5 shrink-0">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-text-secondary bg-surface border border-border px-1.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
