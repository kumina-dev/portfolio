import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().optional(),
  email: z.string().email(),
  githubUrl: z.string().url(),
});