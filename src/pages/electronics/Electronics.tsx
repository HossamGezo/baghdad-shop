// --- Local Components
import CategoryTemplate from "@/components/category-template/CategoryTemplate";

// --- Main Component
const Electronics = () => {
  return (
    <div>
      <CategoryTemplate
        imageSrc={"/images/posters/electronics-poster.png"}
        altText={"Electronics Poster"}
        title="Electronics"
        currentCategoryKey="electronics"
      />
    </div>
  );
};
export default Electronics;
