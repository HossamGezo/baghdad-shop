// --- Local Components
import HeroSection from "@pages/home/hero/HeroSection";
import SpecialOffers from "@pages/home/special-offers/SpecialOffers";
import Laptops from "@pages/home/laptops/Laptops";
import Mobiles from "@pages/home/mobiles/Mobiles";
import Brands from "@pages/home/brands/Brands";

// --- Main Component
const Home = () => {
  // --- Return JSX
  return (
    <>
      <HeroSection />
      <SpecialOffers />
      <Laptops />
      <Mobiles />
      <Brands />
    </>
  );
};

export default Home;
