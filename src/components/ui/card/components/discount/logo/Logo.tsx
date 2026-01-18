// --- Libraries
import {Link} from "react-router";

// --- Types
type LogoProps = {
  children?: React.ReactNode;
};

// --- Logo (Main Component)
const Logo = ({children}: LogoProps) => {
  return (
    <div className="header-head-logo">
      <Link
        to="/"
        className="flex items-center lg:flex-col xl:flex-row max-lg:gap-2.5 xl:gap-3"
      >
        {children}
        <span className="text-2xl font-bold flex items-center text-shadow-[#333] text-shadow-2xs self-end">
          <span className="text-warning">Ba</span>
          <span className="text-white">ghdad</span>
          <span className="bg-warning w-2 h-2 rounded-full ml-1 mt-2.5 shadow-2xs shadow-[#333]"></span>
        </span>
      </Link>
    </div>
  );
};
export default Logo;
