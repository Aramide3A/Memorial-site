import { SectionIntro } from "../components/shared/SectionIntro";
import { WorkCard } from "../components/shared/WorkCard";
import { MemorialContent } from "../types/memorial";

export function LegacyPage({ content }: { content: MemorialContent }) {
  return (
    <div className="page-stack">
      <section className="page-hero panel">
        <SectionIntro
          eyebrow="Legacy chapters"
          title="These chapters gather the strongest recurring themes from the tribute wall."
          body="Rather than inventing events that were not present in the source page, this archive preserves the three clearest circles of impact described by family, church members, and colleagues."
        />
      </section>
      <section className="card-grid three-up">
        {content.legacyProjects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
