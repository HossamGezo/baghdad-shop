// --- Local Components
import RatingAndViews from "../../pages/home/special-offers/components/RatingAndViews";

// --- Types
type ProductCardProps = {
  image: string;
  title: string;
  rating: number;
  reviews: string;
  price: number;
};

// --- ProductCard (Main Component)
const ProductCard = (product: ProductCardProps) => {
  return (
    <div className="product-card bg-white w-80 flex flex-col items-center p-4 rounded-md">
      <div className="product-title-image-wrapper w-40 h-40 mb-5">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain"/>
      </div>
      <div className="product-card-title font-medium">{product.title}</div>
      <RatingAndViews rating={product.rating} reviews={product.reviews} />
      <div className="product-card-price text-xl font-medium">USD {product.price}</div>
    </div>
  );
};
export default ProductCard;
