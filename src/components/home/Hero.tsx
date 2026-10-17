/*
 * Hero. Asymmetric: a large headline and introduction on the left, a compact
 * "index" of the work and interests on the right. There is no portrait on
 * purpose (none supplied, and none should be invented): typography carries
 * the identity. The index links to real routes, so it is navigation, not
 * decoration. Entrance motion is a short stagger and is skipped under
 * prefers-reduced-motion.
 */
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ButtonLink } from "@/components/ui/Button";
import { interests, person } from "@/data/profile";
import { projects } from "@/data/projects";
import { formatIndex } from "@/lib/projects";

const HEADLINE = "I build thoughtful software, from intelligent applications to scalable systems.";
const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : "hidden";

  return (
    <section className="container-x relative pb-20 pt-36 md:pb-28 md:pt-44" aria-labelledby="hero-heading">
      <motion.div initial={initial} animate="show" variants={container} className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <motion.p variants={rise} className="eyebrow">
            Computer Science &amp; Engineering · Developer and competitive programmer
          </motion.p>

          {/* Words slide up from behind a mask. The h1 carries the full sentence for assistive tech. */}
          <motion.h1
            id="hero-heading"
            variants={container}
            className="display-hero mt-7"
            aria-label={HEADLINE}
          >
            {HEADLINE.split(" ").map((w, i) => (
              <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span variants={word} className="inline-block">
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p variants={rise} className="mt-8 max-w-[52ch] text-lg text-muted md:text-xl">
            I&apos;m <span className="text-fg">{person.name}</span>, a Computer Science and Engineering student at KIIT
            who enjoys building full-stack products, exploring AI-powered applications, and solving challenging
            algorithmic problems.
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink to="/#work">
              Explore my work <ArrowDownRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
            </ButtonLink>
            <ButtonLink to="/#contact" variant="outline">
              Get in touch
            </ButtonLink>
            <a
              href={person.resumePath}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 px-3 py-3 text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              Resume
              <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.aside variants={rise} aria-label="Work index and interests" className="lg:col-span-4 lg:pt-3">
          <p className="eyebrow border-b border-line pb-3">Index</p>
          <ol>
            {projects.map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  to={`/projects/${p.slug}`}
                  className="group flex items-baseline gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span className="font-mono text-xs text-muted">{formatIndex(i)}</span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-semibold tracking-tight">{p.title}</span>
                    <span className="block text-sm text-muted">{p.category}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ol>

          <p className="eyebrow mt-8">Interested in</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {interests.map((item) => (
              <li key={item} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {item}
              </li>
            ))}
          </ul>
        </motion.aside>
      </motion.div>
    </section>
  );
}
