// --- Libraries
import {useState} from "react";
import clsx from "clsx";

// --- Types
type ProductImagesProps = {
  images: string[];
  title: string;
};

// --- ProductImages (Main Component)
const ProductImages = ({images, title}: ProductImagesProps) => {
  // --- Product Images Logic
  const [currentImage, setCurrentImage] = useState<number>(0);

  // --- Return JSX
  return (
    <div className="product-images col-span-4 max-md:mb-5 md:col-span-2 mx-auto">
      {/* --- Main Image */}
      <div className="product-details-card-image w-40 h-40 mb-5 sm:w-60 sm:h-60 xl:w-70 xl:h-70 mx-auto">
        <div
          className="h-full w-full bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
          }}
        ></div>
      </div>
      {/* --- Product Images */}
      <div className="product-details-card-images flex gap-0.5">
        {images.map((img, index) => (
          <img
            src={img}
            alt={title}
            key={index}
            className={clsx(
              "w-14 h-14 sm:w-18 sm:h-18 xl:w-20 xl:h-20 object-contain hover:border-gray-300 hover:p-0.5 transition-colors duration-150 cursor-pointer",
              currentImage === index
                ? "border border-gray-300 p-0.5"
                : "border border-transparent",
            )}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
