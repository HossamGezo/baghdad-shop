// --- Libraries
import { useState, useEffect } from "react";

// --- Local Components
import HeaderTop from "@layouts/header/components/HeaderTop";
import HeaderMiddle from "@layouts/header/components/HeaderMiddle";
import HeaderNavbar from "@layouts/header/components/HeaderNavbar";

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
    const mediaQuery = globalThis.matchMedia("(min-width: 992px)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) setToggleBurger(false);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // --- Return JSX
  return (
    <header className="bg-primary pb-5 select-none">
      <div className="custom-container">
        {/* Header Top */}
        <HeaderTop handleToggle={handleToggle}>
          {/* Header NavBar */}
          <HeaderNavbar
            toggleBurger={toggleBurger}
            handleNavBarClose={handleNavBarClose}
            handleClose={handleClose}
          />
        </HeaderTop>
        {/* Header Middle */}
        <HeaderMiddle />
      </div>
    </header>
  );
};

export default Header;
