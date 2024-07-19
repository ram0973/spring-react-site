import z from "zod";

export const personCreateFormSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 symbols"),
    confirmPassword: z.string().min(8, "Passwords must match"),
    enabled: z.boolean()
  })
  .refine(
    values => values.password === values.confirmPassword,
    {message: "Passwords mismatch", path: ["confirmPassword"]},
  );

export type PersonCreateFormData = z.infer<typeof personCreateFormSchema>;
