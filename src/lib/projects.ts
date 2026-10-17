/*
 * Lookups over the project list. Components never filter or index the data
 * array themselves, so the rules (featured only, order by `order`, wrap-free
 * previous/next, "unknown slug is undefined") live in one tested place.
 * Each function takes the list as a parameter, defaulting to the real data,
 * so tests can pass their own fixtures.
 */
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/data/schema";

export function getFeaturedProjects(list: Project[] = allProjects): Project[] {
  return list.filter((p) => p.featured);
}

/** Returns undefined for an unknown slug. Callers must show a not-found state, never another project. */
export function getProjectBySlug(slug: string | undefined, list: Project[] = allProjects): Project | undefined {
  if (!slug) return undefined;
  return list.find((p) => p.slug === slug);
}

/** Neighbours in display order. The first project has no previous and the last has no next. */
export function getAdjacentProjects(
  slug: string,
  list: Project[] = allProjects,
): { previous?: Project; next?: Project } {
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { previous: list[index - 1], next: list[index + 1] };
}

export function getRelatedProjects(slug: string, list: Project[] = allProjects, limit = 2): Project[] {
  return list.filter((p) => p.slug !== slug).slice(0, limit);
}

export function formatIndex(position: number): string {
  return String(position + 1).padStart(2, "0");
}
