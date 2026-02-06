"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";

export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group">
      <pre ref={preRef} {...props} />
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-2.5 text-[10px] px-2 py-1 rounded border border-border bg-bg/80 text-text-secondary hover:text-accent hover:border-accent/30 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? "copied!" : "copy"}
      </button>
    </div>
  );
}
