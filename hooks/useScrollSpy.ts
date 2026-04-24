import { useEffect, useState } from "react";
import type { SectionId } from "@/types";

export function useScrollSpy(sectionIds: SectionId[]): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const mostVisible = visible.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );

        const id = mostVisible.target.id as SectionId;
        if (sectionIds.includes(id)) setActiveSection(id);
      },
      { threshold: 0, rootMargin: "-120px 0px -70% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
