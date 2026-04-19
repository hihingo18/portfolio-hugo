"use client";

import { useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [showProof, setShowProof] = useState(false);

  return (
    <div className="relative flex-1 min-w-[260px] max-w-[320px] rounded-[12px] overflow-hidden self-stretch transition-transform duration-300 hover:-translate-y-[5px]">
      {/* Frosted glass background */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        }}
      />
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

        {/* View proof button */}
        {testimonial.proofImage && (
          <div className="flex flex-col items-center gap-[10px]">
            <button
              onClick={() => setShowProof((v) => !v)}
              className="px-[14px] py-[8px] rounded-[6px] text-[13px] text-white font-medium transition-colors duration-200"
              style={{ background: showProof ? "#4338ca" : "#4f46e5" }}
            >
              {showProof ? "Hide proof" : "View proof"}
            </button>
            {showProof && (
              <div className="w-full">
                <Image
                  src={testimonial.proofImage}
                  alt={`Proof from ${testimonial.name}`}
                  width={300}
                  height={200}
                  className="w-full rounded-[8px] mt-[5px]"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
