import { Link } from "react-router-dom";
import { CountdownCard } from "../components/shared/CountdownCard";
import { MediaPlaceholder } from "../components/shared/MediaPlaceholder";
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
            <MediaPlaceholder asset={content.person.portrait} tone="deep" />
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
          title="Her life joined Christian service, family devotion, and professional excellence."
          body="The biography and public tributes now preserved on this site repeat the same themes: faith, encouragement, discipline, generosity, and a life that helped many people move forward."
        />
        <div className="two-column">
          {content.timeline.map((entry) => (
            <article key={entry.entryKey} className={entry.featured ? "panel featured-panel" : "panel"}>
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
          title="Her impact can be traced through ministry, mentorship, and family care."
          body="These chapters draw from the biography and tribute material preserved here, showing how she was remembered at home, in church, and throughout the research profession."
        />
        <div className="card-grid legacy-grid">
          {content.legacyProjects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionIntro
          eyebrow="Recent tributes"
          title="People remembered her with gratitude, admiration, and deep affection."
          body="These messages speak of the support, excellence, encouragement, faith, and love that many people experienced personally in her life."
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
