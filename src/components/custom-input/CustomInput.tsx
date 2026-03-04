// Libraries
import { cn } from "@/utils/cn";
import type { Path, UseFormRegister, FieldValues } from "react-hook-form";

// Types
type InputOptionType = "text" | "email" | "password";

// Main Type
type InputFieldProps<T extends FieldValues> = {
  type: InputOptionType;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
} & Omit<React.ComponentProps<"input">, "name">;

// Main Component
const CustomInput = <T extends FieldValues>({
  type = "text",
  name,
  register,
  error,
  className,
  ...props
}: InputFieldProps<T>) => {
  const baseStyles =
    "w-[325px] h-[45px] bg-white border-b-2 border-b-secondary/75 focus:border-b-primary outline-0 px-1.5 py-2 caret-primary rounded-sm placeholder:text-secondary/30 placeholder:text-sm";
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        {...props}
        {...register(name)}
        className={cn(baseStyles, className)}
      />
      {error && <span className="text-sm text-red-500/85">{error}</span>}
    </div>
  );
};
export default CustomInput;
