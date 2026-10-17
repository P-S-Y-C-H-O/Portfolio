/*
 * About. Kept short and grounded in the resume: who, where, and what the work
 * leans toward. Nothing here claims employment, awards or expertise.
 */
import { interests, person } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="container-x py-24 md:py-36">
      <SectionHeading id="about-heading" eyebrow="About">
        Software, systems and a taste for hard problems
      </SectionHeading>

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7 md:col-start-4">
          <p className="prose-measure font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            I&apos;m {person.name}, a Computer Science and Engineering student at KIIT with an interest in building
            software products, developing backend systems, exploring AI-powered applications, and solving algorithmic
            problems.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-4">
          <h3 className="eyebrow border-b border-line pb-3">What draws me in</h3>
          <ol>
            {interests.map((item, i) => (
              <li key={item} className="flex gap-5 border-b border-line py-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
