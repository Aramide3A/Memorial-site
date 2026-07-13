import { FormEvent, useState } from "react";
import { SectionIntro } from "../components/shared/SectionIntro";
import { TributeCard } from "../components/shared/TributeCard";
import { MemorialContent, Tribute } from "../types/memorial";

type TributeFormState = {
  author: string;
  relationship: string;
  message: string;
};

const initialFormState: TributeFormState = {
  author: "",
  relationship: "",
  message: "",
};

export function TributesPage({ content }: { content: MemorialContent }) {
  const [form, setForm] = useState<TributeFormState>(initialFormState);
  const [submittedTributes, setSubmittedTributes] = useState<Tribute[]>([]);
  const [notice, setNotice] = useState("");

  const tributes = [...submittedTributes, ...content.tributes];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const author = form.author.trim();
    const relationship = form.relationship.trim();
    const message = form.message.trim();

    if (!author || !relationship || !message) {
      setNotice("Please fill in your name, relationship, and tribute message.");
      return;
    }

    const tribute: Tribute = {
      id: `local-${Date.now()}`,
      author,
      relationship: `${relationship} · Pending approval`,
      message,
    };

    setSubmittedTributes((current) => [tribute, ...current]);
    setForm(initialFormState);
    setNotice("Your tribute has been added to the page as a pending submission.");
  }

  return (
    <div className="page-stack">
      <section className="page-hero panel">
        <SectionIntro
          eyebrow="Tribute wall"
          title="Words of love, gratitude, and remembrance"
          body="Each tribute shared here reflects the lives she influenced and the lasting impression of her kindness, strength, and faith."
        />
      </section>

      <section className="card-grid three-up">
        {tributes.map((tribute) => (
          <TributeCard key={tribute.id} tribute={tribute} />
        ))}
      </section>

      <section className="panel tribute-form-panel tribute-form-bottom">
        <p className="eyebrow">Add a tribute</p>
        <h3>Add more family-approved tributes</h3>
        <p>
          Use this form to draft a new remembrance message. New submissions appear here immediately as pending while
          you decide how you want to moderate them later.
        </p>
        <form className="stack-list" onSubmit={handleSubmit}>
          <label className="field">
            <span>Your name</span>
            <input
              value={form.author}
              onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
              placeholder="e.g. Ameen"
            />
          </label>
          <label className="field">
            <span>Relationship</span>
            <input
              value={form.relationship}
              onChange={(event) => setForm((current) => ({ ...current, relationship: event.target.value }))}
              placeholder="Family, friend, beneficiary..."
            />
          </label>
          <label className="field">
            <span>Tribute message</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              placeholder="Write your memory here..."
            />
          </label>
          <button className="button primary tribute-submit" type="submit">
            Submit for approval
          </button>
          {notice ? <p className="form-notice">{notice}</p> : null}
        </form>
      </section>
    </div>
  );
}
