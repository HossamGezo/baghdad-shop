// --- Libraries
import {Link} from "react-router";

// --- React Icons
import {MdOutlineDeleteOutline} from "react-icons/md";
import {HiPlus} from "react-icons/hi";
import {HiMinus} from "react-icons/hi";

// --- Types
import type {ProductProps} from "../../../utils/types";

// --- CartProduct (Main Component)
const CartProduct = (product: ProductProps) => {
  return (
    <div className="cart-product relative flex max-sm:flex-col max-sm:items justify-between border-b-2 border-b-body last:border-b-0 w-[97.5%] mx-auto p-3">
      {/* Cart Product Left */}
      <div className="cart-product-left flex flex-col gap-2.5">
        {/* ---- Cart Left Details */}
        <Link to={`/products/${product.category}/${product.id}`}>
          <div className="cart-left-details flex items-center gap-2.5">
            <div className="cart-left-image-wrapper w-18 h-18">
              <img
                src={product.firstImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="cart-left-desc-wrapper">
              <h4 className="font-light line-clamp-1">{product.title}</h4>
            </div>
          </div>
        </Link>
        {/* ---- Cart Left Remove */}
        <button
          type="button"
          className="max-sm:absolute bottom-6 cart-left-remove text-warning flex items-center gap-1 font-medium cursor-pointer hover:bg-amber-400 hover:text-white w-fit p-1 pr-1.5 rounded-sm transition-colors duration-150"
        >
          <MdOutlineDeleteOutline className="text-xl" />
          Remove
        </button>
      </div>
      {/* Cart Product Right */}
      <div className="cart-product-right flex flex-col items-end gap-5 max-lg:mt-2.5">
        {/* --- Price */}
        <div className="price flex flex-col items-end gap-1.5">
          {/* --- Price */}
          <div className="cart-right-price text-[16px] sm:text-lg">
            USD{" "}
            {(product.price - (product.discount / 100) * product.price).toFixed(
              2,
            )}
          </div>
          {/* --- Discount */}
          {product.discount !== 0 && (
            <div className="cart-right-price-discount flex items-center max-lg:gap-1.5 gap-2.5 max-lg:text-[14px]">
              <span className="line-through text-[#75757A]/75">
                USD {product.price.toFixed(2)}
              </span>
              <span className="bg-amber-100 text-amber-600 max-sm:w-10 w-12 h-7 flex items-center justify-center rounded-sm max-lg:text-[12px] text-[14px]">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>
        {/* --- Controllers */}
        <div className="cart-right-controllers flex items-center gap-3.5">
          <button
            type="button"
            className="bg-warning w-fit h-fit p-2 rounded-sm shadow-btn flex items-center justify-center select-none cursor-pointer hover:bg-amber-400 active:bg-warning active:scale-[0.99] transition-all duration-75 font-medium"
          >
            <HiMinus className="max-sm:text-[12px]" />
          </button>
          <span className="text-lg font-medium">1</span>
          <button
            type="button"
            className="bg-warning w-fit h-fit p-2 rounded-sm shadow-btn flex items-center justify-center select-none cursor-pointer hover:bg-amber-400 active:bg-warning active:scale-[0.99] transition-all duration-75 font-medium"
          >
            <HiPlus className="max-sm:text-[12px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
