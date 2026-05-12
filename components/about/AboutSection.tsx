"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPinIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";

const accentColor = "#5ba4cf";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const COLLAGE_TILES = [
  { labelKey: 0, gradient: "135deg, rgba(147,112,219,0.2) 0%, rgba(147,112,219,0.06) 100%", dot: "rgba(147,112,219,0.7)", image: "/images/coffee.webp" },
  { labelKey: 3, gradient: "135deg, rgba(64,196,160,0.2) 0%, rgba(64,196,160,0.06) 100%", dot: "rgba(64,196,160,0.7)", image: "/images/aquarium.webp" },
  { labelKey: 5, gradient: "135deg, rgba(180,140,100,0.2) 0%, rgba(180,140,100,0.06) 100%", dot: "rgba(180,140,100,0.7)", image: "/images/halongbay.webp" },
  { labelKey: 1, gradient: "135deg, rgba(255,160,80,0.2) 0%, rgba(255,160,80,0.06) 100%", dot: "rgba(255,160,80,0.7)", image: "/images/psychology.webp" }, 
];

function StructureIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="4" rx="1" />
      <rect x="2" y="10" width="14" height="4" rx="1" />
      <rect x="2" y="17" width="9" height="4" rx="1" />
    </svg>
  );
}

function CollabIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <path d="M17 13c2.2.5 4 2.3 4 4.5" />
    </svg>
  );
}

function CalmIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function EditorialLabel({ index, label }: { index: string; label: string }) {
  const colors = useColors();
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs" style={{ color: accentColor }}>{index}</span>
      <div className="h-px w-8" style={{ backgroundColor: colors.textFaint, opacity: 0.6 }} />
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.textMuted }}>
        {label}
      </span>
    </div>
  );
}

