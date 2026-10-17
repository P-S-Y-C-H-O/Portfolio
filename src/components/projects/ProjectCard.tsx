/* A compact project preview used by related-project links. One link, one heading, no nested controls. */
import { Link } from "react-router";
import type { Project } from "@/data/schema";
import { ProjectCover } from "./ProjectCover";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="overflow-hidden">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectCover project={project} />
        </div>
      </div>
      <p className="eyebrow mt-5">{project.category}</p>
      <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-2 max-w-[44ch] text-muted">{project.description}</p>
    </Link>
  );
}
