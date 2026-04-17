import type {
  CmsExperienceRecord,
  CmsProfileRecord,
  CmsProjectRecord,
  CmsProjectSectionRecord,
  CmsSkillGroupRecord,
  CmsSkillItemRecord,
} from "@/features/cms/types/cms";

const now = "2026-04-17T00:00:00.000Z";

export const fallbackProfileRecord: CmsProfileRecord = {
  id: "fallback-profile",
  name: "Ville Syrjälä",
  title: "Software developer building durable product systems",
  location: "Finland",
  summary:
    "I design and ship product-focused web experiences with a bias toward clean architecture, clear interfaces, and practical outcomes.",
  hero_intro:
    "I help teams turn ambiguous product ideas into reliable interfaces and maintainable codebases.",
  availability:
    "Available for product engineering roles that value ownership, delivery, and technical clarity.",
  email: "ville.syrjala@protonmail.com",
  github_url: "https://github.com/kumina-dev",
  featured_label: "Open to product engineering roles",
  status: "published",
  published_at: now,
  updated_at: now,
};

export const fallbackProjectRecords: CmsProjectRecord[] = [
  {
    id: "project-kuminaos",
    slug: "kuminaos",
    title: "KuminaOS",
    headline: "Opinionated product architecture for a portfolio-scale operating surface",
    summary:
      "A concept-heavy product that combines interface direction, structured content modeling, and implementation discipline.",
    role: "Product design, full-stack implementation, information architecture",
    outcomes:
      "Created a coherent system that shows product thinking, implementation quality, and narrative clarity in one artifact.",
    stack: ["TypeScript", "React", "Next.js", "Supabase"],
    repository_url: "https://github.com/kumina-dev",
    live_url: null,
    cover_image_url: null,
    featured: true,
    sort_order: 1,
    status: "published",
    published_at: now,
    updated_at: now,
  },
  {
    id: "project-mobile-product-work",
    slug: "mobile-product-work",
    title: "Mobile Product Work",
    headline: "Cross-platform app work tuned for iteration speed and usable flows",
    summary:
      "A collection of mobile product work focused on getting from concept to validated experience quickly.",
    role: "Frontend architecture, UX implementation, iteration strategy",
    outcomes:
      "Reduced friction in app flows and shipped maintainable cross-platform interfaces with a small surface area.",
    stack: ["Expo", "React Native", "TypeScript"],
    repository_url: "https://github.com/kumina-dev",
    live_url: null,
    cover_image_url: null,
    featured: true,
    sort_order: 2,
    status: "published",
    published_at: now,
    updated_at: now,
  },
  {
    id: "project-backend-and-data",
    slug: "backend-and-data",
    title: "Backend and Data Systems",
    headline: "Structured backends and integrations built to support product delivery",
    summary:
      "Backend-oriented work covering APIs, data models, and operational decisions that keep products stable as they evolve.",
    role: "Backend development, schema design, integrations",
    outcomes:
      "Delivered clearer data contracts and reduced complexity around persistence, tooling, and connected services.",
    stack: ["Go", "Node.js", "PostgreSQL", "Prisma", "Supabase"],
    repository_url: "https://github.com/kumina-dev",
    live_url: null,
    cover_image_url: null,
    featured: false,
    sort_order: 3,
    status: "published",
    published_at: now,
    updated_at: now,
  },
];

