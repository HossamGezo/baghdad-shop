// --- Libraries
import { z } from "zod";

// --- Order Validation Schemas

// - Add Order Schema

const addOrderSchema = z
  .object({
    customerName: z.string().trim(),
    email: z.string().email().trim(),
    orderItems: z
      .array(
        z.object({
          productId: z.string().trim(),
          title: z.string().trim(),
          image: z.string().trim(),
          price: z.number().nonnegative(),
          count: z.number().int().positive(),
        }),
      )
      .min(1),
    shippingAddress: z.object({
      city: z.string().trim(),
      area: z.string().trim(),
      street: z.string().trim(),
      phone: z.string().regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/),
    }),
    paymentMethod: z.enum(["card", "cash"]),
  })
  .strict();

export type addOrderType = z.infer<typeof addOrderSchema>;

// - Update Order Schema

const updateOrderSchema = z
  .object({
    status: z.enum(["pending", "shipped", "delivered", "cancelled"]).optional(),
  })
  .strict();

export type UpdateOrderType = z.infer<typeof updateOrderSchema>;

// --- Validate Functions

// - Validate Add Order
export const validateAddOrder = (obj: unknown) => {
  return addOrderSchema.safeParse(obj);
};

// - Validate Update Order
export const validateUpdateOrder = (obj: unknown) => {
  return updateOrderSchema.safeParse(obj);
};
