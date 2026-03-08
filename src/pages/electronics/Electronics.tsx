// --- Libraries
import { useEffect } from "react";

// --- Local Components
import CategoryTemplate from "@components/category-template/CategoryTemplate";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchLaptops, fetchMobiles } from "@features/products/productsSlice";

// --- Main Component
const Electronics = () => {
  // --- Fetching Data
  const { loading, error, laptops, mobiles } = useAppSelector(
    (state) => state.products,
  );

  // --- Dispatch Data
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (laptops.length === 0) {
      dispatch(fetchLaptops());
    }
    if (mobiles.length === 0) {
      dispatch(fetchMobiles());
    }
  }, [dispatch, laptops.length, mobiles.length]);

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
