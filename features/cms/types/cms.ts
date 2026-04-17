export type PublishingStatus = "draft" | "published";

export type CmsProfileRecord = {
  id: string;
  name: string;
  title: string;
  location: string | null;
  summary: string;
  hero_intro: string;
  availability: string;
  email: string;
  github_url: string;
  featured_label: string;
  status: PublishingStatus;
  published_at: string | null;
  updated_at: string;
};

export type CmsProjectRecord = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  summary: string;
  role: string;
  outcomes: string;
  stack: string[];
  repository_url: string | null;
  live_url: string | null;
  cover_image_url: string | null;
  featured: boolean;
  sort_order: number;
  status: PublishingStatus;
  published_at: string | null;
  updated_at: string;
};

export type CmsProjectSectionKey = "overview" | "impact" | "technical";

export type CmsProjectSectionRecord = {
  id: string;
  project_id: string;
  section_key: CmsProjectSectionKey;
  heading: string;
  content: string;
  sort_order: number;
};

export type CmsSkillGroupRecord = {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  status: PublishingStatus;
  published_at: string | null;
  updated_at: string;
};

export type CmsSkillItemRecord = {
  id: string;
  skill_group_id: string;
  label: string;
  emphasis: string | null;
  sort_order: number;
};

export type CmsExperienceRecord = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  sort_order: number;
  status: PublishingStatus;
  published_at: string | null;
  updated_at: string;
};

export type CmsProjectEditorInput = {
  id?: string;
  title: string;
  slug: string;
  headline: string;
  summary: string;
  role: string;
  outcomes: string;
  stack: string[];
  repositoryUrl: string;
  liveUrl: string;
  coverImageUrl: string;
  featured: boolean;
  sortOrder: number;
  overviewHeading: string;
  overviewContent: string;
  impactHeading: string;
  impactContent: string;
  technicalHeading: string;
  technicalContent: string;
};

export type CmsProfileEditorInput = {
  name: string;
  title: string;
  location: string;
  summary: string;
  heroIntro: string;
  availability: string;
  email: string;
  githubUrl: string;
  featuredLabel: string;
};

export type CmsSkillGroupEditorInput = {
  id?: string;
  title: string;
  description: string;
  items: Array<{
    label: string;
    emphasis: string;
  }>;
  sortOrder: number;
};

export type CmsExperienceEditorInput = {
  id?: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  sortOrder: number;
};

export type CmsProjectBundle = {
  project: CmsProjectRecord;
  sections: CmsProjectSectionRecord[];
};

export type CmsSkillGroupBundle = {
  group: CmsSkillGroupRecord;
  items: CmsSkillItemRecord[];
};

export type CmsDashboardSummary = {
  profileStatus: PublishingStatus | "missing";
  projectCount: number;
  publishedProjectCount: number;
  skillGroupCount: number;
  publishedSkillGroupCount: number;
  experienceCount: number;
  publishedExperienceCount: number;
  lastUpdatedLabel: string;
  missingCollections: string[];
};
