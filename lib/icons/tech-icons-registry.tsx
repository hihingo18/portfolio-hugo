import React from "react";

interface TechIconRegistry {
  id: string;
  name: string;
  icon: React.ReactNode;
}

/**
 * Backend & Infrastructure Icons
 */
const BACKEND_ICONS: TechIconRegistry[] = [
  {
    id: "dotnet",
    name: ".NET",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#512BD4" />
        <text x="5" y="30" fontSize="11" fill="white" fontWeight="700" fontFamily="Arial">
          .NET
        </text>
      </svg>
    ),
  },
  {
    id: "csharp",
    name: "C#",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#239120" />
        <text x="12" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">
          C#
        </text>
      </svg>
    ),
  },
  {
    id: "sql",
    name: "SQL",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#CC2927" />
        <text x="5" y="32" fontSize="12" fill="white" fontWeight="700" fontFamily="Arial">
          SQL
        </text>
      </svg>
    ),
  },
  {
    id: "kafka",
    name: "Kafka",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#231F20" />
        <text x="4" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">
          Kafka
        </text>
      </svg>
    ),
  },
  {
    id: "redis",
    name: "Redis",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#DC382D" />
        <text x="5" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">
          Redis
        </text>
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#2496ED" />
        <text x="3" y="32" fontSize="10" fill="white" fontWeight="600" fontFamily="Arial">
          Docker
        </text>
      </svg>
    ),
  },
  {
    id: "azure",
    name: "Azure",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#0089D6" />
        <text x="5" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">
          Azure
        </text>
      </svg>
    ),
  },
];

/**
 * Frontend Icons
 */
const FRONTEND_ICONS: TechIconRegistry[] = [
  {
    id: "react",
    name: "React",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#20232a" />
        <ellipse cx="25" cy="25" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1.8" />
        <ellipse
          cx="25"
          cy="25"
          rx="11"
          ry="4.5"
          stroke="#61DAFB"
          strokeWidth="1.8"
          transform="rotate(60 25 25)"
        />
        <ellipse
          cx="25"
          cy="25"
          rx="11"
          ry="4.5"
          stroke="#61DAFB"
          strokeWidth="1.8"
          transform="rotate(120 25 25)"
        />
        <circle cx="25" cy="25" r="2.5" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    id: "next",
    name: "Next.js",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#000" />
        <text x="3" y="31" fontSize="10" fill="white" fontWeight="700" fontFamily="Arial">
          Next.js
        </text>
      </svg>
    ),
  },
  {
    id: "vue",
    name: "Vue",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#42B883" />
        <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">
          V
        </text>
      </svg>
    ),
  },
  {
    id: "angular",
    name: "Angular",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#DD0031" />
        <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">
          A
        </text>
      </svg>
    ),
  },
  {
    id: "svelte",
    name: "Svelte",
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <rect width="50" height="50" rx="6" fill="#FF3E00" />
        <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">
          S
        </text>
      </svg>
    ),
  },
];

/**
 * Icon registry by category for easy lookup and iteration
 */
export const TECH_ICONS_REGISTRY = {
  backend: BACKEND_ICONS,
  frontend: FRONTEND_ICONS,
} as const;

