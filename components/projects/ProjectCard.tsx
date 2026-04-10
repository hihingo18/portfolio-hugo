"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/types";

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <g clipPath="url(#ext-clip)">
      <path
        d="M14 9.5V14.5C14 14.7761 13.7761 15 13.5 15H3.5C3.22386 15 3 14.7761 3 14.5V4.5C3 4.22386 3.22386 4 3.5 4H8.5M11 3H15M15 3V7M15 3L8 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="ext-clip">
        <rect fill="white" height="18" width="18" />
      </clipPath>
    </defs>
  </svg>
);

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-pointer select-none"
      style={{
        background: project.cardBg,
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.10)"
          : "0 4px 16px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        height: "450px",
        borderRadius: "0px",
      }}
    >
      {/* Project image — fills card */}
      <div className="w-full h-[300px] overflow-hidden relative">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-top"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
          sizes="(max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Project info overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-[25px] pt-4 pb-[20px]">
        {/* External link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-2 text-black hover:text-[#020073] transition-colors duration-200 w-fit"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.name}`}
          >
            <ExternalLinkIcon />
          </a>
        )}
        {/* Link label */}
        {project.link && (
          <p className="font-light text-[16px] text-black mb-1 leading-[1.2]">
            Link to the platform
          </p>
        )}

        {/* Project name */}
        <p className="font-light text-[25px] text-black leading-tight">
          {project.name}
        </p>

        {/* Type */}
        <p className="font-light text-[16px] text-black opacity-70 mt-1">
          {project.type}
        </p>
      </div>
    </div>
  );
}
