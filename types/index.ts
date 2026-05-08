export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  image: string;
  imageDark: string;
  link?: string;
  cardBg: string;
  role: string;
  stack: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
}

export type SectionId = "home" | "projects" | "skills" | "trust" | "about";
export type NavId = "home" | "projects" | "skills" | "about";
