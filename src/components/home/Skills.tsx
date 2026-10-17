/*
 * Technical skills as a structured index, one ruled row per category. Items
 * come straight from the resume. There are deliberately no proficiency bars,
 * ratings or years: the resume states none, so the page does not either.
 */
import { skillGroups } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-line">
      <div className="container-x py-24 md:py-36">
        <SectionHeading id="skills-heading" eyebrow="Technical skills" intro="The languages, frameworks and tools I work with, grouped by what they are used for.">
          Toolkit
        </SectionHeading>

        <dl className="border-t border-line">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04} y={16} className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8 md:py-7">
              <dt className="eyebrow md:col-span-3 md:pt-2">{group.title}</dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-x-8 gap-y-2 font-display text-xl font-medium tracking-tight md:text-2xl">
                  {group.items.map((item) => (
                    <li key={item} className="transition-colors hover:text-accent">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
