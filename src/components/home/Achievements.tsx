/*
 * Competitive programming scoreboard: the three figures on the resume and
 * nothing more. No streaks, ranks or per-platform counts are shown because
 * none are documented. Only profiles with a verified URL are linked.
 */
import { achievements, profiles } from "@/data/profile";
import { ExternalLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementMetric } from "./AchievementMetric";

export function Achievements() {
  const { problemsSolved, codeforces, codechef } = achievements;
  const linked = profiles.filter((p) => ["leetcode", "codeforces", "codechef"].includes(p.id) && p.url);

  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="border-t border-line bg-surface">
      <div className="container-x py-24 md:py-36">
        <SectionHeading id="achievements-heading" eyebrow="Competitive programming">
          Practice, measured in problems
        </SectionHeading>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <AchievementMetric
              large
              value={problemsSolved.value}
              suffix={problemsSolved.suffix}
              label={problemsSolved.label}
              detail={problemsSolved.detail}
            />
          </Reveal>
          <div className="grid gap-12 md:col-span-5">
            <Reveal delay={0.1}>
              <AchievementMetric value={codeforces.value} label={codeforces.label} detail={codeforces.detail} />
            </Reveal>
            <Reveal delay={0.2}>
              <AchievementMetric value={codechef.value} label={codechef.label} detail={codechef.detail} />
            </Reveal>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 text-sm">
          {linked.map((p) => (
            <ExternalLink key={p.id} href={p.url!} className="group">
              {p.label} profile
            </ExternalLink>
          ))}
        </div>
      </div>
    </section>
  );
}
