// --- Local Components
import HeroSection from "@pages/home/hero/HeroSection";
import SpecialOffers from "@pages/home/special-offers/SpecialOffers";
import Brands from "@pages/home/brands/Brands";
import Sections from "@pages/home/sections/Sections";

// --- Main Component
const Home = () => {
  return (
    <>
      <HeroSection />
      <SpecialOffers id="special-offers" />
      <Sections />
      <Brands />
    </>
  );
};

export default Home;
