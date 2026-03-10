// --- Libraries
import { Link } from "react-router";

// --- Data
import { categories } from "@data/categories";

// --- Main Component
const Category = () => {
  // --- Return JSX
  return (
    <section>
      <h2 className="w-fit mx-auto mb-7 bg-warning py-1.5 px-5 rounded-sm text-sm sm:text-lg md:text-xl lg:text-2xl font-bold lg:font-medium font-jetbrains">
        All Your Essentials in One Place
      </h2>
      <ul className="grid grid-cols-2 gap-2.5 xl:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => {
          const content = (
            <div>
              <img
                src={category.image}
                alt={category.title}
                loading="lazy"
                draggable="false"
                className="max-md:w-35 lg:w-40"
              />
              <span className="text-[13px] sm:text-[14px] font-medium sm:font-normal">
                {category.title}
              </span>
            </div>
          );
          return (
            <li
              key={category.id}
              className="flex flex-col items-center justify-center gap-2.5 bg-body hover:scale-[1.01] hover:shadow-strong transition-[transform,box-shadow] duration-300 cursor-pointer rounded-sm p-1"
            >
              {category.to.includes("#") ? (
                <a href={category.to}>{content}</a>
              ) : (
                <Link to={category.to}>{content}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Category;
