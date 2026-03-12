// --- Libraries
import { cn } from "@utils/cn";
import type { Path, UseFormRegister, FieldValues } from "react-hook-form";

// --- Types
type InputOptionType = "text" | "email" | "password" | "tel";

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
  ...props
}: InputFieldProps<T>) => {
  const baseStyles =
    "w-full sm:w-[325px] h-[50px] bg-white border border-primary/25 focus:border-primary outline-0 px-1.5 py-2 caret-primary rounded-sm placeholder:text-primary/50 placeholder:text-sm";
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
        className={cn(baseStyles, disabled ? "text-primary/50" : "", className)}
      />
      {error && <span className="text-sm text-red-500/85">{error}</span>}
    </div>
  );
};
export default InputField;
