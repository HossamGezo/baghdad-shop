// --- Libraries
import {useEffect} from "react";

// --- Local Files
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchLaptops} from "../../../features/products/productsSlice";

// --- Local Components
import ProductCard from "../../../components/ui/card/product-card/ProductCard";
import ProductSlider from "../../../components/product-slider/ProductSlider";
import Spinner from "../../../components/ui/spinner/Spinner";
import ErrorHandler from "../../../components/ui/error-handler/ErrorHandler";

// --- Laptops (Main Component)
const Laptops = () => {
  // --- Fetch Laptops
  const {loading, laptops, error} = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (laptops.length == 0) dispatch(fetchLaptops());
  }, [dispatch, laptops.length]);

  // --- Return JSX
  return (
    <section className="laptops-section mt-10">
      <h1 className="bg-warning px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Latest Laptops
      </h1>
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
        <ProductSlider productsCount={laptops.length}>
          {laptops.map((laptop) => (
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
