// --- Local Components
import HeroSection from "./hero-section/HeroSection";
import SpecialOffers from "./special-offers/SpecialOffers";
import Laptops from "./laptops-section/Laptops";
import Mobiles from "./mobiles-section/Mobiles";
import Brands from "./brands-section/Brands";

// --- Home (Main Component)
const Home = () => {
  // --- Return JSX
  return (
    <>
      <div className="custom-container">
        <HeroSection />
        <SpecialOffers />
        <Laptops />
        <Mobiles />
        <Brands />
      </div>
    </>
  );
};

export default Home;
