// --- Local Files
import {useAppSelector} from "../../app/hooks";

// --- Local Components
import CartEmpty from "./components/CartEmpty";
import CartProduct from "./components/CartProduct";
import CartSummary from "./components/CartSummary";

// --- Cart (Main Component)
const Cart = () => {
  const {cart} = useAppSelector((state) => state.cart);
  if (cart.length === 0) {
    return <CartEmpty />;
  }
  return (
    <div className="cart-page-content my-5 grid grid-cols-5 xl:grid-cols-4 max-lg:gap-3 gap-5">
      {/* Cart Products */}
      <div className="cart-products max-md:order-last col-span-5 md:col-span-3 xl:col-span-3 bg-white rounded-md">
        <h3 className="cart-products-head p-3 text-2xl border-b-2 border-b-body text-[#333]">
          Cart ({cart.length})
        </h3>
        <div className="cart-products-wrapper">
          {cart.map((product, index) => (
            <CartProduct {...product} key={index} />
          ))}
        </div>
      </div>
      {/* Cart Summary */}
      <CartSummary />
    </div>
  );
};

export default Cart;
