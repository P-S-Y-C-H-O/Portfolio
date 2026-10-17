/*
 * The single source of truth for every project. The homepage showcase, the
 * case-study routes, related-project links and previous/next navigation all
 * read from this list, so content cannot drift between them.
 *
 * Everything below comes from the resume (Abhishek_res_2026.pdf). Fields the
 * resume does not document (problem, challenges, learnings, outcomes, gallery)
 * are left out on purpose: the page omits those sections rather than inventing
 * a story. Add them here when there is something real to say.
 */
import { parseProjects } from "./schema";

export const projects = parseProjects([
  {
    slug: "weavyr",
    title: "Weavyr",
    subtitle: "AI Research Networking Platform",
    category: "AI Research Networking Platform",
    date: "March 2026",
    description:
      "An AI research networking platform with a serverless backend, structured academic data, user discovery, and swipe-based collaboration matching.",
    featured: true,
    order: 1,
    visual: "graph",
    coverImage: "/images/projects/weavyr/cover.png",
    coverAlt:
      "Mockup of two phone screens: a profile card for a researcher with a collaborate action, and a mutual-match screen offering to start collaborating.",
    coverNote: "Illustrative mockup with sample content, based on the documented features. Not a screenshot of the running app.",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Node.js",
      "Hono",
      "Cloudflare Workers",
      "PostgreSQL",
      "Prisma",
      "TypeScript",
      "JWT",
      "Zod",
    ],
    links: { github: "https://github.com/Absar-ao4/Weavyr" },
    overview:
      "Weavyr connects researchers. It models users, papers and the interactions between them, and lets people discover each other and match for collaboration with a swipe.",
    solution:
      "A serverless backend built with Hono and TypeScript runs on Cloudflare Workers and serves REST APIs. PostgreSQL models managed with Prisma, pooled through Prisma Accelerate, hold users, papers and interactions. A swipe-based matchmaking engine pairs people when interest is mutual.",
    features: [
      {
        title: "Swipe-based matchmaking",
        description: "A matchmaking engine that pairs researchers for collaboration when both sides show interest.",
      },
      {
        title: "User discovery",
        description: "Find other researchers through structured user and paper data.",
      },
      {
        title: "Bookmarking and collaboration workflows",
        description: "Save people of interest and move from a match into collaboration.",
      },
    ],
    implementation: [
      {
        title: "Backend",
        description: "Hono with TypeScript on Cloudflare Workers, exposing edge-optimized REST APIs.",
      },
      {
        title: "Data storage",
        description:
          "PostgreSQL data models for users, papers and interactions, managed with Prisma and pooled through Prisma Accelerate.",
      },
      {
        title: "Authentication and validation",
        description: "JWT authentication with bcrypt password hashing, and request validation with Zod.",
      },
      {
        title: "Client",
        description: "Kotlin and Jetpack Compose, as listed in the project's tech stack.",
      },
    ],
    architectureFlow: [
      { label: "Kotlin + Jetpack Compose client" },
      { label: "Hono REST API", detail: "Cloudflare Workers" },
      { label: "Prisma Accelerate", detail: "connection pooling" },
      { label: "PostgreSQL", detail: "users, papers, interactions" },
    ],
  },
  {
    slug: "github-rag",
    title: "GitHub RAG",
    subtitle: "AI-Powered Repository Question Answering System",
    category: "AI / Developer Tools",
    date: "June 2026",
    description:
      "An AI-powered system for asking natural-language questions about GitHub repositories and retrieving relevant source-code context.",
    featured: true,
    order: 2,
    visual: "retrieval",
    coverImage: "/images/projects/github-rag/cover.png",
    coverAlt:
      "Mockup of a question-answering interface: an answer with file and line-range citations beside the cited source code with the lines highlighted.",
    coverNote: "Illustrative mockup with sample content, based on the documented features. Not a screenshot of the running app.",
    technologies: ["Python", "FastAPI", "React", "TypeScript", "Gemini API", "NumPy", "GitHub API", "Vite"],
    links: { github: "https://github.com/P-S-Y-C-H-O/Github_RAG" },
    overview:
      "GitHub RAG answers natural-language questions about a GitHub repository by retrieving the source-code context that matters, then generating an answer that points back to the files and lines it used.",
    solution:
      "Repositories are ingested asynchronously through the GitHub API, split into overlapping code chunks, embedded with Gemini and stored as normalized vectors. A question is matched to chunks by vector similarity, and Gemini writes an answer with file and line-range citations, shown in a React and Vite interface.",
    features: [
      {
        title: "Natural-language repository questions",
        description: "Ask about a repository in plain language and get an answer grounded in its code.",
      },
      {
        title: "Retrieval by vector similarity",
        description: "Gemini embeddings and vector similarity select the relevant source-code context.",
      },
      {
        title: "File and line-range citations",
        description:
          "Answers carry verified file and line-range citations, aimed at traceability and fewer unsupported references.",
      },
    ],
    implementation: [
      {
        title: "Ingestion",
        description: "Asynchronous repository ingestion that fetches files through the GitHub API.",
      },
      {
        title: "Retrieval pipeline",
        description:
          "Overlapping code chunking, Gemini embeddings and normalized vector storage, searched by vector similarity.",
      },
      {
        title: "Backend",
        description: "Python and FastAPI, with background jobs for indexing.",
      },
      {
        title: "Frontend",
        description: "A React and Vite interface in TypeScript that presents answers with their citations.",
      },
    ],
    architectureFlow: [
      { label: "GitHub API", detail: "file fetching" },
      { label: "Overlapping chunks" },
      { label: "Gemini embeddings", detail: "normalized vectors" },
      { label: "Similarity search" },
      { label: "Gemini answer", detail: "file and line citations" },
    ],
  },
  {
    slug: "pulseblog",
    title: "PulseBlog",
    subtitle: "Serverless Publishing Platform",
    category: "Full-Stack Web Development",
    date: "January 2026",
    description: "A serverless blogging platform that enables users to create, edit, and discover technical articles.",
    featured: true,
    order: 3,
    visual: "publishing",
    coverImage: "/images/projects/pulseblog/cover.png",
    coverAlt:
      "Mockup of a blogging site: a feed of technical articles beside an article editor with a publish button.",
    coverNote: "Illustrative mockup with sample content, based on the documented features. Not a screenshot of the running app.",
    technologies: ["React", "TypeScript", "Hono", "PostgreSQL", "Prisma ORM", "Prisma Accelerate", "JWT", "Zod"],
    links: { github: "https://github.com/P-S-Y-C-H-O/PulseBlog" },
    overview:
      "PulseBlog is a publishing platform for technical writing. People can create and edit articles and discover what others have written.",
    solution:
      "REST APIs built with Hono sit in front of PostgreSQL, accessed through Prisma ORM with connection pooling from Prisma Accelerate. Access is secured with JWT authentication, bcrypt password hashing and Zod validation.",
    features: [
      { title: "Create and edit articles", description: "Authors write and revise technical articles." },
      { title: "Discover articles", description: "Readers browse and find technical writing." },
    ],
    implementation: [
      { title: "API layer", description: "REST APIs designed with Hono." },
      {
        title: "Data storage",
        description: "PostgreSQL through Prisma ORM, with connection pooling via Prisma Accelerate.",
      },
      {
        title: "Authentication and validation",
        description: "JWT authentication, bcrypt password hashing and Zod validation for secure API access.",
      },
      { title: "Frontend", description: "React with TypeScript." },
    ],
    architectureFlow: [
      { label: "React client" },
      { label: "Hono REST API", detail: "JWT + Zod" },
      { label: "Prisma ORM + Accelerate" },
      { label: "PostgreSQL" },
    ],
  },
]).sort((a, b) => a.order - b.order);
