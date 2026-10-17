/*
 * /projects/:slug. Resolves the project by slug from the shared data. An
 * unknown slug renders the not-found view, never another project's content.
 */
import { useParams } from "react-router";
import { PageMeta } from "@/components/layout/PageMeta";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import { getAdjacentProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { NotFoundPage } from "./NotFoundPage";

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFoundPage what="project" />;

  const { previous, next } = getAdjacentProjects(project.slug);
  const related = getRelatedProjects(project.slug);

  return (
    <>
      <PageMeta title={`${project.title} | Abhishek Srivastava`} description={project.description} />
      <CaseStudyLayout project={project} previous={previous} next={next} related={related} />
    </>
  );
}
