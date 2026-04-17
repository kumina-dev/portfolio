import type {
  PortfolioContact,
  PortfolioExperienceItem,
  PortfolioPageData,
  PortfolioProfile,
  PortfolioProject,
  SkillGroup,
} from "../types/portfolio";

type ProfileRow = {
  name: string;
  title: string;
  summary: string;
  location: string | null;
  github_url: string;
  email: string;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  repository_url: string | null;
  live_url: string | null;
  featured: boolean;
  sort_order: number;
};

type SkillGroupRow = {
  id: string;
  title: string;
  items: string[];
  sort_order: number;
};

type ExperienceRow = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  sort_order: number;
};

export function mapProfile(row: ProfileRow): PortfolioProfile {
  return {
    name: row.name,
    title: row.title,
    summary: row.summary,
    location: row.location ?? undefined,
    githubUrl: row.github_url,
    email: row.email,
  };
}

export function mapProject(row: ProjectRow): PortfolioProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    stack: row.stack,
    repositoryUrl: row.repository_url ?? undefined,
    liveUrl: row.live_url ?? undefined,
    featured: row.featured,
    sortOrder: row.sort_order,
  };
}

export function mapSkillGroup(row: SkillGroupRow): SkillGroup {
  return {
    id: row.id,
    title: row.title,
    items: row.items,
    sortOrder: row.sort_order,
  };
}

export function mapExperienceItem(row: ExperienceRow): PortfolioExperienceItem {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    summary: row.summary,
    sortOrder: row.sort_order,
  };
}

export function buildContact(profile: PortfolioProfile): PortfolioContact {
  return {
    email: profile.email,
    githubUrl: profile.githubUrl,
  };
}

export function buildPortfolioPageData(input: {
  profile: ProfileRow;
  projects: ProjectRow[];
  skillGroups: SkillGroupRow[];
  experience: ExperienceRow[];
}): PortfolioPageData {
  const profile = mapProfile(input.profile);

  return {
    profile,
    projects: input.projects.map(mapProject),
    skillGroups: input.skillGroups.map(mapSkillGroup),
    experience: input.experience.map(mapExperienceItem),
    contact: buildContact(profile),
  };
}