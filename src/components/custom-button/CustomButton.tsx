// --- Utils
import { cn } from "@utils/cn";

// --- Local Components
import Spinner from "@components/spinner/Spinner";

// --- Types
type CustomButtonProps = React.ComponentProps<"button"> & {
  children: React.ReactNode;
  isLoading?: boolean;
};

// --- Main Component
const CustomButton = ({
  children,
  isLoading,
  disabled,
  className,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={cn(
        "bg-warning shadow-standard font-medium text-primary py-1.5 rounded-md cursor-pointer transition-all duration-75 flex items-center justify-center select-none h-9",
        isLoading || disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-amber-400 active:scale-[0.99] active:bg-warning",
        className,
      )}
      {...rest}
    >
      {isLoading ? <Spinner className="w-4 h-4" /> : children}
    </button>
  );
};

export default CustomButton;