export default function AboutSection({ onWorkWithMeClick }: { onWorkWithMeClick?: () => void }) {
  const { dict } = useLocale();
  const colors = useColors();
  const a = dict.about;
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  const gradientOverlay =
    "linear-gradient(137deg, rgb(255,255,255) 0%, rgb(255,255,255) 33.333%, rgb(203,220,255) 66.667%, rgb(255,255,255) 100%)";

  const fadeColor = colors.isDark ? "#0f0f0f" : "#ffffff";

  const sectionStyle = {
    overflowX: "clip" as const,
    ...(colors.isDark ? { backgroundColor: colors.bgBase } : { background: gradientOverlay }),
  };

  const cardBg = colors.isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)";
  const cardBorder = colors.isDark ? colors.borderBase : "rgba(0,0,0,0.07)";
  const iconColor = colors.isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)";
  const bodyText = colors.isDark ? colors.textMuted : "#333";
  const chipAccent = colors.isDark ? "rgba(91,164,207,0.9)" : "#1a6fa8";

  return (
    <section id="about" className="relative w-full" style={sectionStyle}>
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, ${fadeColor}, transparent)` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, ${fadeColor}, transparent)` }}
      />

      <div className="px-6 md:px-16 lg:px-24 pt-14 pb-28">

        {/* ── IDENTITY ────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="flex flex-col gap-6 mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2
                className="font-bold leading-none tracking-tight"
                style={{ fontSize: 56, color: colors.textBase }}
              >
                HUGO
              </h2>
              <span className="text-sm font-light" style={{ color: colors.textMuted }}>
                {a.nameNote}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:text-right">
              <p className="font-medium text-base" style={{ color: colors.textBase }}>{a.title}</p>
              <p className="font-normal text-sm leading-relaxed max-w-sm sm:ml-auto" style={{ color: colors.textMuted }}>
                {a.tagline}
              </p>
            </div>
          </div>

          <div className="h-px w-full" style={{ backgroundColor: colors.borderBase }} />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="flex items-center gap-1.5 text-sm" style={{ color: colors.textMuted }}>
              <MapPinIcon /> {a.location}
            </span>
            <span className="text-sm" style={{ color: colors.textFaint }}>·</span>
            <span className="text-sm" style={{ color: colors.textMuted }}>{a.domains}</span>
            <span className="text-sm" style={{ color: colors.textFaint }}>·</span>
            <span className="text-sm" style={{ color: colors.textMuted }}>{a.aesthetic}</span>
          </div>
        </motion.div>

        {/* ── 01 HOW I WORK ───────────────────────────────── */}
        <motion.div {...fadeUp(0.05)} className="mb-24">
          <EditorialLabel index="01" label={a.howIWorkTitle} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Card 1: I Work Through Structure */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0 }}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <div className="flex items-center gap-2">
                <StructureIcon color={iconColor} />
                <p className="font-semibold text-[15px]" style={{ color: colors.textBase }}>{a.card1Title}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: bodyText }}>{a.card1Body}</p>
              <div className="flex items-center flex-wrap gap-1.5 mt-1">
                {(a.processSteps as string[]).map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        border: `1px solid ${chipAccent}`,
                        color: chipAccent,
                        backgroundColor: "rgba(91,164,207,0.05)",
                      }}
                    >
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="text-xs" style={{ color: chipAccent, opacity: 0.6 }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 2: Independent But Collaborative */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.07 }}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <div className="flex items-center gap-2">
                <CollabIcon color={iconColor} />
                <p className="font-semibold text-[15px]" style={{ color: colors.textBase }}>{a.card2Title}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: bodyText }}>{a.card2Body}</p>
            </motion.div>

            {/* Card 3: Calm Under Pressure */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <div className="flex items-center gap-2">
                <CalmIcon color={iconColor} />
                <p className="font-semibold text-[15px]" style={{ color: colors.textBase }}>{a.card3Title}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: bodyText }}>{a.card3Body}</p>
            </motion.div>

            {/* Card 4: What I Value */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.21 }}
              className="flex flex-col gap-4 p-6 rounded-2xl"
              style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.textMuted }}>
                {a.whatIValueLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {(a.principles as string[]).map((p, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ border: `1px solid ${colors.brandPrimary}`, color: colors.brandPrimary }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* ── 02 BEYOND WORK ──────────────────────────────── */}
        <motion.div {...fadeUp(0.05)} className="mb-24">
          <EditorialLabel index="02" label={a.beyondTitle} />
          <p className="text-base leading-relaxed mb-10" style={{ color: colors.textBase }}>
            {a.beyondParagraph}
          </p>

          {/* Collage tiles — full width, 4 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {COLLAGE_TILES.map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative rounded-xl overflow-hidden flex items-end p-4"
                style={{
                  height: 300,
                  background: `linear-gradient(${tile.gradient})`,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                {tile.image && (
                  <img
                    src={tile.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                )}
                <div
                  className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: tile.dot }}
                />
                <span className="relative text-xs font-medium leading-tight" style={{ color: "#1a1a1a", opacity: 0.95, textShadow: "0 0 4px rgba(255,255,255,1), 0 0 10px rgba(255,255,255,0.95), 0 0 20px rgba(255,255,255,0.8), 0 0 32px rgba(255,255,255,0.5)" }}>
                  {a.interestChips[tile.labelKey]}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Remaining chips — plain text, no borders */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {(a.interestChips as string[])
              .filter((_: string, i: number) => ![0, 3, 5, 1].includes(i))
              .map((chip: string, i: number) => (
                <span key={i} className="text-sm" style={{ color: colors.textMuted }}>
                  {chip}
                </span>
              ))}
          </div>
        </motion.div>

        {/* ── CLOSING QUOTE + LINKEDIN ─────────────────────── */}
        <motion.div {...fadeUp(0.05)} className="flex flex-col gap-6">
          <div
            className="p-8 rounded-2xl"
            style={{
              border: `1px solid ${colors.isDark ? "rgba(91,164,207,0.2)" : "rgba(91,164,207,0.15)"}`,
              backgroundColor: colors.isDark ? "rgba(91,164,207,0.04)" : "rgba(91,164,207,0.03)",
            }}
          >
            <p className="text-xl font-light" style={{ color: colors.textBase, lineHeight: 1.85 }}>
              <span style={{ color: chipAccent, fontWeight: 500 }}>“</span>
              {(() => {
                const highlight: string = a.closingLineHighlight ?? "";
                const line: string = a.closingLine ?? "";
                const idx = highlight ? line.indexOf(highlight) : -1;
                if (idx === -1) return line;
                return (
                  <>
                    {line.slice(0, idx)}
                    <button
                      type="button"
                      onClick={onWorkWithMeClick}
                      className="underline decoration-dotted underline-offset-4 cursor-pointer transition-colors duration-200"
                      style={{ color: chipAccent, fontWeight: 400 }}
                    >
                      {highlight}
                    </button>
                    {line.slice(idx + highlight.length)}
                  </>
                );
              })()}
              <span style={{ color: chipAccent, fontWeight: 500 }}>”</span>
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/hieu-ngo-75b4b1301/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setLinkedinHovered(true)}
            onMouseLeave={() => setLinkedinHovered(false)}
            className="inline-flex items-center gap-2 text-sm font-normal underline decoration-solid transition-colors duration-200"
            style={{ color: linkedinHovered ? colors.brandPrimary : colors.textBase }}
          >
            {a.linkedinLabel}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
