// --- Libraries
import {NavLink, type NavLinkProps} from "react-router";
import clsx from "clsx";

// --- Types
type CustomLinkProps = NavLinkProps & {
  to: string;
  text: string;
};

// --- CustomLink (Main Component)
const CustomLink = ({to, text, className, ...props}: CustomLinkProps) => {
  return (
    <li className="header-navbar-list-item max-lg:w-full lg:h-full select-none text-base">
      <NavLink
        to={to}
        className={({isActive}) =>
          clsx(
            "text-primary font-medium flex items-center justify-center px-5 py-2.5 h-full transition-colors duration-300",
            isActive
              ? "bg-green-600 text-white"
              : "bg-green-500 hover:bg-green-700 active:bg-green-500",
            className
          )
        }
        {...props}
      >
        <span className="inline-block max-lg:w-[75%]">{text}</span>
      </NavLink>
    </li>
  );
};

export default CustomLink;
