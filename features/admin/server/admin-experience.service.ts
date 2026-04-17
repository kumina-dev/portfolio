import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { mapExperienceItem } from "@/features/portfolio/server/portfolio.mapper";

export const adminExperienceService = {
  async listExperience() {
    const supabase = await createSupabaseServerClient();
    const result = await supabase
      .from("portfolio_experience_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (result.error) {
      throw result.error;
    }

    return (result.data ?? []).map(mapExperienceItem);
  },

  async getExperienceById(experienceId: string) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase
      .from("portfolio_experience_items")
      .select("*")
      .eq("id", experienceId)
      .maybeSingle();

    if (result.error) {
      throw result.error;
    }

    return result.data ? mapExperienceItem(result.data) : null;
  },
};