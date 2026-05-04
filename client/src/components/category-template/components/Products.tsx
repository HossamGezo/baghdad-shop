// --- Libraries
import { useMemo, useState } from "react";

// --- Local Components
import ProductCard from "@components/card/ProductCard";
import Pagination from "@components/pagination/Pagination";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import Spinner from "@components/spinner/Spinner";

// --- Types
import type { CurrentProductsType, CurrentPriceType, ProductType } from "@/types/types";

type ProductsProps = {
  loading: boolean;
  error: string;
  items: ProductType[];
  currentPrice: CurrentPriceType;
  currentProducts: CurrentProductsType;
};

// --- Main Component
const Products = ({
  currentPrice = "no-sorting",
  currentProducts = "all-products",
  loading,
  error,
  items,
}: ProductsProps) => {
  // --- Derived State (Filtering & Sorting)
  const filteredProducts = useMemo(() => {
    // 1. Filtering
    const result =
      currentProducts === "all-products"
        ? items
        : items.filter((product: ProductType) => product.category === currentProducts);

    if (currentPrice === "low-to-high")
      return result.toSorted((a: ProductType, b: ProductType) => a.priceAfterDiscount - b.priceAfterDiscount);

    if (currentPrice === "high-to-low")
      return result.toSorted((a: ProductType, b: ProductType) => b.priceAfterDiscount - a.priceAfterDiscount);

    return result;
  }, [currentProducts, items, currentPrice]);

  // --- Pagination Calculations
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 6;
  const pages = Math.ceil(filteredProducts.length / itemsPerPage) || 0;
  const start = page * itemsPerPage;
  const paginatedItems = filteredProducts.slice(start, start + itemsPerPage);

  // --- Return JSX
  return (
    <>
      {loading && (
        <div className="flex items-center justify-center min-h-165 col-span-4">
          <Spinner />
        </div>
      )}
      {!loading && error && (
        <div className="flex items-center justify-center col-span-4">
          <ErrorHandler error={error} />
        </div>
      )}
      {!loading && !error && (
        <section className="lg:relative col-span-5 sm:col-span-3 lg:col-span-4">
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-4 px-2.5">
              {paginatedItems.map((product: ProductType) => (
                <ProductCard key={product._id} product={{ ...product }} />
              ))}
            </div>
            <Pagination
              pages={pages}
              page={page}
              setPage={setPage}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2"
            />
          </>
        </section>
      )}
    </>
  );
};

export default Products;
