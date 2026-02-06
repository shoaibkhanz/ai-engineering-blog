import type { Metadata } from "next";
import { TerminalWindow } from "../components/terminal-window";

export const metadata: Metadata = {
  title: "About",
  description: "About Shoaib Khan — Staff ML Engineer with nearly a decade of experience across fintech, healthcare, and investment management.",
};

const stack = [
  { category: "Languages", items: ["Python", "TypeScript", "SQL", "Bash"] },
  { category: "ML/AI", items: ["PyTorch", "Transformers", "Vector Search", "RAG", "scikit-learn"] },
  { category: "Cloud", items: ["GCP", "AWS", "SageMaker", "Kubernetes", "Docker"] },
  { category: "Data", items: ["BigQuery", "PostgreSQL", "Spark", "dbt"] },
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

        {/* About header with photo */}
        <div className="flex items-center gap-5 mb-6 border-b border-border pb-5">
          <img
            src="/ai-engineering-blog/images/shoaib.jpg"
            alt="Shoaib Khan"
            className="w-20 h-20 rounded-full border-2 border-accent/30 shrink-0"
          />
          <h1 className="text-2xl font-bold text-text-heading">
            <span className="text-text-secondary/50 text-lg mr-2">#</span>
            About
          </h1>
        </div>

        <p className="text-text leading-relaxed mb-6">
          Staff Machine Learning Engineer. Nearly a decade shipping ML systems
          across fintech, healthcare, and investment management. Currently
          leading the ML efforts within data feeds at{" "}
          <a
            href="https://www.addepar.com"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Addepar
          </a>
          , building entity resolution, deep learning re-rankers, vector search
          pipelines, and agentic tooling for the alternatives investment
          securities landscape.
        </p>

        <p className="text-text leading-relaxed mb-6">
          Engineering and building the data analytics platform at{" "}
          <a
            href="https://neatlyhealth.ai"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            NeatlyHealth.ai
          </a>
          , an AI health companion that captures and organises
          patient-provider conversations on GCP.
        </p>

        <p className="text-text leading-relaxed mb-6">
          Previously at Best Buy Health, where I architected the Care
          Intelligence Platform. Distributed ML on Ray, stood up a model
          registry with Comet ML, and drove the production ML infrastructure.
        </p>

        <p className="text-text leading-relaxed mb-10">
          Before that, at NatWest Group. Designed customer lifetime value
          models, built loan pricing engines with mathematical optimisation, and
          co-authored a{" "}
          <a
            href="https://aws.amazon.com/blogs/machine-learning/part-4-how-natwest-group-migrated-ml-models-to-amazon-sagemaker-architectures/"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            four-part AWS blog series
          </a>{" "}
          on migrating ML models to SageMaker.
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
          The common thread across everything I&apos;ve built is taking ML from
          prototype to production — systems that are reliable, observable, and
          maintainable. Whether it&apos;s matching securities across messy
          datasets or pricing loan portfolios, the hard part is rarely the model
          itself.
        </p>

        <p className="text-text leading-relaxed mb-10">
          In regulated industries — finance, healthcare, banking — &quot;move
          fast and break things&quot; doesn&apos;t apply. Models need to be
          explainable, auditable, and integrated into existing workflows without
          adding friction.
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
