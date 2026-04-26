"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/types";
import { useLocale } from "@/context/LocaleContext";
import { useColors } from "@/context/ThemeContext";

export default function TestimonialsSection() {
  const { dict } = useLocale();
  const { isDark } = useColors();
  const t = dict.testimonials;

  const TESTIMONIALS: Testimonial[] = useMemo(
    () => [
      { id: "jordan", ...t.items.jordan },
      { id: "mckeen", ...t.items.mckeen },
      { id: "john", ...t.items.john },
    ],
    [t.items]
  );

  const sectionStyle = isDark
    ? { background: "#0f0f0f" }
    : {
        background:
          "linear-gradient(137deg, rgb(255,255,255) 0%, rgb(255,255,255) 33.333%, rgb(203,220,255) 66.667%, rgb(255,255,255) 100%)",
      };

  const highlightStyle = isDark
    ? {
        background: "rgba(25,25,40,0.9)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }
    : {
        background:
          "linear-gradient(135deg, rgba(238,242,255,0.85), rgba(245,246,255,0.9))",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      };

  const bottomFadeStyle = isDark
    ? { background: "linear-gradient(to bottom, transparent, #0f0f0f)" }
    : { background: "linear-gradient(to bottom, transparent, white)" };

  return (
    <section
      id="trust"
      className="relative w-full overflow-hidden pt-10 pb-15"
      style={sectionStyle}
    >
      {/* Section heading */}
      <div className="px-20 mb-7.5 flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <h2 className="font-bold text-[32px] text-black dark:text-white">{t.sectionTitle}</h2>
          <p className="text-[#777] dark:text-[#888] text-[16px]">{t.subtitle}</p>
        </motion.div>
      </div>

      {/* Highlight block */}
      <div className="px-20 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-200 mx-auto"
        >
          <div
            className="relative rounded-2xl overflow-hidden p-7.5 text-center"
            style={highlightStyle}
          >
            {t.highlight.quotes.map((quote, i) => (
              <p key={i} className="text-xl italic text-[#333] dark:text-gray-200 leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
            ))}
            <p className="mt-4 font-bold text-black dark:text-white">— {t.highlight.author}</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              {t.highlight.role} @ {t.highlight.company}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="px-20 flex flex-wrap gap-5 justify-center items-stretch">
        {TESTIMONIALS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex min-w-65 max-w-80 flex-1"
          >
            <TestimonialCard testimonial={item} />
          </motion.div>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={bottomFadeStyle}
      />
    </section>
  );
}
