// --- Product Types

export type ProductType = {
  readonly id: string;
  readonly title: string;
  readonly firstImage: string;
  readonly secondImage: string;
  readonly images: string[];
  readonly price: number;
  readonly discount: number;
  readonly rating: number;
  readonly reviews: number;
  readonly category: CategoriesType;
  readonly description: string;
};

export type BrandType = {
  id: string;
  name: string;
  image: string;
};

// --- Category & Navigation Types

export type CategoryType = {
  id: string;
  title: string;
  image: string;
  to: string;
};

export type CategoriesType =
  | "laptops"
  | "mobiles"
  | "specialOffers"
  | "appliances"
  | "cookware"
  | "clothing"
  | "shoes"
  | "dresses"
  | "handbags"
  | "supermarket"
  | "automotive";

// --- Cart Types

export type CartType = ProductType & {
  count: number;
};

// --- UI & Filtering Types

export type CurrentPriceType = "no-sorting" | "low-to-high" | "high-to-low";

export type CurrentProductsType =
  | "all-products"
  | "laptops"
  | "mobiles"
  | "clothing"
  | "shoes"
  | "dresses"
  | "handbags"
  | "appliances"
  | "cookware"
  | "supermarket"
  | "automotive";

// --- User & Authentication Types

export type UserAddressType = {
  city: string;
  area: string;
  street: string;
  phone: string;
};

export type UserType = {
  readonly fullName: string;
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly role: "customer" | "admin";
  readonly joinDate: string;
  readonly avatar: string;
  readonly status: string;
  readonly totalOrders: number;
  readonly address: UserAddressType | null;
};

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
  city?: string;
  area?: string;
  street?: string;
  phone?: string;
};

// --- Order Types

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export type OrderType = {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  orderItems: CartType[];
  shippingAddress: UserAddressType;
  totalPrice: number;
  paymentMethod: "card";
  status: OrderStatus;
  createdAt: string;
};
