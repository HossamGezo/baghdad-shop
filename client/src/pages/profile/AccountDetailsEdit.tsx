// --- Libraries
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- React Icons
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { updateProfile } from "@features/auth/authSlice";

// --- Local Components
import InputField from "@components/inputs/InputField";
import CustomButton from "@components/custom-button/CustomButton";

// --- Details Schema
const DetailsSchema = z.object({
  fullName: z.string().max(21, "Name must not exceed 21 characters").trim(),
  email: z.string().email({ message: "Invalid Email" }).trim(),
});
type DetailsSchemaType = z.infer<typeof DetailsSchema>;

// --- Main Component
const AccountDetailsEdit = () => {
  // --- React Router
  const navigate = useNavigate();

  // --- RTK
  const { loading, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DetailsSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(DetailsSchema),
  });

  useEffect(() => {
    if (user) reset({ fullName: user.fullName, email: user.email });
  }, [reset, user]);

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<DetailsSchemaType> = async (data) => {
    const updatePayload = {
      fullName: data.fullName,
    };

    const resultAction = await dispatch(updateProfile(updatePayload));

    if (updateProfile.fulfilled.match(resultAction)) {
      navigate("/profile");
    }
  };

  // --- Return JSX
  return (
    <div>
      <h1 className="border-b p-5 border-body text-xl text-[#333] font-jetbrains font-bold flex items-center gap-5">
        <button type="button" aria-label="Back to profile" onClick={() => navigate("/profile")}>
          <MdOutlineKeyboardBackspace size={30} className="cursor-pointer" />
        </button>
        Edit Account
      </h1>
      <div className="mt-5">
        <form className="gap-4 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <InputField
              type="text"
              name="fullName"
              placeholder="Enter your name"
              register={register}
              label="Full Name"
              error={errors.fullName?.message}
              autoComplete="name"
              className="sm:w-full"
            />
            <InputField
              type="email"
              name="email"
              placeholder="Enter your email"
              register={register}
              label="Email Address"
              error={errors.email?.message}
              autoComplete="email"
              className="sm:w-full"
              readOnly
            />
          </div>
          <CustomButton isLoading={loading} type="submit" aria-label="Save Changes" className="px-5 ml-auto">
            Save
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AccountDetailsEdit;
