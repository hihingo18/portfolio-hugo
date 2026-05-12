"use client";

import { motion } from "framer-motion";
import { useColors } from "@/context/ThemeContext";

const accentColor = "#5ba4cf";

const NODES = ["Building systems", "Leading execution", "Understanding people"];

export default function SectionConnector() {
  const colors = useColors();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center py-15"
      aria-hidden="true"
    >
      {NODES.map((label, i) => (
        <div key={label} className="flex flex-col items-center">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: colors.textFaint }}
          >
            {label}
          </span>
          {i < NODES.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="w-px my-2"
              style={{
                height: 52,
                transformOrigin: "top",
                background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
              }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
