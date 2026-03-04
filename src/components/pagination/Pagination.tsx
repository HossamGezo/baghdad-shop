// --- Libraries
import { cn } from "@utils/cn";

// --- React Icons
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

// --- Types
type PaginationProps = React.ComponentProps<"section"> & {
  pages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

// --- Main Component
const Pagination = ({
  pages,
  page,
  setPage,
  className,
  ...props
}: PaginationProps) => {
  // --- Controllers
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  // --- Styles
  const baseStyle =
    "flex items-center justify-center font-bold max-sm:w-11 w-20 h-10 text-warning border-r cursor-pointer select-none hover:bg-primary active:bg-primary/95";
  const btnStyle =
    "bg-primary border-r-0 disabled:opacity-50 disabled:cursor-no-drop disabled:active:bg-primary text-3xl";

  // --- Return JSX
  return (
    <section {...props} className={cn("pagination", className)}>
      <div className="flex items-center w-fit mx-auto">
        {/* Previous Button */}
        <button
          type="button"
          aria-label="Previous page"
          onClick={prevPage}
          disabled={page === 0 ? true : false}
          className={cn(baseStyle, btnStyle)}
        >
          <FaAngleDoubleLeft />
        </button>

        {/* Pagination Pages */}
        <div className="flex items-center">
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                aria-label={`Go to page ${index + 1}`}
                onClick={() => setPage(index)}
                className={cn(
                  baseStyle,
                  page === index ? "bg-primary" : "bg-primary/75",
                )}
              >
                {index + 1}
              </button>
            ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          aria-label="Next page"
          onClick={nextPage}
          disabled={page === pages - 1 ? true : false}
          className={cn(baseStyle, btnStyle)}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </section>
  );
};

export default Pagination;
