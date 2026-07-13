import { useEffect, useState } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visibleImages = images.slice(0, visibleCount);
  const hasMoreImages = visibleCount < images.length;
  const selectedImage = selectedIndex === null ? null : visibleImages[selectedIndex];
  const selectedTone = selectedIndex !== null && selectedIndex % 2 === 0 ? "warm" : "sage";
  const selectedPositionLabel = selectedIndex === null ? "" : `${selectedIndex + 1} of ${visibleImages.length}`;

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function showPreviousImage() {
    setSelectedIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? visibleImages.length - 1 : current - 1;
    });
  }

  function showNextImage() {
    setSelectedIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === visibleImages.length - 1 ? 0 : current + 1;
    });
  }

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [selectedIndex, visibleImages.length]);

  return (
    <div className="page-stack">
      <section className="page-hero panel">
        <SectionIntro
          eyebrow="Photo gallery"
          title="A collection of moments lovingly remembered"
          body="These photographs preserve glimpses of her life, her warmth, and the memories shared by family, friends, and all whose lives she touched."
        />
      </section>

      <section className="card-grid gallery-grid">
        {visibleImages.map((image, index) => (
          <article key={`${image.url ?? image.alt}-${index}`} className="gallery-image-card">
            <button className="gallery-image-button" type="button" onClick={() => setSelectedIndex(index)} aria-label={`Open image: ${image.alt}`}>
              <MediaPlaceholder asset={image} tone={index % 2 === 0 ? "warm" : "sage"} />
            </button>
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

      {selectedImage ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Expanded gallery image" onClick={closeLightbox}>
          <div className="gallery-lightbox-card" onClick={(event) => event.stopPropagation()}>
            <div className="gallery-lightbox-toolbar">
              <span className="gallery-lightbox-count">
                {selectedPositionLabel}
              </span>
              <button className="gallery-lightbox-close" type="button" onClick={closeLightbox} aria-label="Close expanded image">
                ×
              </button>
            </div>
            <div className="gallery-lightbox-media">
              {visibleImages.length > 1 ? (
                <button className="gallery-lightbox-nav gallery-lightbox-nav-prev" type="button" onClick={showPreviousImage} aria-label="Show previous image">
                  ‹
                </button>
              ) : null}
              <MediaPlaceholder asset={selectedImage} tone={selectedTone} />
              {visibleImages.length > 1 ? (
                <button className="gallery-lightbox-nav gallery-lightbox-nav-next" type="button" onClick={showNextImage} aria-label="Show next image">
                  ›
                </button>
              ) : null}
            </div>
            {selectedImage.caption ? <p>{selectedImage.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
