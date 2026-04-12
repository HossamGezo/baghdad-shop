// --- Libraries
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { registerUser } from "@features/auth/authSlice";

// --- Components
import InputField from "@components/inputs/InputField";
import PasswordField from "@components/inputs/PasswordField";
import CustomButton from "@components/custom-button/CustomButton";

// --- Register Schema
const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: "Full Name must be at least 3 characters" })
      .max(21, { message: "Full Name must not exceed 21 characters" }),
    email: z.string().email({ message: "Invalid Email Address" }).trim(),
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().trim().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });
type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// --- Main Component
const Register = () => {
  // --- Custom RTK Hooks
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    const { confirmPassword: _, ...registerData } = data;

    dispatch(registerUser(registerData));
  };

  // --- Return JSX
  return (
    <div className="custom-container flex items-center justify-center flex-col gap-5 py-5 flex-1">
      <h1 className="text-primary mb-2.5 font-jetbrains text-center flex flex-col">
        <span className="max-sm:text-2xl text-3xl font-bold mb-2.5">Create New Account</span>
        <p className="max-sm:text-[12px] text-[14px] font-light">Sign up to start your shopping journey</p>
      </h1>
      <div className="bg-white rounded-xl">
        <h2 className="text-2xl w-fit mx-auto text-primary mt-5 mb-2.5 font-jetbrains">Register</h2>
        <form
          className="shadow-lg flex flex-col gap-5 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg min-w-86"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            autoFocus
            type="text"
            placeholder="Enter your Full Name"
            name="fullName"
            label="Full Name"
            register={register}
            error={errors.fullName?.message}
            autoComplete="name"
          />
          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            label="Email"
            register={register}
            error={errors.email?.message}
            autoComplete="email"
          />
          <PasswordField
            type="password"
            name="password"
            placeholder="Enter your password"
            label="Password"
            register={register}
            error={errors.password?.message}
            autoComplete="new-password"
          />
          <PasswordField
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            register={register}
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
          />
          <CustomButton type="submit" aria-label="Submit form" isLoading={loading}>
            Register
          </CustomButton>
          <button
            type="button"
            aria-label="Continue with Google"
            className="border border-primary/25 text-primary py-1.5 rounded-md cursor-pointer flex items-center justify-center gap-2.5 transition-colors duration-200 hover:border-t-[#FF3D00] hover:border-r-[#1B76D2] hover:border-b-[#4CAF51] hover:border-l-[#FFC106] shadow-standard"
          >
            <img src="/images/icons/google-icon.svg" alt="Google Icon" className="w-6" />
            Continue with Google
          </button>
        </form>
      </div>
      <p className="text-primary/75 select-none">
        Already have an account?
        <Link to="/login" className="text-blue-600/70 hover:text-blue-600 ml-0.5 cursor-pointer">
          Login
        </Link>
      </p>
    </div>
  );
};
export default Register;
