// --- Libraries
import {useEffect} from "react";

// --- Local Files
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchSpecialOffers} from "../../../features/products/productsSlice";

// --- Local Components
import SpecialOfferCard from "./components/SpecialOfferCard";
import Spinner from "../../../components/ui/spinner/Spinner";
import ErrorHandler from "../../../components/ui/error-handler/ErrorHandler";

// --- SpecialOffers (Main Component)
const SpecialOffers = () => {
  // --- Fetch SpecialOffers
  const {loading, specialOffers, error} = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (specialOffers.length === 0) dispatch(fetchSpecialOffers());
  }, [dispatch, specialOffers.length]);

  // --- Return JSX
  return (
    specialOffers.length !== 0 && (
      <div className="special-offers mt-24">
        <h1 className="bg-warning px-5 py-2.5 mb-5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
          Massive Deals Today – Only for 24 Hours
        </h1>
        {loading && (
          <div className="flex items-center justify-center my-5">
            <Spinner />
          </div>
        )}
        {!loading && error && (
          <div className="flex items-center justify-center my-5">
            <ErrorHandler error={error} />
          </div>
        )}
        {!loading && !error && (
          <div className="special-offers-cards grid grid-cols-1 xl:grid-cols-2 gap-5">
            {specialOffers.map((specialOffer) => (
              <SpecialOfferCard key={specialOffer.id} {...specialOffer} />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default SpecialOffers;
