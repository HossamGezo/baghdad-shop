// --- Libraries
import { useEffect, useRef, useState } from "react";

// --- Offers Images
const offerImages = [
  { url: "/images/banners/offer1.png", direction: "object-left" },
  { url: "/images/banners/offer2.png", direction: "object-right" },
  { url: "/images/banners/offer3.png", direction: "object-right" },
  { url: "/images/banners/offer4.png", direction: "object-center" },
  { url: "/images/banners/offer5.png", direction: "object-right" },
];

// --- Main Component
const Offers = () => {
  // --- Auto Carousel Animation Logic
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev === offerImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  // --- Return JSX
  return (
    <div className="col-span-12 xl:col-span-8 rounded-md overflow-hidden shadow-deep relative">
      {offerImages.map((offer, i) => (
        <img
          src={offer.url}
          alt="Special offer banner"
          key={i}
          className={`w-full h-full absolute object-cover ${
            offer.direction
          } transition-opacity duration-1000 ease-in-out ${
            index === i ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={index !== i}
        />
      ))}
    </div>
  );
};
export default Offers;
