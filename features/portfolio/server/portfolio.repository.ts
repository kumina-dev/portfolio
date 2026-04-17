import { fallbackPortfolio } from "@/content/fallback-portfolio";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import type { Database } from "@/integrations/supabase/types";
import { buildPortfolioPageData } from "./portfolio.mapper";

type ProfileRow = Database["public"]["Tables"]["portfolio_profile"]["Row"];
type ProjectRow = Database["public"]["Tables"]["portfolio_projects"]["Row"];
type SkillGroupRow = Database["public"]["Tables"]["portfolio_skill_groups"]["Row"];
type ExperienceRow = Database["public"]["Tables"]["portfolio_experience_items"]["Row"];

function formatSupabaseError(
  context: string,
  error: {
    code?: string | null;
    message?: string | null;
    details?: string | null;
    hint?: string | null;
  },
) {
  return new Error(
    [
      `Supabase ${context} failed.`,
      error.code ? `code=${error.code}` : null,
      error.message ? `message=${error.message}` : null,
      error.details ? `details=${error.details}` : null,
      error.hint ? `hint=${error.hint}` : null,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export const portfolioRepository = {
  async getPortfolioPageData() {
    const supabase = await createSupabaseServerClient();

    const [profileResult, projectsResult, skillGroupsResult, experienceResult] =
      await Promise.all([
        supabase.from("portfolio_profile").select("*").maybeSingle(),
        supabase.from("portfolio_projects").select("*").order("sort_order", { ascending: true }),
        supabase
          .from("portfolio_skill_groups")
          .select("*")
          .order("sort_order", { ascending: true }),
        supabase
          .from("portfolio_experience_items")
          .select("*")
          .order("sort_order", { ascending: true }),
      ]);

    if (profileResult.error) {
      throw formatSupabaseError("portfolio_profile query", profileResult.error);
    }

    if (projectsResult.error) {
      throw formatSupabaseError("portfolio_projects query", projectsResult.error);
    }

    if (skillGroupsResult.error) {
      throw formatSupabaseError(
        "portfolio_skill_groups query",
        skillGroupsResult.error,
      );
    }

    if (experienceResult.error) {
      throw formatSupabaseError("portfolio_experience_items query", experienceResult.error);
    }

    if (!profileResult.data) {
      return fallbackPortfolio;
    }

    return buildPortfolioPageData({
      profile: profileResult.data as ProfileRow,
      projects: (projectsResult.data ?? []) as ProjectRow[],
      skillGroups: (skillGroupsResult.data ?? []) as SkillGroupRow[],
      experience: (experienceResult.data ?? []) as ExperienceRow[],
    });
  },
};