// --- Libraries
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router";

// --- Components
import InputField from "@components/inputs/InputField";
import PasswordField from "@components/inputs/PasswordField";
import CustomButton from "@/components/custom-button/CustomButton";

// --- Register Schema
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }).trim(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" }),
});
type LoginSchemaType = z.infer<typeof LoginSchema>;

// --- Main Component
const Login = () => {
  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });
  // --- OnSubmit Function
  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
    reset();
  };

  // --- Return JSX
  return (
    <div className="custom-container flex items-center justify-center flex-col gap-5 py-5 flex-1">
      <h1 className="text-primary mb-2.5 font-jetbrains text-center flex flex-col">
        <span className="max-sm:text-2xl text-3xl font-bold mb-2.5">
          Welcome back
        </span>
        <p className="max-sm:text-[12px] text-[14px] font-light">
          Log in to continue your shopping experience
        </p>
      </h1>
      <div className="bg-white rounded-xl max-sm:w-77.5">
        <h2 className="text-2xl w-fit mx-auto text-primary mt-5 mb-2.5 font-jetbrains">
          Login
        </h2>
        <form
          className="shadow-lg flex flex-col gap-5 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            register={register}
            label="Email"
            error={errors.email?.message}
            autoComplete="email"
          />
          <PasswordField
            type="password"
            name="password"
            placeholder="Enter your password"
            register={register}
            label="Password"
            error={errors.password?.message}
            autoComplete="current-password"
          />
          <Link
            to="/reset-password"
            className="-mt-2.5 text-[14px] text-blue-600/70 hover:text-blue-600"
          >
            Forgot Password?
          </Link>
          <CustomButton type="submit" aria-label="Submit form">
            Login
          </CustomButton>
          <button
            type="button"
            aria-label="Login with Google"
            className="border border-primary/25 text-primary py-1.5 rounded-md cursor-pointer flex items-center justify-center gap-2.5 transition-colors duration-200 hover:border-t-[#FF3D00] hover:border-r-[#1B76D2] hover:border-b-[#4CAF51] hover:border-l-[#FFC106] shadow-standard"
          >
            <img
              src="/images/icons/google-icon.svg"
              alt="Google Icon"
              className="w-6"
            />
            Login with Google
          </button>
        </form>
      </div>
      <p className="text-primary/75 select-none">
        Don't have an account?
        <Link
          to="/register"
          className="text-blue-600/70 hover:text-blue-600 ml-0.5 cursor-pointer"
        >
          Register
        </Link>
      </p>
    </div>
  );
};
export default Login;
