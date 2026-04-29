// --- Imports
import type { CategoryName } from "@data/productCategories";

// --- Global Common Types
export type BaseEntityType = {
  readonly _id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};

// --- Category & Navigation Types
export type CategoriesType = CategoryName;

export type CategoryType = {
  id: string;
  title: string;
  image: string;
  to: string;
};

// --- Product Types
export type ProductImageType = {
  url: string;
  publicId: string;
};

export type ProductType = BaseEntityType & {
  readonly title: string;
  readonly images: ProductImageType[];
  readonly price: number;
  readonly discount: number;
  readonly priceAfterDiscount: number;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly category: CategoriesType;
  readonly description: string;
};

export type BrandType = {
  id: string;
  name: string;
  image: string;
};

// --- User & Authentication Types
export type UserAddressType = {
  city: string;
  area: string;
  street: string;
  phone: string;
};

export type UserType = BaseEntityType & {
  readonly fullName: string;
  readonly email: string;
  readonly role: "customer" | "admin";
  readonly avatar: string;
  readonly status: string;
  readonly totalOrders: number;
  readonly address: UserAddressType | null;
};

export type AuthResponseType = UserType & {
  token: string;
};

// --- Cart & Order Types
export type CartType = {
  productId: string;
  title: string;
  image: string;
  price: number;
  count: number;
  category: string;
};

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export type OrderType = BaseEntityType & {
  userId: string;
  customerName: string;
  email: string;
  orderItems: CartType[];
  shippingAddress: UserAddressType;
  totalPrice: number;
  paymentMethod: "card" | "cash";
  status: OrderStatus;
};

// --- UI & Filtering Types
export type CurrentPriceType = "no-sorting" | "low-to-high" | "high-to-low";

export type CurrentProductsType = "all-products" | CategoriesType;

export type DashboardStatsType = {
  usersCount: number;
  productsCount: number;
  ordersCount: number;
  totalRevenue: number;
};

// --- Form & Validation Types
export type RegisterType = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ResetPasswordType = {
  email: string;
};

export type UpdateProfileType = {
  fullName?: string;
  password?: string;
  address?: {
    city?: string;
    area?: string;
    street?: string;
    phone?: string;
  };
};
