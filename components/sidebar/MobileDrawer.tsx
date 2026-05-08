"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { HomeIcon, ProjectsIcon, SkillsIcon, AboutIcon } from "@/components/icons/NavIcons";
import { LinkedInIcon, InstagramIcon, TikTokIcon, BehanceIcon } from "@/components/icons/SocialIcons";
import { CloseIcon, SunIcon, MoonIcon } from "@/components/icons/UIIcons";
import { useLocale } from "@/context/LocaleContext";
import { useTheme, useColors } from "@/context/ThemeContext";
import { LOCALE_PREFIX_PATTERN, SOCIAL_LINKS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import type { NavId, SectionId } from "@/types";

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

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: SectionId;
  onNavClick: (id: NavId) => void;
}

export default function MobileDrawer({ isOpen, onClose, activeSection, onNavClick }: MobileDrawerProps) {
  const { dict, locale } = useLocale();
  const { toggle } = useTheme();
  const colors = useColors();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.href = buildLocalizedPath(pathname, newLocale);
  };

  const handleNavClick = (id: NavId) => {
    onNavClick(id);
    onClose();
  };

  const borderColor = colors.isDark ? "#2a2a2a" : "#f1f1f1";

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[55] md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-[60] md:hidden flex flex-col transition-transform duration-300 ease-out border-r",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: colors.bgBase, borderColor }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 h-14 border-b shrink-0"
          style={{ borderColor }}
        >
          <span className="font-bold text-lg" style={{ color: colors.brandPrimary }}>
            Hugo
          </span>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 cursor-pointer hover:opacity-60 transition-opacity"
            style={{ color: colors.textBase }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-3 pt-6 gap-1 flex-1 overflow-y-auto">
          {NAV_ORDER.map((id) => {
            const isActive = activeSection === id;
            const IconComponent = NAV_ICONS[id];
            const label = dict.nav[id];
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left w-full cursor-pointer"
                style={{
                  backgroundColor: isActive ? colors.bgHover : "transparent",
                  boxShadow: isActive ? `inset 3px 0 0 ${colors.brandPrimary}` : "none",
                }}
              >
                <IconComponent
                  active={isActive}
                  activeColor={colors.brandPrimary}
                  defaultColor={colors.textBase}
                />
                <span
                  className="font-semibold text-base"
                  style={{ color: isActive ? colors.brandPrimary : colors.textBase }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="px-6 pb-8 flex flex-col gap-5">
          {/* Language switcher */}
          <div className="flex items-center gap-3">
            {(["en", "vn"] as Locale[]).map((lang, i, arr) => (
              <span key={lang} className="flex items-center gap-3">
                <button
                  onClick={() => switchLocale(lang)}
                  className="cursor-pointer text-sm transition-all duration-200"
                  style={{
                    color: locale === lang ? colors.brandPrimary : colors.textBase,
                    fontWeight: locale === lang ? 700 : 400,
                  }}
                >
                  {lang.toUpperCase()}
                </button>
                {i < arr.length - 1 && (
                  <span className="text-sm font-light" style={{ color: colors.textBase }}>/</span>
                )}
              </span>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity"
            style={{ color: colors.textBase }}
            aria-label={colors.isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {colors.isDark ? <SunIcon /> : <MoonIcon />}
            <span className="text-sm">{colors.isDark ? "Light mode" : "Dark mode"}</span>
          </button>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(({ id, href, label }) => {
              const Icon = SOCIAL_ICONS[id];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 hover:opacity-60 transition-opacity"
                  style={{ color: colors.textBase }}
                  aria-label={label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
