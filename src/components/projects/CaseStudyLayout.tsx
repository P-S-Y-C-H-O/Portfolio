/*
 * Case-study page structure. Every section is optional: it renders only when
 * the project holds content for it, so a project with little documented
 * detail yields a shorter page instead of filler. Project-specific text never
 * appears here; this file only decides layout.
 */
import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/schema";
import { ButtonLink, ExternalLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TechnologyList } from "@/components/ui/TechnologyList";
import { ArchitectureBlock } from "./ArchitectureBlock";
import { ProjectCard } from "./ProjectCard";
import { ProjectCover } from "./ProjectCover";
import { ProjectGallery } from "./ProjectGallery";

function CaseSection({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-heading`} className="border-t border-line py-14 md:py-20">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <h2 id={`${id}-heading`} className="eyebrow md:col-span-3 md:pt-1">
          {label}
        </h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="prose-measure space-y-3 text-lg">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type Props = { project: Project; previous?: Project; next?: Project; related: Project[] };

export function CaseStudyLayout({ project, previous, next, related }: Props) {
  const { links } = project;
  const hasFeatures = (project.features?.length ?? 0) > 0;
  const hasImplementation = (project.implementation?.length ?? 0) > 0;
  const hasArchitecture = Boolean(project.architectureImage) || (project.architectureFlow?.length ?? 0) > 0;
  const hasGallery = (project.gallery?.length ?? 0) > 0;

  return (
    <article className="container-x pb-24 pt-32 md:pt-40">
      <Link to="/#work" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
        Selected projects
      </Link>

      <header className="mt-10">
        <p className="eyebrow">
          {project.category}
          {project.date && ` · ${project.date}`}
        </p>
        <h1 className="display-project mt-5">{project.title}</h1>
        <p className="mt-6 max-w-[40ch] font-display text-2xl font-medium tracking-tight text-muted md:text-3xl">
          {project.subtitle}
        </p>
        <p className="prose-measure mt-6 text-lg">{project.description}</p>
      </header>

      <Reveal className="mt-12">
        <ProjectCover project={project} priority />
        {project.coverNote && <p className="mt-3 text-sm text-muted">{project.coverNote}</p>}
      </Reveal>

      <dl className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <dt className="eyebrow">Category</dt>
          <dd className="mt-2">{project.category}</dd>
        </div>
        {project.date && (
          <div className="md:col-span-2">
            <dt className="eyebrow">Date</dt>
            <dd className="mt-2">{project.date}</dd>
          </div>
        )}
        <div className="md:col-span-7">
          <dt className="eyebrow">Stack</dt>
          <dd className="mt-3">
            <TechnologyList items={project.technologies} />
          </dd>
        </div>
      </dl>

      {project.overview && (
        <CaseSection id="overview" label="Overview">
          <p className="prose-measure font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            {project.overview}
          </p>
        </CaseSection>
      )}

      {project.problem && (
        <CaseSection id="problem" label="Problem and motivation">
          <p className="prose-measure text-lg">{project.problem}</p>
        </CaseSection>
      )}

      {project.solution && (
        <CaseSection id="solution" label="Solution">
          <p className="prose-measure text-lg">{project.solution}</p>
        </CaseSection>
      )}

      {hasFeatures && (
        <CaseSection id="features" label="Key features">
          <ol>
            {project.features!.map((feature, i) => (
              <li key={feature.title} className="grid gap-2 border-b border-line py-6 first:pt-0 last:border-b-0 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs text-accent sm:pt-2">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="prose-measure mt-1 text-muted">{feature.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </CaseSection>
      )}

      {hasImplementation && (
        <CaseSection id="implementation" label="Technical implementation">
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {project.implementation!.map((item) => (
              <div key={item.title} className="border-t border-line pt-4">
                <dt className="font-display text-lg font-semibold tracking-tight">{item.title}</dt>
                <dd className="mt-2 text-muted">{item.description}</dd>
              </div>
            ))}
          </dl>
        </CaseSection>
      )}

      {hasArchitecture && (
        <CaseSection id="architecture" label="Architecture">
          <ArchitectureBlock project={project} />
        </CaseSection>
      )}

      {hasGallery && (
        <CaseSection id="gallery" label="Screenshots">
          <ProjectGallery images={project.gallery!} />
        </CaseSection>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <CaseSection id="challenges" label="Challenges">
          <BulletList items={project.challenges} />
        </CaseSection>
      )}

      {project.learnings && project.learnings.length > 0 && (
        <CaseSection id="learnings" label="Learnings">
          <BulletList items={project.learnings} />
        </CaseSection>
      )}

      {project.outcomes && project.outcomes.length > 0 && (
        <CaseSection id="outcome" label="Outcome">
          <BulletList items={project.outcomes} />
        </CaseSection>
      )}

      <section aria-label="Project links" className="border-t border-line py-14 md:py-20">
        <p className="eyebrow">Next step</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {links?.github && (
            <ExternalLink href={links.github} variant="primary">
              View repository
            </ExternalLink>
          )}
          {links?.liveDemo && (
            <ExternalLink href={links.liveDemo} variant="outline">
              Visit live demo
            </ExternalLink>
          )}
          <ButtonLink to="/#work" variant="outline">
            Back to selected projects
          </ButtonLink>
        </div>
      </section>

      {(previous || next) && (
        <nav aria-label="More projects" className="grid border-y border-line sm:grid-cols-2">
          {previous ? (
            <Link
              to={`/projects/${previous.slug}`}
              className="group flex flex-col gap-2 py-8 transition-colors hover:text-accent sm:border-r sm:border-line sm:pr-8"
            >
              <span className="eyebrow flex items-center gap-2">
                <ArrowLeft size={14} aria-hidden="true" /> Previous
              </span>
              <span className="font-display text-3xl font-semibold tracking-tight">{previous.title}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex flex-col gap-2 py-8 transition-colors hover:text-accent sm:items-end sm:pl-8 sm:text-right"
            >
              <span className="eyebrow flex items-center gap-2">
                Next <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className="font-display text-3xl font-semibold tracking-tight">{next.title}</span>
            </Link>
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="pt-20">
          <h2 id="related-heading" className="eyebrow">
            Explore another project
          </h2>
          <div className="mt-8 grid gap-12 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
