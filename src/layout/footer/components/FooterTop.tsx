// --- Libraries
import {Link} from "react-router";

// --- React Icons
import {MdEmail} from "react-icons/md";

// --- FopFooter (Main Component)
const TopFooter = () => {
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  // --- Return JSX
  return (
    <div className="top-footer bg-primary text-white">
      <div className="footer-head flex max-md:flex-col items-center justify-between gap-5 custom-container py-5">
        {/* - Logo */}
        <div className="footer-head-logo" onClick={toTop}>
          <Link
            to="/"
            className="flex items-center lg:flex-col xl:flex-row max-lg:gap-2.5 xl:gap-3"
          >
            <span className="text-4xl font-bold font-jetbrains flex items-center text-shadow-[#333] text-shadow-2xs self-end">
              <span className="text-warning">Ba</span>
              <span className="text-white">ghdad</span>
              <span className="bg-warning w-4 h-4 rounded-full ml-1 mt-2.5 shadow-2xs shadow-[#333]"></span>
            </span>
          </Link>
        </div>
        {/* - Greeting */}
        <div className="footer-head-greeting max-md:flex max-md:flex-col max-md:items-center max-md:gap-2.5 text-[22px] sm:text-2xl font-bold tracking-tight text-warning font-jetbrains select-none">
          Always here to help you
          <div className="flex items-center gap-2.5 text-lg text-white">
            baghdad@fakeemail.com <MdEmail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
