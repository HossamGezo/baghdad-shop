// --- Libraries
import { useState } from "react";

// --- Local Components
import FilterPanel from "@components/category-template/components/FilterPanel";
import Products from "@components/category-template/components/Products";
import CategoryPoster from "@components/category-poster/CategoryPoster";

// --- Data
import { categoryConfigs } from "@data/categoryConfigs";

// --- Types
import type {
  CurrentProductsType,
  CurrentPriceType,
  ProductType,
} from "@/types";

type CategoryTemplateProps = {
  imageSrc: string;
  altText: string;
  title: string;
  currentCategoryKey: keyof typeof categoryConfigs;
  loading: boolean;
  error: string;
  items: ProductType[];
};

// --- Main Component
const CategoryTemplate = ({
  imageSrc,
  altText,
  title,
  currentCategoryKey,
  loading,
  error,
  items,
}: CategoryTemplateProps) => {
  const [currentPrice, setCurrentPrice] =
    useState<CurrentPriceType>("no-sorting");
  const [currentProducts, setCurrentProducts] =
    useState<CurrentProductsType>("all-products");

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
          items={items}
          currentPrice={currentPrice}
          currentProducts={currentProducts}
        />
      </div>
    </div>
  );
};
export default CategoryTemplate;
