"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import HeroSection from "@/components/hero/HeroSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import Footer from "@/components/footer/Footer";
import ContactPanel from "@/components/contact/ContactPanel";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { NavId, SectionId } from "@/types";

const SECTION_IDS: SectionId[] = ["home", "projects", "skills", "trust", "about"];

export default function PageContent() {
  const [showContact, setShowContact] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  const handleNavClick = useCallback((id: NavId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* Left panel */}
      <div className="fixed top-0 left-0 w-[22vw] min-w-70 max-w-100 h-screen z-30 bg-white dark:bg-[#0f0f0f] border-r border-[#f1f1f1] dark:border-[#2a2a2a]">
        <Sidebar activeSection={activeSection} onNavClick={handleNavClick} />
      </div>

      {/* Spacer */}
      <div className="w-[22vw] min-w-70 max-w-100 shrink-0" />

      {/* Right panel */}
      <main className="flex-1 min-h-screen">
        <div id="home">
          <HeroSection onWorkWithMeClick={() => setShowContact(true)} />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="trust">
          <TestimonialsSection />
        </div>
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <Footer />
      </main>

      <ContactPanel isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
