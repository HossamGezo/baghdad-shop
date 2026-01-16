// --- Local Components
import HeroSection from "./hero-section/HeroSection";
import Laptops from "./laptops-section/Laptops";
import SpecialOffers from "./special-offers/SpecialOffers";

// --- Home (Main Component)
const Home = () => {
  // --- Return JSX
  return (
    <>
      <HeroSection />
      <SpecialOffers />
      <Laptops />
    </>
  );
};

export default Home;
