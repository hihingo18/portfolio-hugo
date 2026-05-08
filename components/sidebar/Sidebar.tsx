"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { HomeIcon, ProjectsIcon, SkillsIcon, AboutIcon } from "@/components/icons/NavIcons";
import { LinkedInIcon, InstagramIcon, TikTokIcon, BehanceIcon } from "@/components/icons/SocialIcons";
import { SunIcon, MoonIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useTheme, useColors } from "@/context/ThemeContext";
import { LOCALE_PREFIX_PATTERN, SOCIAL_LINKS } from "@/lib/constants";
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
  skills: SkillsIcon,
  about: AboutIcon,
};

const SOCIAL_ICONS: Record<string, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
  behance: BehanceIcon,
};

const NAV_ORDER: NavId[] = ["home", "projects", "skills", "about"];

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
  const { toggle } = useTheme();
  const colors = useColors();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.href = buildLocalizedPath(pathname, newLocale);
  };

  return (
    <aside
      className="w-full h-full flex flex-col items-center overflow-hidden pb-8"
      style={{ backgroundColor: colors.bgBase }}
    >
      {/* Avatar — hidden on tablet, visible on desktop */}
      <div className="hidden lg:flex w-full items-center justify-center">
        <div className="relative overflow-hidden rounded-full w-[50%] aspect-square">
          <Image src="/images/avatar.webp" alt="Hugo" fill priority />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-col flex-1 w-full items-center px-1 lg:px-10"
        style={{ gap: SIDEBAR_MEASUREMENTS.navGap, marginTop: SIDEBAR_MEASUREMENTS.navMarginTop }}
      >
        {NAV_ORDER.map((id) => {
          const isActive = activeSection === id;
          const IconComponent = NAV_ICONS[id];
          const label = dict.nav[id];
          const isHovered = hoveredId === id;

          return (
            <button
              key={id}
              onClick={() => onNavClick(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "relative flex items-center justify-center lg:justify-start w-full rounded-xl cursor-pointer transition-all duration-200"
              )}
              style={{
                height: SIDEBAR_MEASUREMENTS.navItemHeight,
                paddingLeft: SIDEBAR_MEASUREMENTS.navPadding,
                paddingRight: SIDEBAR_MEASUREMENTS.navPadding,
                backgroundColor: isActive || isHovered ? colors.bgHover : "transparent",
              }}
            >
              {/* Left border indicator — desktop only */}
              {(isActive || isHovered) && (
                <span
                  className="hidden lg:block absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                  style={{ backgroundColor: colors.brandPrimary }}
                />
              )}
              <span
                className="shrink-0 flex items-center justify-center"
                style={{ width: SIDEBAR_MEASUREMENTS.iconWidth }}
              >
                <IconComponent
                  active={isActive}
                  activeColor={colors.brandPrimary}
                  defaultColor={colors.textBase}
                />
              </span>
              <span
                className="hidden lg:block font-bold whitespace-nowrap"
                style={{
                  marginLeft: SIDEBAR_MEASUREMENTS.iconMargin,
                  fontSize: SIDEBAR_MEASUREMENTS.navFontSize,
                  color: isActive ? colors.brandPrimary : colors.textBase,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Language switcher */}
      <div
        className="flex items-center h-full mt-5"
        style={{ gap: SIDEBAR_MEASUREMENTS.langGap, marginBottom: SIDEBAR_MEASUREMENTS.langMarginBottom }}
      >
        <button
          onClick={() => switchLocale("en")}
          className="cursor-pointer leading-none transition-all duration-200"
          style={{
            fontSize: SIDEBAR_MEASUREMENTS.langFontSize,
            color: locale === "en" ? colors.brandPrimary : colors.textBase,
            fontWeight: locale === "en" ? 700 : 300,
          }}
        >
          EN
        </button>
        <span
          className="font-light leading-none"
          style={{ fontSize: SIDEBAR_MEASUREMENTS.langFontSize, color: colors.textBase }}
        >
          /
        </span>
        <button
          onClick={() => switchLocale("vn")}
          className="cursor-pointer leading-none transition-all duration-200"
          style={{
            fontSize: SIDEBAR_MEASUREMENTS.langFontSize,
            color: locale === "vn" ? colors.brandPrimary : colors.textBase,
            fontWeight: locale === "vn" ? 700 : 300,
          }}
        >
          VN
        </button>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="flex items-center justify-center cursor-pointer transition-opacity duration-200 hover:opacity-60 mb-20"
        style={{ color: colors.textBase }}
        aria-label={colors.isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {colors.isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Social icons — hidden on tablet, visible on desktop */}
      <div
        className="hidden lg:grid grid-cols-2 items-center justify-items-center"
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
                color: colors.textBase,
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
