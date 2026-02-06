import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({
  title = "~/projects — zsh",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-lg overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red" />
          <span className="w-3 h-3 rounded-full bg-yellow" />
          <span className="w-3 h-3 rounded-full bg-green" />
        </div>
        <span className="text-xs text-text-secondary ml-2">{title}</span>
      </div>

      {/* Content */}
      <div className="p-4 text-sm">{children}</div>
    </div>
  );
}
