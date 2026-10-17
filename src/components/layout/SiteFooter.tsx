import { Link } from "react-router";
import { person, profiles } from "@/data/profile";

export function SiteFooter() {
  const linked = profiles.filter((p) => p.url);

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <Link to="/" className="font-display font-semibold text-fg">
            {person.wordmark}
          </Link>{" "}
          {person.name}. Built with React and TypeScript.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {linked.map((p) => (
            <li key={p.id}>
              <a href={p.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                {p.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${person.email}`} className="transition-colors hover:text-fg">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
