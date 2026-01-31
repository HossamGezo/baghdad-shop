// --- Libraries
import clsx from "clsx";

// --- Types
import type {ProductProps} from "../../../../types";

// --- Local Components
import {useNavigate} from "react-router";
import RatingAndViews from "../components/rating-and-views/RatingAndViews";

// --- Types
type ProductCardProps = ProductProps &
  React.ComponentPropsWithoutRef<"div"> & {
    category: string;
  };

// --- ProductCard (Main Component)
const ProductCard = ({className, ...product}: ProductCardProps) => {
  const navigate = useNavigate();

  // --- Return JSX
  return (
    <div
      onClick={() => navigate(`/products/${product.category}/${product.id}`)}
      className={clsx(
        "product-card bg-white min-w-70 sm:min-w-75 flex flex-col items-center p-4 shadow-special rounded-md hover:scale-[1.03] hover:shadow-secondary transition-all duration-300 cursor-pointer select-none",
        className,
      )}
    >
      <div className="product-title-image-wrapper w-40 h-40 mb-5">
        <img
          src={product.firstImage}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="product-card-title font-medium">{product.title}</div>
      <RatingAndViews rating={product.rating} reviews={product.reviews} />
      <div className="product-card-price text-xl font-medium">
        USD {product.price}
      </div>
    </div>
  );
};
export default ProductCard;
