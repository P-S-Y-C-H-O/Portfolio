/*
 * The project slider. It is a native horizontal scroller with scroll-snap, so
 * touch swipe, trackpad and mouse-wheel scrolling all work for free and stay
 * smooth. This component adds what scrolling alone cannot: previous/next and
 * direct selection, arrow keys, an active index kept in sync with the scroll
 * position, and screen-reader announcements.
 *
 * It renders whatever list it is given and knows nothing about specific
 * projects, so adding, removing or reordering projects in the data needs no
 * change here. One project hides the controls; none renders nothing.
 *
 * Rejected: a scroll-jacked, pinned section. It traps visitors in a long
 * animation and breaks on touch. Native scrolling cannot do that.
 */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/data/schema";
import { clampIndex, indexFromScroll } from "@/lib/slider";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectSlide } from "./ProjectSlide";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = projects.length;

  /** Distance between the left edges of two neighbouring slides (width plus gap). */
  const slideStep = useCallback((): number => {
    const slides = trackRef.current?.children;
    const first = slides?.[0] as HTMLElement | undefined;
    const second = slides?.[1] as HTMLElement | undefined;
    if (first && second) return second.offsetLeft - first.offsetLeft;
    return first?.offsetWidth ?? 0;
  }, []);

  // Keep `index` in sync with wherever the visitor has scrolled or swiped.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // setIndex bails out when the value is unchanged, so no throttling is needed.
    const onScroll = () => setIndex(indexFromScroll(track.scrollLeft, slideStep(), count));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count, slideStep]);

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = clampIndex(target, count);
      track.scrollTo({ left: next * slideStep(), behavior: reduceMotion ? "auto" : "smooth" });
      setIndex(next);
    },
    [count, reduceMotion, slideStep],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight" && index < count - 1) {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  if (count === 0) return null;
  const active = projects[clampIndex(index, count)];

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Selected projects" onKeyDown={onKeyDown}>
      <ul
        ref={trackRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:gap-12 sm:px-0"
      >
        {projects.map((project, i) => (
          <li
            key={project.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${project.title}`}
            // Off-screen slides are inert so Tab never lands on a hidden link.
            inert={i !== index}
            className={`w-[88%] shrink-0 snap-start transition-opacity duration-500 sm:w-full ${
              i === index ? "opacity-100" : "opacity-50 sm:opacity-100"
            }`}
          >
            {/* Covers load eagerly: neighbouring slides are one swipe away, so a lazy image would show an empty frame. */}
            <ProjectSlide project={project} position={i} priority />
          </li>
        ))}
      </ul>

      {count > 1 && <ProjectNavigation projects={projects} index={index} onSelect={goTo} />}

      <p className="sr-only" aria-live="polite">
        {active ? `Project ${index + 1} of ${count}: ${active.title}` : ""}
      </p>
    </div>
  );
}
