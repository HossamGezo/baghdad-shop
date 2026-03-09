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
type AppliancesProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Appliances = ({ excludeId, className }: AppliancesProps) => {
  // --- Fetch Appliances
  const { loading, appliances, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appliances.length === 0)
      dispatch(fetchProductsByCategory("appliances"));
  }, [dispatch, appliances.length]);

  const displayProducts = useMemo(() => {
    return appliances.filter((item) => item.id !== excludeId);
  }, [excludeId, appliances]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle
        to="/kitchen"
        title="Smart Home Appliances"
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
          {displayProducts.map((appliance) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={appliance.id}
              {...appliance}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Appliances;
