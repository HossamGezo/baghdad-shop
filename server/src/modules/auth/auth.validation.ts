// --- Libraries
import { z } from "zod";

// --- Auth Validation Schemas

// - Password Validation
const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

// - Register User Schema
const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: "Full Name must be at least 3 characters" })
      .max(21, { message: "Full Name must not exceed 21 characters" }),
    email: z.string().email({ message: "Invalid Email Address" }).trim(),
    password: passwordValidation,
  })
  .strict();
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// - Login Schema
const LoginSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email Address" }).trim(),
    password: z.string().min(8),
  })
  .strict();
export type LoginSchemaType = z.infer<typeof LoginSchema>;

// --- Validate Functions

// - Validate Register Function
export const validateRegister = (obj: unknown) => {
  return RegisterSchema.safeParse(obj);
};

// - Validate Login Function
export const validateLogin = (obj: unknown) => {
  return LoginSchema.safeParse(obj);
};
