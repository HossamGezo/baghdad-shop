// ---- Utils
import { calculateDiscount } from "@utils/calculateDiscount";
import { formatCurrency } from "@utils/formatCurrency";

// ---- Types
type DiscountProps = {
  price: number;
  discount: number;
};

// --- Main Component
const Discount = ({ price, discount }: DiscountProps) => {
  // --- Return JSX
  return (
    <div className="flex items-center gap-2.5 mt-5">
      <span className="text-xl xl:text-xl xxl:text-3xl font-bold">
        {formatCurrency(calculateDiscount(price, discount))}
      </span>
      {discount !== 0 && (
        <>
          <span className="line-through text-[#75757A] text-base sm:text-[16px] xxl:text-[18px]">
            {formatCurrency(price)}
          </span>
          <span className="bg-amber-100 text-amber-600 max-sm:w-12 w-15 max-sm:h-6 h-8 flex items-center justify-center rounded-sm max-sm:text-[14px]">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
};
export default Discount;
