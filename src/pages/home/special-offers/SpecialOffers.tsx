// --- Data
import {specialOffers} from "../../../data/special-offers";

// --- Local Components
import SpecialOfferCard from "./components/SpecialOfferCard";

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
          <SpecialOfferCard key={specialOffer.id} {...specialOffer} />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
