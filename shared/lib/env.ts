function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
} as const;