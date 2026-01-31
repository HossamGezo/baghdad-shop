// --- Libraries
import {useState} from "react";

// --- Local Components
import FilterPanel from "./components/FilterPanel";
import Products from "./components/Products";

// --- Types
import type {CurrentElectronicsProps, CurrentPriceProps} from "../../types";

// --- Electronics (Main Component)
const Electronics = () => {
  const [currentPrice, setCurrentPrice] =
    useState<CurrentPriceProps>("no-sorting");
  const [currentElectronics, setCurrentElectronics] =
    useState<CurrentElectronicsProps>("all-products");

  // --- Return JSX
  return (
    <div className="electronics-page relative grid grid-cols-5 gap-5 my-5">
      <FilterPanel
        currentPrice={currentPrice}
        setCurrentPrice={setCurrentPrice}
        currentElectronics={currentElectronics}
        setCurrentElectronics={setCurrentElectronics}
      />
      <Products
        key={`${currentElectronics}-${currentPrice}`}
        currentPrice={currentPrice}
        currentElectronics={currentElectronics}
      />
    </div>
  );
};
export default Electronics;
