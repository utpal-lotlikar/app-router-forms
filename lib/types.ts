import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
  first: z.string().trim().min(1, {
    message: "First name is required",
  }),
  last: z.string().trim().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export type PersonState = {
  fields?: Record<string, string>;
  errors?: FieldErrors;
  message?: string | null;
};
