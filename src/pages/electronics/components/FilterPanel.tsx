// --- Libraries
import type {Dispatch, SetStateAction} from "react";

// --- Local Components
import CustomRadio from "./CustomRadio";

// --- Types
import type {CurrentElectronicsProps, CurrentPriceProps} from "../../../types";

// --- Types
type PriceProps = SetStateAction<CurrentPriceProps>;
type ElectronicsProps = SetStateAction<CurrentElectronicsProps>;
type SetCurrentPriceProps = Dispatch<PriceProps>;
type setCurrentElectronicsProps = Dispatch<ElectronicsProps>;

type FilterPanelProps = {
  currentPrice: CurrentPriceProps;
  setCurrentPrice: SetCurrentPriceProps;
  currentElectronics: CurrentElectronicsProps;
  setCurrentElectronics: setCurrentElectronicsProps;
};

// --- FilterPanel (Main Component)
const FilterPanel = ({
  currentPrice,
  setCurrentPrice,
  currentElectronics,
  setCurrentElectronics,
}: FilterPanelProps) => {
  // --- Return JSX
  return (
    <section className="filter-panel col-span-5 sm:col-span-2 lg:col-span-1">
      <div className="filter-panel-wrapper bg-white p-2.5 shadow-secondary rounded-md sticky top-2.5">
        {/* Sort By Price */}
        <div className="sort-price">
          <h3 className="text-primary font-medium text-lg mb-2.5 border-b pb-1">
            Sort by Price
          </h3>
          <div className="filter-wrapper flex flex-col gap-1">
            <CustomRadio
              text={"No Sorting"}
              radioName={"price"}
              radioId={"no-sorting"}
              radioValue="no-sorting"
              radioChecked={currentPrice}
              onChange={() => setCurrentPrice("no-sorting")}
            />
            <CustomRadio
              text={"Low to High"}
              radioName={"price"}
              radioId={"low-to-high"}
              radioValue="low-to-high"
              radioChecked={currentPrice}
              onChange={() => setCurrentPrice("low-to-high")}
            />
            <CustomRadio
              text={"High to Low"}
              radioName={"price"}
              radioId={"high-to-low"}
              radioValue="high-to-low"
              radioChecked={currentPrice}
              onChange={() => setCurrentPrice("high-to-low")}
            />
          </div>
        </div>
        {/* Filter By Category */}
        <div className="filter-category mt-2.5">
          <h3 className="text-primary font-medium text-lg mb-2.5 border-b pb-1">
            Filter by Category
          </h3>
          <div className="filter-wrapper flex flex-col gap-1">
            <CustomRadio
              text={"All Products"}
              radioName={"electronics"}
              radioId={"all-products"}
              radioValue="all-products"
              radioChecked={currentElectronics}
              onChange={() => setCurrentElectronics("all-products")}
            />
            <CustomRadio
              text={"Laptops"}
              radioName={"electronics"}
              radioId={"laptops"}
              radioValue="laptops"
              radioChecked={currentElectronics}
              onChange={() => setCurrentElectronics("laptops")}
            />
            <CustomRadio
              text={"Mobiles"}
              radioName={"electronics"}
              radioId={"mobiles"}
              radioValue="mobiles"
              radioChecked={currentElectronics}
              onChange={() => setCurrentElectronics("mobiles")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterPanel;
