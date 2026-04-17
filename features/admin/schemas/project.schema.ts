import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  repositoryUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  stack: z.array(z.string().min(1)),
  featured: z.boolean(),
  sortOrder: z.number().int(),
});