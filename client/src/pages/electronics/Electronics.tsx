// --- Libraries
import { useEffect } from "react";

// --- Local Components
import CategoryTemplate from "@components/category-template/CategoryTemplate";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Main Component
const Electronics = () => {
  // --- Fetching Data
  const { loading, error, laptops, mobiles } = useAppSelector((state) => state.products);

  // --- Dispatch Data
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!loading && laptops.length === 0) {
      dispatch(fetchProductsByCategory("laptops"));
    }
    if (!loading && mobiles.length === 0) {
      dispatch(fetchProductsByCategory("mobiles"));
    }
  }, [dispatch, laptops.length, loading, mobiles.length]);

  return (
    <div>
      <CategoryTemplate
        imageSrc={"/images/posters/electronics-poster.png"}
        altText={"Electronics Poster"}
        title="Electronics"
        currentCategoryKey="electronics"
        loading={loading}
        error={error}
        items={[...laptops, ...mobiles]}
      />
    </div>
  );
};
export default Electronics;
