"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

const PROOF_HEIGHT = 230;

interface TestimonialCardProps {
  testimonial: Testimonial;
  proofLabel: string;
  reveal: boolean;
  onRevealComplete?: () => void;
}

function TestimonialCard({ testimonial, proofLabel, reveal, onRevealComplete }: TestimonialCardProps) {
  const [hovered, setHovered] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageOk, setImageOk] = useState(true);
  const hasImage = Boolean(testimonial.image) && imageOk;

  useEffect(() => {
    if (reveal) setShowImage(true);
  }, [reveal]);

  useEffect(() => {
    if (reveal && !hasImage) onRevealComplete?.();
  }, [reveal, hasImage, onRevealComplete]);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex-1 min-w-[260px] max-w-[320px] self-stretch rounded-[12px] gap-0 py-0",
        "bg-white/65 dark:bg-[rgba(25,25,40,0.8)] backdrop-blur-md",
        "ring-0 shadow-[0_8px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.3)]",
        "transition-transform duration-300 ease-out",
        hovered ? "-translate-y-[5px]" : "translate-y-0"
      )}
    >
      <CardContent className="flex flex-col gap-3 h-full p-[25px] text-center">
        {/* Person info */}
        <div className="flex flex-col items-center gap-0.5">
          <h3 className="font-bold text-[18px] text-black dark:text-white leading-tight">
            {testimonial.name}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">
            {testimonial.role}
            {testimonial.company ? ` @ ${testimonial.company}` : ""}
          </p>
        </div>

        {/* Quote */}
        <p className="font-normal text-[14.5px] text-[#333] dark:text-gray-200 leading-relaxed min-h-[6.5em] flex items-center justify-center">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {testimonial.image && (
          <div className="mt-1 flex flex-col items-center gap-3">
            {/* Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={showImage}
              aria-label={proofLabel}
              onClick={() => setShowImage((v) => !v)}
              className="group inline-flex items-center gap-2 rounded-full py-1 px-1 cursor-pointer transition-opacity duration-200 hover:opacity-80"
            >
              <span
                className={cn(
                  "relative h-[18px] w-8 rounded-full transition-colors duration-100",
                  showImage
                    ? "bg-[#020073] dark:bg-[#6b9fff]"
                    : "bg-black/15 dark:bg-white/20"
                )}
              >
                <span
                  className={cn(
                    "absolute top-[2px] left-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm",
                    "transition-transform duration-300 ease-out",
                    showImage ? "translate-x-[14px]" : "translate-x-0"
                  )}
                />
              </span>
              <span className="text-[11px] font-medium tracking-wide text-gray-500 dark:text-gray-400">
                {proofLabel}
              </span>
            </button>

            {/* Image reveal — image stays mounted (preloaded/decoded) so the
                reveal only animates a fixed numeric height, never "auto". */}
            <motion.div
              initial={false}
              animate={{
                height: showImage && hasImage ? PROOF_HEIGHT : 0,
                opacity: showImage && hasImage ? 1 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              onAnimationComplete={() => {
                if (showImage && hasImage) onRevealComplete?.();
              }}
              style={{ willChange: "height" }}
              className="w-full overflow-hidden"
            >
              <div
                className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_6px_18px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.35)] bg-white/50 dark:bg-white/5"
                style={{ height: PROOF_HEIGHT }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth === 0) setImageOk(false);
                  }}
                  src={testimonial.image}
                  alt={`${proofLabel} — ${testimonial.name}`}
                  onError={() => setImageOk(false)}
                  className="w-full h-full object-contain object-top block bg-white"
                />
              </div>
            </motion.div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(TestimonialCard);
