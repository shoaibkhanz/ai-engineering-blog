import { Hero } from "./components/hero";
import { Section } from "./components/section";
import { ProjectList, type Project } from "./components/project-list";
import { WritingMap } from "./components/writing-map";
import { ExperimentCard } from "./components/experiment-card";
import { getAllPosts } from "@/lib/mdx";
import projectsData from "@/content/projects.json";
import experimentsData from "@/content/experiments.json";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <>
      <Hero />

      {/* Writing timeline */}
      <Section title="git log --oneline ~/writing/" viewAllHref="/blog">
        <WritingMap posts={allPosts} />
      </Section>

      {/* Projects */}
      <Section title="ls ~/major-projects/">
        <ProjectList projects={projectsData.projects as Project[]} />
      </Section>

      {/* Experiments */}
      <Section title="ls ~/experiments/" viewAllHref="/experiments">
        <div className="grid md:grid-cols-2 gap-4">
          {experimentsData.experiments.slice(0, 2).map((exp, i) => (
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
      </Section>
    </>
  );
}
