// --- Libraries
import { useMemo } from "react";
import { useNavigate } from "react-router";

// --- Local Components
import CustomButton from "@components/custom-button/CustomButton";

// --- RTK
import { useAppSelector } from "@app/hooks";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import { calculateDiscount } from "@utils/calculateDiscount";

// --- Main Component
const CartSummary = () => {
  // --- React Router
  const navigate = useNavigate();

  // --- RTK

  // - Calculate Cart Total
  const { cart } = useAppSelector((state) => state.cart);

  const total = useMemo(() => {
    return cart.reduce((acc, cur) => acc + cur.count * calculateDiscount(cur.price, cur.discount), 0);
  }, [cart]);

  // --- Handle Checkout
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleCheckout = () => {
    if (isAuthenticated) navigate("/checkout");
    else navigate("/login");
  };

  // --- Return JSX
  return (
    <div className="max-md:order-first col-span-5 md:col-span-2 xl:col-span-1">
      <div className="bg-white rounded-md sticky top-2.5">
        {/* --- Title --- */}
        <h3 className="border-b border-b-body p-5 font-medium text-[16px]">CART SUMMARY</h3>

        {/* --- Total --- */}
        <p className="border-b border-b-body p-5 flex items-center justify-between">
          Subtotal
          <span className="font-medium text-xl">({formatCurrency(total, "EGP")})</span>
        </p>

        {/* --- Checkout --- */}
        <div className="p-5">
          <CustomButton
            type="button"
            aria-label="Checkout"
            onClick={handleCheckout}
            className="w-fit h-13 px-5  mx-auto md:text-[14px] lg:text-[14px] xxl:text-[16px]"
          >
            Checkout ({formatCurrency(total, "EGP")})
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
