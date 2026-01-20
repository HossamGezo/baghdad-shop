// --- Libraries
import {useEffect, useState} from "react";
import clsx from "clsx";

// --- React Icons
import {LiaAngleDoubleRightSolid} from "react-icons/lia";
import {LiaAngleDoubleLeftSolid} from "react-icons/lia";

// --- Types
type ProductSliderProps = {
  productsCount: number;
  children: React.ReactNode;
};

// --- ProductSlider (Main Component)
const ProductSlider = ({productsCount, children}: ProductSliderProps) => {
  // --- viewport
  const [viewport, setViewport] = useState(window.innerWidth);
  useEffect(() => {
    const innerWidthFunc = () => {
      setViewport(window.innerWidth);
    };
    window.addEventListener("resize", innerWidthFunc);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", innerWidthFunc);
    };
  }, []);

  // --- available Scroll

  // - Constants
  const CARD_WIDTH = 300; // 319.5
  const GAP = 15; // 13
  const MOVE_PER_CLICK = CARD_WIDTH + GAP;

  // - Variables
  const containerWidth = viewport >= 1200 && viewport < 1400 ? 1140 : 1320;
  const totalProductsWidth = productsCount * CARD_WIDTH;
  const totalGapsWidth = (productsCount - 1) * GAP + 30;

  // - Result (Available Scroll)
  const availableScroll = totalProductsWidth + totalGapsWidth - containerWidth;

  // --- Slider Logic
  const [move, setMove] = useState<number>(0);

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

  // --- Reset Slider on Mobile (Fix Edge Case)
  const finalMove = viewport < 1200 ? 0 : move;

  // --- Buttons Visibility Logic
  const isAtStart = move === 0;
  const isAtEnd = Math.abs(move) >= availableScroll - 1;

  // --- Return JSX
  return (
    <div className="product-slider w-full max-w-full relative py-5 overflow-x-auto xl:overflow-hidden">
      {/* Left Button */}
      <LiaAngleDoubleLeftSolid
        onClick={handlePrev}
        className={clsx(
          "absolute z-50 top-1/2 -translate-y-1/2 left-3 text-5xl border border-warning rounded-full p-1.5 text-amber-500 cursor-pointer hover:bg-warning hover:text-white active:border-amber-300 active:bg-amber-300 active:scale-[0.98] select-none max-xl:hidden transition-all duration-200",
          isAtStart ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      />

      {/* Slider Track */}
      <div
        style={{transform: `translateX(${finalMove}px)`, gap: `${GAP}px`}}
        className={clsx(
          `product-slider-products flex transition-transform duration-700 ease-in-out`,
        )}
      >
        {children}
      </div>

      {/* Right Button */}
      <LiaAngleDoubleRightSolid
        onClick={handleNext}
        className={clsx(
          "absolute z-50 top-1/2 -translate-y-1/2 right-3 text-5xl border border-warning rounded-full p-1.5 text-amber-500 cursor-pointer hover:bg-warning hover:text-white active:border-amber-300 active:bg-amber-300 active:scale-[0.98] select-none max-xl:hidden transition-all duration-200",
          isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      />
    </div>
  );
};

export default ProductSlider;
