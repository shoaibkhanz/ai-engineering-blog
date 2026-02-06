import { ExperimentCard } from "../components/experiment-card";
import experimentsData from "@/content/experiments.json";

export const metadata = {
  title: "Experiments",
  description:
    "Interactive experiments and demos in ML, visualization, and distributed systems.",
};

export default function ExperimentsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-sm text-text-secondary mb-8">
        <span className="text-accent">$</span> ls ~/experiments/
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        {experimentsData.experiments.map((exp, i) => (
          <ExperimentCard
            key={exp.id}
            title={exp.title}
            description={exp.description}
            tags={exp.tags}
            url={exp.url}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
