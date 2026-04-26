"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TECH_ICONS_REGISTRY } from "@/lib/icons/tech-icons-registry";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, DARK_COLORS } from "@/lib/theme";

export default function AboutSection() {
  const { dict } = useLocale();
  const { theme } = useTheme();
  const a = dict.about;
  const isDark = theme === "dark";
  const colors = isDark ? DARK_COLORS : COLORS;
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  return (
    <section id="about" className="relative w-full bg-white dark:bg-[#0f0f0f]">

      <div className="px-20 pt-12.5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-bold text-5xl text-black dark:text-white leading-tight tracking-[-0.01em]">
            HUGO{" "}
          </span>
          <span className="text-gray-400 dark:text-gray-500">{a.nameNote}</span>
          <p className="font-normal text-[16.5px] text-black dark:text-gray-200 mb-0">{a.location}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14"
        >
          <h3 className="font-normal text-3xl text-black dark:text-white leading-tight mb-4">{a.block1Title}</h3>
          <p className="font-light text-2xl text-black dark:text-gray-200 leading-relaxed">{a.block1Body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14"
        >
          <h3 className="font-normal text-3xl text-black dark:text-white leading-tight mb-4">{a.block2Title}</h3>
          <p className="font-light text-2xl text-black dark:text-gray-200 leading-relaxed">{a.block2Body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3.5"
        >
          <a
            href="https://www.linkedin.com/in/hieu-ngo-75b4b1301/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setLinkedinHovered(true)}
            onMouseLeave={() => setLinkedinHovered(false)}
            className="font-light text-[22px] underline decoration-solid transition-colors duration-200"
            style={{ color: linkedinHovered ? colors.primary : colors.text }}
          >
            {a.linkedinLabel}
          </a>
        </motion.div>

        <div className="mt-20 flex flex-wrap items-start gap-x-0">
          {Object.entries(TECH_ICONS_REGISTRY).map(([category, icons], gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="flex flex-col mr-10"
            >
              <h4 className="font-bold text-2xl text-black dark:text-white mb-0 leading-tight">
                {a.skills[category as "backend" | "frontend"]}
              </h4>
              <div className="flex flex-wrap gap-3.5 pt-2.5 pb-3.5">
                {icons.map((skill) => (
                  <div
                    key={skill.id}
                    title={skill.name}
                    className="transition-transform duration-200 hover:scale-110 cursor-default"
                  >
                    {skill.icon}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
