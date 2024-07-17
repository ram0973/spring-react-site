import z from "zod";

export const articleUpdateFormSchema = z
  .object({
    id: z.number().positive(),
    title: z.string(),
    enabled: z.boolean()
  });

export type ArticleUpdateFormData = z.infer<typeof articleUpdateFormSchema>;