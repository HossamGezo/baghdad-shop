// --- Local Files
import { calculateDiscount } from "@/utils/calculateDiscount";
import { useAppSelector } from "@app/hooks";

// Utils
import { formatCurrency } from "@utils/formatCurrency";

// --- Main Component
const CartSummary = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const total = cart.reduce(
    (acc, cur) => acc + cur.count * calculateDiscount(cur.price, cur.discount),
    0,
  );
  // --- Return JSX
  return (
    <div className="max-md:order-first col-span-5 md:col-span-2 xl:col-span-1">
      <div className="bg-white rounded-md sticky top-2.5">
        {/* --- */}
        <h3 className="border-b border-b-body p-5 font-medium text-[16px]">
          CART SUMMARY
        </h3>
        {/* --- */}
        <p className="border-b border-b-body p-5 flex items-center justify-between">
          Subtotal
          <span className="font-medium text-xl">
            ({formatCurrency(total, "EGP")})
          </span>
        </p>
        {/* --- */}
        <div className="p-5">
          <button
            type="button"
            aria-label="Checkout"
            className="bg-warning w-fit h-13 px-5 rounded-md shadow-standard flex items-center justify-center select-none cursor-pointer hover:bg-amber-400 active:bg-warning active:scale-[0.99] transition-all duration-75 font-medium mx-auto md:text-[14px] lg:text-[14px] xxl:text-[16px]"
          >
            Checkout ({formatCurrency(total, "EGP")})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
