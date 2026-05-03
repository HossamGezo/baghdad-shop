// --- Libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// --- Local Files
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { clearSingleProduct, fetchSingleProduct } from "@features/products/productsSlice";

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

// --- Types
import type { CategoriesType, ProductType } from "@/types/types";

const categoryToPath: Record<string, string> = {
  laptops: "/electronics",
  mobiles: "/electronics",
  appliances: "/kitchen",
  cookware: "/kitchen",
  clothing: "/men",
  shoes: "/men",
  dresses: "/women",
  handbags: "/women",
  supermarket: "/supermarket",
  automotive: "/automotive",
};

// --- Main Component
const ProductDetails = () => {
  const { category, id } = useParams();
  const [count, setCount] = useState<number>(1);
  const currentCategory = category === "special-offers" ? "specialOffers" : category;

  // --- RTK Custom Hooks
  const { loading, singleProduct, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  // --- Fetch Data
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct({ id }));
    }
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, id]);

  // --- Add To Cart Logic
  const addToCartFunc = (product: ProductType) => {
    const cartItem = {
      productId: product._id,
      title: product.title,
      image: product.images[0]?.url || "",
      price: product.priceAfterDiscount,
      count: count,
      category: product.category,
    };
    dispatch(addToCart(cartItem));
  };

  // --- Handle Count Change Function
  const handleCountChange = (value: string) => {
    const num = Number(value);
    if (num >= 1 && num <= 25) setCount(num);
    else if (value === "") setCount(1);
  };

  // --- Return JSX
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-[60vh]">
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
            <div className="bg-white shadow-strong lg:w-3/4 mx-auto grid grid-cols-4 p-5 rounded-md">
              <ProductImages images={singleProduct.images} title={singleProduct.title} />

              {/* Card Details */}
              <div className="col-span-4 md:col-span-2">
                <div>
                  <h1 className="text-primary text-[22px] font-medium underline decoration-warning mb-2.5">
                    {singleProduct.title}
                  </h1>
                  <p className="text-primary text-[14px] xl:text-base text-justify">{singleProduct.description}</p>

                  <RatingAndViews rating={singleProduct.rating} reviews={singleProduct.reviewsCount} />

                  <Discount price={singleProduct.price} discount={singleProduct.discount} />

                  {/* Quantity */}
                  <div className="flex items-center gap-5 mt-5">
                    <input
                      type="number"
                      onChange={(e) => handleCountChange(e.target.value)}
                      className="border border-primary w-20 rounded-sm p-1 outline-none"
                      value={count}
                      min={1}
                      max={25}
                    />
                    <button
                      type="button"
                      aria-label="Add to cart"
                      onClick={() => addToCartFunc(singleProduct)}
                      className="bg-warning text-primary px-4 py-1.5 rounded-sm cursor-pointer font-bold hover:bg-amber-300 active:scale-[0.98] transition-all duration-150"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {currentCategory === "specialOffers" && <SpecialOffers className="mt-0" excludeId={id} />}
            {currentCategory !== "specialOffers" && (
              <HomeProductsSection
                title={"Recommended For You"}
                excludeId={id}
                categoryKey={currentCategory as CategoriesType}
                to={categoryToPath[currentCategory as CategoriesType] || "/"}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
