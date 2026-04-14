// --- React
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

// --- React Icons
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdMenuOpen, MdOutlineDashboard, MdOutlineMenu } from "react-icons/md";
import { BiBasket } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";

// --- Local Components
import Logo from "@components/logo/Logo";
import CustomButton from "@components/custom-button/CustomButton";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { logout } from "@features/auth/authSlice";

// --- Utils
import { cn } from "@utils/cn";

// --- Images
import logo from "/logo.svg";

// --- Types
type SidebarTypeProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// --- Main Component
const AdminHeader = ({ isOpen, setIsOpen }: SidebarTypeProps) => {
  // --- Is Authenticated
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // --- Drop Down Menu
  const [openDropMenu, setOpenDropMenu] = useState<boolean>(false);

  // --- Handle Drop Down Menu Button
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setOpenDropMenu((prev) => !prev);
  };

  // --- Handle Drop Down Menu Button "Click Outside Dropdown Menu"
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setOpenDropMenu(false);
      }
    };

    if (openDropMenu) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [openDropMenu, setOpenDropMenu]);

  // --- Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    setOpenDropMenu(false);
  };

  // --- Return JSX
  return (
    <header className={cn("flex bg-primary py-3")}>
      {/* Left Hand Sied */}
      <div
        className={cn(
          "w-[288px] shrink-0 cursor-pointer max-md:hidden flex items-center justify-start border-r border-r-[#d5d5d5]/25",
        )}
      >
        <Logo className={"overflow-hidden whitespace-nowrap ml-5"}>
          <div className="w-10 lg:w-12.5">
            <img
              src={logo}
              alt="Logo"
              loading="lazy"
              className="object-contain select-none w-12 h-12"
              draggable={false}
            />
          </div>
        </Logo>
      </div>

      {/* Right Hand Side */}
      <div className="px-2.5 flex items-center justify-between flex-1 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            {isOpen ? (
              <MdMenuOpen className="text-white bg-blue-400/25 rounded-full p-1" size={30} />
            ) : (
              <MdOutlineMenu className="text-white bg-blue-400/25 rounded-full p-1" size={30} />
            )}
          </button>
          <Logo className="max-sm:hidden md:hidden" />
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="relative text-[13px] text-white cursor-pointer before:absolute before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:text-white before:top-2 before:right-2 before:flex before:items-center before:justify-center before:border before:border-primary hover:bg-[#d5d5d5]/25 rounded-md p-1"
          >
            <IoIosNotificationsOutline size={27} />
          </button>
          <div
            className="relative flex items-center gap-2.5 border-l border-l-[#d5d5d5]/25 pl-5 max-sm:pl-2.5"
            ref={dropDownRef}
          >
            <img
              src={user?.avatar}
              alt={user?.fullName}
              onClick={(e) => handleClick(e)}
              loading="lazy"
              className={cn(
                "w-12 max-sm:w-10 h-12 max-sm:h-10 object-contain rounded-full p-0.5 cursor-pointer border border-amber-400 hover:shadow-md transition-shadow duration-300 shadow-amber-500/25 text-white",
                openDropMenu && "shadow-md",
              )}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${user?.fullName}&background=0f172a&color=f87171`;
              }}
            />
            <div className="text-white flex flex-col">
              <span className="max-sm:text-[11px]">{user?.fullName}</span>
              <span className="max-sm:text-[9px] text-[11px] text-[#d5d5d5]">@Baghdadshop</span>
            </div>

            {/* Drop Down Menu */}
            {openDropMenu && (
              <div className="absolute flex flex-col top-13 right-2.5 rounded-md bg-white shadow-sm w-50 h-fit overflow-hidden z-10000">
                <div className="flex flex-col gap-2.5">
                  {/* Only for admin */}
                  <Link
                    to="/admin"
                    onClick={() => setOpenDropMenu(false)}
                    className="text-primary p-2.5 border-b border-gray-400 flex items-center gap-2.5 font-semibold hover:bg-gray-300 font-jetbrains tracking-tighter"
                  >
                    <MdOutlineDashboard size={17} /> Dashboard
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-primary p-2.5 border-b border-gray-400 flex items-center gap-2.5 font-semibold hover:bg-gray-300 font-jetbrains tracking-tighter"
                  >
                    <IoHomeOutline size={18} /> Home
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-primary p-2.5 border-b border-gray-400 flex items-center gap-2.5 font-semibold hover:bg-gray-300 font-jetbrains tracking-tighter"
                  >
                    <LuUserRound size={18} /> My Profile
                  </Link>
                  <Link
                    to="/profile/orders"
                    onClick={() => setOpenDropMenu(false)}
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
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
