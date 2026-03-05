// --- Libraries
import { useState } from "react";

// --- React Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "./InputField";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

// --- Types
type PasswordFieldProps<T extends FieldValues> = {
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  error?: string;
} & React.ComponentProps<"input">;

const PasswordField = <T extends FieldValues>({
  placeholder,
  name,
  register,
  label,
  error,
  className,
  ...rest
}: PasswordFieldProps<T>) => {
  // --- Hide State
  const [showPassword, setShowPassword] = useState(false);
  // --- Return JSX
  return (
    <div className="relative">
      <InputField
        {...rest}
        className={className}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        register={register}
        label={label}
        error={error}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute top-14 right-4 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors cursor-pointer"
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </button>
    </div>
  );
};

export default PasswordField;
