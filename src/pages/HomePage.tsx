import { Link } from "react-router-dom";
import { CountdownCard } from "../components/shared/CountdownCard";
import { SectionIntro } from "../components/shared/SectionIntro";
import { TributeCard } from "../components/shared/TributeCard";
import { WorkCard } from "../components/shared/WorkCard";
import { MemorialContent } from "../types/memorial";

export function HomePage({ content }: { content: MemorialContent }) {
  return (
    <div className="page-stack">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy panel">
            <p className="eyebrow">Living memorial · updated yearly</p>
            <h1>{content.person.heroTitle}</h1>
            <p className="hero-body">{content.person.heroBody}</p>
            <div className="action-row">
              <Link className="button primary" to="/legacy">
                Explore the works
              </Link>
              <Link className="button secondary" to="/gallery">
                View memories
              </Link>
            </div>
            <div className="stat-grid">
              {content.site.quickStats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
          <article className="panel portrait-panel memorial-panel">
            <div className="memorial-image-slot" aria-label={`Portrait placeholder for ${content.person.name}`}>
              <span>Portrait image</span>
            </div>
            <div className="portrait-caption">
              <span className="portrait-intro">In loving memory of</span>
              <strong className="portrait-name">{content.person.name}</strong>
              <span>{content.person.roles.join(" · ")}</span>
              <small>{content.person.years}</small>
            </div>
          </article>
        </div>
        <CountdownCard targetDate={content.site.nextRemembranceDate} />
      </section>

      <section className="ticker">
        <div className="ticker-track">
          {[...content.site.announcementItems, ...content.site.announcementItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionIntro
          eyebrow="Life remembered"
          title="The memorial wall tells one clear story: she shaped people through faith, love, and disciplined excellence."
          body="These themes were repeated across the recovered public messages and now guide the structure of this memorial experience."
        />
        <div className="two-column">
          {content.timeline.map((entry) => (
            <article key={entry.id} className={entry.featured ? "panel featured-panel" : "panel"}>
              <p className="eyebrow">{entry.label}</p>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionIntro
          eyebrow="Legacy chapters"
          title="Her impact is remembered across faith, profession, and family."
          body="Each chapter below gathers the themes that appeared most often on the public memorial page into a locally stored memorial archive."
        />
        <div className="card-grid three-up">
          {content.legacyProjects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionIntro
          eyebrow="Recovered tributes"
          title="Public messages from the memorial wall have been preserved here."
          body="What people wrote most often was simple and consistent: she loved deeply, corrected wisely, mentored generously, and left a mark that still feels present."
        />
        <div className="card-grid two-up">
          {content.tributes.slice(0, 4).map((tribute) => (
            <TributeCard key={tribute.id} tribute={tribute} />
          ))}
        </div>
      </section>
    </div>
  );
}
