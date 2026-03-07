// --- Libraries
import { useState } from "react";

// --- Local Components
import FilterPanel from "@pages/electronics/components/FilterPanel";
import Products from "@pages/electronics/components/Products";
import CategoryPoster from "@components/category-poster/CategoryPoster";

// --- Custom Hooks
import { useAppSelector } from "@app/hooks";

// --- Data
import { categoryConfigs } from "@data/categoryConfigs";

// --- Types
import type { CurrentProductsType, CurrentPriceType } from "@/types";

type CategoryTemplateProps = {
  imageSrc: string;
  altText: string;
  title: string;
  currentCategoryKey: keyof typeof categoryConfigs;
};

// --- Main Component
const CategoryTemplate = ({
  imageSrc,
  altText,
  title,
  currentCategoryKey,
}: CategoryTemplateProps) => {
  const [currentPrice, setCurrentPrice] =
    useState<CurrentPriceType>("no-sorting");
  const [currentProducts, setCurrentProducts] =
    useState<CurrentProductsType>("all-products");

  // --- Fetching Data
  const { loading, error, laptops, mobiles } = useAppSelector(
    (state) => state.products,
  );

  // --- Return JSX
  return (
    <div>
      <CategoryPoster className="my-5" imageSrc={imageSrc} altText={altText} />
      <h1 className="md:hidden text-center text-2xl font-bold text-primary my-5 font-jetbrains">
        {title}
      </h1>
      <div className="relative grid grid-cols-5 gap-5 mt-5 mb-35">
        <FilterPanel
          currentPrice={currentPrice}
          setCurrentPrice={setCurrentPrice}
          currentProducts={currentProducts}
          setCurrentProducts={setCurrentProducts}
          currentCategoryKey={currentCategoryKey}
        />
        <Products
          key={`${currentProducts}-${currentPrice}`}
          loading={loading}
          error={error}
          laptops={laptops}
          mobiles={mobiles}
          currentPrice={currentPrice}
          currentProducts={currentProducts}
        />
      </div>
    </div>
  );
};
export default CategoryTemplate;
