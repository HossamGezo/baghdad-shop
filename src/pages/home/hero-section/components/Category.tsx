// --- Data
import {categories} from "../../../../data/categories";

// --- Category (Main Component)
const Category = () => {
  // --- Return JSX
  return (
    <section className="hero-section-categories">
      <h2 className="categories-head w-fit mx-auto mb-7 bg-warning py-1.5 px-5 rounded-sm text-sm sm:text-lg md:text-xl lg:text-2xl select-none font-bold lg:font-medium font-jetbrains">
        All Your Essentials in One Place
      </h2>
      <ul className="categories-list grid grid-cols-2 gap-2.5 xl:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <li
            key={category.id}
            className="categories-list-item flex flex-col items-center justify-center gap-2.5 bg-body hover:scale-[1.01] hover:shadow-primary transition-[transform,box-shadow] duration-300 cursor-pointer rounded-sm p-1"
          >
            <img
              src={category.image}
              alt="Category"
              draggable="false"
              className="max-md:w-35 lg:w-40"
            />
            <span className="categories-item-title text-[13px] sm:text-[14px] font-medium sm:font-normal">
              {category.title}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Category;
