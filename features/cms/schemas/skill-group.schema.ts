import { z } from "zod";

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  items: z
    .array(
      z.object({
        label: z.string().min(1),
        emphasis: z.string(),
      }),
    )
    .min(1),
  sortOrder: z.number().int(),
});
