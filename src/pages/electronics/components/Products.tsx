// --- Libraries
import { useEffect, useMemo, useState } from "react";

// --- Local Files
import { useAppDispatch } from "@app/hooks";
import { fetchLaptops, fetchMobiles } from "@features/products/productsSlice";

// --- Local Components
import ProductCard from "@components/card/ProductCard";
import Pagination from "@components/pagination/Pagination";
import ErrorHandler from "@components/error-handler/ErrorHandler";

// --- Types
import type {
  CurrentElectronicsType,
  CurrentPriceType,
  ProductType,
} from "@/types";
import Spinner from "@components/spinner/Spinner";

// --- Types
type ProductsProps = {
  loading: boolean;
  error: string;
  laptops: ProductType[];
  mobiles: ProductType[];
  currentPrice: CurrentPriceType;
  currentElectronics: CurrentElectronicsType;
};

// --- Main Component
const Products = ({
  currentPrice = "no-sorting",
  currentElectronics = "all-products",
  loading,
  error,
  laptops,
  mobiles,
}: ProductsProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (laptops.length === 0) {
      dispatch(fetchLaptops());
    }
    if (mobiles.length === 0) {
      dispatch(fetchMobiles());
    }
  }, [dispatch, laptops.length, mobiles.length]);

  // --- Derived State (Filtering & Sorting)
  const filteredProducts = useMemo(() => {
    let result = [];

    // --- Filtering
    if (currentElectronics === "laptops") result = [...laptops];
    else if (currentElectronics === "mobiles") result = [...mobiles];
    else result = [...laptops, ...mobiles];

    // --- Sorting
    if (currentPrice === "low-to-high") {
      return result.toSorted((a, b) => a.price - b.price);
    } else if (currentPrice === "high-to-low") {
      return result.toSorted((a, b) => b.price - a.price);
    }

    return result;
  }, [laptops, mobiles, currentElectronics, currentPrice]);

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
              {paginatedItems.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <Pagination
              pages={pages as number}
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
