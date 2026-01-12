// --- Libraries
import {NavLink} from "react-router";
import clsx from "clsx";

// --- React Icons
import {GrCart} from "react-icons/gr";
import {FaUser} from "react-icons/fa";

// --- MiddleHeader (Main Component)
const MiddleHeader = () => {
  // --- Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // --- Return JSX
  return (
    <div className="header-middle flex items-center gap-5 md:gap-2.5">
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
      <div className="header-middle-login-cart max-sm:absolute top-6 right-5 flex items-center gap-3 xl:mt-1.5">
        {/* --- Login */}
        <div className="header-middle-login">
          <NavLink
            to="login"
            className={({isActive}) =>
              clsx(
                "flex items-center justify-center text-center text-lg sm:text-xl lg:text-xl transition-colors duration-150 cursor-pointer w-25 h-8 md:h-9 lg:h-10 rounded-[40px] max-sm:hidden",
                isActive
                  ? "border-2 bg-warning text-primary"
                  : "border-2 text-white border-warning hover:text-primary hover:bg-warning active:bg-amber-500"
              )
            }
          >
            Login
          </NavLink>
          <NavLink
            to="login"
            className={({isActive}) =>
              clsx(
                "text-xl transition-colors duration-150 cursor-pointer sm:hidden",
                isActive
                  ? "text-warning"
                  : "text-white hover:text-warning active:text-amber-500"
              )
            }
          >
            <FaUser />
          </NavLink>
        </div>
        {/* --- Cart */}
        <div className="header-middle-cart">
          <NavLink
            to="cart"
            className={({isActive}) =>
              clsx(
                "relative flex items-end gap-1 xl:gap-0.5 transition-colors duration-300 cursor-pointer",
                isActive
                  ? "text-warning"
                  : "text-white hover:text-amber-400 active:text-amber-500"
              )
            }
          >
            <GrCart className="text-2xl lg:text-3xl" />
            <span className="text:lg lg:text:xl font-jetbrains">
              Cart
              <span className="absolute -top-5 xl:-top-3 right-2.5">17</span>
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default MiddleHeader;
