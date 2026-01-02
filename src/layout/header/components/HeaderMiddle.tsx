// --- Libraries
import {Link} from "react-router";

// --- React Icons
import {GrCart} from "react-icons/gr";
import {FaRegCircleUser} from "react-icons/fa6";

// --- HeaderMiddle (Main Component)
const HeaderMiddle = () => {
  // --- Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // --- Return JSX
  return (
    <div className="header-middle flex items-center gap-5">
      {/* --- Header Search */}
      <form
        onSubmit={handleSubmit}
        className="header-middle-search w-200 h-10 lg:h-12.5 flex items-center flex-1 bg-green-50 my-5 max-sm:my-2.5 rounded-md overflow-hidden"
      >
        <button
          className="header-middle-search-btn bg-green-500 text-primary h-full cursor-pointer px-5 font-medium text-lg select-none hover:bg-green-600 active:bg-green-500 duration-300 transition-colors"
          type="submit"
        >
          Search
        </button>
        <input
          className="header-middle-search-input w-full h-full px-2.5 caret-green-500 outline-0 select-none"
          type="text"
          aria-label="Search products"
          placeholder="What are you looking for?"
        />
      </form>
      {/* Header Middle Login & Cart */}
      <div className="header-middle-login-cart max-sm:absolute top-6 right-5 flex items-center gap-5">
        {/* --- Login */}
        <div className="header-middle-login">
          <Link
            to="login"
            className="flex gap-1.5 items-center text-white text-xl lg:text-2xl hover:text-green-400 cursor-pointer"
          >
            <FaRegCircleUser />
            Login
          </Link>
        </div>
        {/* --- Cart */}
        <div className="header-middle-cart relative text-xl lg:text-2xl">
          <Link
            to="cart"
            className="flex gap-1.5 items-center text-white  hover:text-green-400"
          >
            <GrCart />
            <span className="header-middle-cart-number absolute max-sm:-top-6 -top-8 max-sm:left-4 left-1/2 -translate-x-1/2 font-jetbrains">
              17
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HeaderMiddle;
