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
type ClothingProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Clothing = ({ excludeId, className }: ClothingProps) => {
  // --- Fetch Clothing
  const { loading, clothing, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (clothing.length === 0) dispatch(fetchProductsByCategory("clothing"));
  }, [dispatch, clothing.length]);

  const displayProducts = useMemo(() => {
    return clothing.filter((item) => item.id !== excludeId);
  }, [excludeId, clothing]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle
        to="/men"
        title="Trendy Clothing for Every Style"
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
          {displayProducts.map((clothing) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={clothing.id}
              {...clothing}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Clothing;
