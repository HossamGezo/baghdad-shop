// --- Libraries
import { NavLink, type NavLinkProps } from "react-router";
import { cn } from "@utils/cn";

// --- Types
type CustomLinkProps = NavLinkProps & {
  text: string;
};

// --- Main Component
const CustomLink = ({ to, text, className, ...props }: CustomLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-primary font-medium flex items-center justify-center px-5 py-2.5 h-full transition-colors duration-300 cursor-pointer",
          isActive ? "bg-amber-500" : "bg-warning hover:bg-amber-500 active:bg-amber-400",
          className,
        )
      }
      {...props}
    >
      <span className="inline-block max-lg:w-[75%]">{text}</span>
    </NavLink>
  );
};

export default CustomLink;
