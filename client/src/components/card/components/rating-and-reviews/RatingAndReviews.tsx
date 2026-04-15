// --- React Icons
import { FaStar } from "react-icons/fa6";

// --- Utils
import { cn } from "@utils/cn";

// --- types
type RatingAndViewsProps = React.ComponentProps<"div"> & {
  rating: number;
  reviews: number;
};

// --- Main Component
const RatingAndViews = ({ rating, reviews, className }: RatingAndViewsProps) => {
  return (
    <div className={cn("flex items-center gap-2.5 mt-2.5", className)}>
      <span className="bg-secondary text-white flex items-center gap-2.5 px-2.5 py-0.5 rounded-sm font-medium my-2.5">
        {rating} <FaStar className="text-[13px]" />
      </span>
      <span className="text-primary font-medium">{reviews} Reviews</span>
    </div>
  );
};

export default RatingAndViews;
