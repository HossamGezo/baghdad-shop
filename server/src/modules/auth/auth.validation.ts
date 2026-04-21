// --- Libraries
import { z } from "zod";

// --- Auth Validation Schemas

// - Register User Schema
const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: "Full Name must be at least 3 characters" })
      .max(21, { message: "Full Name must not exceed 21 characters" }),
    email: z.string().email({ message: "Invalid Email Address" }).trim(),
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters" }),
  })
  .strict();
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// --- Login Schema
const LoginSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email Address" }).trim(),
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters" }),
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
