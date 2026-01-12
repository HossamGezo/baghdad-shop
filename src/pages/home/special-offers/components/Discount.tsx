// ---- Types
type DiscountProps = {
  price: number;
  discount: number;
};

// --- Discount (Main Component)
const Discount = ({price, discount}: DiscountProps) => {
  // --- Return JSX
  return (
    <div className="product-details-card-details-price-and-discount flex items-center gap-2.5 mt-5">
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        USD {(price - (discount / 100) * price).toFixed(2)}
      </span>
      <span className="line-through text-[#75757A] text-base sm:text-lg xl:text-xl">
        USD {price}
      </span>
      <span className="bg-amber-100 text-amber-600 max-sm:w-12 w-15 max-sm:h-6 h-8 flex items-center justify-center rounded-sm max-sm:text-[14px]">
        -{discount}%
      </span>
    </div>
  );
};
export default Discount;
