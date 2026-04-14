// --- Libraries
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Components
import HeaderTop from "@layouts/header/components/HeaderTop";
import HeaderMiddle from "@layouts/header/components/HeaderMiddle";
import HeaderNavbar from "@layouts/header/components/HeaderNavbar";
import Logo from "@components/logo/Logo";

// --- Main Component
const Header = () => {
  // --- React Router
  const { pathname } = useLocation();

  // --- Drop Down Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Handle Toggle Function
  const [toggleBurger, setToggleBurger] = useState(false);
  const handleToggle = () => {
    setToggleBurger(true);
  };

  // --- Handle Close
  const handleClose = () => {
    setToggleBurger(false);
  };

  // --- Handle NavBar Close
  const handleNavBarClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // --- 1. Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = toggleBurger ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggleBurger]);

  // --- 2. Close menu on large screens
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 992px)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) setToggleBurger(false);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // --- 3. Sticky Header
  const [scrollTarget, setScrollTarget] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname == "/" && window.scrollY >= 180) setScrollTarget(true);
      else {
        setScrollTarget(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // --- Handle Drop Down Menu Button "Click Outside Dropdown Menu"
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  // --- Return JSX
  return (
    <header ref={dropDownRef} className="relative bg-primary pb-5 select-none">
      <div className="custom-container">
        {/* Header Top */}
        <HeaderTop handleToggle={handleToggle}>
          <HeaderNavbar toggleBurger={toggleBurger} handleNavBarClose={handleNavBarClose} handleClose={handleClose} />
        </HeaderTop>

        {/* Header Middle */}
        <HeaderMiddle isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        {/* Sticky Header */}
        <div
          className={cn(
            "fixed left-0 right-0 z-9999 bg-primary/95 backdrop-blur-md shadow-2xl transition-all duration-500 ease-in-out hidden lg:block border-b border-white/10",
            scrollTarget ? "top-0 opacity-100" : "-top-32 opacity-0 pointer-events-none",
          )}
        >
          <div className="custom-container flex flex-col gap-5 justify-center h-35">
            <div className=" flex items-center justify-between w-full">
              <Logo />

              <HeaderNavbar toggleBurger={false} handleNavBarClose={() => {}} handleClose={() => {}} />
            </div>

            <div className="w-full [&_form]:m-0">
              <HeaderMiddle isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
