/*
 * Slider controls: previous/next buttons, one indicator per project, a
 * "01 / 03" counter and a progress rule. Purely presentational. The showcase
 * owns the index and tells this component where to go.
 */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/schema";
import { formatIndex } from "@/lib/projects";
import { canGoNext, canGoPrevious } from "@/lib/slider";

type Props = {
  projects: Project[];
  index: number;
  onSelect: (index: number) => void;
};

const roundButton =
  "grid size-12 place-items-center rounded-full border border-line transition enabled:hover:border-fg enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-35";

export function ProjectNavigation({ projects, index, onSelect }: Props) {
  const reduceMotion = useReducedMotion();
  const count = projects.length;

  return (
    <div className="mt-10 flex flex-col gap-6 md:mt-14">
      <div className="h-px w-full bg-line" aria-hidden="true">
        <motion.div
          className="h-px origin-left bg-accent"
          initial={false}
          animate={{ scaleX: (index + 1) / count }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-sm tabular-nums" aria-hidden="true">
          <span className="text-fg">{formatIndex(index)}</span>
          <span className="text-muted"> / {formatIndex(count - 1)}</span>
        </p>

        <ul className="flex items-center gap-2" aria-label="Choose a project">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Go to project ${i + 1}: ${project.title}`}
                aria-current={i === index ? "true" : undefined}
                className={`rounded-full border px-4 py-2 font-mono text-xs transition active:scale-95 ${
                  i === index ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-fg hover:text-fg"
                }`}
              >
                {formatIndex(i)}
                <span className="ml-2 hidden sm:inline">{project.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <button
            type="button"
            className={roundButton}
            onClick={() => onSelect(index - 1)}
            disabled={!canGoPrevious(index)}
            aria-label="Previous project"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={roundButton}
            onClick={() => onSelect(index + 1)}
            disabled={!canGoNext(index, count)}
            aria-label="Next project"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
