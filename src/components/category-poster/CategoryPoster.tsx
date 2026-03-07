// --- Utils
import { cn } from "@utils/cn";

// --- Types
type CategoryPosterProps = React.ComponentProps<"div"> & {
  imageSrc: string;
  altText: string;
};

// --- Main Component
const CategoryPoster = ({
  imageSrc,
  altText,
  className,
}: CategoryPosterProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-md max-md:hidden",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="w-full object-cover object-center"
      />
    </div>
  );
};

export default CategoryPoster;
