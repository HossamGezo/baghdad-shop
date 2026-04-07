// --- React Icons
import { FaRegUser } from "react-icons/fa";
import { BsBox2 } from "react-icons/bs";

// --- React Router
import { NavLink, Outlet } from "react-router";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Components
import CustomButton from "@components/custom-button/CustomButton";

// --- Main Component
const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-4 gap-5 my-5">
      {/* Left Side */}
      <div className="col-span-4 h-fit md:col-span-1 bg-white rounded-md overflow-hidden shadow-soft max-md:flex max-md:justify-center max-md:items-center md:gap-2.5">
        <ul className="md:border-b border-[#D4D4D6] max-lg:text-[12px] max-md:flex flex-2">
          <li className="flex-2">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                cn("flex items-center gap-2.5 p-2.5", isActive ? "bg-[#D4D4D6]" : "bg-white hover:bg-body")
              }
            >
              <FaRegUser />
              My Baghdad Shop
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              to="orders"
              className={({ isActive }) =>
                cn("flex items-center gap-2.5 p-2.5", isActive ? "bg-[#D4D4D6]" : "bg-white hover:bg-body")
              }
            >
              <BsBox2 />
              Orders
            </NavLink>
          </li>
        </ul>
        <CustomButton className="max-md:h-9.5 rounded-none px-2.5 max-lg:text-[14px] max-md:active:scale-[1] md:rounded-md md:my-5 md:w-7/10 md:mx-auto">
          Logout
        </CustomButton>
      </div>

      {/* Right Side */}
      <div className="col-span-4 md:col-span-3 md:min-h-150 bg-white rounded-md overflow-hidden shadow-soft">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
