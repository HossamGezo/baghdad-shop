// --- Libraries
import {NavLink} from "react-router";
import clsx from "clsx";

// --- React Icons
import {GrCart} from "react-icons/gr";
// import {FaRegCircleUser} from "react-icons/fa6";

// --- MiddleHeader (Main Component)
const MiddleHeader = () => {
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
          className="header-middle-search-btn bg-warning text-primary h-full cursor-pointer px-5 font-medium text-lg select-none hover:bg-amber-500 active:bg-amber-400 duration-300 transition-colors"
          type="submit"
        >
          Search
        </button>
        <input
          className="header-middle-search-input w-full h-full px-2.5 caret-warning outline-0 select-none"
          type="text"
          aria-label="Search products"
          placeholder="What are you looking for?"
        />
      </form>
      {/* Header Middle Login & Cart */}
      <div className="header-middle-login-cart max-sm:absolute top-6 right-5 flex items-center gap-5">
        {/* --- Login */}
        <div className="header-middle-login">
          <NavLink
            to="login"
            className={({isActive}) =>
              clsx(
                "inline-block text-center text-xl lg:text-2xl transition-colors duration-150 cursor-pointer w-25 h-10 rounded-[40px]",
                isActive
                  ? "border-2 bg-warning text-primary"
                  : "border-2 text-white border-warning hover:text-primary hover:bg-warning active:bg-amber-500"
              )
            }
          >
            Login
          </NavLink>
        </div>
        {/* --- Cart */}
        <div className="header-middle-cart relative text-xl lg:text-2xl">
          <NavLink
            to="cart"
            className={({isActive}) =>
              clsx(
                "flex items-center gap-1.5 text-xl lg:text-2xl transition-colors duration-300 cursor-pointer",
                isActive
                  ? "text-warning"
                  : "text-white hover:text-amber-400 active:text-amber-500"
              )
            }
          >
            <GrCart />
            <span className="header-middle-cart-number absolute max-sm:-top-6 -top-8 max-sm:left-4 left-1/2 -translate-x-1/2 font-jetbrains">
              17
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default MiddleHeader;
