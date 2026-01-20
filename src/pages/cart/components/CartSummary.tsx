// --- CartSummary (Main Component)
const CartSummary = () => {
  return (
    <div className="cart-summary max-md:order-first col-span-5 md:col-span-2 xl:col-span-1">
      <div className="cart-summary-wrapper bg-white rounded-md sticky top-2.5">
        {/* --- */}
        <h3 className="cart-summary-head border-b border-b-body p-5 font-medium text-[16px]">
          CART SUMMARY
        </h3>
        {/* --- */}
        <p className="cart-summary-price border-b border-b-body p-5 flex items-center justify-between">
          Subtotal
          <span className="cart-summary-price-digit font-medium text-xl">
            EGP 10,667.00
          </span>
        </p>
        {/* --- */}
        <div className="cart-summary-checkout p-5">
          <button
            type="button"
            className="bg-warning w-fit h-13 px-5 rounded-md shadow-btn flex items-center justify-center select-none cursor-pointer hover:bg-amber-400 active:bg-warning active:scale-[0.99] transition-all duration-75 font-medium mx-auto md:text-[14px] lg:text-[14px] xxl:text-[16px]"
          >
            Checkout (EGP 10,667.00)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
