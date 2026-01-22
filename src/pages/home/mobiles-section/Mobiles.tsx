// --- Libraries
import {useEffect} from "react";

// --- Local Files
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchMobiles} from "../../../features/products/productsSlice";

// --- Local Components
import ProductCard from "../../../components/ui/card/product-card/ProductCard";
import ProductSlider from "../../../components/product-slider/ProductSlider";
import Spinner from "../../../components/ui/spinner/Spinner";
import ErrorHandler from "../../../components/ui/error-handler/ErrorHandler";

// --- Mobiles (Main Component)
const Mobiles = () => {
  // --- Fetch Mobiles
  const {loading, mobiles, error} = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (mobiles.length === 0) dispatch(fetchMobiles());
  }, [dispatch, mobiles.length]);

  // --- Return JSX
  return (
    <section className="Mobiles-section mt-10">
      <h1 className="bg-warning px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Latest Mobiles
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
        <ProductSlider productsCount={mobiles.length}>
          {mobiles.map((mobile) => (
            <ProductCard key={mobile.id} {...mobile} />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Mobiles;
