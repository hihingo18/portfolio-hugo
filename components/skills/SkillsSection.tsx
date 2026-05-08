"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";

function FrontEndIcon({ color }: { color: string }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <rect x="8" y="12" width="56" height="36" rx="3" stroke={color} strokeWidth="3" fill="none" />
      <line x1="8" y1="42" x2="64" y2="42" stroke={color} strokeWidth="3" />
      <rect x="26" y="48" width="20" height="5" rx="1" stroke={color} strokeWidth="2.5" fill="none" />
      <line x1="18" y1="56" x2="54" y2="56" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="25,32 31,26 25,20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="35" y1="32" x2="47" y2="32" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BackEndIcon({ color }: { color: string }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <polyline points="12,26 26,36 12,46" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="32" y1="46" x2="60" y2="46" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="8" y1="58" x2="64" y2="58" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ToolsIcon({ color }: { color: string }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <line x1="18" y1="54" x2="42" y2="18" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <circle cx="16" cy="56" r="7" stroke={color} strokeWidth="3" fill="none" />
      <line x1="54" y1="54" x2="30" y2="18" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <circle cx="56" cy="56" r="7" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="36" cy="14" r="6" stroke={color} strokeWidth="3" fill="none" />
    </svg>
  );
}

const ICONS = {
  frontend: FrontEndIcon,
  backend: BackEndIcon,
  tools: ToolsIcon,
} as const;

export default function SkillsSection() {
  const [hovered, setHovered] = useState(false);
  const { dict } = useLocale();
  const colors = useColors();
  const s = dict.skills;

  const accentColor = "#5ba4cf";
  const dividerColor = colors.borderStrong;

  const columns = [
    { key: "frontend" as const, ...s.columns.frontend },
    { key: "backend" as const, ...s.columns.backend },
    { key: "tools" as const, ...s.columns.tools },
  ];

  const fadeColor = colors.isDark ? "#0f0f0f" : "#ffffff";

  return (
    <section
      id="skills"
      className="relative w-full px-6 md:px-20 py-20 overflow-hidden"
      style={{ backgroundColor: colors.bgBase }}
    >
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, ${fadeColor}, transparent)` }}
      />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 mb-14"
      >
        {/* Title with decorative lines */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="block h-px w-12" style={{ backgroundColor: accentColor }} />
            <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-light tracking-wide"
            style={{ color: colors.textBase }}
          >
            {s.sectionTitle}
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="block h-px w-12" style={{ backgroundColor: accentColor }} />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-center max-w-xl" style={{ color: colors.textMuted }}>
          {s.subtitle}
        </p>
      </motion.div>

      {/* 3-column skill grid */}
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-3">
          {columns.map((col, colIdx) => {
            const Icon = ICONS[col.key];
            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: colIdx * 0.12 }}
                className="flex flex-col items-center py-5 px-6"
                style={{
                  borderLeft: colIdx > 0 ? `1px solid ${dividerColor}` : undefined,
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon color={accentColor} />
                </div>

                {/* Column title */}
                <h3
                  className="text-xl font-light mb-6 tracking-wide"
                  style={{ color: colors.textBase }}
                >
                  {col.title}
                </h3>

                {/* Skill list */}
                <ul className="flex flex-col items-center gap-3 w-full">
                  {col.items.map((skill, skillIdx) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: colIdx * 0.1 + skillIdx * 0.06 }}
                      className="text-sm text-center"
                      style={{ color: colors.textMuted }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* About Me CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-14"
      >
        <a
          href="#about"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <span
            className="font-normal text-base transition-colors duration-300"
            style={{ color: hovered ? colors.brandPrimary : colors.textBase }}
          >
            {s.aboutMe}
          </span>
          <motion.div
            animate={{ y: hovered ? 5 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center size-9.5 rounded-full border transition-all duration-300"
            style={{
              backgroundColor: hovered ? colors.brandPrimary : "transparent",
              borderColor: hovered ? colors.brandPrimary : colors.textBase,
              color: hovered ? colors.white : colors.textBase,
            }}
          >
            <ArrowDownIcon />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
