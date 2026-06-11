import type { Metadata } from "next";
import { TerminalWindow } from "../components/terminal-window";
import { withBasePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Shoaib Khan, Staff AI Engineer with nearly a decade of experience across manufacturing, fintech, healthcare, and investment management.",
};

const stack = [
  { category: "Languages", items: ["Python", "TypeScript", "SQL", "Bash"] },
  { category: "ML/AI", items: ["PyTorch", "Transformers", "Vector Search", "RAG", "scikit-learn"] },
  { category: "Cloud", items: ["GCP", "AWS", "SageMaker", "Kubernetes", "Docker"] },
  { category: "Data", items: ["BigQuery", "PostgreSQL", "Spark", "dbt"] },
  { category: "Tools", items: ["Git", "Linux", "Neovim", "Tmux"] },
];

const experience: {
  title: string;
  context: string;
  tag?: string;
  summary: React.ReactNode;
}[] = [
  {
    title: "staff-ai-engineer",
    context: "aPriori · manufacturing intelligence",
    tag: "current",
    summary:
      "Building AI systems for manufacturing intelligence: agents, ML pipelines, and the production infrastructure behind them.",
  },
  {
    title: "ml-lead — data-feeds",
    context: "investment management platform",
    summary:
      "Led ML for data feeds: entity resolution, deep learning re-rankers, vector search pipelines, and agentic tooling for the alternatives securities landscape.",
  },
  {
    title: "health-data-analytics",
    context: "AI health companion · GCP",
    tag: "side",
    summary:
      "Engineered the data analytics platform for an AI health companion that captures and organises patient-provider conversations.",
  },
  {
    title: "care-intelligence-platform",
    context: "healthcare technology",
    summary:
      "Architected the care intelligence platform: distributed ML on Ray, stood up a model registry, and drove the production ML infrastructure.",
  },
  {
    title: "ml-engineering",
    context: "major UK bank",
    summary: (
      <>
        Designed customer lifetime value models, built loan pricing engines
        with mathematical optimisation, and co-authored a{" "}
        <a
          href="https://aws.amazon.com/blogs/machine-learning/part-4-how-natwest-group-migrated-ml-models-to-amazon-sagemaker-architectures/"
          className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          four-part AWS blog series
        </a>{" "}
        on migrating ML models to SageMaker.
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl md:max-w-4xl mx-auto px-6 pt-24 pb-16">
      <TerminalWindow title="~/about — README.md">
        {/* cat command */}
        <p className="text-text-secondary mb-6">
          <span className="text-accent">$</span> cat README.md
        </p>

        {/* About header with photo */}
        <div className="flex items-center gap-5 mb-6 border-b border-border pb-5">
          {/* next/image is unavailable with `output: export` without a custom loader */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/images/shoaib.jpg")}
            alt="Shoaib Khan"
            className="w-20 h-20 rounded-full border-2 border-accent/30 shrink-0"
          />
          <h1 className="text-2xl font-bold text-text-heading">
            <span className="text-text-secondary/50 text-lg mr-2">#</span>
            About
          </h1>
        </div>

        <p className="text-text leading-relaxed mb-10">
          Staff AI Engineer at aPriori. Nearly a decade shipping ML and AI
          systems across manufacturing, fintech, healthcare, and investment
          management.
        </p>

        {/* Experience timeline — mirrors the writing map's hover language */}
        <h2 className="text-xl font-bold text-text-heading mt-10 mb-5 border-b border-border pb-2">
          <span className="text-text-secondary/50 text-base mr-2">##</span>
          Experience
        </h2>

        <div className="relative mb-10">
          {/* Timeline spine */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-1">
            {experience.map((e) => (
              <div
                key={e.title}
                className="group relative flex gap-4 py-2.5 px-2 -mx-2 rounded transition-colors hover:bg-surface-hover/60"
              >
                {/* Node */}
                <div className="relative z-10 mt-1 w-[15px] h-[15px] rounded-full border border-accent/40 bg-bg flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                  <div className="w-[7px] h-[7px] rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-sm font-bold text-text-heading group-hover:text-accent transition-colors">
                      {e.title}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {e.context}
                    </span>
                    {e.tag && (
                      <span className="text-[10px] text-green border border-green/30 px-1.5 py-0.5 rounded">
                        [{e.tag}]
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                    {e.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack section */}
        <h2 className="text-xl font-bold text-text-heading mt-10 mb-5 border-b border-border pb-2">
          <span className="text-text-secondary/50 text-base mr-2">##</span>
          Stack
        </h2>

        <div className="space-y-1 mb-10">
          {stack.map((s) => (
            <div
              key={s.category}
              className="group flex gap-4 py-1.5 px-2 -mx-2 rounded transition-colors hover:bg-surface-hover/60"
            >
              <span className="text-sm text-accent/70 group-hover:text-accent transition-colors w-28 shrink-0">
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
          The common thread across everything I&apos;ve built is taking ML from
          prototype to production: systems that are reliable, observable, and
          maintainable. Whether it&apos;s matching securities across messy
          datasets, costing manufactured parts, or pricing loan portfolios, the
          hard part is rarely the model itself.
        </p>

        <p className="text-text leading-relaxed mb-10">
          In regulated and precision-critical industries like finance,
          healthcare, and manufacturing, &quot;move fast and break things&quot;
          doesn&apos;t apply. Models need to be explainable, auditable, and
          integrated into existing workflows without adding friction.
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
            href="mailto:shoaibkhanz@hotmail.com"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
          >
            email
          </a>
        </p>
      </TerminalWindow>
    </div>
  );
}
