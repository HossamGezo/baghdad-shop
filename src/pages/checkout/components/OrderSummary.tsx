// --- Custom Hooks
import { useAppSelector } from "@app/hooks";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import { calculateDiscount } from "@utils/calculateDiscount";

// --- Local Components
import RatingAndViews from "@components/card/components/rating-and-reviews/RatingAndReviews";

// --- Main Component
const OrderSummary = () => {
  // --- Orders
  const orders = useAppSelector((state) => state.cart.cart);

  // --- Calculations
  const total = orders.reduce((acc, cur) => acc + cur.count * calculateDiscount(cur.price, cur.discount), 0);
  const fees = total - (99 / 100) * total;
  const totalPrice = total + fees;

  // --- Return JSX
  return (
    <div className="text-neutral-800 py-2.5 bg-white shadow-md rounded-md">
      <h2 className="relative w-fit px-2.5 text-primary/60 text-2xl font-jetbrains select-none mb-5 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
        ORDER SUMMARY
      </h2>
      <div className="p-2.5 *:not-last:border-b *:border-b-primary">
        {/* Orders */}
        <div className="flex flex-col gap-2.5 max-h-[45vh] overflow-y-auto custom-scrollbar pb-2.5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-5 text-[14px] odd:bg-primary/5 even:bg-neutral-400/25 p-2.5 rounded-md"
            >
              <div className="max-sm:w-22 w-30 h-30 shrink-0">
                <img src={order.firstImage} alt={order.title} className="w-20 h-20 object-contain rounded-[5px]" />
                <span className="block mt-2.5 font-semibold font-jetbrains">{order.count} X</span>
              </div>
              <div className="w-full flex flex-col">
                <p className="mb-2.5 shrink-0 line-clamp-2">{order.description}</p>
                <div className="flex max-sm:flex-col w-full items-center justify-between">
                  <p className="font-semibold max-sm:text-center max-sm:mb-1.5 w-25 max-sm:text-[12px]">
                    {formatCurrency(calculateDiscount(order.price, order.discount))}
                  </p>
                  <RatingAndViews
                    rating={order.rating}
                    reviews={order.reviews}
                    className="mt-0 lg:w-3/10 xl:w-6/10 text-[12px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div className="pl-5 py-5 flex flex-col gap-2.5">
          <div className="flex items-center">
            <span className="font-semibold mr-2.5 w-30 bg-neutral-400/15 p-1.5 rounded-sm">Sub Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2.5 w-30 bg-neutral-400/15 p-1.5 rounded-sm">Delivery Fee</span>
            <span>{formatCurrency(fees)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="pl-5 py-5 flex items-center">
          <span className="font-semibold mr-2.5 w-30 bg-neutral-400/15 p-1.5 rounded-sm">TOTAL</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
