"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLinkIcon } from "@/components/icons/UIIcons";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col h-full cursor-pointer select-none"
      style={{
        background: project.cardBg,
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.10)"
          : "0 4px 16px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        borderRadius: "0px",
      }}
    >
      {/* Project image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-contain"
          style={{
            transform: hovered ? "scale(0.95)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Project info */}
      <div className="flex-1 px-6 pt-4 pb-5 mt-4">
        <p className="font-light text-2xl text-black leading-tight">
          {project.name}
        </p>

        <p className="font-light text-xs text-black opacity-70 mt-1">
          {project.type}
        </p>

        <p className="font-light text-xs text-black opacity-70 mt-1">
          {project.role}
        </p>

        <p className="font-light text-sm text-black opacity-70 mt-5">
          {project.stack}
        </p>

        <p className="font-light text-sm text-black opacity-70 mt-5">
          {project.description}
        </p>
      </div>
    </div>
  );
}
