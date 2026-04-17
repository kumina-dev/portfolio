"use server";

import { revalidatePath } from "next/cache";
import { cmsContentRepository } from "@/features/cms/repositories/cms-content.repository";
import { profileSchema } from "@/features/cms/schemas/profile.schema";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import type { PublishingStatus } from "../types/cms";

function parseStatusIntent(formData: FormData): PublishingStatus {
  return formData.get("intent") === "publish" ? "published" : "draft";
}

export async function saveProfileAction(formData: FormData) {
  await adminAuthService.requireUser();

  const parsed = profileSchema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    heroIntro: String(formData.get("heroIntro") ?? "").trim(),
    availability: String(formData.get("availability") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    githubUrl: String(formData.get("githubUrl") ?? "").trim(),
    featuredLabel: String(formData.get("featuredLabel") ?? "").trim(),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid profile.");
  }

  await cmsContentRepository.saveProfile(parsed.data, parseStatusIntent(formData));
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/profile");
}
