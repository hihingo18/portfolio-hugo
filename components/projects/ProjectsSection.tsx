"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { StarIcon } from "@/components/icons/UIIcons";
import type { Project } from "@/types";

const PROJECTS: Project[] = [
  {
    id: "centerbase",
    name: ".Centerbase",
    type: "Law Firm Management Platform",
    image: "/images/centerbase.jpg",
    link: "#",
    cardBg:
      "linear-gradient(rgb(255,255,255) 0%, rgba(168,224,224,0.55) 33.333%, rgba(255,236,139,0.494) 66.667%, rgb(255,255,255) 100%), linear-gradient(90deg, rgb(245,255,248) 0%, rgb(245,255,248) 100%)",
    role: "Technical Leader, Full-stack Developer",
    stack: ".NET 9 microservices, Next.js, SQL Server, Redis, Azure, GraphQL & Kafka.",
    description: "Centerbase is a web-based law firm management system for handling clients, matters, billing, payments, accounting, and reporting. It streamlines legal operations with a centralized platform, improving workflow efficiency, financial tracking, and data-driven decision-making.",
  },
  {
    id: "toshiba",
    name: ".Toshiba",
    type: "Enterprise CMS-based Web Platform",
    image: "/images/toshiba.jpg",
    link: "#",
    cardBg:
      "linear-gradient(rgb(255,255,255) 0%, #fbffde 50%, rgb(255,255,255) 100%)",
    role: "Technical Project Management",
    stack: "Sitecore XP/XC 10, Oracle, SharePoint, ERP API, CI/CD, Tableau.",
    description: "Toshiba New Portal focuses on migrating Sitecore 9.x to 10.x while preserving existing business functionalities and implementing a modernized portal. The project establishes a scalable foundation for future Sitecore Commerce and B2B portal development, enhancing integration, reporting, and overall system performance.",
  },
  {
    id: "aspire",
    name: ".Aspire",
    type: "Platform / SaaS Platform",
    image: "/images/aspire.jpg",
    link: "#",
    cardBg:
      "linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 0%, #ffe6c5 50%, rgb(255,255,255) 100%)",
    role: "Technical Leader",
    stack: "ASP.NET MVC 6, EF6, Azure, Redis, JavaScript, Adyen, OAG/Mulesoft APIs, Google Maps & Analytics.",
    description: "Aspire Lifestyles is a scalable SaaS platform built on a reusable codebase, enabling rapid development and expansion of new business modules and services. It provides a global solution for booking two-way airport transfers with fixed pricing and professional drivers, operating across 16+ countries. Additionally, a dedicated portal was developed to manage accounting operations, including invoicing, payments, and customer credit, improving financial control and operational efficiency.",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
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
});

ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;
