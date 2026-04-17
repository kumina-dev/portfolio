"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminAuthService } from "@/features/admin/server/admin-auth.service";
import { cmsContentRepository } from "../repositories/cms-content.repository";
import { skillGroupSchema } from "../schemas/skill-group.schema";
import type { PublishingStatus } from "../types/cms";

function parseItems(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, emphasis = ""] = line.split("|");
      return { label: label.trim(), emphasis: emphasis.trim() };
    });
}

function parseStatusIntent(formData: FormData): PublishingStatus {
  return formData.get("intent") === "publish" ? "published" : "draft";
}

function parseSkillGroupFormData(formData: FormData) {
  return skillGroupSchema.safeParse({
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    items: parseItems(String(formData.get("items") ?? "")),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });
}

function revalidateSkillPaths() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
}

export async function createSkillGroupAction(formData: FormData) {
  await adminAuthService.requireUser();
  const parsed = parseSkillGroupFormData(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid skill group.");
  }

  const id = await cmsContentRepository.createSkillGroup(parsed.data, parseStatusIntent(formData));
  revalidateSkillPaths();
  redirect(`/admin/skills/${id}`);
}

export async function updateSkillGroupAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    throw new Error("Skill group id is required.");
  }

  const parsed = parseSkillGroupFormData(formData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid skill group.");
  }

  await cmsContentRepository.updateSkillGroup(id, parsed.data, parseStatusIntent(formData));
  revalidateSkillPaths();
}

export async function deleteSkillGroupAction(formData: FormData) {
  await adminAuthService.requireUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    throw new Error("Skill group id is required.");
  }

  await cmsContentRepository.deleteSkillGroup(id);
  revalidateSkillPaths();
  redirect("/admin/skills");
}
