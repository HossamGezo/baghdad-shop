// --- Libraries
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
import SpecialOffers from "@pages/home/special-offers/SpecialOffers";
import HomeProductsSection from "@components/home-products-section/HomeProductsSection";

// --- Redux Features
import { addToCart } from "@features/cart/cartSlice";

// --- data
import database from "~/@/db.json";

// --- Types
import type { ProductType } from "@/types";

const categoryToPath: Record<string, string> = {
  laptops: "/electronics",
  mobiles: "/electronics",
  appliances: "/kitchen",
  cookware: "/kitchen",
  clothing: "/men",
  shoes: "/men",
  dresses: "/women",
  handbags: "/women",
};

// --- Main Component
const ProductDetails = () => {
  const { category, id } = useParams();
  const [count, setCount] = useState<number>(1);
  const currentCategory =
    category === "special-offers" ? "specialOffers" : category;
  // --- RTK Custom Hooks
  const { loading, singleProduct, error } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();

  // --- Fetch Data
  useEffect(() => {
    dispatch(fetchSingleProduct({ category: currentCategory!, id: id! }));
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, currentCategory, id]);

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
        <div className="mb-10">
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
          <div>
            {currentCategory === "specialOffers" && (
              <SpecialOffers className="mt-0" excludeId={id} />
            )}
            {currentCategory !== "specialOffers" && (
              <HomeProductsSection
                title={"Recommended For You"}
                excludeId={id}
                categoryKey={currentCategory as keyof typeof database}
                to={categoryToPath[currentCategory as keyof typeof database]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
