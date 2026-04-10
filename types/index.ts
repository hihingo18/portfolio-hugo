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
  link?: string;
  cardBg: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface SkillGroup {
  title: string;
  icons: SkillIcon[];
}

export interface SkillIcon {
  name: string;
  svg: React.ReactNode;
}
