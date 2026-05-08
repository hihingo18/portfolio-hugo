"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPinIcon, LayersIcon, ShieldIcon, UsersIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

function SectionLabel({ index, label, color }: { index: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className="font-mono text-xs" style={{ color }}>{index}</span>
      <div className="h-px w-6" style={{ backgroundColor: color, opacity: 0.35 }} />
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color }}>{label}</span>
    </div>
  );
}

export default function AboutSection() {
  const { dict } = useLocale();
  const colors = useColors();
  const a = dict.about;
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  const gradientOverlay =
    "linear-gradient(137deg, rgb(255,255,255) 0%, rgb(255,255,255) 33.333%, rgb(203,220,255) 66.667%, rgb(255,255,255) 100%)";

  const cardStyle = colors.isDark
    ? { border: `1px solid ${colors.borderBase}`, backgroundColor: colors.bgPanel }
    : {
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid rgba(255,255,255,0.85)",
      };

  const chipStyle = colors.isDark
    ? { border: `1px solid ${colors.borderBase}`, color: colors.textBase, backgroundColor: colors.bgPanel }
    : {
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.9)",
        color: colors.textBase,
      };

  const fadeColor = colors.isDark ? "#0f0f0f" : "#ffffff";

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={!colors.isDark ? { background: gradientOverlay } : { backgroundColor: colors.bgBase }}
    >
      {/* top fade */}
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, ${fadeColor}, transparent)` }}
      />
      {/* bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, ${fadeColor}, transparent)` }}
      />
      <div className="px-20 pt-14 pb-24 space-y-18">

        {/* ── IDENTITY ──────────────────────────────────────── */}
        <motion.div {...fadeUp(0)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2
                  className="font-bold leading-none tracking-tight"
                  style={{ fontSize: 52, color: colors.textBase }}
                >
                  HUGO
                </h2>
                <span className="text-sm font-light" style={{ color: colors.textMuted }}>
                  {a.nameNote}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:text-right">
                <p className="font-medium text-base" style={{ color: colors.textBase }}>
                  {a.title}
                </p>
                <p
                  className="font-normal text-[13px] leading-relaxed max-w-sm sm:ml-auto"
                  style={{ color: colors.textMuted }}
                >
                  {a.tagline}
                </p>
              </div>
            </div>

            <div className="h-px w-full" style={{ backgroundColor: colors.borderBase }} />

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              <span
                className="flex items-center gap-1.5 text-xs"
                style={{ color: colors.textMuted }}
              >
                <MapPinIcon /> {a.location}
              </span>
              <span className="text-xs" style={{ color: colors.textFaint }}>·</span>
              <span className="text-xs" style={{ color: colors.textMuted }}>{a.domains}</span>
              <span className="text-xs" style={{ color: colors.textFaint }}>·</span>
              <span className="text-xs" style={{ color: colors.textMuted }}>{a.aesthetic}</span>
            </div>
          </div>
        </motion.div>

        {/* ── HOW I WORK ────────────────────────────────────── */}
        <motion.div {...fadeUp(0.05)}>
          <SectionLabel index="01" label={a.howIWorkTitle} color={colors.textMuted} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Row 1: two equal cards */}
            {[
              { icon: <LayersIcon />, title: a.card1Title, body: a.card1Body },
              { icon: <ShieldIcon />, title: a.card2Title, body: a.card2Body },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-xl flex flex-col gap-3"
                style={cardStyle}
              >
                <div className="flex items-center gap-2.5">
                  <span style={{ color: colors.brandPrimary }}>{card.icon}</span>
                  <h4 className="font-semibold text-[15px]" style={{ color: colors.textBase }}>
                    {card.title}
                  </h4>
                </div>
                <p className="font-normal text-[15px] leading-relaxed" style={{ color: colors.textBase }}>
                  {card.body}
                </p>
              </div>
            ))}

            {/* Row 2: mentoring card + principles panel */}
            <div
              className="p-6 rounded-xl flex flex-col gap-3"
              style={cardStyle}
            >
              <div className="flex items-center gap-2.5">
                <span style={{ color: colors.brandPrimary }}><UsersIcon /></span>
                <h4 className="font-semibold text-[15px]" style={{ color: colors.textBase }}>
                  {a.card3Title}
                </h4>
              </div>
              <p className="font-normal text-[15px] leading-relaxed" style={{ color: colors.textBase }}>
                {a.card3Body}
              </p>
            </div>

            <div
              className="p-6 rounded-xl flex flex-col justify-between gap-4"
              style={cardStyle}
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: colors.textMuted }}
              >
                What I value
              </span>
              <div className="flex flex-wrap gap-2">
                {a.principles.map((p, i) => (
                  <span
                    key={i}
                    className="text-[13px] px-2.5 py-1 rounded-full"
                    style={{
                      border: `1px solid ${colors.brandPrimary}`,
                      color: colors.brandPrimary,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── BEYOND WORK ───────────────────────────────────── */}
        <motion.div {...fadeUp(0.05)}>
          <SectionLabel index="02" label={a.beyondTitle} color={colors.textMuted} />
          <div className="flex flex-col gap-5">
            <p
              className="font-normal text-[15px] leading-loose max-w-xl"
              style={{ color: colors.textBase }}
            >
              {a.beyondParagraph}
            </p>
            <div className="flex flex-wrap gap-2">
              {a.interestChips.map((chip, i) => (
                <span
                  key={i}
                  className="text-[13px] px-3 py-1 rounded-full"
                  style={chipStyle}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CLOSING LINE + CTA ────────────────────────────── */}
        <motion.div {...fadeUp(0.05)} className="flex flex-col gap-5">
          <p
            className="font-normal text-[14px] italic"
            style={{ color: colors.textMuted }}
          >
            — {a.closingLine}
          </p>

          <a
            href="https://www.linkedin.com/in/hieu-ngo-75b4b1301/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setLinkedinHovered(true)}
            onMouseLeave={() => setLinkedinHovered(false)}
            className="inline-flex items-center gap-2 text-[14px] font-normal underline decoration-solid transition-colors duration-200"
            style={{ color: linkedinHovered ? colors.brandPrimary : colors.textBase }}
          >
            {a.linkedinLabel}
            <svg
              width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
