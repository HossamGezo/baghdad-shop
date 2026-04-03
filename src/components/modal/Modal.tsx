// --- Libraries
import { useEffect, type MouseEvent } from "react";

// --- Components
import CustomButton from "@components/custom-button/CustomButton";

// --- Types
type ModalProps = {
  title?: string;
  description?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

// --- Main Component
const Modal = ({ title, description, setIsOpen, onConfirm }: ModalProps) => {
  useEffect(() => {
    // --- Prevent Scroll When Modal Is Open
    document.body.style.overflow = "hidden";

    // --- Close When Press Esc
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setIsOpen]);

  // --- Handle Click Function
  const handleClick = (e: MouseEvent) => {
    if (e.currentTarget === e.target) setIsOpen(false);
  };

  // --- Handle Continue Function
  const handleContinue = () => {
    setIsOpen(false);
    onConfirm();
  };

  // --- Return JSX
  return (
    <div
      onClick={(e) => handleClick(e)}
      className="fixed inset-0 bg-black/35 backdrop-blur-[3px] flex items-center justify-center z-10000 select-none"
    >
      <div className="bg-primary/85 w-[320px] sm:w-[384px] min-h-40 rounded-lg border border-gray-400/50 flex flex-col overflow-hidden">
        <div className="flex-1 p-2.5 text-white">
          <div className="max-sm:text-[16px] mb-2.5 text-lg font-semibold">
            {title || "Are you absolutely sure?"}
          </div>
          <div className="text-[12px] sm:text-sm text-gray-300">
            {description ||
              "This action cannot be undone. This will permanently delete your account from our servers."}
          </div>
        </div>
        <div className="bg-primary flex items-center justify-end  gap-2.5 pt-5 pb-2.5 px-2.5 border-t border-t-gray-400/50">
          <CustomButton
            onClick={() => setIsOpen(false)}
            className="px-2.5 sm:px-3.5 py-0.5 bg-transparent border border-warning text-warning hover:text-primary"
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={handleContinue}
            className="px-2.5 sm:px-3.5 py-0.5"
          >
            Continue
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
