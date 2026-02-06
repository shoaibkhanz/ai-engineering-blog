import { ReactNode } from "react";

interface CalloutProps {
  type?: "note" | "warning" | "tip";
  children: ReactNode;
}

const styles = {
  note: {
    border: "border-l-accent",
    bg: "bg-accent/5",
    label: "NOTE",
    labelColor: "text-accent",
  },
  warning: {
    border: "border-l-yellow",
    bg: "bg-yellow/5",
    label: "WARNING",
    labelColor: "text-yellow",
  },
  tip: {
    border: "border-l-cyan",
    bg: "bg-cyan/5",
    label: "TIP",
    labelColor: "text-cyan",
  },
};

export function Callout({ type = "note", children }: CalloutProps) {
  const s = styles[type];

  return (
    <div
      className={`${s.bg} ${s.border} border-l-2 rounded-r-lg px-4 py-3 my-6`}
    >
      <div className={`text-xs font-bold ${s.labelColor} mb-1`}>
        [{s.label}]
      </div>
      <div className="text-sm text-text">{children}</div>
    </div>
  );
}
