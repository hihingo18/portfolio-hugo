"use client";

import { motion } from "framer-motion";

// --- Tech icon components using text labels styled like the Figma ---

const TechBadge = ({
  label,
  color,
  textColor = "white",
}: {
  label: string;
  color: string;
  textColor?: string;
}) => (
  <div
    className="flex items-center justify-center rounded-[6px] px-3 py-2 text-[12px] font-semibold whitespace-nowrap"
    style={{ backgroundColor: color, color: textColor, minWidth: "50px", height: "50px" }}
    title={label}
  >
    {label}
  </div>
);

// SVG-based tech icons matching Figma visual weight (50x50)
const DotnetIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#512BD4" />
    <text x="5" y="30" fontSize="11" fill="white" fontWeight="700" fontFamily="Arial">.NET</text>
  </svg>
);
const CsharpIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#239120" />
    <text x="12" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">C#</text>
  </svg>
);
const SqlIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#CC2927" />
    <text x="5" y="32" fontSize="12" fill="white" fontWeight="700" fontFamily="Arial">SQL</text>
  </svg>
);
const KafkaIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#231F20" />
    <text x="4" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">Kafka</text>
  </svg>
);
const RedisIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#DC382D" />
    <text x="5" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">Redis</text>
  </svg>
);
const DockerIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#2496ED" />
    <text x="3" y="32" fontSize="10" fill="white" fontWeight="600" fontFamily="Arial">Docker</text>
  </svg>
);
const AzureIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#0089D6" />
    <text x="5" y="32" fontSize="11" fill="white" fontWeight="600" fontFamily="Arial">Azure</text>
  </svg>
);

const ReactIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#20232a" />
    <ellipse cx="25" cy="25" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1.8" />
    <ellipse cx="25" cy="25" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(60 25 25)" />
    <ellipse cx="25" cy="25" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(120 25 25)" />
    <circle cx="25" cy="25" r="2.5" fill="#61DAFB" />
  </svg>
);
const NextIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#000" />
    <text x="3" y="31" fontSize="10" fill="white" fontWeight="700" fontFamily="Arial">Next.js</text>
  </svg>
);
const VueIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#42B883" />
    <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">V</text>
  </svg>
);
const AngularIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#DD0031" />
    <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">A</text>
  </svg>
);
const SvelteIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect width="50" height="50" rx="6" fill="#FF3E00" />
    <text x="14" y="33" fontSize="18" fill="white" fontWeight="700" fontFamily="Arial">S</text>
  </svg>
);

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
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#f1f1f1]" />

      <div className="px-[80px] pt-[50px] pb-[80px]">
        {/* Name + location */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-bold text-[48px] text-black leading-tight tracking-[-0.01em]">
            HUGO
          </h2>
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
          className="mt-[55px]"
        >
          <h3 className="font-normal text-[32px] text-black leading-tight mb-4">
            I design and develop websites that are both elegant, intuitive,
            and accessible.
          </h3>
          <p className="font-light text-[22px] text-black leading-relaxed">
            Driven by a deep passion for engineering and system design, I specialize
            in harmonizing clean architecture with high-performing scalable systems.
            This ensures effective intervention on all aspects of the project, without
            intermediaries.
          </p>
        </motion.div>

        {/* Second block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-[55px]"
        >
          <h3 className="font-normal text-[32px] text-black leading-tight mb-4">
            I also specialize in creating your brand image: logo, banner, and
            much more.
          </h3>
          <p className="font-light text-[22px] text-black leading-relaxed">
            From a simple idea, a unique brand identity and an exceptional website are
            created. My clients appreciate my versatility and the quality of my work,
            forged by significant experience in an agency.
          </p>
        </motion.div>

        {/* LinkedIn link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-[14px]"
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-light text-[22px] text-black underline decoration-solid hover:text-[#020073] transition-colors duration-200"
          >
            Discover my journey (LinkedIn)
          </a>
        </motion.div>

        {/* Skill groups */}
        <div className="mt-[80px] flex flex-wrap items-start gap-x-0">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="flex flex-col mr-[40px]"
            >
              <h4 className="font-bold text-[24px] text-black mb-0 leading-tight">
                {group.title}
              </h4>
              <div className="flex flex-wrap gap-[14.4px] pt-[10px] pb-[14px]">
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
