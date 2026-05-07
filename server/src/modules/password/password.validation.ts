// --- Libraries
import { z } from "zod";

// --- Reset Password Validation Schemas

// - Password Validation
const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

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
    password: passwordValidation,
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
