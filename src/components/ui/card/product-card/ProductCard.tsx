// --- Local Components
import {useNavigate} from "react-router";
import RatingAndViews from "../components/rating-and-views/RatingAndViews";
// --- Types
type ProductCardProps = {
  id: number;
  firstImage: string;
  title: string;
  rating: number;
  reviews: string;
  category: string;
  price: number;
};

// --- ProductCard (Main Component)
const ProductCard = (product: ProductCardProps) => {
  const navigate = useNavigate();

  // --- Return JSX
  return (
    <div
      onClick={() => navigate(`/products/${product.category}/${product.id}`)}
      className="product-card first-of-type:ml-3.75 last-of-type:mr-3.75 bg-white min-w-75 flex flex-col items-center p-4 shadow-special rounded-md hover:scale-[1.03] hover:shadow-secondary transition-all duration-300 cursor-pointer select-none"
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
