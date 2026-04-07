// --- Libraries
import { Link } from "react-router";

// --- Utils
import { cn } from "@utils/cn";

// --- Types
type CategoryPosterProps = React.ComponentProps<"div"> & {
  imageSrc: string;
  altText: string;
  to?: string;
};

// --- Main Component
const CategoryPoster = ({ imageSrc, altText, to, className, ...rest }: CategoryPosterProps) => {
  const imageElement = <img src={imageSrc} alt={altText} className="w-full object-cover object-center rounded-md" />;
  return (
    <div {...rest} className={cn("w-full overflow-hidden max-md:hidden shadow-lg bg-white p-3 rounded-md", className)}>
      {to ? <Link to={to}>{imageElement}</Link> : imageElement}
    </div>
  );
};

export default CategoryPoster;
