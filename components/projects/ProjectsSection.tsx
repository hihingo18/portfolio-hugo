"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { StarIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";
import { REVEAL_DURATION, REVEAL_EASE, REVEAL_STAGGER } from "@/lib/motion";
import type { Project } from "@/types";

function ProjectsSection() {
  const { dict, locale } = useLocale();
  const colors = useColors();
  const p = dict.projects;

  const projects: Project[] = useMemo(
    () => Object.entries(p.items).map(([id, item]) => ({ id, ...item, link: `/${locale}/projects/${id}` })),
    [locale, p.items]
  );

  return (
    <section
      id="projects"
      className="w-full pt-0 pb-0 relative"
      style={{ backgroundColor: colors.bgBase }}
    >
      {/* Section heading */}
      <div className="px-20 pt-2.5 pb-0 bg-white dark:bg-[#0f0f0f]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE }}
          className="flex items-center gap-2 py-10"
        >
          <h2 className="font-bold text-[42px] text-black dark:text-white tracking-[-0.01em]">
            {p.sectionTitle}
          </h2>
          <span className="ml-1 text-black dark:text-white">
            <StarIcon />
          </span>
        </motion.div>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: REVEAL_DURATION, delay: i * REVEAL_STAGGER, ease: REVEAL_EASE }}
            className="h-full"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
