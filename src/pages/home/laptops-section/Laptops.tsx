// --- Local Components
import ProductCard from "../../../components/ui/card/product-card/ProductCard";
import ProductSlider from "../../../components/product-slider/ProductSlider";

// --- Data
import {laptops} from "../../../data/laptops";

// --- Laptops (Main Component)
const Laptops = () => {
  return (
    <section className="laptops-section mt-10">
      <h1 className="bg-warning px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Latest Laptops
      </h1>
      <ProductSlider productsCount={laptops.length}>
        {laptops.map((laptop, index) => (
          <ProductCard key={index} {...laptop} />
        ))}
      </ProductSlider>
    </section>
  );
};

export default Laptops;
