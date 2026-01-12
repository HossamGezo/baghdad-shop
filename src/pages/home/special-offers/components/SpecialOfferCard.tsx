// --- Libraries
import {Link} from "react-router";

// --- Local Components
import Discount from "./Discount";
import RatingAndViews from "./RatingAndViews";

// --- Types
type SpecialOfferProps = {
  id: number;
  title: string;
  firstImage: string;
  secondImage: string;
  price: number;
  discount: number;
  rating: number;
  reviews: string;
};

// --- SpecialCard (Main Component)
const SpecialOfferCard = (specialOffer: SpecialOfferProps) => {
  // --- Return JSX
  return (
    <div className="special-offer-card relative bg-white shadow-special rounded-md px-5 pt-5 pb-2.5 min-h-75 max-sm:h-115">
      {/* Card Discount */}
      <div className="special-offer-card-discount bg-secondary/75 text-white text-xl py-1 sm:w-37.5 text-center rounded-full sm:ml-auto">
        {specialOffer.discount}% OFF
      </div>
      {/* Card Details */}
      <div className="special-offer-card-details flex max-sm:flex-col items-center sm:items-center justify-center">
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
        <div className="special-offer-card-details-desc flex flex-col flex-1 xl:pl-10">
          <h3 className="special-offer-card-details-title text-primary max-xl:text-xl text-2xl font-medium">
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
          <Link className="block" to={`/products/${specialOffer.id}`}>
            See More ...
          </Link>
        </button>
      </div>
    </div>
  );
};
export default SpecialOfferCard;
