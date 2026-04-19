"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/types";

const HIGHLIGHT = {
  quotes: [
    "Hieu who mapped pretty much the entire accounting ecosystem.",
    "⭐ Special shout outs to Hieu Ngo for keeping the project on track amidst competing priorities.",
  ],
  author: "Jacquie West",
  role: "Product Manager",
  company: "Centerbase",
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "jordan",
    name: "Jordan McGhee",
    role: "CFO",
    company: "KSA Attorneys",
    quote:
      "The backend redesign has made our system significantly more efficient. Reporting workflows are much faster.",
  },
  {
    id: "mckeen",
    name: "McKeen Smith LLC",
    role: "Accounting User",
    company: "",
    quote:
      "Transactions now load very fast, even for large datasets. This is a big improvement to user experience.",
  },
  {
    id: "john",
    name: "John Thacker",
    role: "Engineering Manager",
    company: "Centerbase",
    quote:
      "I'm impressed with the solid patterns and refactoring in your latest merge requests.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="trust"
      className="relative w-full overflow-hidden pt-[40px] pb-[60px]"
      style={{
        background:
          "linear-gradient(137deg, rgb(255,255,255) 0%, rgb(255,255,255) 33.333%, rgb(203,220,255) 66.667%, rgb(255,255,255) 100%)",
      }}
    >
      {/* Section heading */}
      <div className="px-[80px] mb-[30px] flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <h2 className="font-bold text-[32px] text-black">They trusted my work ⭐</h2>
          <p className="text-[#777] text-[16px]">Real feedback from customers &amp; team</p>
        </motion.div>
      </div>

      {/* Highlight block */}
      <div className="px-[80px] mb-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-[800px] mx-auto"
        >
          <div
            className="relative rounded-[16px] overflow-hidden p-[30px] text-center"
            style={{
              background: "linear-gradient(135deg, rgba(238,242,255,0.85), rgba(245,246,255,0.9))",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >
            {HIGHLIGHT.quotes.map((quote, i) => (
              <p key={i} className="text-xl italic text-[#333] leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
            ))}
            <p className="mt-4 font-bold text-black tex-left">
              — {HIGHLIGHT.author}              
            </p>
            <p className="text-gray-400 text-xs">{HIGHLIGHT.role} @ {HIGHLIGHT.company}</p>
          </div>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="px-[80px] flex flex-wrap gap-5 justify-center items-stretch">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex-1 min-w-[260px] max-w-[320px] flex"
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }}
      />
    </section>
  );
}
