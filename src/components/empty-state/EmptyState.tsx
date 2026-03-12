// --- Libraries
import { Link } from "react-router";

// --- Images
import logo from "/logo.svg";

// --- Types
type EmptyStateProps = {
  title: string;
  desc: string;
};

// --- Main Component
const EmptyState = ({ title, desc }: EmptyStateProps) => {
  return (
    <div className="bg-white rounded-lg mt-5 flex flex-col items-center justify-center gap-5 p-5 sm:p-10 text-neutral-700">
      <div className="image-wrapper w-32 h-32 md:w-35 md:h-35 bg-primary/5 p-9 rounded-full flex items-center justify-center select-none">
        <img
          src={logo}
          alt="Logo"
          loading="lazy"
          draggable="false"
          className="w-full h-full object-contain mr-1.5"
        />
      </div>
      <h1 className="font-medium text-base sm:text-xl select-none">{title}</h1>
      <p className="select-none text-sm sm:text-lg text-center">{desc}</p>
      <Link
        to="/"
        className="bg-warning w-fit h-13 px-5 rounded-md shadow-strong flex items-center justify-center select-none cursor-pointer hover:bg-amber-400 active:bg-warning active:scale-[0.99] transition-all duration-300 mt-8"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyState;
