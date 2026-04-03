// --- Libraries
import { cn } from "@utils/cn";
import type { Path, UseFormRegister, FieldValues } from "react-hook-form";

// --- Types
type InputOptionType = "text" | "email" | "password" | "tel" | "number";

// --- Main Type
type InputFieldProps<T extends FieldValues> = {
  type: InputOptionType;
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  error?: string;
} & Omit<React.ComponentProps<"input">, "name">;

// --- Main Component
const InputField = <T extends FieldValues>({
  type = "text",
  name,
  register,
  label,
  error,
  className,
  disabled,
  readOnly,
  ...props
}: InputFieldProps<T>) => {
  const baseStyles =
    "w-full h-[50px] bg-white border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm px-1.5 py-2 caret-primary rounded-md placeholder:text-primary/50 placeholder:text-sm transition-[border-color,box-shadow] duration-500 ease-in-out pl-2.5";
  return (
    <div className="relative w-full flex flex-col gap-2.5">
      <label
        htmlFor={name}
        className="absolute bg-white text-primary/50 px-2.5 text-[12px] left-3.5 -top-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...props}
        {...register(name)}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(
          baseStyles,
          readOnly || disabled
            ? "bg-gray-50 text-primary/50 cursor-not-allowed focus:ring-0 focus:border-gray-300"
            : "",
          className,
        )}
      />
      {error && <span className="text-sm text-red-500/85">{error}</span>}
    </div>
  );
};
export default InputField;
