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
  readonly category: string;
  readonly description: string;
};

export type BrandType = {
  id: string;
  name: string;
  image: string;
};

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
  | "handbags";

export type CartType = ProductType & {
  count: number;
};

export type CurrentPriceType = "no-sorting" | "low-to-high" | "high-to-low";

export type CurrentProductsType =
  | "all-products"
  | "laptops"
  | "mobiles"
  | "shirts"
  | "shoes"
  | "dresses"
  | "handbags"
  | "appliances"
  | "cookware";
