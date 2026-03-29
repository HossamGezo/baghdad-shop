// --- Libraries
import { Link, type LinkProps } from "react-router";

// --- Types
import type { ProductType } from "@/types/types";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/cn";

// --- Local Components
import RatingAndViews from "@components/card/components/rating-and-reviews/RatingAndReviews";

// --- Types
type ProductCardProps = Omit<LinkProps, "to"> & {
  product: ProductType;
};

// --- Main Component
const ProductCard = ({ className, product, ...rest }: ProductCardProps) => {
  const { id, category, firstImage, title, reviews, rating, price } = product;

  // --- Return JSX
  return (
    <Link
      to={`/products/${category}/${id}`}
      className={cn(
        "bg-white min-w-70 sm:min-w-75 flex flex-col items-center p-4 shadow-soft rounded-md hover:scale-[1.03] hover:shadow-deep transition-all duration-300 cursor-pointer select-none",
        className,
      )}
      {...rest}
    >
      <div className="w-40 h-40 mb-5">
        <img
          src={firstImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="font-medium line-clamp-1">{title}</div>
      <RatingAndViews rating={rating} reviews={reviews} />
      <div className="text-xl font-medium">{formatCurrency(price)}</div>
    </Link>
  );
};
export default ProductCard;
