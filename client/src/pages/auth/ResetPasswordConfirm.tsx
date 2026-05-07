// --- Libraries
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { resetPassword } from "@features/auth/authSlice";

// --- Components
import PasswordField from "@components/inputs/PasswordField";
import CustomButton from "@components/custom-button/CustomButton";

// --- Schema
const ResetPasswordSchema = z
  .object({
    password: z.string().trim().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().trim().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

// --- Main Component
const ResetPasswordConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId, token } = useParams();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (data) => {
    if (userId && token) {
      const resultAction = await dispatch(resetPassword({ userId, token, password: data.password }));

      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload as string);
        navigate("/login");
      }
    }
  };

  return (
    <div className="custom-container flex items-center justify-center flex-col gap-5 py-5 flex-1">
      <h1 className="text-primary mb-2.5 font-jetbrains text-center flex flex-col">
        <span className="max-sm:text-2xl text-3xl font-bold mb-2.5">Set New Password</span>
        <p className="max-sm:text-[12px] text-[14px] font-light">Create a strong password to secure your account.</p>
      </h1>

      <div className="bg-white rounded-xl">
        <h2 className="text-2xl w-fit mx-auto text-primary mt-5 mb-2.5 font-jetbrains">New Password</h2>
        <form
          className="shadow-lg flex flex-col gap-5 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg min-w-80 sm:min-w-88"
          onSubmit={handleSubmit(onSubmit)}
        >
          <PasswordField
            name="password"
            placeholder="Enter new password"
            label="New Password"
            register={register}
            error={errors.password?.message}
          />
          <PasswordField
            name="confirmPassword"
            placeholder="Confirm new password"
            label="Confirm Password"
            register={register}
            error={errors.confirmPassword?.message}
          />
          <CustomButton type="submit" isLoading={loading}>
            Reset Password
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
