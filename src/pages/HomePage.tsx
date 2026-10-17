/* The single-page portfolio, sections in reading order. */
import { PageMeta } from "@/components/layout/PageMeta";
import { Hero } from "@/components/home/Hero";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { Skills } from "@/components/home/Skills";
import { Achievements } from "@/components/home/Achievements";
import { About } from "@/components/home/About";
import { Education } from "@/components/home/Education";
import { DeveloperProfiles } from "@/components/home/DeveloperProfiles";
import { Contact } from "@/components/home/Contact";

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Abhishek Srivastava | Developer Portfolio"
        description="Abhishek Srivastava is a Computer Science and Engineering student at KIIT building full-stack products, AI-powered applications and backend systems."
      />
      <Hero />
      <ProjectSection />
      <Skills />
      <Achievements />
      <About />
      <Education />
      <DeveloperProfiles />
      <Contact />
    </>
  );
}
