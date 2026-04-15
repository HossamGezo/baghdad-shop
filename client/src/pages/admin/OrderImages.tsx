// --- Utils
import { cn } from "@utils/cn";

// --- Types
import type { CartType } from "@/types/types";

// --- Types
type OrderImagesProps = {
  orderItems: CartType[];
};

// --- Main Component
const OrderImages = ({ orderItems }: OrderImagesProps) => {
  return (
    <div className="relative p-1 w-12 h-12 mx-auto flex items-center justify-center">
      {orderItems.slice(0, 3).map((item, index) => (
        <img
          key={item.id}
          src={item.firstImage}
          alt={item.title}
          loading="lazy"
          style={{
            transform: `translateX(${index * 7}px)`,
          }}
          className={cn(
            "absolute w-full h-full object-contain border border-gray-300 bg-white p-0.5 transition-all duration-300 hover:z-50 hover:scale-110 cursor-pointer",
          )}
        />
      ))}
      {orderItems.length > 3 && (
        <div className="absolute right-3 bottom-0 flex items-center justify-center w-5 h-5 bg-warning/90 text-primary text-[10px] font-bold rounded-md border border-gray-300 shadow-md translate-x-10">
          +{orderItems.length - 3}
        </div>
      )}
    </div>
  );
};

export default OrderImages;
