// --- Local Components
import CategoryPoster from "@components/category-poster/CategoryPoster";
import HeroSection from "@pages/home/hero/HeroSection";
import SpecialOffers from "@pages/home/special-offers/SpecialOffers";
import Laptops from "@pages/home/laptops/Laptops";
import Mobiles from "@pages/home/mobiles/Mobiles";
import Brands from "@pages/home/brands/Brands";
import Appliances from "@pages/home/appliances/Appliances";
import Cookware from "@pages/home/cookware/Cookware";
import Clothing from "@pages/home/clothing/Clothing";
import Shoes from "@pages/home/shoes/Shoes";

// --- Main Component
const Home = () => {
  const baseStyle =
    "cursor-pointer hover:scale-[0.99] border border-transparent hover:border-warning transition-all duration-300";
  // --- Return JSX
  return (
    <>
      <HeroSection />
      <SpecialOffers />

      {/* Electronics */}
      <CategoryPoster
        imageSrc="/images/posters/electronics-poster.png"
        altText="Electronics Poster"
        to="/electronics"
        className={baseStyle}
      />
      <Laptops />
      <Mobiles />

      {/* Kitchen */}
      <CategoryPoster
        imageSrc="/images/posters/kitchen-poster.png"
        altText="Kitchen Poster"
        to="/kitchen"
        className={baseStyle}
      />
      <Appliances />
      <Cookware />

      {/* Men */}
      <CategoryPoster
        imageSrc="/images/posters/men-poster.png"
        altText="Men Poster"
        to="/men"
        className={baseStyle}
      />
      <Clothing />
      <Shoes />

      <Brands />
    </>
  );
};

export default Home;
