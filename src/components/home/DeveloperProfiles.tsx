/*
 * Links to the developer's profiles. Only profiles with a verified URL in
 * src/data/profile.ts appear: no guessed usernames, no dead links. No API
 * calls, so it works with no keys and shows no fake "live" statistics.
 */
import { ArrowUpRight } from "lucide-react";
import { profiles } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DeveloperProfiles() {
  const linked = profiles.filter((p) => p.url);
  if (linked.length === 0) return null;

  return (
    <section id="profiles" aria-labelledby="profiles-heading" className="border-t border-line">
      <div className="container-x py-24 md:py-36">
        <SectionHeading id="profiles-heading" eyebrow="Elsewhere">
          Code and profiles
        </SectionHeading>
        <ul className="border-t border-line">
          {linked.map((p) => (
            <li key={p.id} className="border-b border-line">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-6 transition-colors hover:text-accent md:py-8"
              >
                <span className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{p.label}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-7 shrink-0 text-muted transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:size-9"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
