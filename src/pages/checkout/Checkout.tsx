// --- Local Components
import OrderSummary from "@pages/checkout/components/OrderSummary";
import PaymentDetails from "@pages/checkout/components/PaymentDetails";

// --- Main Component
const Checkout = () => {
  // --- Return JSX
  return (
    <div className="grid  grid-cols-7 gap-5 mt-5 mb-10">
      {/* Payment Details */}
      <div className="col-span-7 lg:col-span-4 order-2 lg:order-1">
        <PaymentDetails />
      </div>

      {/* Order Summary */}
      <div className="col-span-7 lg:col-span-3 order-1 lg:order-2">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;
