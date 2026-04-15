// --- Libraries
import { useNavigate } from "react-router";

// --- React Icons
import { MdEdit } from "react-icons/md";

// --- Utils
import { cn } from "@utils/cn";

// --- Types
type BoxProps = React.ComponentProps<"div"> & {
  title: string;
  goTo: string;
  head: string;
  ariaLabel: string;
  children: React.ReactNode;
};

// --- Main Component
const Box = ({ ariaLabel, title, goTo, head, children, className, ...rest }: BoxProps) => {
  const navigate = useNavigate();

  // --- Return JSX
  return (
    <div className={cn("h-full", className)} {...rest}>
      <div className="border h-full border-[#ccc] rounded-md text-[#333]">
        <h2 className="border-b border-[#ccc] p-5 font-jetbrains font-medium flex justify-between items-center">
          {title}
          <button
            type="button"
            aria-label={ariaLabel}
            onClick={() => navigate(goTo)}
            className="relative text-amber-500 cursor-pointer before:absolute before:w-13 before:h-13 before:bg-orange-300/50 before:left-1/2 before:top-1/2 before:-translate-1/2 before:rounded-full before:z-0 before:hidden hover:before:block"
          >
            <MdEdit size={25} className="relative z-50" />
          </button>
        </h2>
        <div className="details p-5">
          <p className="font-jetbrains mb-2.5">{head}</p>
          <div className="text-gray-400">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Box;
