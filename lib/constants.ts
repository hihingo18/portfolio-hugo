export const LOCALE_PREFIX_PATTERN = /^\/(en|vn)(?=\/|$)/ as RegExp;

export const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hieu-ngo-75b4b1301/",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/hihingo18",
  },
] as const;

// Form constraints
export const FORM_CONSTRAINTS = {
  email: {
    maxLength: 255,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  name: {
    minLength: 2,
    maxLength: 100,
  },
  message: {
    minLength: 10,
    maxLength: 5000,
  },
} as const;
