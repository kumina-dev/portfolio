import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string(),
  summary: z.string().min(1),
  heroIntro: z.string().min(1),
  availability: z.string().min(1),
  email: z.string().email(),
  githubUrl: z.string().url(),
  featuredLabel: z.string().min(1),
});
