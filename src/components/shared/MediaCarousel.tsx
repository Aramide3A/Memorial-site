import { useState } from "react";
import { MediaAsset } from "../../types/memorial";

const SWIPE_THRESHOLD = 32;

export function MediaCarousel({
  assets,
  tone = "warm",
}: {
  assets: MediaAsset[];
  tone?: "warm" | "deep" | "sage";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = assets.length;
  const activeAsset = assets[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        showPrevious();
      } else {
        showNext();
      }
    }

    setTouchStartX(null);
  }

  return (
    <div className="media-carousel">
      <div className={`media-block tone-${tone} media-carousel-frame`} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {activeAsset?.url ? (
          <img src={activeAsset.url} alt={activeAsset.alt} />
        ) : (
          <span>{activeAsset?.caption ?? activeAsset?.alt ?? "Source image pending import"}</span>
        )}
        {total > 1 ? (
          <>
            <button className="media-carousel-control media-carousel-control-prev" type="button" onClick={showPrevious} aria-label="Show previous image">
              ‹
            </button>
            <button className="media-carousel-control media-carousel-control-next" type="button" onClick={showNext} aria-label="Show next image">
              ›
            </button>
            <div className="media-carousel-status" aria-live="polite">
              {activeIndex + 1} / {total}
            </div>
          </>
        ) : null}
      </div>
      {total > 1 ? (
        <div className="media-carousel-dots" aria-label="Image selection">
          {assets.map((asset, index) => (
            <button
              key={`${asset.alt}-${index}`}
              className={index === activeIndex ? "media-carousel-dot active" : "media-carousel-dot"}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
