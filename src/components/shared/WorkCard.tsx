import { Link } from "react-router-dom";
import { LegacyProject } from "../../types/memorial";
import { MediaPlaceholder } from "./MediaPlaceholder";

export function WorkCard({ project }: { project: LegacyProject }) {
  return (
    <article className="content-card work-card">
      <MediaPlaceholder asset={project.cover} tone="warm" />
      <div className="card-body">
        <div className="meta-row">
          <span>
            {project.year} · {project.category}
          </span>
          <span>{project.assetCount}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="pill-row">
          {project.highlights.map((highlight) => (
            <span key={highlight} className="pill muted">
              {highlight}
            </span>
          ))}
        </div>
        <Link className="text-link" to={`/legacy/${project.slug}`}>
          Read chapter
        </Link>
      </div>
    </article>
  );
}
