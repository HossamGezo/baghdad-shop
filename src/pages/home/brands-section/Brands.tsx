// --- Styles
import "./brands.css";

// --- Data
import {brands} from "../../../data/brands";

// --- BrandsLogos Component
const BrandsLogos = () => {
  return brands.map((brand) => (
    <div
      key={brand.id}
      className="brands-image-wrapper mr-5 px-5 w-60 h-20 bg-white rounded-xl shadow-special shrink-0 flex items-center justify-center hover:scale-[1.08] hover:shadow-secondary transition-all duration-500"
    >
      <img
        src={brand.image}
        alt="BRAND"
        className="w-full h-full mix-blend-multiply object-contain"
      />
    </div>
  ));
};

// --- Brands (Main Component)
const Brands = () => {
  // --- Return JSx
  return (
    <section className="brands py-5 rounded-md overflow-hidden">
      <div className="brands-infinite-slider overflow-hidden rounded-md py-5 bg-white/30 relative">
        <div className="absolute top-[50%] -translate-y-[50%] left-0 h-20 w-20 bg-linear-to-r from-white to-transparent z-10"></div>
        <div className="brands-wrapper flex items-center">
          <BrandsLogos />
          <BrandsLogos />
        </div>
        <div className="absolute top-[50%] -translate-y-[50%] right-0 h-20 w-20 bg-linear-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
};

export default Brands;
