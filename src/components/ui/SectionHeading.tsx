import type { ReactNode } from "react";

type Props = { id?: string; eyebrow: string; children: ReactNode; intro?: ReactNode };

/** Eyebrow plus a large heading, shared by every homepage section so rhythm stays consistent. */
export function SectionHeading({ id, eyebrow, children, intro }: Props) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
      <p className="eyebrow md:col-span-3 md:pt-3">{eyebrow}</p>
      <div className="md:col-span-9">
        <h2 id={id} className="display-section">
          {children}
        </h2>
        {intro && <p className="prose-measure mt-5 text-lg text-muted">{intro}</p>}
      </div>
    </div>
  );
}
