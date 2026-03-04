// --- Libraries
import { useState } from "react";

// --- Local Components
import FilterPanel from "@pages/electronics/components/FilterPanel";
import Products from "@pages/electronics/components/Products";

// --- Custom Hooks
import { useAppSelector } from "@/app/hooks";

// --- Types
import type { CurrentElectronicsType, CurrentPriceType } from "@/types";

// --- Main Component
const Electronics = () => {
  const [currentPrice, setCurrentPrice] =
    useState<CurrentPriceType>("no-sorting");
  const [currentElectronics, setCurrentElectronics] =
    useState<CurrentElectronicsType>("all-products");

  // --- Fetching Data
  const { loading, error, laptops, mobiles } = useAppSelector(
    (state) => state.products,
  );

  // --- Return JSX
  return (
    <div className="relative grid grid-cols-5 gap-5 my-5">
      <FilterPanel
        currentPrice={currentPrice}
        setCurrentPrice={setCurrentPrice}
        currentElectronics={currentElectronics}
        setCurrentElectronics={setCurrentElectronics}
      />
      <Products
        key={`${currentElectronics}-${currentPrice}`}
        loading={loading}
        error={error}
        laptops={laptops}
        mobiles={mobiles}
        currentPrice={currentPrice}
        currentElectronics={currentElectronics}
      />
    </div>
  );
};
export default Electronics;
