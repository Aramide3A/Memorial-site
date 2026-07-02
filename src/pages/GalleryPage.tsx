import { useState } from "react";
import { MediaPlaceholder } from "../components/shared/MediaPlaceholder";
import { SectionIntro } from "../components/shared/SectionIntro";
import { MemorialContent } from "../types/memorial";

const GALLERY_PAGE_SIZE = 12;

function sortChronologically(items: MemorialContent["galleryCollections"][number]["items"]) {
  return [...items].sort((left, right) => {
    const leftTime = left.createdAt ? new Date(left.createdAt).getTime() : Number.POSITIVE_INFINITY;
    const rightTime = right.createdAt ? new Date(right.createdAt).getTime() : Number.POSITIVE_INFINITY;

    return leftTime - rightTime;
  });
}

export function GalleryPage({ content }: { content: MemorialContent }) {
  const images = sortChronologically(content.galleryCollections.flatMap((collection) => collection.items));
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE);
  const visibleImages = images.slice(0, visibleCount);
  const hasMoreImages = visibleCount < images.length;

  return (
    <div className="page-stack">
      <section className="page-hero panel">
        <SectionIntro
          eyebrow="Gallery"
          title="A chronological gallery from Strapi"
          body="Images from Strapi are shown here in chronological order and revealed in batches so the gallery stays easy to browse as it grows."
        />
      </section>

      <section className="card-grid gallery-grid">
        {visibleImages.map((image, index) => (
          <article key={`${image.url ?? image.alt}-${index}`} className="panel gallery-image-card">
            <MediaPlaceholder asset={image} tone={index % 2 === 0 ? "warm" : "sage"} />
            {image.caption ? <p>{image.caption}</p> : null}
          </article>
        ))}
      </section>

      {hasMoreImages ? (
        <div className="gallery-actions">
          <button className="button secondary" type="button" onClick={() => setVisibleCount((count) => count + GALLERY_PAGE_SIZE)}>
            Load more images
          </button>
        </div>
      ) : null}
    </div>
  );
}
