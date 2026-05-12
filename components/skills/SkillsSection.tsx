"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";

const accentColor = "#5ba4cf";

function FrontEndIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 72 72" fill="none" aria-hidden="true">
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
    <svg width="36" height="36" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <polyline points="12,26 26,36 12,46" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="32" y1="46" x2="60" y2="46" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="8" y1="58" x2="64" y2="58" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function OperationalIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="30" cy="30" r="18" stroke={color} strokeWidth="3" />
      <line x1="43" y1="43" x2="62" y2="62" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="23" x2="30" y2="37" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function DomainIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <rect x="14" y="10" width="44" height="52" rx="2" stroke={color} strokeWidth="3" />
      <line x1="14" y1="26" x2="58" y2="26" stroke={color} strokeWidth="2.5" />
      <line x1="14" y1="42" x2="58" y2="42" stroke={color} strokeWidth="2.5" />
      <rect x="28" y="46" width="16" height="16" rx="1" stroke={color} strokeWidth="2.5" />
      <circle cx="24" cy="18" r="3" fill={color} />
      <circle cx="36" cy="18" r="3" fill={color} />
      <circle cx="48" cy="18" r="3" fill={color} />
      <circle cx="24" cy="34" r="3" fill={color} />
      <circle cx="48" cy="34" r="3" fill={color} />
    </svg>
  );
}

const ICONS = {
  frontend: FrontEndIcon,
  backend: BackEndIcon,
  operational: OperationalIcon,
  domain: DomainIcon,
} as const;

export default function SkillsSection() {
  const { dict } = useLocale();
  const colors = useColors();
  const s = dict.skills;

  const fadeColor = colors.isDark ? "#0f0f0f" : "#ffffff";
  const highlightBg = colors.isDark ? "rgba(91,164,207,0.07)" : "rgba(91,164,207,0.04)";
  const defaultCardBg = colors.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)";

  const columns = [
    { key: "frontend" as const, isHighlighted: false, ...s.columns.frontend },
    { key: "backend" as const, isHighlighted: false, ...s.columns.backend },
    { key: "operational" as const, isHighlighted: false, ...s.columns.operational },
    { key: "domain" as const, isHighlighted: true, ...s.columns.domain },
  ];

  const iconColor = colors.isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.28)";
  const bodyText = colors.isDark ? colors.textMuted : "#333";
  const displayAccent = colors.isDark ? accentColor : "#1a6fa8";
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

        <p className="text-sm md:text-base text-center max-w-xl mt-1" style={{ color: bodyText }}>
          {s.subtitle}
        </p>
      </motion.div>

      {/* Card grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col, colIdx) => {
            const Icon = ICONS[col.key];
            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: colIdx * 0.1 }}
                className="relative flex flex-col p-6 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: col.isHighlighted ? highlightBg : defaultCardBg,
                  border: `1px solid ${col.isHighlighted ? "rgba(91,164,207,0.28)" : colors.borderBase}`,
                }}
              >
                {/* Subtle radial glow on highlighted card */}
                {col.isHighlighted && (
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(91,164,207,0.12) 0%, transparent 70%)" }}
                  />
                )}

                {/* Icon */}
                <Icon color={col.isHighlighted ? displayAccent : iconColor} />

                {/* Title */}
                <div className="mt-5 mb-0.5">
                  <h3
                    className="font-semibold text-sm leading-tight"
                    style={{ color: col.isHighlighted ? displayAccent : colors.textBase }}
                  >
                    {col.title}
                  </h3>
                  {col.isHighlighted && (
                    <span
                      className="block w-6 h-0.5 mt-2 rounded-full"
                      style={{ backgroundColor: displayAccent, opacity: 0.5 }}
                    />
                  )}
                </div>

                {/* Statement */}
                <p className="text-xs leading-relaxed mt-2 mb-5" style={{ color: bodyText }}>
                  {col.statement}
                </p>

                {/* Pill tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {col.items.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: colIdx * 0.06 + skillIdx * 0.04 }}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        border: `1px solid ${col.isHighlighted ? "rgba(91,164,207,0.35)" : colors.borderBase}`,
                        color: col.isHighlighted ? displayAccent : bodyText,
                        backgroundColor: col.isHighlighted
                          ? "rgba(91,164,207,0.06)"
                          : (colors.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"),
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Approach footer row */}
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
            style={{ color: displayAccent, opacity: 0.8 }}
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
                style={{ color: bodyText }}
              >
                {theme}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
