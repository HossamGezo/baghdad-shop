// --- Libraries
import clsx from "clsx";

// --- React Icons
import {RiCloseLargeLine} from "react-icons/ri";

// --- Local Components
import CustomLink from "../../../components/custom-link/CustomLink";

// --- Types
type NavbarProps = {
  toggleBurger: boolean;
  handleNavBarClose: (e: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
};

// --- Navbar (Main Component)
const Navbar = ({
  toggleBurger,
  handleNavBarClose,
  handleClose,
}: NavbarProps) => {
  // --- Return JSX
  return (
    <nav
      className={clsx(
        "header-head-navbar max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:flex-col max-lg:items-start max-lg:bg-black/40 max-lg:h-dvh max-lg:w-full duration-500 transition-[clip-path] z-50",
        toggleBurger
          ? "max-lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
          : "max-lg:[clip-path:polygon(0_0,0_0,0_100%,0_100%)]",
      )}
      onClick={(e) => handleNavBarClose(e)}
    >
      <button
        type="button"
        aria-label="Close Menu"
        className="header-head-navbar-close-icon absolute top-5 right-5 text-white text-3xl hover:text-red-500 active:text-red-400 lg:hidden"
        onClick={handleClose}
      >
        <RiCloseLargeLine />
      </button>
      <ul className="header-head-navbar-list flex items-center mx-auto max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:flex-col max-lg:items-start max-lg:bg-primary max-lg:h-dvh w-[80%] md:w-[50%] lg:w-fit">
        <CustomLink
          to="/"
          text="Home"
          className="max-lg:border-b lg:border-r border-amber-500 lg:rounded-tl-md lg:rounded-bl-md"
          onClick={handleClose}
        />
        <CustomLink
          to="electronics"
          text="Electronics"
          className="max-lg:border-b lg:border-r border-amber-500"
          onClick={handleClose}
        />
        <CustomLink
          to="kitchen"
          text="Home"
          className="max-lg:border-b lg:border-r border-amber-500"
          onClick={handleClose}
        />
        <CustomLink
          to="men"
          text="Men's"
          className="max-lg:border-b lg:border-r border-amber-500"
          onClick={handleClose}
        />
        <CustomLink
          to="women"
          text="Women's"
          className="lg:rounded-tr-md lg:rounded-br-md"
          onClick={handleClose}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
