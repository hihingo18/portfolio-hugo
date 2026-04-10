"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { StarIcon } from "@/components/icons/UIIcons";
import type { Project } from "@/types";

const PROJECTS: Project[] = [
  {
    id: "bykahomes",
    name: ".Bykahomes",
    type: "Web design / Presentation",
    image: "/images/bykahomes.png",
    link: "#",
    cardBg:
      "linear-gradient(rgb(255,255,255) 0%, rgba(168,224,224,0.55) 33.333%, rgba(255,236,139,0.494) 66.667%, rgb(255,255,255) 100%), linear-gradient(90deg, rgb(245,255,248) 0%, rgb(245,255,248) 100%)",
  },
  {
    id: "noje",
    name: ".Noje",
    type: "Web design / Presentation",
    image: "/images/noje.png",
    link: "#",
    cardBg:
      "linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 0%, #ffe6c5 50%, rgb(255,255,255) 100%)",
  },
  {
    id: "champagnes",
    name: ".Champagnes Investissement",
    type: "Web design / Presentation",
    image: "/images/champagnes.png",
    link: "#",
    cardBg:
      "linear-gradient(rgb(255,255,255) 0%, #fbffde 50%, rgb(255,255,255) 100%)",
  },
];

const ProjectsSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section id="projects" ref={ref} className="w-full bg-white pt-0 pb-0">
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
            Selected projects
          </h2>
          <span className="ml-1">
            <StarIcon />
          </span>
        </motion.div>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-3">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.13 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;
