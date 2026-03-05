// --- Libraries
import { useEffect } from "react";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchMobiles } from "@features/products/productsSlice";

// --- Local Components
import ProductCard from "@components/card/ProductCard";
import ProductSlider from "@components/product-slider/ProductSlider";
import Spinner from "@components/spinner/Spinner";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomTitle from "@components/custom-title/CustomTitle";

// --- Main Component
const Mobiles = () => {
  // --- Fetch Mobiles
  const { loading, mobiles, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (mobiles.length === 0) dispatch(fetchMobiles());
  }, [dispatch, mobiles.length]);

  // --- Return JSX
  return (
    <section>
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
        <ProductSlider productsCount={mobiles.length}>
          {mobiles.map((mobile) => (
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
