// --- Libraries
import { useEffect, useMemo } from "react";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Local Components
import ProductCard from "@components/card/ProductCard";
import ProductSlider from "@components/product-slider/ProductSlider";
import Spinner from "@components/spinner/Spinner";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomTitle from "@components/custom-title/CustomTitle";

// --- Types
type HandbagsProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Handbags = ({ excludeId, className }: HandbagsProps) => {
  // --- Fetch Handbags
  const { loading, handbags, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (handbags.length === 0) dispatch(fetchProductsByCategory("handbags"));
  }, [dispatch, handbags.length]);

  const displayProducts = useMemo(() => {
    return handbags.filter((handbag) => handbag.id !== excludeId);
  }, [excludeId, handbags]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle
        to="/women"
        title="Luxury Handbags Collection"
        className="my-5"
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
        <ProductSlider productsCount={displayProducts.length}>
          {displayProducts.map((handbag) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={handbag.id}
              {...handbag}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Handbags;
