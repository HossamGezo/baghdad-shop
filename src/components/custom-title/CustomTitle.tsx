// --- Libraries
import { Link } from "react-router";

// --- React Icons
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Components
import CountDown from "@components/count-down/CountDown";

// --- Types
type CustomTitleProps = React.ComponentProps<"h2"> & {
  to?: string;
  title: string;
  offer?: boolean;
};

// --- Main Component
const CustomTitle = ({
  to,
  title,
  offer = false,
  className,
  ...rest
}: CustomTitleProps) => {
  return (
    <div
      className={cn(
        offer ? "bg-offer text-white" : "bg-warning text-primary",
        "px-5 py-2.5 max-sm:text-xl text-2xl max-sm:text-center rounded-md flex items-center justify-between max-sm:gap-1  max-lg:flex-col",
        className,
      )}
      {...rest}
    >
      <h2 className="flex items-center gap-1.5 font-bold">
        {offer && <MdLocalOffer className="text-yellow-300 max-sm:hidden" />}
        {title}
      </h2>
      {!offer && to && (
        <Link
          aria-label={`See all ${title}`}
          to={to}
          className="text-white text-[16px] cursor-pointer flex items-center font-jetbrains hover:text-primary transition-colors duration-300 [word-spacing:0.5px] font-extrabold"
        >
          See All <MdOutlineKeyboardArrowRight size={24} />
        </Link>
      )}
      {offer && <CountDown hours={24} />}
    </div>
  );
};

export default CustomTitle;
