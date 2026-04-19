"use client";

import { motion } from "framer-motion";
import {
  DotnetIcon,
  CsharpIcon,
  SqlIcon,
  KafkaIcon,
  RedisIcon,
  DockerIcon,
  AzureIcon,
  ReactIcon,
  NextIcon,
  VueIcon,
  AngularIcon,
  SvelteIcon,
} from "@/components/icons/TechIcons";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroupData {
  title: string;
  icons: SkillItem[];
}

const SKILL_GROUPS: SkillGroupData[] = [
  {
    title: ".Backend & Infrastructure",
    icons: [
      { name: ".NET", icon: <DotnetIcon /> },
      { name: "C#", icon: <CsharpIcon /> },
      { name: "SQL", icon: <SqlIcon /> },
      { name: "Kafka", icon: <KafkaIcon /> },
      { name: "Redis", icon: <RedisIcon /> },
      { name: "Docker", icon: <DockerIcon /> },
      { name: "Azure", icon: <AzureIcon /> },
    ],
  },
  {
    title: ".Frontend",
    icons: [
      { name: "React", icon: <ReactIcon /> },
      { name: "Next.js", icon: <NextIcon /> },
      { name: "Vue", icon: <VueIcon /> },
      { name: "Angular", icon: <AngularIcon /> },
      { name: "Svelte", icon: <SvelteIcon /> },
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-white">
      {/* Vertical divider on left */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#f1f1f1]" />

      <div className="px-20 pt-12.5 pb-20">
        {/* Name + location */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-bold text-5xl text-black leading-tight tracking-[-0.01em]">
            HUGO 
          </span> <span className="text-gray-400">(formerly Hieu Ngo)</span>
          <p className="font-normal text-[16.5px] text-black mb-0">
            Hanoi, Vietnam
          </p>
        </motion.div>

        {/* First block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14"
        >
          <h3 className="font-normal text-3xl text-black leading-tight mb-4">
            Lead from the front.
          </h3>
          <p className="font-light text-2xl text-black leading-relaxed">
            With 10+ years of hands-on experience as a Technical Lead and Full-stack Developer, I take ownership from the ground up—tackling complex challenges, driving solutions, and setting clear technical direction to deliver scalable, high-quality systems.
          </p>
        </motion.div>

        {/* Second block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14"
        >
          <h3 className="font-normal text-3xl text-black leading-tight mb-4">
            Build systems that scale and last.
          </h3>
          <p className="font-light text-2xl text-black leading-relaxed">
            Specializing in .NET, microservices, and cloud architecture, I design and lead end-to-end solutions across diverse domains, ensuring performance, reliability, and seamless collaboration for global teams and long-term business growth.
          </p>
        </motion.div>

        {/* LinkedIn link */}
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
            Discover my journey (LinkedIn)
          </a>
        </motion.div>

        {/* Skill groups */}
        <div className="mt-20 flex flex-wrap items-start gap-x-0">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="flex flex-col mr-10"
            >
              <h4 className="font-bold text-2xl text-black mb-0 leading-tight">
                {group.title}
              </h4>
              <div className="flex flex-wrap gap-3.5 pt-2.5 pb-3.5">
                {group.icons.map((skill) => (
                  <div
                    key={skill.name}
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
