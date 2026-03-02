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
  image: string;
};

export type CategoryType = {
  id: string;
  title: string;
  image: string;
};

export type CartType = ProductType & {
  count: number;
};

export type CurrentPriceType = "no-sorting" | "low-to-high" | "high-to-low";

export type CurrentElectronicsType = "all-products" | "laptops" | "mobiles";
