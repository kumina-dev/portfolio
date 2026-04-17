export type PortfolioSectionKey =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact";

export type PortfolioProfile = {
  name: string;
  title: string;
  summary: string;
  location?: string;
  githubUrl: string;
  email: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  featured: boolean;
  sortOrder: number;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
  sortOrder: number;
};

export type PortfolioExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  sortOrder: number;
};

export type PortfolioContact = {
  email: string;
  githubUrl: string;
};

export type PortfolioPageData = {
  profile: PortfolioProfile;
  projects: PortfolioProject[];
  skillGroups: SkillGroup[];
  experience: PortfolioExperienceItem[];
  contact: PortfolioContact;
};