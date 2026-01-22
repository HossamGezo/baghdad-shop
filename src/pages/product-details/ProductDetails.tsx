// --- Liraries
import {useEffect} from "react";
import {useParams} from "react-router";

// --- Local Files
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  clearSingleProduct,
  fetchSingleProduct,
} from "../../features/products/productsSlice";

// --- Local Components
import Discount from "../../components/ui/card/components/discount/Discount";
import RatingAndViews from "../../components/ui/card/components/rating-and-views/RatingAndViews";
import ProductImages from "../../components/ui/card/components/product-images/ProductImages";
import Spinner from "../../components/ui/spinner/Spinner";
import ErrorHandler from "../../components/ui/error-handler/ErrorHandler";

// --- ProductDetails (Main Component)
const ProductDetails = () => {
  // --- Find Product Logic
  const params = useParams();

  // --- Prepare Data
  const {loading, singleProduct, error} = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct({category: params.category!, id: params.id!}));
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, params.category, params.id]);

  // --- Return JSX (Product)
  return (
    <div className="product-details-page ">
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
        <div className="product-details-card bg-primary/10 my-5 sm:p-5 rounded-lg">
          {/* --- Product Details Wrapper */}
          <div className="product-details-wrapper bg-white shadow-primary lg:w-3/4 mx-auto grid grid-cols-4 p-5 rounded-md">
            {/* Product Images */}
            <ProductImages
              images={singleProduct.images}
              title={singleProduct.title}
            />
            {/* Card Details */}
            <div className="product-details-card-details col-span-4 md:col-span-2">
              {/* Product Description */}
              <div className="product-details-card-details-desc">
                <h3 className="product-details-card-details-title text-primary text-[22px] font-medium underline decoration-warning mb-2.5">
                  {singleProduct.title}
                </h3>
                <p className="product-details-card-details-full-desc text-primary text-[14px] xl:text-base text-justify">
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
                <div className="product-details-card-quantity flex items-center gap-5 mt-5">
                  <input
                    type="number"
                    className="border border-primary w-20 rounded-sm p-1"
                    defaultValue="1"
                    min={1}
                    max={25}
                  />
                  <button
                    type="button"
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
