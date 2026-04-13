// --- Libraries
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router";

// --- React Icons
import { GrCart } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { LuUserRoundCheck } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { BiBasket } from "react-icons/bi";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { logout } from "@features/auth/authSlice";

// --- Local Components
import CustomButton from "@components/custom-button/CustomButton";
import SearchBar from "@layouts/header/components/SearchBar";

// --- Utils
import { cn } from "@utils/cn";

// --- Main Component
const HeaderMiddle = () => {
  // --- Is Authenticated
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // --- Drop Down Menu
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // --- Handle Drop Down Menu Button
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // --- Handle Drop Down Menu Button "Click Outside Dropdown Menu"
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      if (dropDownRef.current) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  // --- Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  // --- Cart
  const { cart } = useAppSelector((state) => state.cart);

  // --- Cart total calculations
  const totalItems = useMemo(() => {
    return cart.reduce((acc, cur) => acc + cur.count, 0);
  }, [cart]);

  // --- Return JSX
  return (
    <div className="middle-header flex items-center gap-5 md:gap-2.5">
      {/* --- Header Search */}
      <SearchBar />

      {/* Header Middle Login & Cart */}
      <div className="cart max-sm:absolute top-6 right-5 flex items-center gap-3 xl:mt-1.5">
        {/* --- Login */}
        <div>
          {!isAuthenticated ? (
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
          ) : (
            <div className="relative" ref={dropDownRef}>
              <button
                type="button"
                onClick={(e) => handleClick(e)}
                className={cn(
                  "group flex items-center gap-1 sm:gap-2.5 text-primary hover:bg-white transition-colors duration-300 px-1.5 py-0.5 rounded-md cursor-pointer",
                  "relative before:absolute before:-top-1 before:left-0 before:w-full before:h-1 before:rounded-tr-md before:rounded-tl-md rounded-tr-none rounded-tl-none before:transition-colors before:duration-300",
                  user?.role === "admin"
                    ? isOpen
                      ? "bg-white before:bg-red-500"
                      : "bg-white/85 before:bg-red-400 hover:before:bg-red-500"
                    : isOpen
                      ? "bg-white before:bg-blue-500"
                      : "bg-white/85 before:bg-blue-400 hover:before:bg-blue-500",
                )}
              >
                <LuUserRoundCheck className="text-xl md:text-[30px]" />
                <span className="truncate hidden font-semibold sm:block">{user?.fullName.split(" ")[0]}</span>
                <span>{!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
              </button>

              {/* Drop Down Menu */}
              {isOpen && (
                <div className="absolute flex flex-col top-11 max-sm:left-10 left-1/2 -translate-x-1/2 rounded-md bg-white shadow-sm w-50 h-fit overflow-hidden z-10000">
                  <div className="flex flex-col gap-2.5">
                    {/* Only for admin */}
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-primary p-2.5 border-b border-gray-400 flex items-center gap-2.5 font-semibold hover:bg-gray-300 font-jetbrains tracking-tighter"
                      >
                        <FaUser size={17} /> Dashboard
                      </Link>
                    )}

                    {/* Shared Links */}
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="text-primary p-2.5 border-b border-gray-400 flex items-center gap-2.5 font-semibold hover:bg-gray-300 font-jetbrains tracking-tighter"
                    >
                      <FaUser size={17} /> My Profile
                    </Link>
                    <Link
                      to="/profile/orders"
                      onClick={() => setIsOpen(false)}
                      className="text-primary p-2.5 border-b border-gray-400 flex items-center gap-2.5 font-semibold hover:bg-gray-300 font-jetbrains tracking-tighter"
                    >
                      <BiBasket size={17} /> My Orders
                    </Link>
                  </div>

                  <CustomButton type="button" onClick={handleLogout} className="w-37.5 mx-auto mt-auto my-5">
                    Logout
                  </CustomButton>
                </div>
              )}
            </div>
          )}
          {!isAuthenticated && (
            <NavLink
              to="login"
              className={({ isActive }) =>
                cn(
                  "text-xl transition-colors duration-150 cursor-pointer sm:hidden",
                  isActive ? "text-warning" : "text-white hover:text-warning active:text-amber-500",
                )
              }
            >
              <FaUser />
            </NavLink>
          )}
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
