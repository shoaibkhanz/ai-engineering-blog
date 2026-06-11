import Link from "next/link";
import { TerminalWindow } from "./components/terminal-window";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-16">
      <TerminalWindow title="~ — zsh">
        <p className="text-text-secondary mb-2">
          <span className="text-accent">$</span> cat {`{requested-page}`}
        </p>
        <p className="text-red mb-6">
          cat: no such file or directory <span className="text-text-secondary">(404)</span>
        </p>
        <p className="text-text-secondary mb-2">
          <span className="text-accent">$</span> cd ~/
        </p>
        <Link
          href="/"
          className="text-accent border-b border-accent/30 hover:border-accent transition-colors text-sm"
        >
          back to home
        </Link>
      </TerminalWindow>
    </div>
  );
}
