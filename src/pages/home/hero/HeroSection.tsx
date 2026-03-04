// --- Local Components
import Offers from "@pages/home/hero/components/Offers";
import Sellers from "@pages/home/hero/components/Sellers";
import Category from "@pages/home/hero/components/Category";

// --- Main Component
const HeroSection = () => {
  // --- Return JSX
  return (
    <div className="mt-5">
      {/* Hero Section Offers */}
      <section className="h-55 sm:h-62.5 md:h-85 lg:h-100 xl:h-110 grid grid-cols-12 gap-5 mb-10">
        <Offers />
        <Sellers />
      </section>
      {/* Hero Section Categories */}
      <Category />
    </div>
  );
};
export default HeroSection;
