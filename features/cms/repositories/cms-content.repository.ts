import {
  fallbackExperienceRecords,
  fallbackProfileRecord,
  fallbackProjectRecords,
  fallbackProjectSectionRecords,
  fallbackSkillGroupRecords,
  fallbackSkillItemRecords,
} from "@/content/cms/fallback-site-content";
import { createSupabaseAdminClient } from "@/integrations/supabase/admin";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { createSupabaseServerAuthClient } from "@/integrations/supabase/server-auth";
import type { Database, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import type {
  CmsDashboardSummary,
  CmsExperienceEditorInput,
  CmsExperienceRecord,
  CmsProfileEditorInput,
  CmsProfileRecord,
  CmsProjectBundle,
  CmsProjectEditorInput,
  CmsProjectRecord,
  CmsProjectSectionRecord,
  CmsSkillGroupBundle,
  CmsSkillGroupEditorInput,
  CmsSkillGroupRecord,
  CmsSkillItemRecord,
  PublishingStatus,
} from "../types/cms";

type RepositoryOptions = {
  includeDraft?: boolean;
};

type LegacyProfileRow = Database["public"]["Tables"]["portfolio_profile"]["Row"];
type LegacyProjectRow = Database["public"]["Tables"]["portfolio_projects"]["Row"];
type LegacySkillGroupRow = Database["public"]["Tables"]["portfolio_skill_groups"]["Row"];
type LegacyExperienceRow = Database["public"]["Tables"]["portfolio_experience_items"]["Row"];

function isPublishedOnly(includeDraft?: boolean) {
  return !includeDraft;
}

function maybePublishedFilter<T extends { status: PublishingStatus }>(
  items: T[],
  includeDraft?: boolean,
) {
  if (includeDraft) {
    return items;
  }

  return items.filter((item) => item.status === "published");
}

function isMissingRelationError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    ["42P01", "PGRST205"].includes((error as { code?: string }).code ?? "")
  );
}

function nowIso() {
  return new Date().toISOString();
}

function statusToPublishedAt(status: PublishingStatus) {
  return status === "published" ? nowIso() : null;
}

async function getCmsReadClient(includeDraft?: boolean) {
  if (includeDraft) {
    return createSupabaseAdminClient() ?? (await createSupabaseServerAuthClient());
  }

  return createSupabaseServerClient();
}

function buildProjectSections(
  projectId: string,
  input: CmsProjectEditorInput,
): TablesInsert<"cms_project_sections">[] {
  return [
    {
      project_id: projectId,
      section_key: "overview",
      heading: input.overviewHeading,
      content: input.overviewContent,
      sort_order: 1,
    },
    {
      project_id: projectId,
      section_key: "impact",
      heading: input.impactHeading,
      content: input.impactContent,
      sort_order: 2,
    },
    {
      project_id: projectId,
      section_key: "technical",
      heading: input.technicalHeading,
      content: input.technicalContent,
      sort_order: 3,
    },
  ];
}

function buildSkillItems(
  skillGroupId: string,
  items: CmsSkillGroupEditorInput["items"],
): TablesInsert<"cms_skill_items">[] {
  return items.map((item, index) => ({
    skill_group_id: skillGroupId,
    label: item.label,
    emphasis: item.emphasis || null,
    sort_order: index + 1,
  }));
}

function serializeProjectSections(input: CmsProjectEditorInput) {
  return buildProjectSections("00000000-0000-0000-0000-000000000000", input).map(
    ({ section_key, heading, content, sort_order }) => ({
      section_key,
      heading,
      content,
      sort_order,
    }),
  );
}

function serializeSkillItems(input: CmsSkillGroupEditorInput) {
  return buildSkillItems("00000000-0000-0000-0000-000000000000", input.items).map(
    ({ label, emphasis, sort_order }) => ({
      label,
      emphasis,
      sort_order,
    }),
  );
}

function fallbackProjectBundles(includeDraft?: boolean): CmsProjectBundle[] {
  const projects = maybePublishedFilter(fallbackProjectRecords, includeDraft);

  return projects.map((project) => ({
    project,
    sections: fallbackProjectSectionRecords.filter(
      (section) => section.project_id === project.id,
    ),
  }));
}

