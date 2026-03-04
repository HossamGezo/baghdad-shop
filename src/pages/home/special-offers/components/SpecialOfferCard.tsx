// --- Libraries
import { Link } from "react-router";

// --- Types
import type { ProductType } from "@/types";

// --- Local Components
import Discount from "@components/card/components/discount/Discount";
import RatingAndViews from "@components/card/components/rating-and-reviews/RatingAndReviews";

// --- Main Component
const SpecialOfferCard = (specialOffer: ProductType) => {
  // --- Return JSX
  return (
    <div className="relative bg-white shadow-soft rounded-md px-5 pt-5 pb-2.5 min-h-75 max-sm:h-115 hover:shadow-standard hover:scale-[1.01] transition-all duration-300">
      {/* Card Discount */}
      <div className="bg-secondary/75 text-white text-xl py-1 sm:w-37.5 text-center rounded-full sm:ml-auto">
        {specialOffer.discount}% OFF
      </div>
      {/* Card Details */}
      <div className="flex max-sm:flex-col items-center justify-center max-md:w-full max-lg:w-4/5 max-xl:w-3/5 mx-auto">
        {/* Product Image */}
        <div className="relative w-50 h-50 group">
          {/* --- 1st Image */}
          <img
            src={`${specialOffer.firstImage}`}
            alt={`First Image : ${specialOffer.title}`}
            loading="lazy"
            className="h-full w-full object-contain"
          />
          {/* --- 2nd Image */}
          <img
            src={`${specialOffer.secondImage}`}
            alt={`Second Image : ${specialOffer.title}`}
            loading="lazy"
            className="object-contain absolute inset-0 opacity-0 group-hover:opacity-100"
          />
        </div>
        {/* Product Description */}
        <div className="flex max-sm:items-center flex-col flex-1 xl:pl-5">
          <h3 className="text-primary max-xl:text-xl text-2xl font-medium line-clamp-1">
            {specialOffer.title}
          </h3>
          {/* --- Rating And Reviews */}
          <RatingAndViews
            rating={specialOffer.rating}
            reviews={specialOffer.reviews}
          />
          {/* --- Price And Discount */}
          <Discount
            price={specialOffer.price}
            discount={specialOffer.discount}
          />
        </div>
        {/* --- See More Button */}
        <Link
          aria-label={`see more about ${specialOffer.title}`}
          className="flex justify-center items-center bg-primary text-white w-32 h-9 rounded-tr-lg rounded-bl-lg cursor-pointer absolute bottom-3 sm:left-5 right-5 hover:bg-warning transition-colors duration-150"
          to={`/products/special-offers/${specialOffer.id}`}
        >
          See More ...
        </Link>
      </div>
    </div>
  );
};
export default SpecialOfferCard;
