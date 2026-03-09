// --- Libraries
import { useEffect } from "react";

// --- Local Components
import CategoryTemplate from "@components/category-template/CategoryTemplate";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Main Component
const Kitchen = () => {
  // --- Fetching Data
  const { loading, error, appliances, cookware } = useAppSelector(
    (state) => state.products,
  );

  // --- Dispatch Data
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appliances.length === 0) {
      dispatch(fetchProductsByCategory("appliances"));
    }
    if (cookware.length === 0) {
      dispatch(fetchProductsByCategory("cookware"));
    }
  }, [appliances.length, cookware.length, dispatch]);

  return (
    <div>
      <CategoryTemplate
        imageSrc="/images/posters/kitchen-poster.png"
        altText="Kitchen Poster"
        title="Kitchen & Dining"
        currentCategoryKey="kitchen"
        loading={loading}
        error={error}
        items={[...appliances, ...cookware]}
      />
    </div>
  );
};
export default Kitchen;
