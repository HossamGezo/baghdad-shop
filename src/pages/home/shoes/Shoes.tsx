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
type ShoesProps = React.ComponentProps<"section"> & {
  excludeId?: string;
};

// --- Main Component
const Shoes = ({ excludeId, className }: ShoesProps) => {
  // --- Fetch Shoes
  const { loading, shoes, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (shoes.length === 0) dispatch(fetchProductsByCategory("shoes"));
  }, [dispatch, shoes.length]);

  const displayProducts = useMemo(() => {
    return shoes.filter((item) => item.id !== excludeId);
  }, [excludeId, shoes]);

  // --- Return JSX
  return (
    <section className={cn(className)}>
      <CustomTitle
        to="/men"
        title="Comfortable & Trendy Shoes"
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
          {displayProducts.map((shoe) => (
            <ProductCard
              className="first-of-type:ml-3.75 last-of-type:mr-3.75"
              key={shoe.id}
              {...shoe}
            />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Shoes;
