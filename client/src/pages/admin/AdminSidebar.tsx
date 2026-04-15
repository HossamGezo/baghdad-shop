// --- Libraries
import { NavLink, type NavLinkProps } from "react-router";

// --- RTK
import { useAppDispatch } from "@app/hooks";
import { logout } from "@features/auth/authSlice";

// --- React Icons
import { MdOutlineAddToPhotos, MdOutlineDashboard } from "react-icons/md";
import { IoListSharp } from "react-icons/io5";
import { BiBasket } from "react-icons/bi";
import { FiLogOut, FiUsers } from "react-icons/fi";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Components
import CustomButton from "@components/custom-button/CustomButton";

// --- Custom NavLink
type CustomNavLinkProps = NavLinkProps & {
  to: string;
  children: React.ReactNode;
};
const CustomNavLink = ({ to, children, ...rest }: CustomNavLinkProps) => {
  return (
    <li>
      <NavLink
        to={to}
        {...rest}
        className={({ isActive }) =>
          cn(
            "flex items-center py-1.5 px-2.5 rounded-sm gap-2.5",
            isActive
              ? "bg-amber-400 text-primary shadow-lg shadow-amber-500/20"
              : "text-gray-400 hover:bg-white/5 hover:text-white",
          )
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

// --- Types
type SidebarTypeProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// --- Main Component
const Sidebar = ({ isOpen, setIsOpen }: SidebarTypeProps) => {
  // --- Custom RTK Hooks
  const dispatch = useAppDispatch();

  // --- Handle Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // --- Return JSX
  return (
    <div
      onClick={(e) => {
        return e.target === e.currentTarget ? setIsOpen(false) : "";
      }}
      className={cn(
        "border-t border-t-[#d5d5d5]/25",
        isOpen
          ? "max-md:absolute max-md:h-[calc(100vh-64px)] max-md:w-full max-md:bg-black/50 z-40 transition-all duration-300"
          : "",
      )}
    >
      <aside
        className={cn(
          "relative w-[288px] shrink-0 p-10 bg-primary text-white flex flex-col z-50",
          "transition-all duration-300 ease-in-out",
          "max-md:absolute h-[calc(100vh-64px)] md:h-[calc(100vh-72px)]",
          isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
          isOpen ? "md:ml-0" : "md:-ml-72",
        )}
      >
        <nav>
          <ul className="flex flex-col text-lg gap-2">
            <CustomNavLink to="/admin" end>
              <MdOutlineDashboard />
              Dashboard
            </CustomNavLink>

            <CustomNavLink to="add-product">
              <MdOutlineAddToPhotos />
              Add Product
            </CustomNavLink>

            <CustomNavLink to="products">
              <IoListSharp />
              Product List
            </CustomNavLink>

            <CustomNavLink to="orders">
              <BiBasket />
              Orders
            </CustomNavLink>

            <CustomNavLink to="users">
              <FiUsers />
              Users
            </CustomNavLink>
          </ul>
        </nav>

        <CustomButton
          onClick={handleLogout}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white w-[80%] flex items-center gap-2.5 hover:bg-red-600 active:bg-red-500"
        >
          <FiLogOut /> Logout
        </CustomButton>
      </aside>
    </div>
  );
};

export default Sidebar;
