import { Link } from "react-router-dom";
import { LegacyProject } from "../../types/memorial";
import { MediaCarousel } from "./MediaCarousel";

export function WorkCard({ project }: { project: LegacyProject }) {
  const images = project.images?.length ? project.images : project.cover ? [project.cover] : [];

  return (
    <article className="content-card work-card">
      <div className="work-card-media-shell">
        <MediaCarousel assets={images} tone="warm" />
      </div>
      <div className="card-body">
        <h3>{project.title}</h3>
        <p className="work-card-date">{project.year}</p>
        <p>{project.summary}</p>
        <Link className="text-link" to={`/legacy/${project.slug}`}>
          View project
        </Link>
      </div>
    </article>
  );
}
