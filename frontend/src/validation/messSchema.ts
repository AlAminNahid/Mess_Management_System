import * as z from "zod";

export const messSchema = z.object({
  name: z
    .string("It is not a String")
    .min(1, "Name is required")
    .max(200, "Mess name can't be greater than 200 characters."),

  address: z.string("It is not a String").min(1, "Address is required"),
});

export type MessSchemaType = z.infer<typeof messSchema>;
