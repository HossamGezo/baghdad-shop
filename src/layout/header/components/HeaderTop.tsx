// --- Libraries
import {Link} from "react-router";

// --- React Icons
import {GiHamburgerMenu} from "react-icons/gi";
import {FaPhoneAlt} from "react-icons/fa";

// --- Images
import logo from "/logo.svg";

// --- Types
type HeaderTopProps = {
  handleToggle: () => void;
  children: React.ReactNode;
};

// --- TopHeader (Main Component)
const TopHeader = ({handleToggle, children}: HeaderTopProps) => {
  // --- Return JSX
  return (
    <div className="header-head flex items-center lg:items-end justify-between gap-3 xl:gap-5 py-2.5 max-sm:py-5 z-50">
      <div className="header-header-icons flex items-center gap-2.5 sm:gap-5">
        <button
          type="button"
          aria-label="Open Menu"
          className="header-head-burger-icon text-white max-sm:text-3xl text-4xl lg:hidden"
          onClick={handleToggle}
        >
          <GiHamburgerMenu />
        </button>
        <div className="header-head-logo">
          <Link to="/" className="flex items-center lg:flex-col xl:flex-row max-lg:gap-2.5 xl:gap-3">
            <div className="logo-wrapper w-10 lg:w-12.5 max-sm:hidden">
              <img
                src={logo}
                alt="logo"
                className="object-contain select-none"
                draggable={false}
              />
            </div>
            <span className="text-2xl font-bold flex items-center text-shadow-[#333] text-shadow-2xs self-end">
              <span className="text-warning">Ba</span>
              <span className="text-white">ghdad</span>
              <span className="bg-warning w-2 h-2 rounded-full ml-1 mt-2.5 shadow-2xs shadow-[#333]"></span>
            </span>
          </Link>
        </div>
      </div>
      {/* Header NavBar */}
      {children}
      {/* Header Head Telephone */}
      <div className="header-head-telephone max-sm:hidden flex items-center gap-2.5 text-white text-lg lg:text-xl max-lg:font-bold">
        <FaPhoneAlt />
        +123-456-7890
      </div>
    </div>
  );
};

export default TopHeader;
