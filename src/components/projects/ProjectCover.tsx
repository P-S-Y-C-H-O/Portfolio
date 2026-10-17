/*
 * A project's main image. Uses the configured coverImage when there is one and
 * it loads; otherwise (not configured, or the file is missing) it falls back
 * to the placeholder artwork at the same aspect ratio, so layout never shifts
 * and no broken-image icon appears.
 */
import { useState } from "react";
import type { Project } from "@/data/schema";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

type Props = { project: Project; priority?: boolean; className?: string };

export function ProjectCover({ project, priority = false, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (!project.coverImage || failed) {
    return <ProjectVisual kind={project.visual} title={project.title} className={className} />;
  }

  return (
    <div className={`aspect-[16/10] w-full overflow-hidden border border-line bg-surface ${className}`}>
      <img
        src={project.coverImage}
        alt={project.coverAlt ?? ""}
        width={1600}
        height={1000}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className="size-full object-cover"
      />
    </div>
  );
}
