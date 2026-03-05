// --- Libraries
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- Components
import InputField from "@components/inputs/InputField";
import CustomButton from "@/components/custom-button/CustomButton";

// --- Register Schema
const ResetEmailSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }).trim(),
});
type ResetEmailSchemaType = z.infer<typeof ResetEmailSchema>;

// --- Main Component
const ResetPassword = () => {
  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetEmailSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(ResetEmailSchema),
  });
  // --- OnSubmit Function
  const onSubmit: SubmitHandler<ResetEmailSchemaType> = (data) => {
    console.log(data);
    reset();
  };

  // --- Return JSX
  return (
    <div className="custom-container flex items-center justify-center flex-col gap-5 py-5 flex-1">
      <h1 className="text-primary mb-2.5 font-jetbrains text-center flex flex-col">
        <span className="max-sm:text-2xl text-3xl font-bold mb-2.5">
          Reset Password
        </span>
        <p className="max-sm:text-[12px] text-[14px] font-light">
          Enter your email to receive a password reset link
        </p>
      </h1>
      <div className="bg-white rounded-xl max-sm:w-77.5">
        <h2 className="text-2xl w-fit mx-auto text-primary mt-5 mb-2.5 font-jetbrains">
          Reset Password
        </h2>
        <form
          className="shadow-lg flex flex-col gap-4 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg"
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
          <CustomButton type="submit" aria-label="Submit form">
            Submit
          </CustomButton>
        </form>
      </div>
      <p className="text-primary/75 select-none">
        Back to
        <Link
          to="/login"
          className="text-blue-600/70 hover:text-blue-600 ml-1.5 cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
};
export default ResetPassword;
