"use client";

import { RefObject, useState } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onWorkWithMeClick: () => void;
  projectsRef: RefObject<HTMLDivElement | null>;
}

// Stagger container for text reveal
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const lineVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function HeroSection({ onWorkWithMeClick, projectsRef }: HeroSectionProps) {
  const [workHovered, setWorkHovered] = useState(false);
  const [learnHovered, setLearnHovered] = useState(false);

  const handleLearnMore = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Vertical divider between sidebar and main */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#f1f1f1]" />

      {/* "Work with me" button — top right corner */}
      <div className="absolute top-[60px] right-[96px] z-10">
        <button
          onClick={onWorkWithMeClick}
          onMouseEnter={() => setWorkHovered(true)}
          onMouseLeave={() => setWorkHovered(false)}
          className="flex flex-col items-center justify-center w-[159px] h-[82px] rounded-[5px] cursor-pointer overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: workHovered ? "#000000" : "#020073" }}
        >
          <span className="font-bold text-[15px] text-white text-center leading-[1.3] font-['Sora',sans-serif]">
            Work
            <br />
            with me
          </span>
        </button>
      </div>

      {/* Main hero content */}
      <div className="flex flex-col justify-center flex-1 px-[80px] pt-[80px] pb-[80px]">
        {/* Decorative blue shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-[48px] h-[48px] bg-[#020073] rounded-[4px] mb-8"
          style={{ transform: "rotate(-8deg)" }}
        />

        {/* Heading lines with stagger reveal */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2 mb-8"
        >
          {/* Line 1 */}
          <motion.div variants={lineVariant} className="overflow-hidden">
            <p className="font-bold text-[48px] leading-[1.15] tracking-[-0.02em] text-black">
              <span className="text-[#020073]">&lt;</span>
              Hello, I&apos;m{" "}
              <span className="text-[#020073]">Hugo!</span>
              <span className="text-[#020073]">&gt;</span>
            </p>
          </motion.div>

          {/* Line 2 */}
          <motion.div variants={lineVariant} className="overflow-hidden">
            <p className="font-bold text-[48px] leading-[1.15] tracking-[-0.02em] text-black">
              <span className="text-[#020073]">&lt;</span>
              I&apos;m a{" "}
              <span className="text-[#020073]">Technical Leader</span>
            </p>
          </motion.div>

          {/* Line 3 */}
          <motion.div variants={lineVariant} className="overflow-hidden">
            <p className="font-bold text-[48px] leading-[1.15] tracking-[-0.02em] text-black">
              and{" "}
              <span className="text-[#020073]">Full-stack developer.</span>
              <span className="text-[#020073]">&gt;</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-light text-[14px] text-black italic mb-12 max-w-[500px] leading-relaxed"
        >
          Crafting scalable, high-quality products with strong engineering leadership.
        </motion.p>

        {/* Learn more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <button
            onClick={handleLearnMore}
            onMouseEnter={() => setLearnHovered(true)}
            onMouseLeave={() => setLearnHovered(false)}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span
              className="font-normal text-[16px] transition-colors duration-200"
              style={{ color: learnHovered ? "#020073" : "#111111" }}
            >
              Learn more
            </span>
            <motion.div
              animate={{ y: learnHovered ? 5 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center w-[38px] h-[38px] rounded-full border transition-all duration-200"
              style={{
                borderColor: learnHovered ? "#020073" : "#111111",
                color: learnHovered ? "#020073" : "#111111",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
