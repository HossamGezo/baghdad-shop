// --- Libraries
import { useMemo } from "react";
import { NavLink } from "react-router";

// --- React Icons
import { GrCart } from "react-icons/gr";
import { FaUser } from "react-icons/fa";

// --- Custom Hooks
import { useAppSelector } from "@app/hooks";

// --- Utils
import { cn } from "@utils/cn";

// --- Main Component
const HeaderMiddle = () => {
  // --- Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // --- Cart
  const { cart } = useAppSelector((state) => state.cart);

  // --- Cart total calculations
  const totalItems = useMemo(() => {
    return cart.reduce((acc, cur) => acc + cur.count, 0);
  }, [cart]);

  // --- Return JSX
  return (
    <div className="flex items-center gap-5 md:gap-2.5">
      {/* --- Header Search */}
      <form
        onSubmit={handleSubmit}
        className="w-full h-10 lg:h-12.5 flex items-center flex-1 bg-green-50 my-5 max-sm:my-2.5 rounded-md overflow-hidden"
      >
        <button
          aria-label="Submit search"
          className="bg-warning text-primary h-full cursor-pointer px-5 font-medium text-lg select-none hover:bg-amber-500 active:bg-amber-400 duration-300 transition-colors"
          type="submit"
        >
          Search
        </button>
        <input
          className="w-full h-full px-2.5 caret-warning outline-0 select-none"
          type="search"
          aria-label="Search products"
          placeholder="What are you looking for?"
        />
      </form>
      {/* Header Middle Login & Cart */}
      <div className="max-sm:absolute top-6 right-5 flex items-center gap-3 xl:mt-1.5">
        {/* --- Login */}
        <div>
          <NavLink
            to="login"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center text-center text-lg sm:text-xl lg:text-xl transition-colors duration-150 cursor-pointer w-25 h-8 md:h-9 lg:h-10 rounded-md max-sm:hidden",
                isActive
                  ? "border-2 border-warning bg-warning text-primary"
                  : "border-2 border-warning text-white hover:text-primary hover:bg-warning active:bg-amber-500",
              )
            }
          >
            Login
          </NavLink>
          <NavLink
            to="login"
            className={({ isActive }) =>
              cn(
                "text-xl transition-colors duration-150 cursor-pointer sm:hidden",
                isActive
                  ? "text-warning"
                  : "text-white hover:text-warning active:text-amber-500",
              )
            }
          >
            <FaUser />
          </NavLink>
        </div>
        {/* --- Cart */}
        <div>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              cn(
                "relative text-white flex items-end gap-1 xl:gap-0.5 cursor-pointer  border-b-2 border-dotted pb-1 hover:border-b-warning/50",
                isActive ? "border-b-warning/50" : "border-b-transparent",
              )
            }
          >
            <GrCart className="text-2xl lg:text-3xl" />
            <span className="text-lg lg:text-xl font-jetbrains">
              Cart
              {totalItems > 0 && (
                <span className="absolute text-[12px] font-bold text-primary -top-3 left-2 lg:-top-2.5 lg:left-3.5 border-2 border-primary bg-warning rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default HeaderMiddle;
