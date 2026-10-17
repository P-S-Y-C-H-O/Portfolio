/*
 * Homepage "Selected Work" section. Feeds the showcase from the same data
 * source the case-study routes use, so the two can never disagree.
 */
import { getFeaturedProjects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectShowcase } from "./ProjectShowcase";

export function ProjectSection() {
  const featured = getFeaturedProjects();
  if (featured.length === 0) return null;

  return (
    <section id="work" aria-labelledby="work-heading" className="container-x py-24 md:py-36">
      <SectionHeading
        id="work-heading"
        eyebrow="Selected work"
        intro="A few projects I have built, each with its own case study. Swipe, scroll or use the arrows."
      >
        Things I have built
      </SectionHeading>
      <Reveal>
        <ProjectShowcase projects={featured} />
      </Reveal>
    </section>
  );
}
