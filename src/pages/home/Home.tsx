// --- Local Components
import CategoryPoster from "@components/category-poster/CategoryPoster";
import HeroSection from "@pages/home/hero/HeroSection";
import SpecialOffers from "@pages/home/special-offers/SpecialOffers";
import Laptops from "@pages/home/laptops/Laptops";
import Mobiles from "@pages/home/mobiles/Mobiles";
import Brands from "@pages/home/brands/Brands";
import Appliances from "@pages/home/appliances/Appliances";
import Cookware from "@pages/home/cookware/Cookware";

// --- Main Component
const Home = () => {
  const baseStyle =
    "cursor-pointer hover:scale-[0.99] border border-transparent hover:border-warning transition-all duration-300";
  // --- Return JSX
  return (
    <>
      <HeroSection />
      <SpecialOffers />
      <CategoryPoster
        imageSrc="/images/posters/electronics-poster.png"
        altText="Electronics Poster"
        to="/electronics"
        className={baseStyle}
      />
      <Laptops />
      <Mobiles />
      <CategoryPoster
        imageSrc="/images/posters/kitchen-poster.png"
        altText="Kitchen Poster"
        to="/kitchen"
        className={baseStyle}
      />
      <Appliances />
      <Cookware />
      <Brands />
    </>
  );
};

export default Home;
