// --- Libraries
import { useState, useEffect } from "react";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Components
import HeaderTop from "@layouts/header/components/HeaderTop";
import HeaderMiddle from "@layouts/header/components/HeaderMiddle";
import HeaderNavbar from "@layouts/header/components/HeaderNavbar";
import Logo from "@components/logo/Logo";

// --- Main Component
const Header = () => {
  const [toggleBurger, setToggleBurger] = useState(false);

  // --- Handle Toggle Function
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
      if (window.scrollY >= 180) setScrollTarget(true);
      else if (window.scrollY < 180) setScrollTarget(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Return JSX
  return (
    <header className="relative bg-primary pb-5 select-none">
      <div className="custom-container">
        {/* Header Top */}
        <HeaderTop handleToggle={handleToggle}>
          <HeaderNavbar toggleBurger={toggleBurger} handleNavBarClose={handleNavBarClose} handleClose={handleClose} />
        </HeaderTop>

        {/* Header Middle */}
        <HeaderMiddle />

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
              <HeaderMiddle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
