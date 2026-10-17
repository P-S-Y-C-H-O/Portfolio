/*
 * Architecture for a case study. A real diagram (architectureImage) wins. With
 * none, the documented stack is drawn as a simple flow and labelled
 * "illustrative": the order of the steps is inferred from the stack, not taken
 * from a verified architecture diagram, and the page says so.
 */
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Project } from "@/data/schema";

export function ArchitectureBlock({ project }: { project: Project }) {
  const { architectureImage, architectureAlt, architectureFlow } = project;

  if (architectureImage) {
    return (
      <figure>
        <img
          src={architectureImage}
          alt={architectureAlt ?? ""}
          loading="lazy"
          decoding="async"
          className="w-full border border-line bg-surface"
        />
      </figure>
    );
  }

  if (!architectureFlow || architectureFlow.length === 0) return null;

  return (
    <figure>
      <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch">
        {architectureFlow.map((step, i) => (
          <li key={step.label} className="flex flex-col items-center gap-3 lg:flex-1 lg:flex-row">
            <div className="w-full flex-1 self-stretch border border-line bg-surface p-5">
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-lg font-semibold leading-tight tracking-tight">{step.label}</p>
              {step.detail && <p className="mt-1 text-sm text-muted">{step.detail}</p>}
            </div>
            {i < architectureFlow.length - 1 && (
              <>
                <ArrowDown size={18} aria-hidden="true" className="shrink-0 text-muted lg:hidden" />
                <ArrowRight size={18} aria-hidden="true" className="hidden shrink-0 text-muted lg:block" />
              </>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-muted">
        Illustrative flow based on the documented tech stack, not a verified architecture diagram.
      </figcaption>
    </figure>
  );
}
