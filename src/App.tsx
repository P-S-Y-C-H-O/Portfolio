/*
 * App shell and routes. Three routes only: the single-page portfolio, one
 * case study per project slug, and a catch-all not-found. An unknown slug is
 * handled inside CaseStudyPage (it renders the not-found view), never by
 * falling back to another project.
 */
import { Route, Routes, useLocation } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { HomePage } from "@/pages/HomePage";
import { CaseStudyPage } from "@/pages/CaseStudyPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      {/* Keyed by path so each route fades in; the transition is skipped under reduced motion. */}
      <motion.main
        id="main"
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
      <SiteFooter />
    </>
  );
}