export const fallbackProjectSectionRecords: CmsProjectSectionRecord[] = [
  {
    id: "section-kuminaos-overview",
    project_id: "project-kuminaos",
    section_key: "overview",
    heading: "Overview",
    content:
      "This project packages product storytelling and technical structure into one experience so a reviewer can understand both taste and execution quickly.",
    sort_order: 1,
  },
  {
    id: "section-kuminaos-impact",
    project_id: "project-kuminaos",
    section_key: "impact",
    heading: "Impact",
    content:
      "It demonstrates that I can shape an information architecture, define a reusable system, and implement the final interface rather than stopping at concepts.",
    sort_order: 2,
  },
  {
    id: "section-kuminaos-technical",
    project_id: "project-kuminaos",
    section_key: "technical",
    heading: "Technical notes",
    content:
      "The emphasis was on separating content modeling from presentation and keeping the system maintainable as the surface area grows.",
    sort_order: 3,
  },
  {
    id: "section-mobile-overview",
    project_id: "project-mobile-product-work",
    section_key: "overview",
    heading: "Overview",
    content:
      "Mobile product work centered on practical flows, shipping discipline, and the ability to iterate without creating long-term UI debt.",
    sort_order: 1,
  },
  {
    id: "section-mobile-impact",
    project_id: "project-mobile-product-work",
    section_key: "impact",
    heading: "Impact",
    content:
      "The result was a more usable app surface with faster iteration cycles and clearer boundaries between product logic and interface logic.",
    sort_order: 2,
  },
  {
    id: "section-mobile-technical",
    project_id: "project-mobile-product-work",
    section_key: "technical",
    heading: "Technical notes",
    content:
      "The implementation prioritized stable TypeScript contracts and components that could be reused across screens without becoming generic mush.",
    sort_order: 3,
  },
  {
    id: "section-backend-overview",
    project_id: "project-backend-and-data",
    section_key: "overview",
    heading: "Overview",
    content:
      "This body of work focused on the systems behind the interface: APIs, schema design, persistence, and operational clarity.",
    sort_order: 1,
  },
  {
    id: "section-backend-impact",
    project_id: "project-backend-and-data",
    section_key: "impact",
    heading: "Impact",
    content:
      "It improved reliability and reduced ambiguity by making data contracts, workflows, and operational constraints explicit.",
    sort_order: 2,
  },
  {
    id: "section-backend-technical",
    project_id: "project-backend-and-data",
    section_key: "technical",
    heading: "Technical notes",
    content:
      "Work included shaping schemas, query behavior, and integration boundaries so product changes would not turn into backend instability.",
    sort_order: 3,
  },
];

export const fallbackSkillGroupRecords: CmsSkillGroupRecord[] = [
  {
    id: "skills-frontend",
    title: "Frontend systems",
    description: "Interface work that balances product clarity with maintainable implementation.",
    sort_order: 1,
    status: "published",
    published_at: now,
    updated_at: now,
  },
  {
    id: "skills-backend",
    title: "Backend and data",
    description: "Persistence, contracts, and integrations that hold up under iteration.",
    sort_order: 2,
    status: "published",
    published_at: now,
    updated_at: now,
  },
  {
    id: "skills-working-style",
    title: "Working style",
    description: "Product-facing engineering habits that keep work useful and durable.",
    sort_order: 3,
    status: "published",
    published_at: now,
    updated_at: now,
  },
];

export const fallbackSkillItemRecords: CmsSkillItemRecord[] = [
  { id: "skill-1", skill_group_id: "skills-frontend", label: "TypeScript", emphasis: "Strong", sort_order: 1 },
  { id: "skill-2", skill_group_id: "skills-frontend", label: "React", emphasis: "Strong", sort_order: 2 },
  { id: "skill-3", skill_group_id: "skills-frontend", label: "Next.js", emphasis: "Strong", sort_order: 3 },
  { id: "skill-4", skill_group_id: "skills-frontend", label: "Expo", emphasis: "Working", sort_order: 4 },
  { id: "skill-5", skill_group_id: "skills-backend", label: "Go", emphasis: "Working", sort_order: 1 },
  { id: "skill-6", skill_group_id: "skills-backend", label: "Supabase", emphasis: "Strong", sort_order: 2 },
  { id: "skill-7", skill_group_id: "skills-backend", label: "Prisma", emphasis: "Strong", sort_order: 3 },
  { id: "skill-8", skill_group_id: "skills-backend", label: "PostgreSQL", emphasis: "Strong", sort_order: 4 },
  { id: "skill-9", skill_group_id: "skills-working-style", label: "Product thinking", emphasis: "Core", sort_order: 1 },
  { id: "skill-10", skill_group_id: "skills-working-style", label: "Information architecture", emphasis: "Core", sort_order: 2 },
  { id: "skill-11", skill_group_id: "skills-working-style", label: "Maintainable systems", emphasis: "Core", sort_order: 3 },
];

export const fallbackExperienceRecords: CmsExperienceRecord[] = [
  {
    id: "experience-1",
    role: "Software Developer",
    company: "Independent and product-focused work",
    period: "Current",
    summary:
      "Building web and mobile products with a focus on product clarity, maintainable architecture, and fast delivery loops.",
    highlights: ["TypeScript and React systems", "Product-led implementation", "Architecture cleanup and delivery"],
    sort_order: 1,
    status: "published",
    published_at: now,
    updated_at: now,
  },
  {
    id: "experience-2",
    role: "Engineering contributor",
    company: "Earlier project work",
    period: "Previously",
    summary:
      "Worked across frontend and backend concerns with an emphasis on shipping usable features instead of decorative complexity.",
    highlights: ["Database-backed apps", "Operational pragmatism", "Usable interfaces"],
    sort_order: 2,
    status: "published",
    published_at: now,
    updated_at: now,
  },
];
