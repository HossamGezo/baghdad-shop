// --- Libraries
import { useEffect, useMemo } from "react";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchLaptops } from "@features/products/productsSlice";

// --- Local Components
import ProductCard from "@components/card/ProductCard";
import ProductSlider from "@components/product-slider/ProductSlider";
import Spinner from "@components/spinner/Spinner";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomTitle from "@components/custom-title/CustomTitle";

// --- Types
type LaptopsOffersProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Laptops = ({ excludeId, className }: LaptopsOffersProps) => {
  // --- Fetch Laptops
  const { loading, laptops, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (laptops.length === 0) dispatch(fetchLaptops());
  }, [dispatch, laptops.length]);

  const displayProducts = useMemo(() => {
    return laptops.filter((item) => item.id !== excludeId);
  }, [excludeId, laptops]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle to="/electronics" title="Latest Laptops" className="my-5" />
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
          {displayProducts.map((laptop) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={laptop.id}
              {...laptop}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Laptops;
