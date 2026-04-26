"use client";

import { createContext, useContext, useState } from "react";
import { getColors, type ColorTokens } from "@/lib/theme";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.cookie = `theme=${next};path=/;max-age=31536000`;
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/**
 * Returns semantic color tokens for the current theme, plus a convenience
 * `isDark` flag.
 *
 * Usage in any client component:
 * ```tsx
 * const colors = useColors();
 * // colors.bgBase, colors.textBase, colors.brandPrimary, colors.isDark …
 * ```
 */
export function useColors(): ColorTokens & { isDark: boolean } {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return { ...getColors(isDark), isDark };
}
