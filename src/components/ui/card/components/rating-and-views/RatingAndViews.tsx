// --- React Icons
import {FaStar} from "react-icons/fa6";

// --- types
type RatingAndViewsProps = {
  rating: number;
  reviews: string;
};

// --- RatingAndViews (Main Component)
const RatingAndViews = ({rating, reviews}: RatingAndViewsProps) => {
  // --- Return JSX
  return (
    <div className="product-details-card-details-rating-and-reviews flex items-center gap-2.5 mt-2.5">
      <span className="bg-secondary text-white flex items-center gap-2.5 px-2.5 py-0.5 rounded-sm font-medium my-2.5">
        {rating} <FaStar className="text-[13px]" />
      </span>
      <span className="text-primary font-medium">{reviews} Reviews</span>
    </div>
  );
};

export default RatingAndViews;
