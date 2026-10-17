/*
 * Education and certification as a compact ruled block rather than cards.
 * The certificate link renders only when a URL is configured in
 * src/data/profile.ts.
 */
import { certification, education } from "@/data/profile";
import { ExternalLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="border-t border-line">
      <div className="container-x py-24 md:py-36">
        <SectionHeading id="education-heading" eyebrow="Education &amp; certification">
          Where I study
        </SectionHeading>

        <Reveal className="grid gap-6 border-t border-line py-8 md:grid-cols-12 md:gap-8">
          <p className="font-mono text-sm text-muted md:col-span-3">{education.years}</p>
          <div className="md:col-span-9">
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{education.school}</h3>
            <p className="mt-2 text-lg text-muted">{education.degree}</p>
            <p className="mt-1 text-muted">
              {education.location} · CGPA <span className="text-fg">{education.cgpa}</span>
            </p>
            <h4 className="eyebrow mt-8">Relevant coursework</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <li key={c} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="grid gap-6 border-y border-line py-8 md:grid-cols-12 md:gap-8">
          <p className="font-mono text-sm text-muted md:col-span-3">{certification.duration}</p>
          <div className="md:col-span-9">
            <h3 className="font-display text-2xl font-semibold tracking-tight">{certification.title}</h3>
            <p className="prose-measure mt-2 text-muted">{certification.summary}</p>
            {certification.url && (
              <ExternalLink href={certification.url} className="group mt-4 text-sm">
                View certificate
              </ExternalLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
