import { cmsContentRepository } from "../repositories/cms-content.repository";

export async function getCmsDashboardSummary() {
  return cmsContentRepository.getDashboardSummary();
}

export async function getCmsProfileEditorData() {
  return cmsContentRepository.getProfile({ includeDraft: true });
}

export async function getCmsProjectsCollectionData() {
  return cmsContentRepository.listProjectBundles({ includeDraft: true });
}

export async function getCmsProjectEditorData(projectId: string) {
  return cmsContentRepository.getProjectBundleById(projectId);
}

export async function getCmsSkillGroupsCollectionData() {
  return cmsContentRepository.listSkillGroupBundles({ includeDraft: true });
}

export async function getCmsSkillGroupEditorData(skillGroupId: string) {
  return cmsContentRepository.getSkillGroupBundleById(skillGroupId);
}

export async function getCmsExperienceCollectionData() {
  return cmsContentRepository.listExperienceRecords({ includeDraft: true });
}

export async function getCmsExperienceEditorData(experienceId: string) {
  return cmsContentRepository.getExperienceRecordById(experienceId);
}
