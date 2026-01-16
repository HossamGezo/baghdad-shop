// --- Local Components
import HeroSection from "./hero-section/HeroSection";
import SpecialOffers from "./special-offers/SpecialOffers";
import Laptops from "./laptops-section/Laptops";
import Mobiles from "./mobiles-section/Mobiles";

// --- Home (Main Component)
const Home = () => {
  // --- Return JSX
  return (
    <>
      <HeroSection />
      <SpecialOffers />
      <Laptops />
      <Mobiles />
    </>
  );
};

export default Home;
