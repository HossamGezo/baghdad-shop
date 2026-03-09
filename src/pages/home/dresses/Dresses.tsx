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
type DressesProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Dresses = ({ excludeId, className }: DressesProps) => {
  // --- Fetch Dresses
  const { loading, dresses, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (dresses.length === 0) dispatch(fetchProductsByCategory("dresses"));
  }, [dispatch, dresses.length]);

  const displayProducts = useMemo(() => {
    return dresses.filter((dress) => dress.id !== excludeId);
  }, [excludeId, dresses]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle to="/women" title="Elegant Dresses" className="my-5" />
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
          {displayProducts.map((dress) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={dress.id}
              {...dress}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Dresses;
