// --- Libraries
import { useEffect } from "react";

// --- Local Components
import CategoryTemplate from "@components/category-template/CategoryTemplate";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Main Component
const Automotive = () => {
  // --- Fetching Data from Redux
  const { loading, error, automotive } = useAppSelector((state) => state.products);

  // --- Dispatch Action
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading && automotive.length === 0) {
      dispatch(fetchProductsByCategory("automotive"));
    }
  }, [dispatch, automotive.length, loading]);

  // --- Return JSX
  return (
    <div>
      <CategoryTemplate
        imageSrc="/images/posters/automotive-poster.png"
        altText="Automotive Poster"
        title="Automotive Accessories & Tools"
        currentCategoryKey="automotive"
        loading={loading}
        error={error}
        items={automotive}
      />
    </div>
  );
};

export default Automotive;
