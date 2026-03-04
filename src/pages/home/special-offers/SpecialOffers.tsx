// --- Libraries
import { useEffect } from "react";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchSpecialOffers } from "@features/products/productsSlice";

// --- Local Components
import SpecialOfferCard from "@pages/home/special-offers/components/SpecialOfferCard";
import Spinner from "@components/spinner/Spinner";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomTitle from "@/components/custom-title/CustomTitle";

// --- Main Component
const SpecialOffers = () => {
  // --- Fetch SpecialOffers
  const { loading, specialOffers, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (specialOffers.length === 0) dispatch(fetchSpecialOffers());
  }, [dispatch, specialOffers.length]);

  // --- Return JSX
  return (
    <div className="mt-24 mb-10">
      <CustomTitle
        title="Massive Deals Today – Only for 24 Hours"
        offer={true}
        className="mb-10"
      />
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {specialOffers.map((specialOffer) => (
            <SpecialOfferCard key={specialOffer.id} {...specialOffer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
