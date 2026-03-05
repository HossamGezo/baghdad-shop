// --- Libraries
import { cn } from "@utils/cn";
import type { Path, UseFormRegister, FieldValues } from "react-hook-form";

// --- Types
type InputOptionType = "text" | "email" | "password";

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
  ...props
}: InputFieldProps<T>) => {
  const baseStyles =
    "w-full sm:w-[325px] h-[45px] bg-white border border-primary/25 focus:border-primary outline-0 px-1.5 py-2 caret-primary rounded-sm placeholder:text-primary/50 placeholder:text-sm";
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="mb-1.5 cursor-pointer text-primary">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...props}
        {...register(name)}
        className={cn(baseStyles, className)}
      />
      {error && <span className="text-sm text-red-500/85">{error}</span>}
    </div>
  );
};
export default InputField;
