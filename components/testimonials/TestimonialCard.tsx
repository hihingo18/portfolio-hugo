"use client";

import { memo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const glassBg = isDark
    ? {
        background: "rgba(25,25,40,0.8)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      }
    : {
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
      };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-1 min-w-[260px] max-w-[320px] rounded-[12px] overflow-hidden self-stretch"
      style={{
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      {/* Frosted glass background */}
      <div className="absolute inset-0" style={glassBg} />
      <div className="relative flex flex-col gap-[12px] h-full p-[25px] text-center">
        {/* Person info */}
        <div className="flex flex-col items-center gap-[2px]">
          <h3 className="font-bold text-[18px] text-black dark:text-white leading-tight">
            {testimonial.name}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">
            {testimonial.role}
            {testimonial.company ? ` @ ${testimonial.company}` : ""}
          </p>
        </div>

        {/* Quote */}
        <p className="font-normal text-[14.5px] text-[#333] dark:text-gray-200 leading-relaxed flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default memo(TestimonialCard);
