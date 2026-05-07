// --- Libraries
import { z } from "zod";

// --- Reset Password Validation Schemas

// --- Email Schema
const EmailSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email Address" }).trim(),
  })
  .strict();
export type EmailSchemaType = z.infer<typeof EmailSchema>;

// --- Reset Password Schema
const ResetPasswordSchema = z
  .object({
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters" }),
  })
  .strict();
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

// --- Validate Functions

// - Validate Email Function
export const validateEmail = (obj: unknown) => {
  return EmailSchema.safeParse(obj);
};

// - Validate Reset Password Function
export const validateResetPassword = (obj: unknown) => {
  return ResetPasswordSchema.safeParse(obj);
};
