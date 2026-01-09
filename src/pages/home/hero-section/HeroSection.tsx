// --- Local Components
import Offers from "./components/Offers";
import Sellers from "./components/Sellers";
import Category from "./components/Category";

// --- HeroSection (Main Component)
const HeroSection = () => {
  // --- Return JSX
  return (
    <div className="hero-section mt-5">
      {/* Hero Section Offers */}
      <section className="hero-section-offers h-55 sm:h-62.5 md:h-85 lg:h-100 xl:h-110 grid grid-cols-12 gap-5 mb-10">
        {/* -- Offer Images */}
        <Offers />
        {/* -- Baghdad Sellers */}
        <Sellers />
      </section>
      {/* Hero Section Categories */}
      <Category />
    </div>
  );
};
export default HeroSection;
