// --- Libraries
import { Link } from "react-router";

// --- Types
import type { ProductType } from "@/types";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/cn";

// --- Local Components
import RatingAndViews from "@components/card/components/rating-and-reviews/RatingAndReviews";

// --- Types
type ProductCardProps = ProductType &
  React.ComponentPropsWithoutRef<"div"> & {
    category: string;
  };

// --- Main Component
const ProductCard = ({ className, ...product }: ProductCardProps) => {
  // --- Return JSX
  return (
    <Link
      to={`/products/${product.category}/${product.id}`}
      className={cn(
        "bg-white min-w-70 sm:min-w-75 flex flex-col items-center p-4 shadow-soft rounded-md hover:scale-[1.03] hover:shadow-deep transition-all duration-300 cursor-pointer select-none",
        className,
      )}
    >
      <div className="w-40 h-40 mb-5">
        <img
          src={product.firstImage}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="font-medium">{product.title}</div>
      <RatingAndViews rating={product.rating} reviews={product.reviews} />
      <div className="text-xl font-medium">
        USD {formatCurrency(product.price)}
      </div>
    </Link>
  );
};
export default ProductCard;
