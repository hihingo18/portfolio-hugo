"use client";

import { memo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [hovered, setHovered] = useState(false);

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
        <p className="font-normal text-[14.5px] text-[#333] dark:text-gray-200 leading-relaxed flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}

export default memo(TestimonialCard);
