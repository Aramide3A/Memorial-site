import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import { PersonProfile, SiteConfig } from "../../types/memorial";

export function AppShell({
  children,
  site,
  person,
}: {
  children: ReactNode;
  site: SiteConfig;
  person: PersonProfile;
}) {
  return (
    <div className="site-shell">
      <div className="grain" />
      <header className="site-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">{person.name.slice(0, 1)}</span>
          <span>
            <strong>{site.shortTitle}</strong>
            <small>{site.tagline}</small>
          </span>
        </NavLink>
        <nav className="site-nav">
          {site.navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="button primary" to="/tributes">
          Leave tribute
        </NavLink>
      </header>
      <main className="page-frame">{children}</main>
      <footer className="site-footer">
        <div>
          <strong>{site.shortTitle}</strong>
          <p>{site.tagline}</p>
        </div>
       </footer>
    </div>
  );
}
