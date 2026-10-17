/*
 * Contact and resume. Email is a plain mailto link on purpose: there is no
 * backend here, and a form that pretends to send would be worse than a link
 * that works. No phone number is published.
 */
import { Download, Mail } from "lucide-react";
import { person } from "@/data/profile";
import { ExternalLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line bg-surface">
      <div className="container-x py-24 md:py-40">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="display-hero mt-6 max-w-[16ch]">
            Have an interesting problem to solve?
          </h2>
          <p className="mt-8 max-w-[52ch] text-lg text-muted md:text-xl">
            I&apos;m interested in building useful software, exploring challenging technical problems, and connecting
            with people who care about thoughtful engineering.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ExternalLink href={`mailto:${person.email}`} variant="primary">
              <Mail size={16} aria-hidden="true" /> {person.email}
            </ExternalLink>
            <ExternalLink href={person.resumePath} variant="outline">
              View resume
            </ExternalLink>
            <ExternalLink href={person.resumePath} download variant="outline">
              <Download size={16} aria-hidden="true" /> Download PDF
            </ExternalLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
