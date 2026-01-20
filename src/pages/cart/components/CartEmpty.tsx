// --- Libraries
import {Link} from "react-router";

// --- Images
import logo from "/logo.svg";

// --- CartEmpty (Main Component)
const CartEmpty = () => {
  return (
    <div className="cart-page-empty bg-white rounded-lg m-10 flex flex-col items-center justify-center gap-5 p-5 sm:p-10 text-[#333]">
      <div className="image-wrapper w-35 h-35 bg-primary/5 p-9 rounded-full flex items-center justify-center select-none">
        <img
          src={logo}
          alt="LOGO"
          draggable="false"
          className="w-full h-full object-contain mr-1.5"
        />
      </div>
      <p className="font-medium text-base sm:text-xl select-none">
        Your cart is empty!
      </p>
      <p className="select-none text-sm sm:text-lg text-center">
        Browse our categories and discover our best deals!
      </p>
      <Link
        to="/"
        className="bg-warning w-fit h-13 px-5 rounded-md shadow-primary flex items-center justify-center select-none cursor-pointer hover:bg-amber-400 active:bg-warning active:scale-[0.99] transition-all duration-300 mt-8"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default CartEmpty;
