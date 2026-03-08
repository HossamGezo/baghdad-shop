// --- Libraries
import { useEffect, useMemo } from "react";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchMobiles } from "@features/products/productsSlice";

// --- Local Components
import ProductCard from "@components/card/ProductCard";
import ProductSlider from "@components/product-slider/ProductSlider";
import Spinner from "@components/spinner/Spinner";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomTitle from "@components/custom-title/CustomTitle";

// --- Types
type MobilesOffersProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Mobiles = ({ excludeId, className }: MobilesOffersProps) => {
  // --- Fetch Mobiles
  const { loading, mobiles, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (mobiles.length === 0) dispatch(fetchMobiles());
  }, [dispatch, mobiles.length]);

  const displayProducts = useMemo(() => {
    return mobiles.filter((item) => item.id !== excludeId);
  }, [excludeId, mobiles]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle to="/electronics" title="Latest Mobiles" className="my-5" />
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
        <ProductSlider productsCount={displayProducts.length}>
          {displayProducts.map((mobile) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={mobile.id}
              {...mobile}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Mobiles;
