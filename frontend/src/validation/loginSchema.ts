import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string("It is not a String")
    .min(1, "Email is required")
    .regex(
      /^[a-z0-9.]+@gmail.com$/,
      "Email must contain @gmail.com at the end and all the character should be in lower case"
    ),

  password: z
    .string("It is not a String")
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 character")
    .regex(
      /^.*(?=[@#$&]).*$/,
      "Password must contain any of this (@ or # or $ or &) speical characters"
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
