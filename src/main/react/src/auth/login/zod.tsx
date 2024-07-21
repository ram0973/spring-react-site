import z from "zod";

export const loginFormSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 symbols"),
  });
export type LoginFormData = z.infer<typeof loginFormSchema>;