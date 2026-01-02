// --- Libraries
import {useState, useEffect} from "react";

// --- Local Components
import HeaderTop from "./components/HeaderTop";
import HeaderMiddle from "./components/HeaderMiddle";
import HeaderNavBar from "./components/HeaderNavBar";

// --- Header (Main Component)
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
    if (toggleBurger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggleBurger]);

  // --- 2. Close menu on large screens
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth > 991) setToggleBurger(false);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // --- Return JSX
  return (
    <header className="header bg-primary pb-5 select-none">
      <div className="custom-container">
        {/* Header Top */}
        <HeaderTop handleToggle={handleToggle}>
          {/* Header NavBar */}
          <HeaderNavBar
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
