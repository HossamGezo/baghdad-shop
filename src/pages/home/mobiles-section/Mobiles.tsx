// --- Local Components
import ProductCard from "../../../components/product-card/ProductCard";
import ProductSlider from "../../../components/product-slider/ProductSlider";

// --- Data
import {mobiles} from "../../../data/mobiles";

// --- Mobiles (Main Component)
const Mobiles = () => {
  return (
    <section className="Mobiles-section mt-10">
      <h1 className="bg-warning px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Latest Mobiles
      </h1>
      <ProductSlider productsCount={mobiles.length}>
        {mobiles.map((mobile, index) => (
          <ProductCard key={index} {...mobile} />
        ))}
      </ProductSlider>
    </section>
  );
};

export default Mobiles;
