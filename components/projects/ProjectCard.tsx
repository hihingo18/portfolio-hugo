"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { useColors } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { isDark } = useColors();
  const hasLink = project.link && project.link !== "#";
  const imageSrc = isDark ? project.imageDark : project.image;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={hasLink ? "button" : undefined}
      tabIndex={hasLink ? 0 : -1}
      onClick={() => hasLink && project.link && window.open(project.link, "_blank")}
      onKeyDown={(e) => {
        if (hasLink && (e.key === "Enter" || e.key === " ") && project.link) {
          e.preventDefault();
          window.open(project.link, "_blank");
        }
      }}
      className={cn(
        "flex flex-col h-full select-none",
        "transition-[box-shadow,transform] duration-350 ease-out",
        hasLink ? "cursor-pointer" : "cursor-default",
        hovered
          ? "shadow-[0_16px_48px_rgba(0,0,0,0.10)] -translate-y-1.5"
          : "shadow-[0_4px_16px_rgba(0,0,0,0.06)] translate-y-0"
      )}
      style={{ background: isDark ? "#1a1a1a" : project.cardBg }}
    >
      {/* Project image */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          className={cn(
            "object-contain transition-transform duration-500 ease-out",
            hovered ? "scale-95" : "scale-100"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Project info */}
      <div className="flex-1 flex flex-col px-6 pt-4 pb-5 mt-4">
        <p className="font-light text-2xl text-black dark:text-white leading-tight">
          {project.name}
        </p>

        <p className="font-light text-xs text-black dark:text-gray-300 opacity-70 mt-1">
          {project.type}
        </p>

        <p className="font-light text-xs text-black dark:text-gray-300 opacity-70 mt-1">
          {project.role}
        </p>

        <p className="font-light text-sm text-black dark:text-gray-300 opacity-70 mt-5">
          {project.stack}
        </p>

        <p className="font-light text-sm text-black dark:text-gray-300 opacity-70 mt-5">
          {project.description}
        </p>

        <div className="mt-auto pt-6">
          <span
            aria-disabled="true"
            className="inline-block px-4 py-2 text-sm font-light border border-black/40 dark:border-white/40 text-black/40 dark:text-white/40 cursor-not-allowed select-none"
          >
            View Case Study →
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCard);
