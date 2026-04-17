import { createClient } from "@supabase/supabase-js";
import { env } from "@/shared/lib/env";
import type { Database } from "./types";

export async function createSupabaseServerClient() {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}