import CategoryPoster from "@components/category-poster/CategoryPoster";
import HomeProductsSection from "@components/home-products-section/HomeProductsSection";

const Sections = () => {
  const categoryPosterStyle =
    "cursor-pointer hover:scale-[0.99] border border-transparent hover:border-warning transition-all duration-300 mt-5";

  // --- Return JSX
  return (
    <div>
      {/* 2. Kitchen Group */}
      <CategoryPoster
        imageSrc="/images/posters/kitchen-poster.png"
        altText="Kitchen Poster"
        to="/kitchen"
        className={categoryPosterStyle}
      />
      <HomeProductsSection title="Smart Home Appliances" categoryKey="appliances" to="/kitchen" />
      <HomeProductsSection title="Professional Cookware Collection" categoryKey="cookware" to="/kitchen" />

      {/* 3. Men Fashion Group */}
      <CategoryPoster
        imageSrc="/images/posters/men-poster.png"
        altText="Men Fashion Poster"
        to="/men"
        className={categoryPosterStyle}
      />
      <HomeProductsSection title="Trendy Men's Clothing" categoryKey="clothing" to="/men" />
      <HomeProductsSection title="Comfortable & Stylish Men's Shoes" categoryKey="shoes" to="/men" />

      {/* 4. Women Fashion Group */}
      <CategoryPoster
        imageSrc="/images/posters/women-poster.png"
        altText="Women Collection Poster"
        to="/women"
        className={categoryPosterStyle}
      />
      <HomeProductsSection title="Elegant Dresses for Every Occasion" categoryKey="dresses" to="/women" />
      <HomeProductsSection title="Luxury Handbags & Accessories" categoryKey="handbags" to="/women" />

      {/* 5. Supermarket Group */}
      <CategoryPoster
        imageSrc="/images/posters/supermarket-poster.png"
        altText="Supermarket Essentials"
        to="/supermarket"
        className={categoryPosterStyle}
      />
      <HomeProductsSection title="Fresh Grocery & Daily Essentials" categoryKey="supermarket" to="/supermarket" />

      {/* 6. Automotive Group */}
      <CategoryPoster
        imageSrc="/images/posters/automotive-poster.png"
        altText="Car Accessories & Tools"
        to="/automotive"
        className={categoryPosterStyle}
      />
      <HomeProductsSection title="Top Automotive Tools & Accessories" categoryKey="automotive" to="/automotive" />
    </div>
  );
};

export default Sections;
