import type { PortfolioPageData } from "@/features/portfolio/types/portfolio";

export const fallbackPortfolio: PortfolioPageData = {
  profile: {
    name: "Ville Syrjälä",
    title: "Software Developer",
    summary:
      "I build practical web and mobile products with a focus on maintainable code, clear UX, and real-world usefulness.",
    githubUrl: "https://github.com/kumina-dev",
    email: "ville.syrjala@protonmail.com",
    location: "Finland",
  },
  projects: [
    {
      id: "kuminaos",
      slug: "kuminaos",
      title: "KuminaOS",
      description:
        "An opinionated project showing product thinking, interface direction, and implementation work.",
      stack: ["TypeScript", "React", "Next.js"],
      repositoryUrl: "https://github.com/kumina-dev",
      featured: true,
      sortOrder: 1,
    },
    {
      id: "mobile-product-work",
      slug: "mobile-product-work",
      title: "Mobile Product Work",
      description:
        "Cross-platform app work built with Expo and React Native, focused on iteration speed and usable flows.",
      stack: ["Expo", "React Native", "TypeScript"],
      repositoryUrl: "https://github.com/kumina-dev",
      featured: true,
      sortOrder: 2,
    },
    {
      id: "backend-and-data",
      slug: "backend-and-data",
      title: "Backend and Data",
      description:
        "Backend-oriented work with Go, Prisma, SQL, and integrations.",
      stack: ["Go", "Prisma", "MySQL"],
      repositoryUrl: "https://github.com/kumina-dev",
      featured: true,
      sortOrder: 3,
    },
  ],
  skillGroups: [
    {
      id: "frontend",
      title: "Frontend",
      items: ["TypeScript", "React", "Next.js", "Expo", "React Native", "HTML", "CSS"],
      sortOrder: 1,
    },
    {
      id: "backend",
      title: "Backend and Data",
      items: ["Go", "Node.js", "Prisma", "PostgreSQL", "MySQL", "Firebase", "Supabase"],
      sortOrder: 2,
    },
    {
      id: "working-style",
      title: "Working Style",
      items: ["Product thinking", "Clean architecture", "Maintainable code", "Practical UX"],
      sortOrder: 3,
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Software Developer",
      company: "Independent and product-focused work",
      period: "Current",
      summary: "Building web and mobile products with TypeScript, React, Next.js, Expo, Go, and database-backed systems.",
      sortOrder: 1,
    },
    {
      id: "exp-2",
      role: "Earlier engineering work",
      company: "Various projects",
      period: "Past",
      summary: "Worked with SQL systems including MySQL and focused on practical implementation rather than decorative complexity.",
      sortOrder: 2,
    },
  ],
  contact: {
    email: "ville.syrjala@protonmail.com",
    githubUrl: "https://github.com/kumina-dev",
  },
};