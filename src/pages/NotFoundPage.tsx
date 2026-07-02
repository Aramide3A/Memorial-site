import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="page-hero panel">
      <p className="eyebrow">Page not found</p>
      <h1>This page has moved or does not exist.</h1>
      <p>The memorial sections are available through the main navigation.</p>
      <Link className="text-link" to="/">
        Return home
      </Link>
    </section>
  );
}
