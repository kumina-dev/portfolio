import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { fallbackPortfolio } from "@/content/fallback-portfolio";
import { mapProfile } from "@/features/portfolio/server/portfolio.mapper";

export const adminProfileService = {
  async getProfile() {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("portfolio_profile").select("*").maybeSingle();

    if (result.error) {
      throw result.error;
    }

    if (!result.data) {
      return fallbackPortfolio.profile;
    }

    return mapProfile(result.data);
  },
};