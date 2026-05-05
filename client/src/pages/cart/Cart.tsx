// --- Local Files
import { useAppSelector } from "@app/hooks";

// --- Local Components
import EmptyState from "@components/empty-state/EmptyState";
import CartProduct from "@pages/cart/components/CartProduct";
import CartSummary from "@pages/cart/components/CartSummary";

// --- Main Component
const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  // --- Empty Cart
  if (cart.length === 0) {
    return <EmptyState title={"Your cart is empty!"} desc={"Browse our categories and discover our best deals!"} />;
  }

  // --- Cart total calculations
  const totalItems = cart.reduce((acc, cur) => acc + cur.count, 0);

  // --- Return JSX
  return (
    <div className="my-5 grid grid-cols-5 xl:grid-cols-4 max-lg:gap-3 gap-5">
      {/* Cart Products */}
      <div className="max-md:order-last col-span-5 md:col-span-3 xl:col-span-3 bg-white rounded-md">
        <h3 className="p-3 text-2xl border-b-2 border-b-body text-neutral-700 font-jetbrains select-none">
          CART({totalItems})
        </h3>
        <div>
          {cart.map((product) => (
            <CartProduct {...product} key={product.productId} />
          ))}
        </div>
      </div>
      {/* Cart Summary */}
      <CartSummary />
    </div>
  );
};

export default Cart;
