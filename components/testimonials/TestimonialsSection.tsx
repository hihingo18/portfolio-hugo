"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/types";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "pierre",
    name: "Pierre",
    role: "CEO",
    company: "Bykaomes",
    quote:
      "I gave free rein to create my entire platform. Very professional and above all very responsive. I am really more than satisfied with the result. I highly recommend! I look forward to continuing the evolution of the platform with your feedback and relevant advice.",
  },
  {
    id: "xenia",
    name: "Xénia",
    role: "Partner",
    company: "Noje be",
    quote:
      "Very nice professional encounter. Even separated by a few kilometers, always been very responsive and proactive. Always attentive to ideas, he perfectly creates a beautiful visual identity. I highly recommend his services for creating websites, business cards, flyers, etc.",
  },
  {
    id: "riaz",
    name: "Riaz",
    role: "CEO",
    company: "Dealrun",
    quote:
      "Brice is a person who was attentive and delivered a result on time, the result was top-notch. His work brought a fresh look to my website's design. I recommend.",
  },
];

// Star icon matching Figma
const ReviewStar = () => (
  <svg fill="none" height="24.038" viewBox="0 0 25 24.0385" width="25">
    <g clipPath="url(#rstar-clip)">
      <path d="M12.5 0L15.3 8.65H24.5L17.6 14L20.4 22.65L12.5 17.3L4.6 22.65L7.4 14L0.5 8.65H9.7L12.5 0Z" fill="black" />
    </g>
    <defs>
      <clipPath id="rstar-clip">
        <rect fill="white" height="24.0385" width="25" />
      </clipPath>
    </defs>
  </svg>
);

export default function TestimonialsSection() {
  return (
    <section
      id="trust"
      className="relative w-full overflow-hidden pt-[40px] pb-[40px]"
      style={{
        background:
          "linear-gradient(137deg, rgb(255,255,255) 0%, rgb(255,255,255) 33.333%, rgb(203,220,255) 66.667%, rgb(255,255,255) 100%)",
      }}
    >
      {/* Section heading */}
      <div className="px-[80px] mb-[30px] flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <h2 className="font-bold text-[32px] text-black">They trusted me</h2>
          <ReviewStar />
        </motion.div>
      </div>

      {/* Cards */}
      <div className="px-[80px] flex flex-wrap gap-5 justify-center items-stretch min-h-[368px] py-[30px]">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex-1 min-w-[280px] max-w-[370px] flex"
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }}
      />
    </section>
  );
}
