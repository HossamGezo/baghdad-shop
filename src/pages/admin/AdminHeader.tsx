// --- React Icons
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";

// --- Local Components
import Logo from "@components/logo/Logo";

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
              <MdMenuOpen
                className="text-white bg-blue-400/25 rounded-full p-1"
                size={30}
              />
            ) : (
              <MdOutlineMenu
                className="text-white bg-blue-400/25 rounded-full p-1"
                size={30}
              />
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
          <div className="flex items-center gap-2.5 border-l border-l-[#d5d5d5]/25 pl-5 max-sm:pl-2.5">
            <img
              src="/images/avatar/avatar1.png"
              alt="Avatar"
              className="w-12 max-sm:w-10 h-12 max-sm:h-10 object-contain rounded-full p-0.5 cursor-pointer border border-amber-400 hover:shadow-md transition-shadow duration-300 shadow-amber-500/25"
            />
            <div className="text-white flex flex-col">
              <span className="max-sm:text-[11px]">Hossam Gouda</span>
              <span className="max-sm:text-[9px] text-[11px] text-[#d5d5d5]">
                @Baghdadshop
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
