// --- Libraries
import {useParams} from "react-router";

// --- Local Components
import Discount from "../../components/ui/card/components/discount/Discount";
import RatingAndViews from "../../components/ui/card/components/rating-and-views/RatingAndViews";
import ProductImages from "../../components/ui/card/components/product-images/ProductImages";

// --- Custom Hooks
import useFetchProduct from "../../hooks/useFetchProduct";

// --- ProductDetails (Main Component)
const ProductDetails = () => {
  // --- Find Product Logic
  const params = useParams();

  // --- Prepare Data
  const product = useFetchProduct(`${params.category}`, `${params.id}`);

  // --- Return JSX (Not Found Product)
  if (!product) {
    return (
      <div className="product-not-found min-h-203.75 flex items-center justify-center">
        <h1 className="bg-red-100 text-red-500 p-5 h-100 rounded-2xl text-2xl md:text-3xl lg:text-5xl flex items-center justify-center font-jetbrains font-bold w-full">
          Product Not Found
        </h1>
      </div>
    );
  }

  // --- Return JSX (Product)
  return (
    <div className="product-details-page min-h-200">
      <div className="product-details-card bg-primary/10 mt-5 sm:p-5 rounded-lg">
        {/* --- Product Details Wrapper */}
        <div className="product-details-wrapper bg-white shadow-primary lg:w-3/4 mx-auto grid grid-cols-4 p-5 rounded-md">
          {/* Product Images */}
          <ProductImages images={product.images} title={product.title} />
          {/* Card Details */}
          <div className="product-details-card-details col-span-4 md:col-span-2">
            {/* Product Description */}
            <div className="product-details-card-details-desc">
              <h3 className="product-details-card-details-title text-primary text-[22px] font-medium underline decoration-warning mb-2.5">
                {product.title}
              </h3>
              <p className="product-details-card-details-full-desc text-primary text-[14px] xl:text-base text-justify">
                {product.description}
              </p>
              {/* --- Rating And Reviews */}
              <RatingAndViews
                rating={product.rating}
                reviews={product.reviews}
              />
              {/* --- Price And Discount */}
              <Discount price={product.price} discount={product.discount} />
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
    </div>
  );
};

export default ProductDetails;
