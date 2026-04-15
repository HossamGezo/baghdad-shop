// --- Libraries
import { cn } from "@utils/cn";

// --- React Icons
import { RiCloseLargeLine } from "react-icons/ri";

// --- Local Components
import CustomLink from "@components/custom-link/CustomLink";

// --- Types
type NavbarProps = {
  toggleBurger: boolean;
  handleNavBarClose: (e: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
};

// --- Main Component
const Navbar = ({ toggleBurger, handleNavBarClose, handleClose }: NavbarProps) => {
  return (
    <nav
      className={cn(
        "max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:flex-col max-lg:items-start max-lg:bg-black/40 max-lg:h-dvh max-lg:w-full duration-500 transition-[clip-path] ease-in-out z-50",
        toggleBurger
          ? "max-lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
          : "max-lg:[clip-path:polygon(0_0,0_0,0_100%,0_100%)]",
      )}
      onClick={(e) => handleNavBarClose(e)}
    >
      <button
        type="button"
        aria-label="Close Menu"
        className="absolute top-5 right-5 text-white text-3xl hover:text-red-500 active:text-red-400 lg:hidden"
        onClick={handleClose}
      >
        <RiCloseLargeLine />
      </button>
      <ul className="flex items-center mx-auto max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:flex-col max-lg:items-start max-lg:bg-primary max-lg:h-dvh w-[80%] md:w-[50%] lg:w-fit">
        <li className="header-navbar-list-item max-lg:w-full lg:h-full select-none">
          <CustomLink
            to="/"
            text="Home"
            className="max-lg:border-b lg:border-r border-amber-500 lg:rounded-tl-md lg:rounded-bl-md"
            onClick={handleClose}
          />
        </li>
        <li className="header-navbar-list-item max-lg:w-full lg:h-full select-none">
          <CustomLink
            to="electronics"
            text="Electronics"
            className="max-lg:border-b lg:border-r border-amber-500"
            onClick={handleClose}
          />
        </li>
        <li className="header-navbar-list-item max-lg:w-full lg:h-full select-none">
          <CustomLink
            to="kitchen"
            text="kitchen"
            className="max-lg:border-b lg:border-r border-amber-500"
            onClick={handleClose}
          />
        </li>
        <li className="header-navbar-list-item max-lg:w-full lg:h-full select-none">
          <CustomLink
            to="men"
            text="Men's"
            className="max-lg:border-b lg:border-r border-amber-500"
            onClick={handleClose}
          />
        </li>
        <li className="header-navbar-list-item max-lg:w-full lg:h-full select-none">
          <CustomLink to="women" text="Women's" className="lg:rounded-tr-md lg:rounded-br-md" onClick={handleClose} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
