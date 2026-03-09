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
type CookwareProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Cookware = ({ excludeId, className }: CookwareProps) => {
  // --- Fetch Cookwares
  const { loading, cookware, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cookware.length === 0) dispatch(fetchProductsByCategory("cookware"));
  }, [dispatch, cookware.length]);

  const displayProducts = useMemo(() => {
    return cookware.filter((item) => item.id !== excludeId);
  }, [excludeId, cookware]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle
        to="/kitchen"
        title="Kitchen Cookware Collection"
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
          {displayProducts.map((cookware) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={cookware.id}
              {...cookware}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Cookware;
