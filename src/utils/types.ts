export type ProductProps = {
  id: number;
  title: string;
  firstImage: string;
  secondImage: string;
  images: string[];
  price: number;
  discount: number;
  rating: number;
  reviews: string;
  category?: string;
  description: string;
};
