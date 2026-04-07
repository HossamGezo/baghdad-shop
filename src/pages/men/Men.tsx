// --- Libraries
import { useEffect } from "react";

// --- Local Components
import CategoryTemplate from "@components/category-template/CategoryTemplate";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Main Component
const Men = () => {
  // --- Fetching Data
  const { loading, error, clothing, shoes } = useAppSelector((state) => state.products);

  // --- Dispatch Data
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!loading && clothing.length === 0) {
      dispatch(fetchProductsByCategory("clothing"));
    }
    if (!loading && shoes.length === 0) {
      dispatch(fetchProductsByCategory("shoes"));
    }
  }, [clothing.length, dispatch, loading, shoes.length]);

  return (
    <div>
      <CategoryTemplate
        imageSrc="/images/posters/men-poster.png"
        altText="Men Poster"
        title="Men's Fashion"
        currentCategoryKey="men"
        loading={loading}
        error={error}
        items={[...clothing, ...shoes]}
      />
    </div>
  );
};
export default Men;