function fallbackSkillGroupBundles(includeDraft?: boolean): CmsSkillGroupBundle[] {
  const groups = maybePublishedFilter(fallbackSkillGroupRecords, includeDraft);

  return groups.map((group) => ({
    group,
    items: fallbackSkillItemRecords.filter((item) => item.skill_group_id === group.id),
  }));
}

function mapLegacyProfile(row: LegacyProfileRow): CmsProfileRecord {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    location: row.location,
    summary: row.summary,
    hero_intro: row.summary,
    availability: "Available for product engineering roles.",
    email: row.email,
    github_url: row.github_url,
    featured_label: "Legacy portfolio content",
    status: "published",
    published_at: row.updated_at,
    updated_at: row.updated_at,
  };
}

function mapLegacyProject(row: LegacyProjectRow): CmsProjectBundle {
  return {
    project: {
      id: row.id,
      slug: row.slug,
      title: row.title,
      headline: row.description,
      summary: row.description,
      role: "Legacy portfolio project",
      outcomes: row.description,
      stack: row.stack,
      repository_url: row.repository_url,
      live_url: row.live_url,
      cover_image_url: null,
      featured: row.featured,
      sort_order: row.sort_order,
      status: "published",
      published_at: row.updated_at,
      updated_at: row.updated_at,
    },
    sections: [
      {
        id: `${row.id}-overview`,
        project_id: row.id,
        section_key: "overview",
        heading: "Overview",
        content: row.description,
        sort_order: 1,
      },
    ],
  };
}

function mapLegacySkillGroup(row: LegacySkillGroupRow): CmsSkillGroupBundle {
  return {
    group: {
      id: row.id,
      title: row.title,
      description: "Imported from legacy portfolio content.",
      sort_order: row.sort_order,
      status: "published",
      published_at: row.updated_at,
      updated_at: row.updated_at,
    },
    items: row.items.map((item, index) => ({
      id: `${row.id}-${index + 1}`,
      skill_group_id: row.id,
      label: item,
      emphasis: null,
      sort_order: index + 1,
    })),
  };
}

function mapLegacyExperience(row: LegacyExperienceRow): CmsExperienceRecord {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    summary: row.summary,
    highlights: [row.summary],
    sort_order: row.sort_order,
    status: "published",
    published_at: row.updated_at,
    updated_at: row.updated_at,
  };
}

