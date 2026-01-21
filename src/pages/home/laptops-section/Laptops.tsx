// --- Local Components
import ProductCard from "../../../components/ui/card/product-card/ProductCard";
import ProductSlider from "../../../components/product-slider/ProductSlider";
import useFetchData from "../../../hooks/useFetchData";

// --- Laptops (Main Component)
const Laptops = () => {
  const laptops = useFetchData("laptops");

  // --- Return JSX
  return (
    <section className="laptops-section mt-10">
      <h1 className="bg-warning px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md text-primary">
        Latest Laptops
      </h1>
      {laptops.length !== 0 && (
        <ProductSlider productsCount={laptops.length}>
          {laptops.map((laptop) => (
            <ProductCard key={laptop.id} {...laptop} />
          ))}
        </ProductSlider>
      )}
    </section>
  );
};

export default Laptops;
