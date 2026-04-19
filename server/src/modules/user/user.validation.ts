// --- Libraries
import { z } from "zod";

// --- User Validation Schemas

// - Update User Profile Schema
const updateUserProfileSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: "Full Name must be at least 3 characters" })
      .max(21, { message: "Full Name must not exceed 21 characters" })
      .optional(),
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters" }).optional(),
    address: z
      .object({
        city: z.string().min(3, "City must be at least 3 characters").trim(),
        area: z.string().min(3, "Area must be at least 3 characters").trim(),
        street: z.string().min(3, "Street must be at least 3 characters").trim(),
        phone: z.string().min(11, "Phone Number must be at least 11 digits").trim(),
      })
      .optional(),
  })
  .strict();

export type UpdateUserProfileType = z.infer<typeof updateUserProfileSchema>;

// - Update User Role Schema
export const updateUserRoleSchema = z
  .object({
    role: z.enum(["customer", "admin"]),
  })
  .strict();

export type UpdateUserRoleType = z.infer<typeof updateUserRoleSchema>;

// --- Validate Functions

// - Validate Update User Function
export const validateUpdateUser = (user: unknown) => {
  return updateUserProfileSchema.safeParse(user);
};

// - Validate Update User Role Function
export const validateUpdateUserRole = (user: unknown) => {
  return updateUserRoleSchema.safeParse(user);
};
