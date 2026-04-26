"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, DARK_COLORS } from "@/lib/theme";

const HERO_VARIANTS = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  },
  line: {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
} as const;

interface HeroSectionProps {
  onWorkWithMeClick: () => void;
}

export default function HeroSection({ onWorkWithMeClick }: HeroSectionProps) {
  const [workHovered, setWorkHovered] = useState(false);
  const [learnHovered, setLearnHovered] = useState(false);
  const { dict } = useLocale();
  const { theme } = useTheme();
  const h = dict.hero;

  const isDark = theme === "dark";
  const colors = isDark ? DARK_COLORS : COLORS;

  const handleLearnMore = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative w-full h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: isDark ? "#0f0f0f" : "#ffffff" }}
    >

      {/* Work with me button */}
      <div className="fixed top-10 right-10 z-50">
        <button
          onClick={onWorkWithMeClick}
          onMouseEnter={() => setWorkHovered(true)}
          onMouseLeave={() => setWorkHovered(false)}
          className="relative flex items-center overflow-hidden rounded-lg cursor-pointer"
          style={{
            width: 159,
            height: 82,
            paddingLeft: 20,
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: isDark
              ? (workHovered ? "#5585ef" : "#6b9fff")
              : (workHovered ? COLORS.primaryDark : COLORS.primary),
            transition: "background-color 100ms ease-in-out",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <div
              className="font-bold text-2xl text-left leading-10"
              style={{ color: isDark ? "#0f0f0f" : "#ffffff" }}
            >
              {h.workWithMe[0]}
            </div>
            <div
              className="font-bold text-2xl text-left leading-10"
              style={{ color: isDark ? "#0f0f0f" : "#ffffff" }}
            >
              {h.workWithMe[1]}
            </div>
          </div>

          <svg
            width="159" height="16" viewBox="0 0 159 16"
            fill="none"
            style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 0 }}
          >
            <motion.path
              animate={{
                d: workHovered
                  ? "M0 8 L153 8 M137 0 L153 8 L137 16"
                  : "M0 8 L113 8 M97 0 L113 8 L98 16",
              }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              stroke={isDark ? "#0f0f0f" : "white"} strokeWidth="2.5" fill="none"
              strokeLinecap="butt" strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Main hero content */}
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="relative mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="animate-gradient absolute z-10"
            style={{
              width: 80, height: 80, borderRadius: 5, top: -80, left: -20,
              background: "linear-gradient(137deg, #ffffff, #b8ceff, #004fff, #ffffff)",
              backgroundSize: "240% 240%",
            }}
          />

          <motion.div variants={HERO_VARIANTS.container} initial="hidden" animate="show" className="flex flex-col gap-2">
            <motion.div variants={HERO_VARIANTS.line} className="overflow-hidden">
              <div style={{ color: colors.text }} className="text-6xl">
                <span className="text-gray-500 dark:text-gray-400 text-2xl align-middle">01</span>
                <span className="text-gray-500 dark:text-gray-400 pl-5">&lt;</span>
                {h.greeting}{" "}
                <span
                  className="leading-normal"
                  style={{ color: isDark ? DARK_COLORS.primary : "#1e3a8a" }}
                >
                  {h.name}
                </span>
                <span className="leading-normal text-gray-500 dark:text-gray-400">&gt;</span>
              </div>
            </motion.div>

            <motion.div variants={HERO_VARIANTS.line} className="overflow-hidden">
              <p style={{ color: colors.text }} className="text-6xl">
                <span className="text-gray-500 dark:text-gray-400 text-2xl align-middle">02</span>
                <span className="text-gray-500 dark:text-gray-400 pl-5">&lt;</span>
                {h.rolePrefix}{" "}
                <span
                  className="leading-normal"
                  style={{ color: isDark ? DARK_COLORS.primary : "#1e3a8a" }}
                >
                  {h.role}
                </span>
              </p>
            </motion.div>

            <motion.div variants={HERO_VARIANTS.line} className="overflow-hidden">
              <p style={{ color: colors.text }} className="leading-snug text-6xl">
                <span className="text-gray-500 dark:text-gray-400 text-2xl align-middle">03</span>
                <span className="pl-15">{h.roleConnector}{" "}</span>
                <span style={{ color: isDark ? DARK_COLORS.primary : "#1e3a8a" }}>{h.roleSuffix}</span>
                <span className="text-gray-500 dark:text-gray-400">&gt;</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-semibold text-sm italic mb-12 max-w-150 leading-relaxed"
          style={{ color: colors.text }}
        >
          {h.tagline}
        </motion.p>

        {/* Learn more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
          style={{ padding: "40px 80px" }}
        >
          {!isDark && (
            <>
              <div
                className="animate-gradient-slow absolute inset-0"
                style={{
                  background: "linear-gradient(137deg, #f0f5ff 0%, #c8d9ff 25%, #aac5ff 50%, #c8d9ff 75%, #f0f5ff 100%)",
                  backgroundSize: "400% 400%",
                }}
              />
              <div
                className="absolute inset-x-0 top-0 pointer-events-none"
                style={{ height: "80%", background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)" }}
              />
            </>
          )}
          {isDark && (
            <div className="absolute inset-0" style={{ background: "#0f0f0f" }} />
          )}

          <button
            onClick={handleLearnMore}
            onMouseEnter={() => setLearnHovered(true)}
            onMouseLeave={() => setLearnHovered(false)}
            className="relative z-10 flex items-center gap-3 cursor-pointer"
          >
            <span
              className="font-normal text-base transition-colors duration-300"
              style={{ color: learnHovered ? colors.primary : colors.text }}
            >
              {h.learnMore}
            </span>
            <motion.div
              animate={{ y: learnHovered ? 5 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center size-9.5 rounded-full border transition-all duration-300"
              style={{
                backgroundColor: learnHovered ? colors.primary : "transparent",
                borderColor: learnHovered ? colors.primary : colors.text,
                color: learnHovered ? colors.white : colors.text,
              }}
            >
              <ArrowDownIcon />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
