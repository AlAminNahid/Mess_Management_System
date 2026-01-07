import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string("Name has to be a string value")
    .min(1, "Name is required")
    .max(200, "Name length can't be greater then 200")
    .regex(/^[A-Za-z ]+$/, "Name can't contain any number"),

  email: z
    .string("Email has to be a string value")
    .min(1, "Email is required")
    .regex(
      /^[a-z0-9.]+@gmail.com$/,
      "Email must contain @gmail.com at the end and all the character should be in lower case"
    ),

  password: z
    .string("Password has to be a string value")
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^.*(?=[@#$&]).*$/,
      "Password must contain any of this (@ or # or $ or &) speical characters"
    ),

  nid: z
    .string("NID has to be a string value")
    .min(1, "NID is required")
    .regex(/^\d{14}$/, "Nid must contain 14 digits & only numbers"),

  phone: z
    .string("Phone Number has to be a string value")
    .min(1, "Phone Number is required")
    .max(11, "Phone number should be only 11 digits")
    .regex(
      /^01[0-9]+$/,
      "Phone number should only contain numbers & should start with 01"
    ),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
