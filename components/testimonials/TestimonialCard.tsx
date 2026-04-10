import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative flex-1 min-w-[280px] max-w-[370px] rounded-[10px] overflow-hidden self-stretch">
      {/* Frosted glass background */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "10px",
        }}
      />
      <div className="relative flex flex-col gap-[15px] h-full p-[20px]">
        {/* Person info */}
        <div className="flex flex-col items-center gap-[2px]">
          <p className="font-bold text-[19.2px] text-black text-center leading-tight">
            {testimonial.name}
          </p>
          <p className="font-light text-[20.8px] text-[#777] text-center leading-tight">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>

        {/* Quote */}
        <p className="font-normal text-[14.1px] text-[#333] text-center leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
