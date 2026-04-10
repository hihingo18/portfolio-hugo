"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import HeroSection from "@/components/hero/HeroSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import AboutSection from "@/components/about/AboutSection";
import Footer from "@/components/footer/Footer";
import ContactPanel from "@/components/contact/ContactPanel";

type SectionId = "home" | "projects" | "trust" | "about";

export default function HomePage() {
  const [showContact, setShowContact] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;

      const sections: { id: SectionId; ref: React.RefObject<HTMLDivElement | null> }[] = [
        { id: "home", ref: heroRef },
        { id: "projects", ref: projectsRef },
        { id: "trust", ref: trustRef },
        { id: "about", ref: aboutRef },
      ];

      let current: SectionId = "home";
      for (const section of sections) {
        if (section.ref.current && section.ref.current.offsetTop <= scrollY) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((id: string) => {
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: heroRef,
      projects: projectsRef,
      trust: trustRef,
      about: aboutRef,
    };
    refMap[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left panel — fixed 400px */}
      <div className="fixed top-0 left-0 w-[400px] h-screen z-30 bg-white border-r border-[#f1f1f1]">
        <Sidebar
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />
      </div>

      {/* Spacer — keeps document flow so right panel doesn't slide under sidebar */}
      <div className="w-[400px] flex-shrink-0" />

      {/* Right panel — 1520px scrollable content */}
      <main className="flex-1 min-h-screen">
        {/* Hero section */}
        <div ref={heroRef}>
          <HeroSection
            onWorkWithMeClick={() => setShowContact(true)}
            projectsRef={projectsRef}
          />
        </div>

        {/* Selected Projects */}
        <ProjectsSection ref={projectsRef} />

        {/* They trusted me */}
        <div ref={trustRef}>
          <TestimonialsSection />
        </div>

        {/* About me */}
        <div ref={aboutRef}>
          <AboutSection />
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Contact slide-in panel */}
      <ContactPanel
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />
    </div>
  );
}
