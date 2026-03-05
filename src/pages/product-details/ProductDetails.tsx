// --- Liraries
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  clearSingleProduct,
  fetchSingleProduct,
} from "@features/products/productsSlice";

// --- Local Components
import Discount from "@components/card/components/discount/Discount";
import RatingAndViews from "@components/card/components/rating-and-reviews/RatingAndReviews";
import ProductImages from "@components/card/components/product-images/ProductImages";
import Spinner from "@components/spinner/Spinner";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import { addToCart } from "@features/cart/cartSlice";
import type { ProductType } from "@/types";

// --- Main Component
const ProductDetails = () => {
  const params = useParams();
  const [count, setCount] = useState<number>(1);

  // --- RTK Custom Hooks
  const { loading, singleProduct, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();

  // --- Fetch Data
  useEffect(() => {
    dispatch(
      fetchSingleProduct({ category: params.category!, id: params.id! }),
    );
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, params.category, params.id]);

  // --- Add To Cart Logic
  const addToCartFunc = (product: ProductType) => {
    dispatch(addToCart({ ...product, count: count }));
  };

  // --- Return JSX
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center my-5">
          <Spinner />
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center justify-center my-5">
          <ErrorHandler error={error} />
        </div>
      )}

      {!loading && !error && singleProduct && (
        <div className="bg-primary/10 my-5 sm:p-5 rounded-lg">
          {/* --- Product Details Wrapper */}
          <div className="bg-white shadow-strong lg:w-3/4 mx-auto grid grid-cols-4 p-5 rounded-md">
            {/* Product Images */}
            <ProductImages
              images={singleProduct.images}
              title={singleProduct.title}
            />

            {/* Card Details */}
            <div className="col-span-4 md:col-span-2">
              {/* Product Description */}
              <div>
                <h1 className="text-primary text-[22px] font-medium underline decoration-warning mb-2.5">
                  {singleProduct.title}
                </h1>
                <p className="text-primary text-[14px] xl:text-base text-justify">
                  {singleProduct.description}
                </p>

                {/* --- Rating And Reviews */}
                <RatingAndViews
                  rating={singleProduct.rating}
                  reviews={singleProduct.reviews}
                />

                {/* --- Price And Discount */}
                <Discount
                  price={singleProduct.price}
                  discount={singleProduct.discount}
                />

                {/* Quantity */}
                <div className="flex items-center gap-5 mt-5">
                  <input
                    type="number"
                    onChange={(e) => setCount(Number(e.currentTarget.value))}
                    className="border border-primary w-20 rounded-sm p-1"
                    value={count}
                    min={1}
                    max={25}
                  />
                  <button
                    type="button"
                    aria-label="Add to cart"
                    onClick={() => addToCartFunc(singleProduct)}
                    className="bg-warning text-primary px-2 py-1 rounded-sm cursor-pointer hover:bg-amber-300 active:bg-warning active:scale-[0.98] transition-all duration-150"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
