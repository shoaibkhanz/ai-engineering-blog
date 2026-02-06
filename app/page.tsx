import { Hero } from "./components/hero";
import { Section } from "./components/section";
import { ProjectList, type Project } from "./components/project-list";
import { WritingMap } from "./components/writing-map";
import { PostCard } from "./components/post-card";
import { ExperimentCard } from "./components/experiment-card";
import { getAllPosts } from "@/lib/mdx";
import projectsData from "@/content/projects.json";
import experimentsData from "@/content/experiments.json";

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Writing timeline */}
      <Section title="git log --oneline ~/writing/" viewAllHref="/blog">
        <WritingMap posts={allPosts} />
      </Section>

      {/* Projects */}
      <Section title="ls ~/projects/">
        <ProjectList projects={projectsData.projects as Project[]} />
      </Section>

      {/* Writing */}
      <Section title="cat ~/writing/recent.md" viewAllHref="/blog">
        <div className="grid gap-4">
          {recentPosts.map((post, i) => (
            <PostCard key={post.slug} {...post} index={i} />
          ))}
        </div>
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
