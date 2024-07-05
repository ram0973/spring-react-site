import z from "zod";

export const signupFormSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 symbols"),
    confirmPassword: z.string().min(8, "Passwords must match"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords mismatch",
      path: ["confirmPassword"]
    }
  );

export type SignupFormData = z.infer<typeof signupFormSchema>;