/*
 * One project in the showcase: a large cover beside the title, description,
 * technology labels and links. The layout alternates (cover left, then right)
 * so the slider reads as an editorial spread rather than identical cards.
 * It only reads fields from the project, so any project fits.
 */
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/schema";
import { formatIndex } from "@/lib/projects";
import { ExternalLink } from "@/components/ui/Button";
import { TechnologyList } from "@/components/ui/TechnologyList";
import { ProjectCover } from "./ProjectCover";

const MAX_LABELS = 6;

type Props = { project: Project; position: number; priority?: boolean };

export function ProjectSlide({ project, position, priority }: Props) {
  const flipped = position % 2 === 1;
  const href = `/projects/${project.slug}`;
  const shown = project.technologies.slice(0, MAX_LABELS);
  const extra = project.technologies.length - shown.length;

  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12" aria-labelledby={`slide-${project.slug}`}>
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`group block overflow-hidden md:col-span-7 ${flipped ? "md:order-2" : ""}`}
      >
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectCover project={project} priority={priority} />
        </div>
      </Link>

      <div className={`md:col-span-5 ${flipped ? "md:order-1" : ""}`}>
        <p className="eyebrow flex items-center gap-3">
          <span className="font-display text-base tracking-normal text-accent">{formatIndex(position)}</span>
          <span>{project.category}</span>
          {project.date && <span aria-hidden="true">·</span>}
          {project.date && <span>{project.date}</span>}
        </p>
        <h3 id={`slide-${project.slug}`} className="display-project mt-5">
          {project.title}
        </h3>
        <p className="mt-6 max-w-[46ch] text-lg text-muted">{project.description}</p>

        <TechnologyList items={extra > 0 ? [...shown, `+${extra} more`] : shown} className="mt-6" />

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to={href}
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition duration-200 hover:bg-accent hover:text-accent-fg active:scale-[0.97]"
          >
            Explore project
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
          {project.links?.github && (
            <ExternalLink href={project.links.github} className="group text-sm">
              GitHub
            </ExternalLink>
          )}
          {project.links?.liveDemo && (
            <ExternalLink href={project.links.liveDemo} className="group text-sm">
              Live demo
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}
