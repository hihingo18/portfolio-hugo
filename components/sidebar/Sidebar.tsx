"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { HomeIcon, ProjectsIcon, AboutIcon } from "@/components/icons/NavIcons";
import { LinkedInIcon, InstagramIcon, TikTokIcon, BehanceIcon } from "@/components/icons/SocialIcons";

type NavId = "home" | "projects" | "about";

const NAV_ITEMS: { id: NavId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About Me" },
];

interface SidebarProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

export default function Sidebar({ activeSection, onNavClick }: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Tất cả kích thước scale theo vw (18vw sidebar, min 240px → max 340px)
  const s = {
    navFontSize:    "clamp(14px, 1.1vw, 20px)",
    navItemHeight:  "clamp(44px, 3.2vw, 60px)",
    navItemWidth:   "clamp(150px, 10.5vw, 200px)",
    navPadding:     "clamp(10px, 0.8vw, 16px)",
    navMarginTop:   "clamp(12px, 2vw, 40px)",
    navGap:         "clamp(8px, 0.8vw, 16px)",
    iconWidth:      "clamp(26px, 1.8vw, 36px)",
    iconMargin:     "clamp(8px, 0.7vw, 14px)",
    langFontSize:   "clamp(13px, 1vw, 18px)",
    langGap:        "clamp(4px, 0.4vw, 8px)",
    socialSize:     "clamp(36px, 2.4vw, 48px)",
    socialGridGap:  "clamp(4px, 0.4vw, 8px)",
  };

  return (
    <aside className="w-full h-full bg-white flex flex-col items-center overflow-hidden pb-8">
      {/* Avatar — scale theo % chiều rộng sidebar */}
      <div className="w-full flex items-center justify-center">
        <div className="relative overflow-hidden rounded-full w-[65%] aspect-square">
          <Image
            src="/images/avatar.png"
            alt="Hugo"
            fill
            className=""
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-col flex-1 w-full items-center"
        style={{ gap: s.navGap, marginTop: s.navMarginTop }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          const IconComponent =
            item.id === "home"
              ? HomeIcon
              : item.id === "projects"
              ? ProjectsIcon
              : AboutIcon;

          return (
            <div
              key={item.id}
              className="flex items-center"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Icon */}
              <span
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: s.iconWidth, marginRight: s.iconMargin }}
              >
                <IconComponent active={isActive} />
              </span>

              <button
                onClick={() => onNavClick(item.id)}
                className={cn(
                  "relative flex items-center cursor-pointer transition-all duration-200 rounded",
                  isActive && (hoveredId === null || hoveredId === item.id)
                    ? "bg-[#f6f9f7] shadow-[inset_2px_0_0_#020073]"
                    : isActive
                    ? "bg-[#f6f9f7]"
                    : hoveredId === item.id
                    ? "bg-[#f6f9f7]/50 shadow-[inset_2px_0_0_#020073]"
                    : ""
                )}
                style={{
                  height: s.navItemHeight,
                  width: s.navItemWidth,
                  paddingLeft: s.navPadding,
                  paddingRight: s.navPadding,
                }}
              >
                <span
                  className="font-bold whitespace-nowrap"
                  style={{
                    fontSize: s.navFontSize,
                    color: isActive ? "#020073" : "#1A1A1A",
                  }}
                >
                  {item.label}
                </span>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Language switcher */}
      <div
        className="flex items-center h-full mt-5"
        style={{ gap: s.langGap, marginBottom: "clamp(12px, 1.5vw, 24px)" }}
      >
        <button
          className="font-bold cursor-pointer leading-none"
          style={{ fontSize: s.langFontSize, color: "#020073" }}
        >
          EN
        </button>
        <span
          className="font-light leading-none"
          style={{ fontSize: s.langFontSize, color: "#1A1A1A" }}
        >
          /
        </span>
        <button
          className="font-light cursor-pointer transition-colors duration-200 leading-none hover:text-[#020073]"
          style={{ fontSize: s.langFontSize, color: "#1A1A1A" }}
        >
          VN
        </button>
      </div>

      {/* Social icons — 2×2 grid */}
      <div
        className="grid grid-cols-2 items-center justify-items-center"
        style={{ gap: s.socialGridGap }}
      >
        {[
          { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
          { href: "https://linkedin.com",  label: "LinkedIn",  Icon: LinkedInIcon  },
          { href: "https://tiktok.com",    label: "TikTok",    Icon: TikTokIcon    },
          { href: "https://behance.net",   label: "Behance",   Icon: BehanceIcon   },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:opacity-60 transition-opacity duration-200"
            style={{ width: s.socialSize, height: s.socialSize, padding: "clamp(6px, 0.5vw, 10px)" }}
            aria-label={label}
          >
            <Icon />
          </a>
        ))}
      </div>
    </aside>
  );
}
