// --- Libraries
import {Link} from "react-router";

// --- FooterBottom (Main Component)
const FooterBottom = () => {
  // --- CopyRight Date
  const date = new Date().getFullYear();

  // --- toTop Func
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  // --- Return JSX
  return (
    <div className="bottom-footer bg-primary/80 text-white">
      <div className="footer-copyright custom-container text-center py-6 border-t border-t-amber-300 text-2xl font-jetbrains flex flex-col items-center justify-center gap-3 select-none">
        <div className="footer-head-logo" onClick={toTop}>
          <Link
            to="/"
            className="flex items-center lg:flex-col xl:flex-row max-lg:gap-2.5 xl:gap-3"
          >
            <span className="text-3xl font-bold font-jetbrains flex items-center text-shadow-[#333] text-shadow-2xs self-end">
              <span className="text-warning">Ba</span>
              <span className="text-white">ghdad</span>
              <span className="bg-warning w-2 h-2 rounded-full ml-1 mt-2.5 shadow-2xs shadow-[#333]"></span>
            </span>
          </Link>
        </div>
        <p className="text-base md:text-lg font-jetbrains tracking-wider opacity-90">
          © <span className="text-warning">{date}</span> All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
