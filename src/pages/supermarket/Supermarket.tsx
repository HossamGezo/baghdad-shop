// --- Libraries
import { useEffect } from "react";

// --- Local Components
import CategoryTemplate from "@components/category-template/CategoryTemplate";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Main Component
const Supermarket = () => {
  // --- Fetching Data from Redux
  const { loading, error, supermarket } = useAppSelector((state) => state.products);

  // --- Dispatch Action
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading && supermarket.length === 0) {
      dispatch(fetchProductsByCategory("supermarket"));
    }
  }, [dispatch, supermarket.length, loading]);

  // --- Return JSX
  return (
    <div>
      <CategoryTemplate
        imageSrc="/images/posters/supermarket-poster.png"
        altText="Supermarket Poster"
        title="Supermarket & Daily Essentials"
        currentCategoryKey="supermarket"
        loading={loading}
        error={error}
        items={supermarket}
      />
    </div>
  );
};

export default Supermarket;
