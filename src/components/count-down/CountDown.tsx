import { cn } from "@utils/cn";
import { useEffect, useRef, useState } from "react";

// --- Types
type CountDownProps = React.ComponentProps<"div"> & {
  hours: number;
};

// --- Custom Hook
const CountDown = ({ hours, className, ...rest }: CountDownProps) => {
  // --- Timer Hooks
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [seconds, setSeconds] = useState(hours * 60 * 60);

  // --- Timer Logic
  useEffect(() => {
    const handleTime = () => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        return 0;
      });
    };

    timerRef.current = setTimeout(handleTime, 1000);

    if (seconds === 0) clearTimeout(timerRef.current);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [seconds]);

  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  // --- Return JSX
  return (
    <div
      role="timer"
      aria-live="polite"
      className={cn("flex gap-1.5 select-none font-extrabold", className)}
      {...rest}
    >
      <span className="w-14 text-center">
        {String(hour).padStart(2, "0")}
        <span className="text-yellow-300">h</span>
      </span>
      <span>:</span>
      <span className="w-14 text-center">
        {String(minute).padStart(2, "0")}
        <span className="text-yellow-300">m</span>
      </span>
      <span>:</span>
      <span className="w-14 text-center">
        {String(second).padStart(2, "0")}
        <span className="text-yellow-300">s</span>
      </span>
    </div>
  );
};

export default CountDown;
