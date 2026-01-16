// --- Local Components
import ProductCard from "../../../components/product-card/ProductCard";
import ProductSlider from "../../../components/product-slider/ProductSlider";

// --- Data
import {products} from "../../../data/products";

// --- Laptops (Main Component)
const Laptops = () => {
  return (
    <section className="laptops-section mt-10">
      <h1 className="bg-warning px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Latest Laptops
      </h1>
      <ProductSlider productsCount={products.length}>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </ProductSlider>
    </section>
  );
};

export default Laptops;
