"use client";

import { memo, useState } from "react";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const GLASS_BG = {
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
} as const;

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [hovered, setHovered] = useState(false);

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
      <div className="absolute inset-0" style={GLASS_BG} />
      <div className="relative flex flex-col gap-[12px] h-full p-[25px] text-center">
        {/* Person info */}
        <div className="flex flex-col items-center gap-[2px]">
          <h3 className="font-bold text-[18px] text-black leading-tight">
            {testimonial.name}
          </h3>
          <p className="text-xs text-gray-400 leading-tight">
            {testimonial.role}
            {testimonial.company ? ` @ ${testimonial.company}` : ""}
          </p>
        </div>

        {/* Quote */}
        <p className="font-normal text-[14.5px] text-[#333] leading-relaxed flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default memo(TestimonialCard);
