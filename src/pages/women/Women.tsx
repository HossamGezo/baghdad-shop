// --- Libraries
import { useEffect } from "react";

// --- Local Components
import CategoryTemplate from "@components/category-template/CategoryTemplate";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Main Component
const Women = () => {
  // --- Fetching Data
  const { loading, error, dresses, handbags } = useAppSelector(
    (state) => state.products,
  );

  // --- Dispatch Data
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (dresses.length === 0) {
      dispatch(fetchProductsByCategory("dresses"));
    }
    if (handbags.length === 0) {
      dispatch(fetchProductsByCategory("handbags"));
    }
  }, [dispatch, dresses.length, handbags.length]);

  return (
    <div>
      <CategoryTemplate
        imageSrc="/images/posters/women-poster.png"
        altText="Women Poster"
        title="Women's Collection"
        currentCategoryKey="women"
        loading={loading}
        error={error}
        items={[...dresses, ...handbags]}
      />
    </div>
  );
};
export default Women;
