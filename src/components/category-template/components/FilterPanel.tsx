// --- Libraries
import type { Dispatch, SetStateAction } from "react";

// --- Local Components
import CustomRadio from "@components/category-template/components/CustomRadio";

// --- Data
import { categoryConfigs } from "@data/categoryConfigs";

// --- Types
import type { CurrentProductsType, CurrentPriceType } from "@/types";

type FilterPanelProps = {
  currentPrice: CurrentPriceType;
  setCurrentPrice: Dispatch<SetStateAction<CurrentPriceType>>;
  currentProducts: CurrentProductsType;
  setCurrentProducts: Dispatch<SetStateAction<CurrentProductsType>>;
  currentCategoryKey: keyof typeof categoryConfigs;
};

// --- Main Component
const FilterPanel = ({
  currentPrice,
  setCurrentPrice,
  currentProducts,
  setCurrentProducts,
  currentCategoryKey,
}: FilterPanelProps) => {
  const config = categoryConfigs[currentCategoryKey];

  // --- Return JSX
  return (
    <section className="col-span-5 sm:col-span-2 lg:col-span-1">
      <div className="bg-white p-2.5 max-sm:shadow-standard shadow-deep rounded-md sticky top-2.5">
        {/* Sort By Price */}
        <div>
          <h3 className="text-primary font-medium text-lg mb-2.5 border-b pb-1">
            Sort by Price
          </h3>
          <div className="flex flex-col gap-1">
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
        <div className="mt-2.5">
          <h3 className="text-primary font-medium text-lg mb-2.5 border-b pb-1">
            Filter by Category
          </h3>
          <div className="flex flex-col gap-1">
            {config.subCategories.map((item) => (
              <CustomRadio
                key={item.id}
                text={item.label}
                radioName={currentCategoryKey}
                radioId={item.id}
                radioValue={item.id}
                radioChecked={currentProducts}
                onChange={() =>
                  setCurrentProducts(item.id as CurrentProductsType)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterPanel;
