// --- Libraries
import {useState, useEffect} from "react";

// --- Local Components
import TopHeader from "./components/TopHeader";
import MiddleHeader from "./components/MiddleHeader";
import Navbar from "./components/Navbar";

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
    document.body.style.overflow = toggleBurger ? "hidden" : "unset";
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
        <TopHeader handleToggle={handleToggle}>
          {/* Header NavBar */}
          <Navbar
            toggleBurger={toggleBurger}
            handleNavBarClose={handleNavBarClose}
            handleClose={handleClose}
          />
        </TopHeader>
        {/* Header Middle */}
        <MiddleHeader />
      </div>
    </header>
  );
};

export default Header;
