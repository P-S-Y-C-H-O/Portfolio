# Abhishek Srivastava, portfolio

A single-page portfolio with a case-study page per project. React 19, TypeScript (strict), Vite, React Router, Tailwind CSS 4, Motion, Zod.

All content comes from the resume (`Abhishek_res_2026.pdf`). Anything the resume does not state is left out rather than invented.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

## Checks

```bash
npm run typecheck
npm run lint
npm test           # slug lookup, unknown slugs, prev/next, theme, slider, data validation
npm run build      # typechecks, then writes dist/
npm run preview    # serve the production build locally
```

## Where things live

| What | Where |
|---|---|
| Projects (all content) | `src/data/projects.ts` |
| Project schema and validation | `src/data/schema.ts` |
| Contact, profile links, skills, education, achievements | `src/data/profile.ts` |
| Colours and fonts (light and dark tokens) | `src/index.css` |
| Routes | `src/App.tsx` (`/`, `/projects/:slug`, anything else is not-found) |
| Resume PDF | `public/resume.pdf` |
| Project images | `public/images/projects/<slug>/` |
| Social share image | `public/images/og/` |

## Projects

The homepage slider, the hero index, the case-study routes, previous/next links and related projects all read `src/data/projects.ts`. No component names a specific project.

**Add a project.** Append an object to the list in `src/data/projects.ts`. Required: `slug` (lowercase, hyphens), `title`, `subtitle`, `category`, `description`, `featured`, `order`, `visual`, `technologies`. Everything else is optional. The page `/projects/<slug>` exists as soon as the object does.

**Edit.** Change the fields. A section on the case study appears only when its field has content: `overview`, `problem`, `solution`, `features`, `implementation`, `architectureFlow` or `architectureImage`, `gallery`, `challenges`, `learnings`, `outcomes`.

**Reorder.** Change `order`. Lower comes first. The slider follows.

**Remove.** Delete the object. The homepage and links adjust. To keep a case study but hide it from the slider, set `featured: false`.

**Validation.** The list is parsed at load. A duplicate slug, a malformed URL, or a cover or gallery image without alt text fails `npm run dev`, `npm run build` and `npm test`.

**Replace a placeholder with a real screenshot.**

1. Put the file in `public/images/projects/<slug>/`, for example `cover.png` (16:10 works best).
2. In the project object set `coverImage: "/images/projects/<slug>/cover.png"` and `coverAlt: "A sentence describing what the screenshot shows"`.

The three current covers (`public/images/projects/<slug>/cover.png`, 1600x1000 at 1.5x) are illustrative interface mockups with sample content, built from what each project documents. They are not screenshots of the running apps, and each case study says so through `coverNote`. When you have real screenshots, replace the PNG (or change `coverImage`), update `coverAlt` and delete `coverNote`. A project with no `coverImage` shows a labelled "Placeholder visual". If a configured image is missing the placeholder is shown again, never a broken icon. A gallery is `gallery: [{ src, alt, caption? }]`. A real diagram is `architectureImage` plus `architectureAlt`.

**Problem, challenges, learnings, outcomes.** These are empty on purpose because the resume does not document them. Add real text when you have it. The sections appear on their own.

**Architecture.** With no `architectureImage`, the case study draws `architectureFlow` as a flow and labels it "Illustrative flow based on the documented tech stack, not a verified architecture diagram". Replace it with a real diagram when you have one.

## Links, contact, resume

- GitHub, LinkedIn, LeetCode and the NPTEL certificate link come from the resume's embedded links, in `src/data/profile.ts`. The Codeforces and CodeChef URLs were supplied separately, since the resume does not embed them.
- A profile entry without a `url` is not linked or listed, so a missing link never shows as a dead one. Do not guess usernames.
- Email is a `mailto:` link. There is no contact form because there is no backend to receive it.
- No phone number is shown on the site. **`public/resume.pdf` is your actual resume and still contains it.** Replace it with a version without the number if you do not want it public.
- To update the resume, replace `public/resume.pdf` (keep the name).

## Theme

Light and dark are designed separately in `src/index.css`. The first visit follows the operating system, a manual choice is saved in `localStorage`, and a small script in `index.html` applies it before first paint to avoid a flash.

## Deploy

This is a static single-page app. Build with `npm run build` and publish `dist/`.

- **Vercel**: import the repo. `vercel.json` already rewrites unknown paths to `index.html` so `/projects/<slug>` works on refresh.
- **Netlify**: `public/_redirects` does the same.
- **Other static hosts**: configure a fallback to `index.html`.

Once you have a domain, set `VITE_SITE_URL` (see `.env.example`) for canonical and Open Graph URLs, and add a `Sitemap:` line to `public/robots.txt`.

## Known limits

- It is a client-rendered SPA, so an unknown URL is served with HTTP 200 and shows the not-found page (marked `noindex`). A static-generated framework would return a true 404.
- Page titles are set on the client. Link previews (Open Graph) use the generic tags in `index.html`, not per-project ones.
- No Open Graph image is supplied. Add one to `public/images/og/` and an `og:image` tag in `index.html`.
