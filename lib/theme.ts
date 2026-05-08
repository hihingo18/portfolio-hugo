/**
 * Semantic color token system.
 *
 * Rule: never use raw hex codes in components.
 * Import `useColors()` from ThemeContext, pick a token by name.
 *
 * Token anatomy
 * ─────────────
 * bg*        → background fills
 * text*      → foreground / text colors
 * brand*     → accent / interactive brand color
 * border*    → dividers and outlines
 * status*    → feedback colors (success / error)
 * white      → always #fff (text on colored buttons)
 */

export type ColorTokens = {
  // ── Backgrounds ───────────────────────────────────────────────────────────
  /** Main page / section background */
  bgBase: string;
  /** Panels, slide-in drawers, contact panel */
  bgPanel: string;
  /** Hover / active state fills (e.g. nav buttons) */
  bgHover: string;
  /** Dark circle / icon background (e.g. return arrow button) */
  bgIconDefault: string;

  // ── Text ──────────────────────────────────────────────────────────────────
  /** Primary body text */
  textBase: string;
  /** Secondary / helper text */
  textMuted: string;
  /** Tertiary / caption text */
  textFaint: string;

  // ── Brand / Interactive ────────────────────────────────────────────────────
  /** Primary accent: CTA backgrounds, active nav, link hover */
  brandPrimary: string;
  /** Pressed / hover state of brandPrimary */
  brandHover: string;

  // ── Borders ───────────────────────────────────────────────────────────────
  /** Default dividers (sidebar border, section separators) */
  borderBase: string;
  /** Stronger dividers (contact panel section separator) */
  borderStrong: string;

  // ── Status ────────────────────────────────────────────────────────────────
  statusSuccess: string;
  statusError: string;

  // ── Constant ──────────────────────────────────────────────────────────────
  /** Always #ffffff — for text / icons placed on colored backgrounds */
  white: string;
};

// ─── Light tokens ─────────────────────────────────────────────────────────────
export const LIGHT_TOKENS: ColorTokens = {
  bgBase: "#ffffff",
  bgPanel: "#f6f9f7",
  bgHover: "#f6f9f7",
  bgIconDefault: "#000000",

  textBase: "#1A1A1A",
  textMuted: "#757575",
  textFaint: "#777",

  brandPrimary: "#020073",
  brandHover: "rgb(0, 0, 54)",

  borderBase: "#f1f1f1",
  borderStrong: "#808080",

  statusSuccess: "#4338ca",
  statusError: "#CC2927",

  white: "#ffffff",
};

// ─── Dark tokens ──────────────────────────────────────────────────────────────
export const DARK_TOKENS: ColorTokens = {
  bgBase: "#0f0f0f",
  bgPanel: "#141414",
  bgHover: "#1a1a1a",
  bgIconDefault: "#2a2a2a",

  textBase: "#e0e0e0",
  textMuted: "#a0a0a0",
  textFaint: "#888",

  brandPrimary: "#6b9fff",
  brandHover: "#5585ef",

  borderBase: "#2a2a2a",
  borderStrong: "#3a3a3a",

  statusSuccess: "#6b9fff",
  statusError: "#ff6b6b",

  white: "#ffffff",
};

/** Returns the correct token set for the given theme. */
export function getColors(isDark: boolean): ColorTokens {
  return isDark ? DARK_TOKENS : LIGHT_TOKENS;
}

// ─── Legacy aliases (kept so existing code keeps compiling) ──────────────────
/** @deprecated Use `useColors()` from ThemeContext instead. */
export const COLORS = {
  primary: LIGHT_TOKENS.brandPrimary,
  primaryDark: LIGHT_TOKENS.brandHover,
  white: LIGHT_TOKENS.white,
  black: "#000000",
  background: LIGHT_TOKENS.bgPanel,
  border: LIGHT_TOKENS.borderBase,
  text: LIGHT_TOKENS.textBase,
  textSecondary: LIGHT_TOKENS.textMuted,
  textTertiary: LIGHT_TOKENS.textFaint,
  success: LIGHT_TOKENS.statusSuccess,
  error: LIGHT_TOKENS.statusError,
} as const;

/** @deprecated Use `useColors()` from ThemeContext instead. */
export const DARK_COLORS = {
  primary: DARK_TOKENS.brandPrimary,
  primaryDark: DARK_TOKENS.brandHover,
  white: DARK_TOKENS.white,
  black: DARK_TOKENS.textBase,
  background: DARK_TOKENS.bgHover,
  border: DARK_TOKENS.borderBase,
  text: DARK_TOKENS.textBase,
  textSecondary: DARK_TOKENS.textMuted,
  textTertiary: DARK_TOKENS.textFaint,
  success: DARK_TOKENS.statusSuccess,
  error: DARK_TOKENS.statusError,
} as const;

/** @deprecated Compute inline: `inset 2px 0 0 ${colors.brandPrimary}` */
export const SHADOWS = { inset: `inset 2px 0 0 ${LIGHT_TOKENS.brandPrimary}` } as const;
/** @deprecated Compute inline: `inset 2px 0 0 ${colors.brandPrimary}` */
export const DARK_SHADOWS = { inset: `inset 2px 0 0 ${DARK_TOKENS.brandPrimary}` } as const;
