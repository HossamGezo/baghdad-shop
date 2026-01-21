// --- Local Components
import ProductCard from "../../../components/ui/card/product-card/ProductCard";
import ProductSlider from "../../../components/product-slider/ProductSlider";
import useFetchData from "../../../hooks/useFetchData";

// --- Mobiles (Main Component)
const Mobiles = () => {
  const mobiles = useFetchData("mobiles");

  // --- Return JSX
  return (
    <section className="Mobiles-section mt-10">
      <h1 className="bg-warning px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Latest Mobiles
      </h1>
      {mobiles.length !== 0 && (
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
