"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { StarIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import type { Project } from "@/types";

export default function ProjectsSection() {
  const { dict } = useLocale();
  const p = dict.projects;

  const projects: Project[] = useMemo(
    () => Object.entries(p.items).map(([id, item]) => ({ id, ...item })),
    [p.items]
  );

  return (
    <section
      id="projects"
      className="w-full h-screen bg-white pt-0 pb-0 relative z-10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Section heading */}
      <div className="px-20 pt-2.5 pb-0 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 py-10"
        >
          <h2 className="font-bold text-[42px] text-black tracking-[-0.01em]">
            {p.sectionTitle}
          </h2>
          <span className="ml-1">
            <StarIcon />
          </span>
        </motion.div>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.13 }}
            className="h-full"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
