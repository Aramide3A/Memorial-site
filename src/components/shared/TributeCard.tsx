import { Tribute } from "../../types/memorial";

export function TributeCard({ tribute }: { tribute: Tribute }) {
  const meta = [tribute.date, tribute.relationship].filter(Boolean).join(" · ");

  return (
    <article className="content-card tribute-card">
      <span className="quote-mark">"</span>
      <h3>{tribute.message}</h3>
      <p>{meta ? `${tribute.author} · ${meta}` : tribute.author}</p>
    </article>
  );
}
