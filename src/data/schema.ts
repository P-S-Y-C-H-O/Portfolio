/*
 * Project schema. Every project in src/data/projects.ts is parsed through this
 * at module load, so a typo (duplicate slug, malformed URL, empty alt text)
 * fails loudly in dev, in the build and in tests instead of shipping a broken
 * page. Optional fields are optional on purpose: the UI renders a section only
 * when its field holds content, so nothing has to be invented to fill a template.
 */
import { z } from "zod";

const text = z.string().trim().min(1);
const url = z.url({ protocol: /^https?$/ });
// Public assets live under /public, so a local image is a root-relative path.
const assetPath = z.string().regex(/^\/[^\s]+$/, "Use a root-relative path such as /images/projects/x/cover.png");

const titledText = z.object({ title: text, description: text });

const image = z.object({
  src: assetPath,
  alt: text, // meaningful alt text is mandatory, decorative images do not belong here
  caption: text.optional(),
});

/** Steps of an illustrative flow. Drawn on the case study and labelled as illustrative. */
const flowStep = z.object({ label: text, detail: text.optional() });

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, digits and single hyphens"),
  title: text,
  subtitle: text,
  category: text,
  date: text.optional(),

  description: text,
  featured: z.boolean(),
  /** Lower comes first. Reorder the showcase by changing these numbers. */
  order: z.number().int(),

  /** Which built-in placeholder composition to show until a real cover image exists. */
  visual: z.enum(["graph", "retrieval", "publishing"]),
  coverImage: assetPath.optional(),
  coverAlt: text.optional(),
  /** Shown under the cover on the case study. Use it when the cover is a mockup rather than a real screenshot. */
  coverNote: text.optional(),

  technologies: z.array(text).min(1),

  links: z.object({ github: url.optional(), liveDemo: url.optional() }).optional(),

  overview: text.optional(),
  problem: text.optional(),
  solution: text.optional(),

  features: z.array(titledText).optional(),
  implementation: z.array(titledText).optional(),

  architectureImage: assetPath.optional(),
  architectureAlt: text.optional(),
  /** Used when no architectureImage exists. Always rendered as an illustrative flow. */
  architectureFlow: z.array(flowStep).optional(),

  gallery: z.array(image).optional(),

  challenges: z.array(text).optional(),
  learnings: z.array(text).optional(),
  outcomes: z.array(text).optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type TitledText = z.infer<typeof titledText>;

/**
 * Validates the whole list: each entry against the schema, plus the rules that
 * only make sense across entries (unique slugs, alt text paired with images).
 */
export function parseProjects(input: unknown): Project[] {
  const projects = z.array(projectSchema).parse(input);

  const seen = new Set<string>();
  for (const p of projects) {
    if (seen.has(p.slug)) throw new Error(`Duplicate project slug: "${p.slug}"`);
    seen.add(p.slug);
    if (p.coverImage && !p.coverAlt) {
      throw new Error(`Project "${p.slug}" has a coverImage but no coverAlt`);
    }
    if (p.architectureImage && !p.architectureAlt) {
      throw new Error(`Project "${p.slug}" has an architectureImage but no architectureAlt`);
    }
  }
  return projects;
}
