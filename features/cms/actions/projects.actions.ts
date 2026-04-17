"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cmsContentRepository } from "@/features/cms/repositories/cms-content.repository";
import { projectSchema } from "@/features/cms/schemas/project.schema";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import type { PublishingStatus } from "../types/cms";

function parseList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseStatusIntent(formData: FormData): PublishingStatus {
  const intent = String(formData.get("intent") ?? "draft");
  return intent === "publish" ? "published" : "draft";
}

function parseProjectFormData(formData: FormData) {
  return projectSchema.safeParse({
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    headline: String(formData.get("headline") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    outcomes: String(formData.get("outcomes") ?? "").trim(),
    stack: parseList(String(formData.get("stack") ?? "")),
    repositoryUrl: String(formData.get("repositoryUrl") ?? "").trim(),
    liveUrl: String(formData.get("liveUrl") ?? "").trim(),
    coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim(),
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    overviewHeading: String(formData.get("overviewHeading") ?? "").trim(),
    overviewContent: String(formData.get("overviewContent") ?? "").trim(),
    impactHeading: String(formData.get("impactHeading") ?? "").trim(),
    impactContent: String(formData.get("impactContent") ?? "").trim(),
    technicalHeading: String(formData.get("technicalHeading") ?? "").trim(),
    technicalContent: String(formData.get("technicalContent") ?? "").trim(),
  });
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  if (slug) {
    revalidatePath(`/work/${slug}`);
  }
}

export async function createProjectAction(formData: FormData) {
  await adminAuthService.requireUser();
  const parsed = parseProjectFormData(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid project.");
  }

  const normalized = {
    ...parsed.data,
    repositoryUrl: parsed.data.repositoryUrl ?? "",
    liveUrl: parsed.data.liveUrl ?? "",
    coverImageUrl: parsed.data.coverImageUrl ?? "",
  };
  const id = await cmsContentRepository.createProject(normalized, parseStatusIntent(formData));
  revalidateProjectPaths(normalized.slug);
  redirect(`/admin/projects/${id}`);
}

export async function updateProjectAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    throw new Error("Project id is required.");
  }

  const parsed = parseProjectFormData(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid project.");
  }

  const normalized = {
    ...parsed.data,
    repositoryUrl: parsed.data.repositoryUrl ?? "",
    liveUrl: parsed.data.liveUrl ?? "",
    coverImageUrl: parsed.data.coverImageUrl ?? "",
  };
  await cmsContentRepository.updateProject(id, normalized, parseStatusIntent(formData));
  revalidateProjectPaths(normalized.slug);
}

export async function deleteProjectAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    throw new Error("Project id is required.");
  }

  await cmsContentRepository.deleteProject(id);
  revalidateProjectPaths();
  redirect("/admin/projects");
}
