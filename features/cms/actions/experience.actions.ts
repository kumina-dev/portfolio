"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import { cmsContentRepository } from "../repositories/cms-content.repository";
import { experienceSchema } from "../schemas/experience.schema";
import type { PublishingStatus } from "../types/cms";

function parseHighlights(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseStatusIntent(formData: FormData): PublishingStatus {
  return formData.get("intent") === "publish" ? "published" : "draft";
}

function parseExperienceFormData(formData: FormData) {
  return experienceSchema.safeParse({
    role: String(formData.get("role") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    highlights: parseHighlights(String(formData.get("highlights") ?? "")),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });
}

function revalidateExperiencePaths() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/experience");
}

export async function createExperienceAction(formData: FormData) {
  await adminAuthService.requireUser();
  const parsed = parseExperienceFormData(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid experience item.");
  }

  await cmsContentRepository.createExperience(parsed.data, parseStatusIntent(formData));
  revalidateExperiencePaths();
  redirect("/admin/experience");
}

export async function updateExperienceAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    throw new Error("Experience id is required.");
  }

  const parsed = parseExperienceFormData(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid experience item.");
  }

  await cmsContentRepository.updateExperience(id, parsed.data, parseStatusIntent(formData));
  revalidateExperiencePaths();
}

export async function deleteExperienceAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    throw new Error("Experience id is required.");
  }

  await cmsContentRepository.deleteExperience(id);
  revalidateExperiencePaths();
  redirect("/admin/experience");
}
