// --- Libraries
import { useEffect, useRef, useState } from "react";
import { cn } from "@utils/cn";

// --- React Icons
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { LiaAngleDoubleLeftSolid } from "react-icons/lia";

// --- Types
type ProductSliderProps = {
  productsCount: number;
  children: React.ReactNode;
};

// --- Main Component
const ProductSlider = ({ productsCount, children }: ProductSliderProps) => {
  // --- viewport : Custom Function to specify the current screen accurately
  const viewport = () => {
    const screen = globalThis.matchMedia(
      "(min-width:1200px) and (max-width:1399px)",
    ).matches
      ? "desktop"
      : globalThis.matchMedia("(min-width:1400px)").matches
        ? "large"
        : "mobile";
    return screen;
  };

  // --- Hooks
  const [screenSize, setScreenSize] = useState<"mobile" | "desktop" | "large">(
    viewport(),
  );
  const [move, setMove] = useState<number>(0);
  const trackWrapperRef = useRef<HTMLDivElement>(null);

  // --- Handle screen changes
  useEffect(() => {
    const mediaDesktop = globalThis.matchMedia(
      "(min-width:1200px) and (max-width:1399px)",
    );
    const mediaLarge = globalThis.matchMedia("(min-width:1400px)");

    const handleChangeMedia = () => {
      if (mediaLarge.matches) setScreenSize("large");
      else if (mediaDesktop.matches) setScreenSize("desktop");
      else setScreenSize("mobile");
      setMove(0);
    };
    handleChangeMedia();

    mediaDesktop.addEventListener("change", handleChangeMedia);
    mediaLarge.addEventListener("change", handleChangeMedia);

    return () => {
      mediaDesktop.removeEventListener("change", handleChangeMedia);
      mediaLarge.removeEventListener("change", handleChangeMedia);
    };
  }, []);

  // --- available Scroll

  // - Constants
  const CARD_WIDTH = 300; // 319.5
  const GAP = 15; // 13
  const MOVE_PER_CLICK = CARD_WIDTH + GAP;

  // - Variables
  const containerWidth =
    screenSize === "desktop"
      ? 1140
      : screenSize === "large"
        ? 1320
        : globalThis.innerWidth;

  const totalProductsWidth = productsCount * CARD_WIDTH;
  const totalGapsWidth = (productsCount - 1) * GAP + 60;

  // - Result (Available Scroll)
  const availableScroll = totalProductsWidth + totalGapsWidth - containerWidth;

  // --- Slider Logic
  const handlePrev = () => {
    setMove((prev) => {
      return Math.min(prev + MOVE_PER_CLICK, 0);
    });
  };

  const handleNext = () => {
    setMove((prev) => {
      return Math.max(prev - MOVE_PER_CLICK, -availableScroll);
    });
  };

  // --- Reset Slider on Large screens
  useEffect(() => {
    if (screenSize !== "mobile" && trackWrapperRef.current)
      trackWrapperRef.current.scrollLeft = 0;
  }, [screenSize]);

  // --- Reset Slider on Mobile
  const finalMove = screenSize === "mobile" ? 0 : move;

  // --- Buttons Visibility Logic
  const isAtStart = move === 0;
  const isAtEnd = Math.abs(move) >= availableScroll - 1;

  // --- Return JSX
  return (
    <div className="relative w-full max-w-full">
      {/* Left Button */}
      <button
        type="button"
        aria-label="Previous card"
        onClick={handlePrev}
        className={cn(
          "absolute z-50 top-1/2 -translate-y-1/2 left-3 text-5xl border border-warning rounded-full p-1.5 text-amber-500 cursor-pointer hover:bg-warning hover:text-white active:border-amber-300 active:bg-amber-300 active:scale-[0.98] select-none max-xl:hidden transition-all duration-200",
          isAtStart ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <LiaAngleDoubleLeftSolid size={35} />
      </button>

      {/* Trakc Wrapper */}
      <div
        className="custom-scrollbar overflow-x-auto xl:overflow-hidden py-5"
        ref={trackWrapperRef}
      >
        {/* Slider Track */}
        <div
          style={{ transform: `translateX(${finalMove}px)`, gap: `${GAP}px` }}
          className={cn(`flex transition-transform duration-700 ease-in-out`)}
        >
          {children}
        </div>
      </div>

      {/* Right Button */}
      <button
        type="button"
        aria-label="Next card"
        onClick={handleNext}
        className={cn(
          "absolute z-50 top-1/2 -translate-y-1/2 right-3 text-5xl border border-warning rounded-full p-1.5 text-amber-500 cursor-pointer hover:bg-warning hover:text-white active:border-amber-300 active:bg-amber-300 active:scale-[0.98] select-none max-xl:hidden transition-all duration-200",
          isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <LiaAngleDoubleRightSolid size={35} />
      </button>
    </div>
  );
};

export default ProductSlider;
