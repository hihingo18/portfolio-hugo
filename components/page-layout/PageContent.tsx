"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/sidebar/TopBar";
import MobileDrawer from "@/components/sidebar/MobileDrawer";
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
  const [showDrawer, setShowDrawer] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  const handleNavClick = useCallback((id: NavId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* Mobile top bar — visible below md */}
      <TopBar onMenuClick={() => setShowDrawer(true)} />

      {/* Mobile drawer */}
      <MobileDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />

      {/* Left sidebar — hidden on mobile, icon-only on tablet, full on desktop */}
      <div className="hidden md:block md:fixed md:top-0 md:left-0 md:w-16 lg:w-[22vw] lg:min-w-70 lg:max-w-90 md:h-screen md:z-30 bg-white dark:bg-[#0f0f0f] border-r border-[#f1f1f1] dark:border-[#2a2a2a]">
        <Sidebar activeSection={activeSection} onNavClick={handleNavClick} />
      </div>

      {/* Spacer matching sidebar width */}
      <div className="hidden md:block md:w-16 lg:w-[22vw] lg:min-w-70 lg:max-w-90 shrink-0" />

      {/* Main content — top padding on mobile for the TopBar */}
      <main className="flex-1 min-h-screen pt-14 md:pt-0">
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
