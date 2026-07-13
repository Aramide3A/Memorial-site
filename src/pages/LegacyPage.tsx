import { SectionIntro } from "../components/shared/SectionIntro";
import { WorkCard } from "../components/shared/WorkCard";
import { MemorialContent } from "../types/memorial";

function getProjectStartTime(project: MemorialContent["legacyProjects"][number]) {
  const firstYear = project.year.match(/\d{4}/)?.[0];

  if (!firstYear) {
    return Number.POSITIVE_INFINITY;
  }

  return new Date(`${firstYear}-01-01`).getTime();
}

export function LegacyPage({ content }: { content: MemorialContent }) {
  const projects = [...content.legacyProjects].sort((left, right) => getProjectStartTime(left) - getProjectStartTime(right));

  return (
    <div className="page-stack">
      <section className="page-hero panel">
        <SectionIntro
          eyebrow="Her legacy"
          title="Projects carried forward in her name"
          body="This collection highlights projects and remembrance work inspired by her life, presented from the earliest initiative to the most recent."
        />
      </section>
      <section className="card-grid legacy-grid">
        {projects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
