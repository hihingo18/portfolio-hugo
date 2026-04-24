"use client";

import { motion } from "framer-motion";
import { TECH_ICONS_REGISTRY } from "@/lib/icons/tech-icons-registry";
import { useLocale } from "@/context/LocaleContext";

export default function AboutSection() {
  const { dict } = useLocale();
  const a = dict.about;

  return (
    <section id="about" className="relative w-full bg-white">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#f1f1f1]" />

      <div className="px-20 pt-12.5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-bold text-5xl text-black leading-tight tracking-[-0.01em]">
            HUGO{" "}
          </span>
          <span className="text-gray-400">{a.nameNote}</span>
          <p className="font-normal text-[16.5px] text-black mb-0">{a.location}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14"
        >
          <h3 className="font-normal text-3xl text-black leading-tight mb-4">{a.block1Title}</h3>
          <p className="font-light text-2xl text-black leading-relaxed">{a.block1Body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14"
        >
          <h3 className="font-normal text-3xl text-black leading-tight mb-4">{a.block2Title}</h3>
          <p className="font-light text-2xl text-black leading-relaxed">{a.block2Body}</p>
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
            className="font-light text-[22px] text-black underline decoration-solid hover:text-[#020073] transition-colors duration-200"
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
              <h4 className="font-bold text-2xl text-black mb-0 leading-tight">
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
