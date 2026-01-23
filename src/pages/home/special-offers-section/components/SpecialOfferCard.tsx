// --- Libraries
import {Link} from "react-router";

// --- Types
import type {ProductProps} from "../../../../types";

// --- Local Components
import Discount from "../../../../components/ui/card/components/discount/Discount";
import RatingAndViews from "../../../../components/ui/card/components/rating-and-views/RatingAndViews";

// --- SpecialCard (Main Component)
const SpecialOfferCard = (specialOffer: ProductProps) => {
  // --- Return JSX
  return (
    <div className="special-offer-card relative bg-white shadow-special rounded-md px-5 pt-5 pb-2.5 min-h-75 max-sm:h-115">
      {/* Card Discount */}
      <div className="special-offer-card-discount bg-secondary/75 text-white text-xl py-1 sm:w-37.5 text-center rounded-full sm:ml-auto">
        {specialOffer.discount}% OFF
      </div>
      {/* Card Details */}
      <div className="special-offer-card-details flex max-sm:flex-col items-center justify-center max-md:w-full max-lg:w-4/5 max-xl:w-3/5 mx-auto">
        {/* Product Image */}
        <div className="special-offer-card-image relative w-50 h-50 group">
          {/* --- 1st Image */}
          <div
            className="h-full w-full bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${specialOffer.firstImage})`,
            }}
          ></div>
          {/* --- 2nd Image */}
          <div
            className="bg-contain bg-no-repeat absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{backgroundImage: `url(${specialOffer.secondImage})`}}
          ></div>
        </div>
        {/* Product Description */}
        <div className="special-offer-card-details-desc flex max-sm:items-center flex-col flex-1 xl:pl-5">
          <h3 className="special-offer-card-details-title text-primary max-xl:text-xl text-2xl font-medium line-clamp-1">
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
        <button
          type="button"
          className="special-offer-card-details-see-more bg-primary text-white w-32 h-9 rounded-tr-lg rounded-bl-lg cursor-pointer absolute bottom-3 sm:left-5 right-5"
        >
          <Link
            className="block"
            to={`/products/special-offers/${specialOffer.id}`}
          >
            See More ...
          </Link>
        </button>
      </div>
    </div>
  );
};
export default SpecialOfferCard;
