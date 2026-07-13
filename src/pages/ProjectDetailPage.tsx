import { Link, useParams } from "react-router-dom";
import { MediaCarousel } from "../components/shared/MediaCarousel";
import { MemorialContent } from "../types/memorial";

export function ProjectDetailPage({ content }: { content: MemorialContent }) {
  const { slug } = useParams();
  const project = content.legacyProjects.find((entry) => entry.slug === slug);

  if (!project) {
    return (
      <section className="page-hero panel">
        <h1>Legacy chapter not found</h1>
        <p>The requested remembrance chapter does not exist in the current content source.</p>
        <Link className="text-link" to="/legacy">
          Return to legacy
        </Link>
      </section>
    );
  }

  const images = project.images?.length ? project.images : project.cover ? [project.cover] : [];

  return (
    <div className="page-stack">
      <section className="page-hero panel project-detail-hero">
        <p className="eyebrow">
          {project.year} · {project.category}
        </p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </section>
      <section className="split-layout">
        <div className="panel">
          <h3>Chapter reflection</h3>
          <p>{project.story}</p>
          <div className="pill-row">
            {project.highlights.map((highlight) => (
              <span key={highlight} className="pill muted">
                {highlight}
              </span>
            ))}
          </div>
        </div>
        <div className="project-detail-media-panel">
          <MediaCarousel assets={images} tone="deep" />
        </div>
      </section>
    </div>
  );
}
