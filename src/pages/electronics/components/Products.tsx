// --- Libraries
import {useEffect, useMemo, useState} from "react";

// --- Local Files
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
  fetchLaptops,
  fetchMobiles,
} from "../../../features/products/productsSlice";

// --- Local Components
import ProductCard from "../../../components/ui/card/product-card/ProductCard";
import Pagination from "../../../components/ui/pagination/Pagination";

// --- Types
import type {CurrentElectronicsProps, CurrentPriceProps} from "../../../types";

// --- Types
type ProductsProps = {
  currentPrice: CurrentPriceProps;
  currentElectronics: CurrentElectronicsProps;
};

// --- Products (Main Component)
const Products = ({
  currentPrice = "no-sorting",
  currentElectronics = "all-products",
}: ProductsProps) => {
  // --- Fetching Data
  const {loading, laptops, mobiles} = useAppSelector((state) => state.products);
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
      result.sort((a, b) => a.price - b.price);
    } else if (currentPrice === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
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
    <section className="products lg:relative col-span-5 sm:col-span-3 lg:col-span-4">
      {!loading && (
        <>
          <div className="products-wrapper grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-4 px-2.5">
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
      )}
    </section>
  );
};

export default Products;
