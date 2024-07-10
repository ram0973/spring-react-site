import z from "zod";

export const personUpdateFormSchema = z
  .object({
    id: z.number().positive(),
    email: z.string().email("Invalid email"),
    enabled: z.boolean()
  });

export type PersonUpdateFormData = z.infer<typeof personUpdateFormSchema>;