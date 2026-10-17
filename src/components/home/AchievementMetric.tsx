/*
 * A scoreboard figure. Numeric values count up once when scrolled into view;
 * under reduced motion they show the final value immediately. Figures are
 * static, resume-backed numbers, never live data, so nothing here fetches.
 */
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Props = {
  label: string;
  detail: string;
  /** A number counts up; a string (such as "3-Star") is shown as is. */
  value: number | string;
  suffix?: string;
  large?: boolean;
};

export function AchievementMetric({ label, detail, value, suffix = "", large = false }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const numeric = typeof value === "number";
  const [shown, setShown] = useState(numeric && !reduce ? 0 : numeric ? value : 0);

  useEffect(() => {
    if (!numeric || reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, numeric, reduce, value]);

  const text = numeric ? `${shown.toLocaleString("en-US")}${suffix}` : value;

  return (
    <div className="flex flex-col justify-between gap-6 border-t border-line pt-6">
      <p className="eyebrow">{label}</p>
      <div>
        <p
          ref={ref}
          className={`font-display font-semibold leading-none tracking-tighter tabular-nums ${
            large ? "text-[clamp(4.5rem,13vw,10rem)]" : "text-[clamp(2.75rem,6vw,4.5rem)]"
          }`}
          aria-label={numeric ? `${value.toLocaleString("en-US")}${suffix}` : undefined}
        >
          <span aria-hidden={numeric ? "true" : undefined}>{text}</span>
        </p>
        <p className="mt-3 max-w-[32ch] text-muted">{detail}</p>
      </div>
    </div>
  );
}
