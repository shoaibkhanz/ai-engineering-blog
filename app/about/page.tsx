import type { Metadata } from "next";
import { TerminalWindow } from "../components/terminal-window";

export const metadata: Metadata = {
  title: "About",
  description: "About Shoaib Khan — ML engineer building healthcare AI systems.",
};

const stack = [
  { category: "Languages", items: ["Python", "TypeScript", "SQL", "Bash"] },
  { category: "ML/AI", items: ["PyTorch", "scikit-learn", "Transformers", "Ray"] },
  { category: "Infrastructure", items: ["Kubernetes", "Docker", "Terraform", "AWS"] },
  { category: "Data", items: ["PostgreSQL", "Redis", "Spark", "dbt"] },
  { category: "Tools", items: ["Git", "Linux", "Neovim", "Tmux"] },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl md:max-w-4xl mx-auto px-6 pt-24 pb-16">
      <TerminalWindow title="~/about — README.md">
        {/* cat command */}
        <p className="text-text-secondary mb-6">
          <span className="text-accent">$</span> cat README.md
        </p>

        {/* About header */}
        <h1 className="text-2xl font-bold text-text-heading mb-6 border-b border-border pb-3">
          <span className="text-text-secondary/50 text-lg mr-2">#</span>
          About
        </h1>

        <p className="text-text leading-relaxed mb-6">
          ML engineer focused on building systems that work in production — not
          just in notebooks. Currently building healthcare AI infrastructure:
          clinical prediction models, distributed training pipelines, and the
          tooling that makes them reliable at scale.
        </p>

        <p className="text-text leading-relaxed mb-10">
          Previously worked on NLP systems for clinical text, recommendation
          engines, and real-time fraud detection. The common thread is taking ML
          from &quot;it works on my machine&quot; to &quot;it works at 3 AM when
          nobody&apos;s watching.&quot;
        </p>

        {/* Stack section */}
        <h2 className="text-xl font-bold text-text-heading mt-10 mb-5 border-b border-border pb-2">
          <span className="text-text-secondary/50 text-base mr-2">##</span>
          Stack
        </h2>

        <div className="space-y-3 mb-10">
          {stack.map((s) => (
            <div key={s.category} className="flex gap-4">
              <span className="text-sm text-accent/70 w-28 shrink-0">
                {s.category}
                <span className="text-text-secondary/40">:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs border border-border px-2 py-0.5 rounded text-text hover:border-accent/30 hover:text-accent transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Approach section */}
        <h2 className="text-xl font-bold text-text-heading mt-10 mb-5 border-b border-border pb-2">
          <span className="text-text-secondary/50 text-base mr-2">##</span>
          Approach
        </h2>

        <p className="text-text leading-relaxed mb-4">
          I care about building things that are reliable, observable, and
          maintainable. ML systems are software systems first — they need tests,
          monitoring, and on-call runbooks just like anything else.
        </p>

        <p className="text-text leading-relaxed mb-10">
          In healthcare specifically, &quot;move fast and break things&quot;
          doesn&apos;t apply. The stakes are different. Models need to be
          explainable, well-calibrated, and integrated into clinical workflows
          without adding cognitive burden.
        </p>

        {/* Contact section */}
        <h2 className="text-xl font-bold text-text-heading mt-10 mb-5 border-b border-border pb-2">
          <span className="text-text-secondary/50 text-base mr-2">##</span>
          Contact
        </h2>

        <p className="text-text leading-relaxed">
          <a
            href="https://github.com/shoaibkhanz"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          {" · "}
          <a
            href="https://linkedin.com/in/shoaibkhanz"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          {" · "}
          <a
            href="mailto:hello@convergeml.com"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
          >
            email
          </a>
        </p>
      </TerminalWindow>
    </div>
  );
}
