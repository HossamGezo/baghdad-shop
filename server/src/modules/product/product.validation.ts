// --- Libraries
import { z } from "zod";

// --- Types
import { ALL_CATEGORIES } from "@/shared/types/categories.js";

// --- Product Validation Schemas

// - Get Products Query Validation
const getProductQuerySchema = z
  .object({
    category: z.enum([...ALL_CATEGORIES, "all"], {
      message: "You must enter a valid category or 'all' to see everything",
    }),
  })
  .strict();

// - Add Product Validation
const addProductSchema = z
  .object({
    title: z.string().trim(),
    price: z.coerce.number().min(1),
    discount: z.coerce.number().min(0),
    category: z.enum(ALL_CATEGORIES),
    description: z.string().trim(),
  })
  .strict();

export type AddProductType = z.infer<typeof addProductSchema>;

// - Update Product Validation

const updateProductSchema = z
  .object({
    title: z.string().trim().optional(),
    price: z.coerce.number().min(1).optional(),
    discount: z.coerce.number().min(0).optional(),
    category: z.enum(ALL_CATEGORIES).optional(),
    description: z.string().trim().optional(),
  })
  .strict();

export type UpdateProductType = z.infer<typeof updateProductSchema>;

// --- Validate Functions

// - Validate Get Products Query Function
export const validateGetProductQuery = (query: unknown) => {
  return getProductQuerySchema.safeParse(query);
};

// - Validate Add Product Function
export const validateAddProduct = (obj: unknown) => {
  return addProductSchema.safeParse(obj);
};

// - Validate Update Product Function
export const validateUpdateProduct = (obj: unknown) => {
  return updateProductSchema.safeParse(obj);
};