async function getLegacyPortfolioSnapshot() {
  const supabase = await createSupabaseServerClient();
  const [profileResult, projectsResult, skillGroupsResult, experienceResult] = await Promise.all([
    supabase.from("portfolio_profile").select("*").maybeSingle(),
    supabase.from("portfolio_projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("portfolio_skill_groups").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("portfolio_experience_items")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  if (profileResult.error) {
    throw profileResult.error;
  }
  if (projectsResult.error) {
    throw projectsResult.error;
  }
  if (skillGroupsResult.error) {
    throw skillGroupsResult.error;
  }
  if (experienceResult.error) {
    throw experienceResult.error;
  }

  return {
    profile: profileResult.data ? mapLegacyProfile(profileResult.data) : null,
    projects: (projectsResult.data ?? []).map(mapLegacyProject),
    skillGroups: (skillGroupsResult.data ?? []).map(mapLegacySkillGroup),
    experience: (experienceResult.data ?? []).map(mapLegacyExperience),
  };
}

export const cmsContentRepository = {
  async getProfile(options: RepositoryOptions = {}): Promise<CmsProfileRecord | null> {
    try {
      const supabase = await getCmsReadClient(options.includeDraft);
      let query = supabase
        .from("cms_profile")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1);

      if (isPublishedOnly(options.includeDraft)) {
        query = query.eq("status", "published");
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        return data;
      }

      const legacy = await getLegacyPortfolioSnapshot();
      if (legacy.profile) {
        return legacy.profile;
      }

      return options.includeDraft ? null : fallbackProfileRecord;
    } catch (error) {
      if (isMissingRelationError(error)) {
        const legacy = await getLegacyPortfolioSnapshot();
        if (legacy.profile) {
          return legacy.profile;
        }
        return options.includeDraft ? null : fallbackProfileRecord;
      }

      throw error;
    }
  },

  async saveProfile(input: CmsProfileEditorInput, status: PublishingStatus) {
    const supabase = await createSupabaseServerAuthClient();
    const existing = await supabase
      .from("cms_profile")
      .select("id")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing.error && !isMissingRelationError(existing.error)) {
      throw existing.error;
    }

    const payload: TablesUpdate<"cms_profile"> & TablesInsert<"cms_profile"> = {
      name: input.name,
      title: input.title,
      location: input.location || null,
      summary: input.summary,
      hero_intro: input.heroIntro,
      availability: input.availability,
      email: input.email,
      github_url: input.githubUrl,
      featured_label: input.featuredLabel,
      status,
      published_at: statusToPublishedAt(status),
    };

    if (existing.data?.id) {
      const result = await supabase
        .from("cms_profile")
        .update(payload)
        .eq("id", existing.data.id);

      if (result.error) {
        throw result.error;
      }

      return existing.data.id;
    }

    const result = await supabase
      .from("cms_profile")
      .insert(payload)
      .select("id")
      .single();

    if (result.error) {
      throw result.error;
    }

    return result.data.id;
  },

  async listProjectBundles(options: RepositoryOptions = {}): Promise<CmsProjectBundle[]> {
    try {
      const supabase = await getCmsReadClient(options.includeDraft);
      let projectsQuery = supabase
        .from("cms_projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (isPublishedOnly(options.includeDraft)) {
        projectsQuery = projectsQuery.eq("status", "published");
      }

      const [projectsResult, sectionsResult] = await Promise.all([
        projectsQuery,
        supabase
          .from("cms_project_sections")
          .select("*")
          .order("sort_order", { ascending: true }),
      ]);

      if (projectsResult.error) {
        throw projectsResult.error;
      }

      if (sectionsResult.error) {
        throw sectionsResult.error;
      }

      const sectionsByProject = new Map<string, CmsProjectSectionRecord[]>();
      for (const section of (sectionsResult.data ??
        []) as Database["public"]["Tables"]["cms_project_sections"]["Row"][]) {
        const existing = sectionsByProject.get(section.project_id) ?? [];
        existing.push(section as CmsProjectSectionRecord);
        sectionsByProject.set(section.project_id, existing);
      }

      const cmsProjects = ((projectsResult.data ?? []) as CmsProjectRecord[]).map((project) => ({
        project,
        sections: sectionsByProject.get(project.id) ?? [],
      }));
      if (cmsProjects.length > 0) {
        return cmsProjects;
      }

      const legacy = await getLegacyPortfolioSnapshot();
      if (legacy.projects.length > 0) {
        return legacy.projects;
      }

      return cmsProjects;
    } catch (error) {
      if (isMissingRelationError(error)) {
        const legacy = await getLegacyPortfolioSnapshot();
        if (legacy.projects.length > 0) {
          return legacy.projects;
        }
        return options.includeDraft ? [] : fallbackProjectBundles();
      }

      throw error;
    }
  },

  async getProjectBundleBySlug(
    slug: string,
    options: RepositoryOptions = {},
  ): Promise<CmsProjectBundle | null> {
    const projects = await this.listProjectBundles(options);
    return projects.find(({ project }) => project.slug === slug) ?? null;
  },

  async getProjectBundleById(id: string): Promise<CmsProjectBundle | null> {
    const projects = await this.listProjectBundles({ includeDraft: true });
    return projects.find(({ project }) => project.id === id) ?? null;
  },

  async createProject(input: CmsProjectEditorInput, status: PublishingStatus) {
    const supabase = await createSupabaseServerAuthClient();
    const result = await supabase.rpc("save_cms_project", {
      p_id: null,
      p_slug: input.slug,
      p_title: input.title,
      p_headline: input.headline,
      p_summary: input.summary,
      p_role: input.role,
      p_outcomes: input.outcomes,
      p_stack: input.stack,
      p_repository_url: input.repositoryUrl || null,
      p_live_url: input.liveUrl || null,
      p_cover_image_url: input.coverImageUrl || null,
      p_featured: input.featured,
      p_sort_order: input.sortOrder,
      p_status: status,
      p_published_at: statusToPublishedAt(status),
      p_sections: serializeProjectSections(input),
    });

    if (result.error) {
      throw result.error;
    }

    return result.data;
  },

  async updateProject(id: string, input: CmsProjectEditorInput, status: PublishingStatus) {
    const supabase = await createSupabaseServerAuthClient();
    const result = await supabase.rpc("save_cms_project", {
      p_id: id,
      p_slug: input.slug,
      p_title: input.title,
      p_headline: input.headline,
      p_summary: input.summary,
      p_role: input.role,
      p_outcomes: input.outcomes,
      p_stack: input.stack,
      p_repository_url: input.repositoryUrl || null,
      p_live_url: input.liveUrl || null,
      p_cover_image_url: input.coverImageUrl || null,
      p_featured: input.featured,
      p_sort_order: input.sortOrder,
      p_status: status,
      p_published_at: statusToPublishedAt(status),
      p_sections: serializeProjectSections(input),
    });

    if (result.error) {
      throw result.error;
    }

    return id;
  },

  async deleteProject(id: string) {
    const supabase = await createSupabaseServerAuthClient();
    const deleteSections = await supabase
      .from("cms_project_sections")
      .delete()
      .eq("project_id", id);

    if (deleteSections.error) {
      throw deleteSections.error;
    }

    const deleteProject = await supabase.from("cms_projects").delete().eq("id", id);
    if (deleteProject.error) {
      throw deleteProject.error;
    }
  },

  async listSkillGroupBundles(
    options: RepositoryOptions = {},
  ): Promise<CmsSkillGroupBundle[]> {
    try {
      const supabase = await getCmsReadClient(options.includeDraft);
      let groupQuery = supabase
        .from("cms_skill_groups")
        .select("*")
        .order("sort_order", { ascending: true });

      if (isPublishedOnly(options.includeDraft)) {
        groupQuery = groupQuery.eq("status", "published");
      }

      const [groupsResult, itemsResult] = await Promise.all([
        groupQuery,
        supabase.from("cms_skill_items").select("*").order("sort_order", { ascending: true }),
      ]);

      if (groupsResult.error) {
        throw groupsResult.error;
      }

      if (itemsResult.error) {
        throw itemsResult.error;
      }

      const itemsByGroup = new Map<string, CmsSkillItemRecord[]>();
      for (const item of (itemsResult.data ?? []) as CmsSkillItemRecord[]) {
        const existing = itemsByGroup.get(item.skill_group_id) ?? [];
        existing.push(item);
        itemsByGroup.set(item.skill_group_id, existing);
      }

      const cmsGroups = ((groupsResult.data ?? []) as CmsSkillGroupRecord[]).map((group) => ({
        group,
        items: itemsByGroup.get(group.id) ?? [],
      }));
      if (cmsGroups.length > 0) {
        return cmsGroups;
      }

      const legacy = await getLegacyPortfolioSnapshot();
      if (legacy.skillGroups.length > 0) {
        return legacy.skillGroups;
      }

      return cmsGroups;
    } catch (error) {
      if (isMissingRelationError(error)) {
        const legacy = await getLegacyPortfolioSnapshot();
        if (legacy.skillGroups.length > 0) {
          return legacy.skillGroups;
        }
        return options.includeDraft ? [] : fallbackSkillGroupBundles();
      }

      throw error;
    }
  },

  async getSkillGroupBundleById(id: string) {
    const groups = await this.listSkillGroupBundles({ includeDraft: true });
    return groups.find(({ group }) => group.id === id) ?? null;
  },

  async createSkillGroup(input: CmsSkillGroupEditorInput, status: PublishingStatus) {
    const supabase = await createSupabaseServerAuthClient();
    const result = await supabase.rpc("save_cms_skill_group", {
      p_id: null,
      p_title: input.title,
      p_description: input.description,
      p_sort_order: input.sortOrder,
      p_status: status,
      p_published_at: statusToPublishedAt(status),
      p_items: serializeSkillItems(input),
    });

    if (result.error) {
      throw result.error;
    }

    return result.data;
  },

  async updateSkillGroup(id: string, input: CmsSkillGroupEditorInput, status: PublishingStatus) {
    const supabase = await createSupabaseServerAuthClient();
    const groupResult = await supabase.rpc("save_cms_skill_group", {
      p_id: id,
      p_title: input.title,
      p_description: input.description,
      p_sort_order: input.sortOrder,
      p_status: status,
      p_published_at: statusToPublishedAt(status),
      p_items: serializeSkillItems(input),
    });

    if (groupResult.error) {
      throw groupResult.error;
    }
  },

  async deleteSkillGroup(id: string) {
    const supabase = await createSupabaseServerAuthClient();
    const deleteItems = await supabase
      .from("cms_skill_items")
      .delete()
      .eq("skill_group_id", id);

    if (deleteItems.error) {
      throw deleteItems.error;
    }

    const deleteGroup = await supabase.from("cms_skill_groups").delete().eq("id", id);
    if (deleteGroup.error) {
      throw deleteGroup.error;
    }
  },

  async listExperienceRecords(options: RepositoryOptions = {}): Promise<CmsExperienceRecord[]> {
    try {
      const supabase = await getCmsReadClient(options.includeDraft);
      let query = supabase
        .from("cms_experience_items")
        .select("*")
        .order("sort_order", { ascending: true });

      if (isPublishedOnly(options.includeDraft)) {
        query = query.eq("status", "published");
      }

      const result = await query;
      if (result.error) {
        throw result.error;
      }

      const records = (result.data ?? []) as CmsExperienceRecord[];
      if (records.length > 0) {
        return records;
      }

      const legacy = await getLegacyPortfolioSnapshot();
      if (legacy.experience.length > 0) {
        return legacy.experience;
      }

      return records;
    } catch (error) {
      if (isMissingRelationError(error)) {
        const legacy = await getLegacyPortfolioSnapshot();
        if (legacy.experience.length > 0) {
          return legacy.experience;
        }
        return options.includeDraft ? [] : maybePublishedFilter(fallbackExperienceRecords);
      }

      throw error;
    }
  },

  async getExperienceRecordById(id: string) {
    const items = await this.listExperienceRecords({ includeDraft: true });
    return items.find((item) => item.id === id) ?? null;
  },

  async createExperience(input: CmsExperienceEditorInput, status: PublishingStatus) {
    const supabase = await createSupabaseServerAuthClient();
    const result = await supabase.from("cms_experience_items").insert({
      role: input.role,
      company: input.company,
      period: input.period,
      summary: input.summary,
      highlights: input.highlights,
      sort_order: input.sortOrder,
      status,
      published_at: statusToPublishedAt(status),
    });

    if (result.error) {
      throw result.error;
    }
  },

  async updateExperience(
    id: string,
    input: CmsExperienceEditorInput,
    status: PublishingStatus,
  ) {
    const supabase = await createSupabaseServerAuthClient();
    const result = await supabase
      .from("cms_experience_items")
      .update({
        role: input.role,
        company: input.company,
        period: input.period,
        summary: input.summary,
        highlights: input.highlights,
        sort_order: input.sortOrder,
        status,
        published_at: statusToPublishedAt(status),
      })
      .eq("id", id);

    if (result.error) {
      throw result.error;
    }
  },

  async deleteExperience(id: string) {
    const supabase = await createSupabaseServerAuthClient();
    const result = await supabase.from("cms_experience_items").delete().eq("id", id);
    if (result.error) {
      throw result.error;
    }
  },

  async getDashboardSummary(): Promise<CmsDashboardSummary> {
    const [profile, projects, skills, experience] = await Promise.all([
      this.getProfile({ includeDraft: true }),
      this.listProjectBundles({ includeDraft: true }),
      this.listSkillGroupBundles({ includeDraft: true }),
      this.listExperienceRecords({ includeDraft: true }),
    ]);

    const lastUpdatedCandidates = [
      profile?.updated_at,
      ...projects.map(({ project }) => project.updated_at),
      ...skills.map(({ group }) => group.updated_at),
      ...experience.map((item) => item.updated_at),
    ].filter(Boolean) as string[];

    const lastUpdatedLabel = lastUpdatedCandidates.length
      ? new Date(lastUpdatedCandidates.sort().at(-1) ?? nowIso()).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          },
        )
      : "No content yet";

    const missingCollections: string[] = [];
    if (!profile) {
      missingCollections.push("Profile");
    }
    if (projects.length === 0) {
      missingCollections.push("Projects");
    }
    if (skills.length === 0) {
      missingCollections.push("Skills");
    }
    if (experience.length === 0) {
      missingCollections.push("Experience");
    }

    return {
      profileStatus: profile?.status ?? "missing",
      projectCount: projects.length,
      publishedProjectCount: projects.filter(
        ({ project }) => project.status === "published",
      ).length,
      skillGroupCount: skills.length,
      publishedSkillGroupCount: skills.filter(
        ({ group }) => group.status === "published",
      ).length,
      experienceCount: experience.length,
      publishedExperienceCount: experience.filter(
        (item) => item.status === "published",
      ).length,
      lastUpdatedLabel,
      missingCollections,
    };
  },
};
