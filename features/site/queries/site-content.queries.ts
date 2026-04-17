import { draftMode } from "next/headers";
import { siteContentRepository } from "../repositories/site-content.repository";

export async function getHomePageViewModel() {
  const preview = (await draftMode()).isEnabled;
  return siteContentRepository.getHomePageViewModel(preview);
}

export async function getProjectDetailViewModel(slug: string) {
  const preview = (await draftMode()).isEnabled;
  return siteContentRepository.getProjectDetailViewModel(slug, preview);
}
