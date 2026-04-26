"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { HomeIcon, ProjectsIcon, AboutIcon } from "@/components/icons/NavIcons";
import { LinkedInIcon, InstagramIcon, TikTokIcon, BehanceIcon } from "@/components/icons/SocialIcons";
import { SunIcon, MoonIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { LOCALE_PREFIX_PATTERN, SOCIAL_LINKS } from "@/lib/constants";
import { COLORS, DARK_COLORS, SHADOWS, DARK_SHADOWS } from "@/lib/theme";
import type { Locale } from "@/lib/i18n";
import type { NavId, SectionId } from "@/types";

const SIDEBAR_MEASUREMENTS = {
  navGap: "clamp(8px, 0.8vw, 16px)",
  navMarginTop: "clamp(12px, 2vw, 40px)",
  navFontSize: "clamp(14px, 1.1vw, 20px)",
  navItemHeight: "clamp(44px, 3.2vw, 60px)",
  navItemWidth: "clamp(150px, 10.5vw, 200px)",
  navPadding: "clamp(10px, 0.8vw, 16px)",
  iconWidth: "clamp(26px, 1.8vw, 36px)",
  iconMargin: "clamp(8px, 0.7vw, 14px)",
  langFontSize: "clamp(13px, 1vw, 18px)",
  langGap: "clamp(4px, 0.4vw, 8px)",
  langMarginBottom: "clamp(12px, 1.5vw, 24px)",
  socialSize: "clamp(36px, 2.4vw, 48px)",
  socialGridGap: "clamp(4px, 0.4vw, 8px)",
  socialPadding: "clamp(6px, 0.5vw, 10px)",
} as const;

const NAV_ICONS: Record<NavId, typeof HomeIcon> = {
  home: HomeIcon,
  projects: ProjectsIcon,
  about: AboutIcon,
};

const SOCIAL_ICONS: Record<string, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
  behance: BehanceIcon,
};

const NAV_ORDER: NavId[] = ["home", "projects", "about"];

function buildLocalizedPath(pathname: string, locale: Locale): string {
  if (!pathname || pathname === "/") return `/${locale}`;

  if (LOCALE_PREFIX_PATTERN.test(pathname)) {
    return pathname.replace(LOCALE_PREFIX_PATTERN, `/${locale}`);
  }

  return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

interface SidebarProps {
  activeSection: SectionId;
  onNavClick: (id: NavId) => void;
}

export default function Sidebar({ activeSection, onNavClick }: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<NavId | null>(null);
  const { dict, locale } = useLocale();
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  const isDark = theme === "dark";
  const colors = isDark ? DARK_COLORS : COLORS;
  const shadows = isDark ? DARK_SHADOWS : SHADOWS;
  const navIconActiveColor = isDark ? DARK_COLORS.primary : COLORS.primary;
  const navIconDefaultColor = isDark ? "#e0e0e0" : "black";

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.href = buildLocalizedPath(pathname, newLocale);
  };

  return (
    <aside
      className="w-full h-full flex flex-col items-center overflow-hidden pb-8"
      style={{ backgroundColor: isDark ? "#0f0f0f" : "#ffffff" }}
    >
      {/* Avatar */}
      <div className="w-full flex items-center justify-center">
        <div className="relative overflow-hidden rounded-full w-[65%] aspect-square">
          <Image
            src="/images/avatar.png"
            alt="Hugo"
            fill
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-col flex-1 w-full items-center"
        style={{ gap: SIDEBAR_MEASUREMENTS.navGap, marginTop: SIDEBAR_MEASUREMENTS.navMarginTop }}
      >
        {NAV_ORDER.map((id) => {
          const isActive = activeSection === id;
          const IconComponent = NAV_ICONS[id];
          const label = dict.nav[id];

          return (
            <div
              key={id}
              className="flex items-center"
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{ width: SIDEBAR_MEASUREMENTS.iconWidth, marginRight: SIDEBAR_MEASUREMENTS.iconMargin }}
              >
                <IconComponent
                  active={isActive}
                  activeColor={navIconActiveColor}
                  defaultColor={navIconDefaultColor}
                />
              </span>

              <button
                onClick={() => onNavClick(id)}
                className={cn(
                  "relative flex items-center cursor-pointer transition-all duration-200 rounded"
                )}
                style={{
                  height: SIDEBAR_MEASUREMENTS.navItemHeight,
                  width: SIDEBAR_MEASUREMENTS.navItemWidth,
                  paddingLeft: SIDEBAR_MEASUREMENTS.navPadding,
                  paddingRight: SIDEBAR_MEASUREMENTS.navPadding,
                  backgroundColor:
                    isActive || hoveredId === id
                      ? colors.background
                      : "transparent",
                  boxShadow:
                    isActive && (hoveredId === null || hoveredId === id)
                      ? shadows.inset
                      : hoveredId === id && !isActive
                      ? `inset 2px 0 0 ${colors.primary}`
                      : "none",
                }}
              >
                <span
                  className="font-bold whitespace-nowrap"
                  style={{
                    fontSize: SIDEBAR_MEASUREMENTS.navFontSize,
                    color: isActive ? colors.primary : colors.text,
                  }}
                >
                  {label}
                </span>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Language switcher */}
      <div
        className="flex items-center h-full mt-5"
        style={{
          gap: SIDEBAR_MEASUREMENTS.langGap,
          marginBottom: SIDEBAR_MEASUREMENTS.langMarginBottom,
        }}
      >
        <button
          onClick={() => switchLocale("en")}
          className="cursor-pointer leading-none transition-all duration-200"
          style={{
            fontSize: SIDEBAR_MEASUREMENTS.langFontSize,
            color: locale === "en" ? colors.primary : colors.text,
            fontWeight: locale === "en" ? 700 : 300,
          }}
        >
          EN
        </button>
        <span
          className="font-light leading-none"
          style={{ fontSize: SIDEBAR_MEASUREMENTS.langFontSize, color: colors.text }}
        >
          /
        </span>
        <button
          onClick={() => switchLocale("vn")}
          className="cursor-pointer leading-none transition-all duration-200"
          style={{
            fontSize: SIDEBAR_MEASUREMENTS.langFontSize,
            color: locale === "vn" ? colors.primary : colors.text,
            fontWeight: locale === "vn" ? 700 : 300,
          }}
        >
          VN
        </button>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="flex items-center justify-center cursor-pointer transition-opacity duration-200 hover:opacity-60 mb-3"
        style={{ color: colors.text }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Social icons */}
      <div
        className="grid grid-cols-2 items-center justify-items-center"
        style={{ gap: SIDEBAR_MEASUREMENTS.socialGridGap }}
      >
        {SOCIAL_LINKS.map(({ id, href, label }) => {
          const Icon = SOCIAL_ICONS[id];

          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:opacity-60 transition-opacity duration-200"
              style={{
                width: SIDEBAR_MEASUREMENTS.socialSize,
                height: SIDEBAR_MEASUREMENTS.socialSize,
                padding: SIDEBAR_MEASUREMENTS.socialPadding,
                color: isDark ? "#e0e0e0" : "#000000",
              }}
              aria-label={label}
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </aside>
  );
}
