import * as z from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email can't be empty")
    .regex(
      /^[a-z0-9.]+@gmail.com$/,
      "Email must contain @gmail.com and be lowercase",
    ),

  newPassword: z
    .string()
    .nonempty("Password can't be empty")
    .min(6, "Password must be at least 6 character long")
    .regex(
      /^.*(?=[@#$&]).*$/,
      "Password must contain one of (@ or # or & or $)",
    ),

  confirmPassword: z
    .string()
    .nonempty("Password can't be empty")
    .min(6, "Password must be at least characters long")
    .regex(
      /^.*(?=[@#$&]).*$/,
      "Password must contain one of (@ or # or & or $)",
    ),
});

export type forgetPassSchema = z.infer<typeof forgetPasswordSchema>;
