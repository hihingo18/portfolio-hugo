export const LOCALE_PREFIX_PATTERN = /^\/(en|vn)(?=\/|$)/;

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

// Contact details — single source of truth for the contact panel and the /api/contact mailer.
export const CONTACT = {
  // Shown on the "Work with me" panel and used as the recipient for contact-form submissions.
  email: "hugo.strong88@gmail.com",
  phone: "(+84) 944 548 222",
  // Sender for the outgoing notification email (Resend "from" header).
  fromEmail: "Portfolio Contact <onboarding@resend.dev>",
} as const;

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
