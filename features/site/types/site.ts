export type HomePageViewModel = {
  preview: boolean;
  profile: {
    name: string;
    title: string;
    location?: string;
    summary: string;
    heroIntro: string;
    availability: string;
    featuredLabel: string;
    email: string;
    githubUrl: string;
  };
  featuredProjects: ProjectCardViewModel[];
  allProjects: ProjectCardViewModel[];
  skillGroups: Array<{
    id: string;
    title: string;
    description: string;
    items: Array<{
      id: string;
      label: string;
      emphasis?: string;
    }>;
  }>;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    period: string;
    summary: string;
    highlights: string[];
  }>;
};

export type ProjectCardViewModel = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  summary: string;
  stack: string[];
  role: string;
  featured: boolean;
};

export type ProjectDetailViewModel = ProjectCardViewModel & {
  outcomes: string;
  repositoryUrl?: string;
  liveUrl?: string;
  coverImageUrl?: string;
  sections: Array<{
    key: "overview" | "impact" | "technical";
    heading: string;
    content: string;
  }>;
};
