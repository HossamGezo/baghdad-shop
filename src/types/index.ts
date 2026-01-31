export type ProductProps = {
  id: string;
  title: string;
  firstImage: string;
  secondImage: string;
  images: string[];
  price: number;
  discount: number;
  rating: number;
  reviews: string;
  category: string;
  description: string;
};

export type CartProps = ProductProps & {
  count: number;
};

export type CurrentPriceProps = "no-sorting" | "low-to-high" | "high-to-low";

export type CurrentElectronicsProps = "all-products" | "laptops" | "mobiles";
