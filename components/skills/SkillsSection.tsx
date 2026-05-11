"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";

const accentColor = "#5ba4cf";

function FrontEndIcon({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 72 72" fill="none" aria-hidden="true">
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
    <svg width="40" height="40" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <polyline points="12,26 26,36 12,46" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="32" y1="46" x2="60" y2="46" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="8" y1="58" x2="64" y2="58" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function InfrastructureIcon({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <rect x="10" y="18" width="52" height="12" rx="3" stroke={color} strokeWidth="3" fill="none" />
      <rect x="10" y="36" width="52" height="12" rx="3" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="55" cy="24" r="2.5" fill={color} />
      <circle cx="55" cy="42" r="2.5" fill={color} />
      <line x1="18" y1="24" x2="44" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="42" x2="44" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="30" x2="24" y2="36" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="30" x2="36" y2="36" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="30" x2="48" y2="36" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function LeadershipIcon({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="14" r="7" stroke={color} strokeWidth="3" fill="none" />
      <line x1="36" y1="21" x2="36" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="30" x2="54" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="30" x2="18" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="30" x2="36" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="54" y1="30" x2="54" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="44" r="6" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="36" cy="44" r="6" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="54" cy="44" r="6" stroke={color} strokeWidth="3" fill="none" />
    </svg>
  );
}

const ICONS = {
  frontend: FrontEndIcon,
  backend: BackEndIcon,
  infrastructure: InfrastructureIcon,
  leadership: LeadershipIcon,
} as const;

export default function SkillsSection() {
  const [hovered, setHovered] = useState(false);
  const { dict } = useLocale();
  const colors = useColors();
  const s = dict.skills;

  const fadeColor = colors.isDark ? "#0f0f0f" : "#ffffff";
  const borderColor = colors.borderStrong;
  const leadershipBg = colors.isDark ? "rgba(91,164,207,0.07)" : "rgba(91,164,207,0.05)";

  const columns = [
    { key: "frontend" as const, isLeadership: false, ...s.columns.frontend },
    { key: "backend" as const, isLeadership: false, ...s.columns.backend },
    { key: "infrastructure" as const, isLeadership: false, ...s.columns.infrastructure },
    { key: "leadership" as const, isLeadership: true, ...s.columns.leadership },
  ];

  const iconColor = colors.isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)";

  const [titleFirst, ...titleRest] = s.sectionTitle.split(" ");

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
        className="flex flex-col items-center gap-5 mb-16"
      >
        <div className="flex items-center gap-3">
          <span className="block h-px w-16 opacity-40" style={{ backgroundColor: accentColor }} />
          <span className="block w-1.5 h-1.5 rounded-full opacity-60" style={{ backgroundColor: accentColor }} />
          <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>

        <h2 className="text-4xl md:text-5xl tracking-tight leading-none">
          <span className="font-extralight" style={{ color: colors.textMuted }}>{titleFirst} </span>
          <span className="font-semibold" style={{ color: colors.textBase }}>{titleRest.join(" ")}</span>
        </h2>

        <div className="flex items-center gap-3">
          <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="block w-1.5 h-1.5 rounded-full opacity-60" style={{ backgroundColor: accentColor }} />
          <span className="block h-px w-16 opacity-40" style={{ backgroundColor: accentColor }} />
        </div>

        <p className="text-sm md:text-base text-center max-w-xl mt-1" style={{ color: colors.textMuted }}>
          {s.subtitle}
        </p>
      </motion.div>

      {/* 4-column capability grid */}
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {columns.map((col, colIdx) => {
            const Icon = ICONS[col.key];
            const colSep = "rgba(150,150,150,0.12)";
            const itemSep = "rgba(150,150,150,0.08)";
            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: colIdx * 0.1 }}
                className="flex flex-col px-6 py-8"
                style={{
                  backgroundColor: col.isLeadership ? leadershipBg : "transparent",
                  borderRight: colIdx < 3 ? `1px solid ${colSep}` : undefined,
                }}
              >
                {/* Icon */}
                <Icon color={col.isLeadership ? accentColor : iconColor} />

                {/* Title */}
                <div className="mt-6 mb-1">
                  <h3
                    className="font-semibold text-sm leading-tight"
                    style={{ color: col.isLeadership ? accentColor : colors.textBase }}
                  >
                    {col.title}
                  </h3>
                  {col.isLeadership && (
                    <span
                      className="block w-6 h-0.5 mt-2 rounded-full"
                      style={{ backgroundColor: accentColor, opacity: 0.6 }}
                    />
                  )}
                </div>

                {/* Statement */}
                <p className="text-xs leading-relaxed mt-2 mb-6" style={{ color: colors.textMuted }}>
                  {col.statement}
                </p>

                {/* Plain text skill list */}
                <ul>
                  {col.items.map((skill, skillIdx) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: colIdx * 0.06 + skillIdx * 0.05 }}
                      className="py-2.5 text-sm"
                      style={{
                        borderBottom: `1px solid ${itemSep}`,
                        color: col.isLeadership
                          ? `rgba(91,164,207,0.8)`
                          : colors.textMuted,
                      }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Operational Themes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-8 flex flex-col sm:flex-row gap-4 sm:gap-10"
          style={{ borderTop: "1px solid rgba(150,150,150,0.12)" }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase shrink-0 pt-0.5"
            style={{ color: accentColor, opacity: 0.8 }}
          >
            {s.themes.label}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {s.themes.items.map((theme, i) => (
              <motion.span
                key={theme}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="text-sm"
                style={{ color: colors.textMuted }}
              >
                {theme}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* About Me CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-14"
      >
        <button
          type="button"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
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
        </button>
      </motion.div>
    </section>
  );
}
