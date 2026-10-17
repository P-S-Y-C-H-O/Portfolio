/*
 * Scroll-triggered entrance: fades and lifts its children once when they first
 * enter the viewport. Under prefers-reduced-motion it renders plain, so
 * nothing is hidden or delayed.
 */
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = { children: ReactNode; delay?: number; className?: string; y?: number };

export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
