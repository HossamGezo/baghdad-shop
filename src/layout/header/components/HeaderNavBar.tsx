// --- Libraries
import clsx from "clsx";

// --- React Icons
import {RiCloseLargeLine} from "react-icons/ri";

// --- Local Components
import CustomLink from "../../../components/custom-link/CustomLink";

// --- Types
type HeaderNavBarProps = {
  toggleBurger: boolean;
  handleNavBarClose: (e: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
};

// --- Header NavBar (Main Component)
const HeaderNavBar = ({
  toggleBurger,
  handleNavBarClose,
  handleClose,
}: HeaderNavBarProps) => {
  // --- Return JSX
  return (
    <nav
      className={clsx(
        "header-head-navbar max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:flex-col max-lg:items-start max-lg:bg-black/40 max-lg:h-dvh max-lg:w-screen duration-500 transition-[clip-path] z-50",
        toggleBurger
          ? "max-lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
          : "max-lg:[clip-path:polygon(0_0,0_0,0_100%,0_100%)]"
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
          className="border-r border-green-600 lg:rounded-tl-md lg:rounded-bl-md"
          onClick={handleClose}
        />
        <CustomLink
          to="products"
          text="Electronics & Mobiles"
          className="border-r border-green-600"
          onClick={handleClose}
        />
        <CustomLink
          to="kitchen"
          text="Home & Kitchen"
          className="border-r border-green-600"
          onClick={handleClose}
        />
        <CustomLink
          to="men"
          text="Men's"
          className="border-r border-green-600"
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

export default HeaderNavBar;
