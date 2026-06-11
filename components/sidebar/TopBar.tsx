"use client";

import { MenuIcon, SunIcon, MoonIcon } from "@/components/icons/UIIcons";
import { useTheme, useColors } from "@/context/ThemeContext";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { toggle } = useTheme();
  const colors = useColors();

  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-40 md:hidden border-b"
      style={{
        backgroundColor: colors.bgBase,
        borderColor: colors.isDark ? "#2a2a2a" : "#f1f1f1",
      }}
    >
      <button
        onClick={onMenuClick}
        className="flex items-center justify-center w-10 h-10 cursor-pointer"
        style={{ color: colors.textBase }}
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      <span className="font-bold text-lg tracking-wide" style={{ color: colors.brandPrimary }}>
        Hugo
      </span>

      <button
        onClick={toggle}
        className="flex items-center justify-center w-10 h-10 cursor-pointer transition-opacity hover:opacity-60"
        style={{ color: colors.textBase }}
        aria-label={colors.isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {colors.isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
