/*
 * Not-found view for unknown URLs and for unknown project slugs. A client
 * rendered app cannot send an HTTP 404 itself (the host's SPA fallback
 * serves index.html), so the page marks itself noindex instead.
 */
import { ButtonLink } from "@/components/ui/Button";
import { PageMeta } from "@/components/layout/PageMeta";

type Props = { what?: "page" | "project" };

export function NotFoundPage({ what = "page" }: Props) {
  const message =
    what === "project"
      ? "There is no project at this address. It may have been renamed or removed."
      : "That address does not lead anywhere on this site.";

  return (
    <section className="container-x flex min-h-[80dvh] flex-col justify-center py-32" aria-labelledby="not-found-heading">
      <PageMeta title="Not found | Abhishek Srivastava" description="This page could not be found." noindex />
      <p className="eyebrow">Error 404</p>
      <h1 id="not-found-heading" className="display-hero mt-6">
        {what === "project" ? "Project not found" : "Page not found"}
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted" role="status">
        {message}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink to="/#work">Browse selected projects</ButtonLink>
        <ButtonLink to="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
