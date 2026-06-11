"use client";

import { usePathname } from "next/navigation";
import { HomeIcon, ProjectsIcon, SkillsIcon, AboutIcon } from "@/components/icons/NavIcons";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";
import { useLocale } from "@/context/LocaleContext";
import { LOCALE_PREFIX_PATTERN } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import type { NavId } from "@/types";

export const NAV_ORDER: NavId[] = ["home", "projects", "skills", "about"];

export const NAV_ICONS: Record<NavId, typeof HomeIcon> = {
  home: HomeIcon,
  projects: ProjectsIcon,
  skills: SkillsIcon,
  about: AboutIcon,
};

export const SOCIAL_ICONS: Record<string, typeof LinkedInIcon> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

function buildLocalizedPath(pathname: string, locale: Locale): string {
  if (!pathname || pathname === "/") return `/${locale}`;
  if (LOCALE_PREFIX_PATTERN.test(pathname)) {
    return pathname.replace(LOCALE_PREFIX_PATTERN, `/${locale}`);
  }
  return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function useSwitchLocale() {
  const { locale } = useLocale();
  const pathname = usePathname();

  return (newLocale: Locale) => {
    if (newLocale === locale) return;
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.href = buildLocalizedPath(pathname, newLocale);
  };
}
