// --- Libraries
import { useEffect, useMemo } from "react";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchSpecialOffers } from "@features/products/productsSlice";

// --- Local Components
import SpecialOfferCard from "@pages/home/special-offers/components/SpecialOfferCard";
import Spinner from "@components/spinner/Spinner";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomTitle from "@components/custom-title/CustomTitle";

// --- Types
type SpecialOffersProps = React.ComponentProps<"div"> & {
  excludeId?: string;
};

// --- Main Component
const SpecialOffers = ({ excludeId, className }: SpecialOffersProps) => {
  // --- Fetch SpecialOffers
  const { loading, specialOffers, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (specialOffers.length === 0) dispatch(fetchSpecialOffers());
  }, [dispatch, specialOffers.length]);

  const displayProducts = useMemo(() => {
    return specialOffers.filter((item) => item.id !== excludeId);
  }, [excludeId, specialOffers]);

  // --- Return JSX
  return (
    <div className={cn("mt-24 mb-10", className)}>
      <CustomTitle
        title="Massive Deals Today – Only For 24 Hours"
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
          {displayProducts.map((specialOffer) => (
            <SpecialOfferCard key={specialOffer.id} {...specialOffer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
