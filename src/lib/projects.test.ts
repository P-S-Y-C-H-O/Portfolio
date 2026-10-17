// Covers the rules the routes depend on: slug lookup, unknown slugs, display
// order, previous/next at both ends, and that the real data passes validation.
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { parseProjects } from "@/data/schema";
import {
  formatIndex,
  getAdjacentProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getRelatedProjects,
} from "./projects";

const base = {
  title: "T",
  subtitle: "S",
  category: "C",
  description: "D",
  featured: true,
  visual: "graph" as const,
  technologies: ["TypeScript"],
};

const fixture = parseProjects([
  { ...base, slug: "one", order: 1 },
  { ...base, slug: "two", order: 2, featured: false },
  { ...base, slug: "three", order: 3 },
]);

describe("project lookup", () => {
  it("finds a project by slug", () => {
    expect(getProjectBySlug("weavyr")?.title).toBe("Weavyr");
  });

  it("returns undefined for an unknown or missing slug instead of another project", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
    expect(getProjectBySlug(undefined)).toBeUndefined();
    expect(getProjectBySlug("")).toBeUndefined();
  });

  it("derives featured projects from the same list", () => {
    expect(getFeaturedProjects(fixture).map((p) => p.slug)).toEqual(["one", "three"]);
  });

  it("keeps the real projects in order", () => {
    expect(projects.map((p) => p.slug)).toEqual(["weavyr", "github-rag", "pulseblog"]);
  });
});

describe("project navigation", () => {
  it("has no previous on the first project", () => {
    const { previous, next } = getAdjacentProjects("one", fixture);
    expect(previous).toBeUndefined();
    expect(next?.slug).toBe("two");
  });

  it("has no next on the last project", () => {
    const { previous, next } = getAdjacentProjects("three", fixture);
    expect(previous?.slug).toBe("two");
    expect(next).toBeUndefined();
  });

  it("returns nothing for an unknown slug", () => {
    expect(getAdjacentProjects("nope", fixture)).toEqual({});
  });

  it("never lists the current project as related", () => {
    expect(getRelatedProjects("one", fixture).map((p) => p.slug)).toEqual(["two", "three"]);
  });

  it("formats the display index with a leading zero", () => {
    expect(formatIndex(0)).toBe("01");
    expect(formatIndex(11)).toBe("12");
  });
});

describe("project data validation", () => {
  it("accepts the shipped projects", () => {
    expect(() => parseProjects(projects)).not.toThrow();
  });

  it("rejects duplicate slugs", () => {
    expect(() =>
      parseProjects([
        { ...base, slug: "same", order: 1 },
        { ...base, slug: "same", order: 2 },
      ]),
    ).toThrow(/Duplicate project slug/);
  });

  it("rejects a malformed slug", () => {
    expect(() => parseProjects([{ ...base, slug: "Not A Slug", order: 1 }])).toThrow();
  });

  it("rejects an invalid external URL", () => {
    expect(() => parseProjects([{ ...base, slug: "x", order: 1, links: { github: "not-a-url" } }])).toThrow();
  });

  it("requires alt text with a cover image", () => {
    expect(() => parseProjects([{ ...base, slug: "x", order: 1, coverImage: "/images/x.png" }])).toThrow(
      /coverAlt/,
    );
  });

  it("requires alt text on gallery images", () => {
    expect(() =>
      parseProjects([{ ...base, slug: "x", order: 1, gallery: [{ src: "/images/x.png", alt: "" }] }]),
    ).toThrow();
  });
});
