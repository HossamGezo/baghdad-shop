// --- React Icons
import {FaStar} from "react-icons/fa6";

// --- Data
import {specialOffers} from "../../../data/special-offers";
import {Link} from "react-router";

// --- SpecialOffers (Main Component)
const SpecialOffers = () => {
  // --- Return JSX
  return (
    <div className="special-offers mt-24">
      <h1 className="bg-warning px-5 py-2.5 mb-5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Massive Deals Today – Only for 24 Hours
      </h1>
      <div className="special-offers-cards grid grid-cols-1 xl:grid-cols-2 gap-5">
        {specialOffers.map((specialOffer) => (
          <div
            className="special-offer-card relative bg-white shadow-special rounded-md px-5 pt-5 pb-2.5 max-sm:h-[435px]"
            key={specialOffer.id}
          >
            {/* Card Discount */}
            <div className="special-offer-card-discount bg-secondary/75 text-white text-xl py-1 w-37.5 text-center rounded-full">
              {specialOffer.discount}% OFF
            </div>
            {/* Card Details */}
            <div className="special-offer-card-details flex max-sm:flex-col-reverse items-center sm:items-center justify-center">
              {/* Product Description */}
              <div className="special-offer-card-details-desc flex flex-col items-center flex-1">
                <h3 className="special-offer-card-details-title text-primary max-xl:text-xl text-2xl font-medium">
                  {specialOffer.title}
                </h3>
                {/* --- Rating And Reviews */}
                <div className="special-offer-card-details-rating-and-reviews flex items-center gap-2.5">
                  <span className="text-primary text-lg font-medium">
                    {specialOffer.reviews} Reviews
                  </span>
                  <span className="bg-secondary text-white flex items-center gap-2.5 px-2.5 py-0.5 rounded-sm font-medium my-2.5">
                    <FaStar className="text-[13px]" /> {specialOffer.rating}
                  </span>
                </div>
                {/* --- Price And Discount */}
                <div className="special-offer-card-details-price-and-discount flex items-center gap-3.5">
                  <span className="line-through text-light-red text-xl">
                    ${specialOffer.price}
                  </span>
                  <span className="text-2xl">${specialOffer.discount}</span>
                </div>
              </div>
              {/* --- See More Button */}
              <button
                type="button"
                className="special-offer-card-details-see-more bg-primary text-white w-32 h-9 rounded-tr-lg rounded-bl-lg cursor-pointer absolute bottom-3 sm:left-5 right-5"
              >
                <Link className="block" to={`products/:${specialOffer.id}`}>
                  See More ...
                </Link>
              </button>
              {/* Product Image */}
              <div className="special-offer-card-image relative w-50 h-50 group">
                {/* --- 1st Image */}
                <div
                  className="h-full w-full  bg-contain bg-no-repeat"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
