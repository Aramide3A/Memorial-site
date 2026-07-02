import { MediaAsset } from "../../types/memorial";

export function MediaPlaceholder({
  asset,
  tone = "warm",
}: {
  asset?: MediaAsset;
  tone?: "warm" | "deep" | "sage";
}) {
  return (
    <div className={`media-block tone-${tone}`}>
      {asset?.url ? <img src={asset.url} alt={asset.alt} /> : <span>{asset?.caption ?? asset?.alt ?? "Source image pending import"}</span>}
    </div>
  );
}
