import { cmsContentRepository } from "@/features/cms/repositories/cms-content.repository";
import type { CmsProjectSectionKey } from "@/features/cms/types/cms";
import type {
  HomePageViewModel,
  ProjectCardViewModel,
  ProjectDetailViewModel,
} from "../types/site";

function mapProjectCard(
  project: Awaited<ReturnType<typeof cmsContentRepository.listProjectBundles>>[number]["project"],
): ProjectCardViewModel {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    headline: project.headline,
    summary: project.summary,
    stack: project.stack,
    role: project.role,
    featured: project.featured,
  };
}

export const siteContentRepository = {
  async getHomePageViewModel(preview = false): Promise<HomePageViewModel> {
    const [profile, projectBundles, skillBundles, experience] = await Promise.all([
      cmsContentRepository.getProfile({ includeDraft: preview }),
      cmsContentRepository.listProjectBundles({ includeDraft: preview }),
      cmsContentRepository.listSkillGroupBundles({ includeDraft: preview }),
      cmsContentRepository.listExperienceRecords({ includeDraft: preview }),
    ]);

    const safeProfile = profile ?? (await cmsContentRepository.getProfile());
    const safeProjects =
      projectBundles.length > 0 ? projectBundles : await cmsContentRepository.listProjectBundles();
    const safeSkillBundles =
      skillBundles.length > 0 ? skillBundles : await cmsContentRepository.listSkillGroupBundles();
    const safeExperience =
      experience.length > 0 ? experience : await cmsContentRepository.listExperienceRecords();

    if (!safeProfile) {
      throw new Error("Profile content is required.");
    }

    const allProjects = safeProjects.map(({ project }) => mapProjectCard(project));

    return {
      preview,
      profile: {
        name: safeProfile.name,
        title: safeProfile.title,
        location: safeProfile.location ?? undefined,
        summary: safeProfile.summary,
        heroIntro: safeProfile.hero_intro,
        availability: safeProfile.availability,
        featuredLabel: safeProfile.featured_label,
        email: safeProfile.email,
        githubUrl: safeProfile.github_url,
      },
      featuredProjects: allProjects.filter((project) => project.featured).slice(0, 3),
      allProjects,
      skillGroups: safeSkillBundles.map(({ group, items }) => ({
        id: group.id,
        title: group.title,
        description: group.description,
        items: items.map((item) => ({
          id: item.id,
          label: item.label,
          emphasis: item.emphasis ?? undefined,
        })),
      })),
      experience: safeExperience.map((item) => ({
        id: item.id,
        role: item.role,
        company: item.company,
        period: item.period,
        summary: item.summary,
        highlights: item.highlights,
      })),
    };
  },

  async getProjectDetailViewModel(
    slug: string,
    preview = false,
  ): Promise<ProjectDetailViewModel | null> {
    const bundle = await cmsContentRepository.getProjectBundleBySlug(slug, {
      includeDraft: preview,
    });
    const safeBundle = bundle ?? (preview ? await cmsContentRepository.getProjectBundleBySlug(slug) : null);

    if (!safeBundle) {
      return null;
    }

    return {
      ...mapProjectCard(safeBundle.project),
      outcomes: safeBundle.project.outcomes,
      repositoryUrl: safeBundle.project.repository_url ?? undefined,
      liveUrl: safeBundle.project.live_url ?? undefined,
      coverImageUrl: safeBundle.project.cover_image_url ?? undefined,
      sections: safeBundle.sections.map((section) => ({
        key: section.section_key as CmsProjectSectionKey,
        heading: section.heading,
        content: section.content,
      })),
    };
  },
};
