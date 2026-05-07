// --- Libraries
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { sendResetPasswordLink } from "@features/auth/authSlice";

// --- Components
import InputField from "@components/inputs/InputField";
import CustomButton from "@components/custom-button/CustomButton";

// --- Reset Password Schema
const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }).trim(),
});
type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

// --- Main Component
const ResetPassword = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(ResetPasswordSchema),
  });

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (data) => {
    const resultAction = await dispatch(sendResetPasswordLink(data));

    if (sendResetPasswordLink.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload as string, { duration: 5000 });
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  // --- Return JSX
  return (
    <div className="custom-container flex items-center justify-center flex-col gap-5 py-5 flex-1">
      <h1 className="text-primary mb-2.5 font-jetbrains text-center flex flex-col">
        <span className="max-sm:text-2xl text-3xl font-bold mb-2.5">Forgot Password?</span>
        <p className="max-sm:text-[12px] text-[14px] font-light">
          No worries! Enter your email to receive a secure reset link.
        </p>
      </h1>

      <div className="bg-white rounded-xl">
        <h2 className="text-2xl w-fit mx-auto text-primary mt-5 mb-2.5 font-jetbrains">Reset Request</h2>
        <form
          className="shadow-lg flex flex-col gap-4 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg min-w-80 sm:min-w-88"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            type="email"
            name="email"
            placeholder="Enter your registered email"
            register={register}
            label="Email"
            error={errors.email?.message}
            autoComplete="email"
          />
          <CustomButton type="submit" aria-label="Send Reset Link" isLoading={loading}>
            Send Link
          </CustomButton>
        </form>
      </div>

      <p className="text-primary/75 select-none">
        Remember your password?
        <Link to="/login" className="text-blue-600/70 hover:text-blue-600 ml-1.5 cursor-pointer">
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
