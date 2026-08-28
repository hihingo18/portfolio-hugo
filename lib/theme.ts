export type ColorTokens = {
  bgBase: string;
  bgPanel: string;
  bgHover: string;
  bgIconDefault: string;
  textBase: string;
  textMuted: string;
  textFaint: string;
  brandPrimary: string;
  brandHover: string;
  borderBase: string;
  borderStrong: string;
  statusSuccess: string;
  statusError: string;
  white: string;
};

export const COLOR_TOKENS: ColorTokens = {
  bgBase: "var(--background)",
  bgPanel: "var(--card)",
  bgHover: "var(--accent)",
  bgIconDefault: "var(--icon-default)",
  textBase: "var(--foreground)",
  textMuted: "var(--muted-foreground)",
  textFaint: "var(--text-faint)",
  brandPrimary: "var(--primary)",
  brandHover: "var(--primary-hover)",
  borderBase: "var(--border)",
  borderStrong: "var(--border-strong)",
  statusSuccess: "var(--status-success)",
  statusError: "var(--destructive)",
  white: "var(--on-brand)",
};
