"use client";

import { RefObject, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownIcon } from "@/components/icons/UIIcons";

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
    <section className="relative w-full h-screen bg-white flex flex-col overflow-hidden">
      {/* Vertical divider between sidebar and main */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#f1f1f1]" />

      {/* "Work with me" button — ref: briceclain #boutontr */}
      <div className="absolute top-10 right-10 z-10">
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
            backgroundColor: workHovered ? "rgb(0,0,54)" : "#020073",
            transition: "background-color 100ms ease-in-out",
          }}
        >
          {/* Text: Work / with me stacked, flex-shrink-0 */}
          <div style={{ flexShrink: 0 }}>
            <div className="font-bold text-2xl text-left text-white leading-10">Work</div>
            <div className="font-bold text-2xl text-left text-white leading-10">with me</div>
          </div>

          {/*
            Arrow: 1 path duy nhất.
            "M0 8 L[tip] 8"        → shaft đến tận tip
            "M[base] 2 L[tip] 8 L[base] 14" → arrowhead V, apex = tip
            Cả 2 share cùng điểm [tip] → dính liền, không có cap gap.
            strokeLinecap="butt" → line kết thúc phẳng tại tip, không nhô ra.
          */}
          <svg
            width="159" height="16" viewBox="0 0 159 16"
            fill="none"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: 0,
            }}
          >
            <motion.path
              animate={{
                d: workHovered
                  ? "M0 8 L153 8 M137 0 L153 8 L137 16"
                  : "M0 8 L113 8 M97 0 L113 8 L98 16",
              }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              stroke="white" strokeWidth="2.5" fill="none"
              strokeLinecap="butt" strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Main hero content */}
      <div className="flex flex-col justify-center items-center flex-1">

        {/* Heading wrapper — relative để square anchor vào top line 1 */}
        <div className="relative mb-8">
          {/* Animated gradient square — luôn ở góc trên-trái của heading block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="animate-gradient absolute z-10"
            style={{
              width: 80,
              height: 80,
              borderRadius: 5,
              top: -80,
              left: -20,
              background: "linear-gradient(137deg, #ffffff, #b8ceff, #004fff, #ffffff)",
              backgroundSize: "240% 240%",
            }}
          />

        {/* Heading lines with stagger reveal */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2"
        >
          {/* Line 1 */}
          <motion.div variants={lineVariant} className="overflow-hidden">            
            <div className=" text-black text-6xl">
              <span className="text-gray-500 text-2xl align-middle">01</span>
              <span className="text-gray-500 pl-5">&lt;</span>
              Hello, I'm{" "}
              <span className="leading-[1.5] text-blue-900">Hugo!</span>
              <span className="leading-[1.5] text-gray-500">&gt;</span>
            </div>
          </motion.div>

          {/* Line 2 */}
          <motion.div variants={lineVariant} className="overflow-hidden">            
            <p className=" text-black text-6xl">
              <span className="text-gray-500 text-2xl align-middle">02</span>
              <span className="text-gray-500 pl-5">&lt;</span>
              I&apos;m a{" "}
              <span className="leading-[1.5] text-blue-900">Technical Leader</span>
            </p>
          </motion.div>

          {/* Line 3 */}
          <motion.div variants={lineVariant} className="overflow-hidden">            
            <p className="leading-[1.15] text-black  text-6xl">
              <span className="text-gray-500 text-2xl align-middle">03</span>
              <span className="pl-15">and{" "}</span>
              <span className="text-blue-900 ">Full-stack developer.</span>
              <span className="text-gray-500">&gt;</span>
            </p>
          </motion.div>
        </motion.div>
        </div>{/* end relative wrapper */}

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-light text-sm text-black italic mb-12 max-w-135 leading-relaxed"
        >
          Building scalable, high-quality products with strong engineering leadership.
        </motion.p>

        {/* Learn more button — với backbottom gradient background (ref: briceclain .backbottom::before) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
          style={{ padding: "40px 80px" }}
        >
          {/* Layer 1 — light blue animation: symmetric gradient + 400% size → position shift reveals different peaks */}
          <div
            className="animate-gradient-slow absolute inset-0"
            style={{
              background: "linear-gradient(137deg, #f0f5ff 0%, #c8d9ff 25%, #aac5ff 50%, #c8d9ff 75%, #f0f5ff 100%)",
              backgroundSize: "400% 400%",
            }}
          />
          {/* Layer 2 — top fade mask: che 65% trên cùng */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "80%",
              background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)",
            }}
          />

          <button
            onClick={handleLearnMore}
            onMouseEnter={() => setLearnHovered(true)}
            onMouseLeave={() => setLearnHovered(false)}
            className="relative z-10 flex items-center gap-3 cursor-pointer"
          >
            <span
              className="font-normal text-base transition-colors duration-300"
              style={{ color: learnHovered ? "#020073" : "#111111" }}
            >
              Learn more
            </span>
            <motion.div
              animate={{ y: learnHovered ? 5 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center size-9.5 rounded-full border transition-all duration-300"
              style={{
                backgroundColor: learnHovered ? "#020073" : "transparent",
                borderColor: learnHovered ? "#020073" : "#111111",
                color: learnHovered ? "#ffffff" : "#111111",
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
