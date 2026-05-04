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

// --- Address Schema
const AddressSchema = z.object({
  city: z.string().min(3, "City must be at least 3 characters").trim(),
  area: z.string().min(3, "Area must be at least 3 characters").trim(),
  street: z.string().min(3, "Street must be at least 3 characters").trim(),
  phone: z.string().min(11, "Phone Number must be at least 11 digits").trim(),
});
type AddressSchemaType = z.infer<typeof AddressSchema>;

// --- Main Component
const AddressBookEdit = () => {
  const navigate = useNavigate();
  const { loading, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      city: "",
      area: "",
      street: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user?.address) {
      reset({
        city: user.address.city || "",
        area: user.address.area || "",
        street: user.address.street || "",
        phone: user.address.phone || "",
      });
    }
  }, [reset, user]);

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<AddressSchemaType> = async (data) => {
    const updatePayload = {
      address: {
        city: data.city,
        area: data.area,
        street: data.street,
        phone: data.phone,
      },
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
        Edit Address
      </h1>
      <div className="mt-5">
        <form className="gap-4 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <InputField
              type="text"
              name="city"
              placeholder="Enter your city"
              register={register}
              label="City"
              error={errors.city?.message}
              autoComplete="address-level1"
            />
            <InputField
              type="text"
              name="area"
              placeholder="Enter your area"
              register={register}
              label="Area"
              error={errors.area?.message}
              autoComplete="address-level2"
            />
            <InputField
              type="text"
              name="street"
              placeholder="Enter your street"
              register={register}
              label="Street"
              error={errors.street?.message}
              autoComplete="address-level3"
            />
            <InputField
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              register={register}
              label="Phone Number"
              error={errors.phone?.message}
              autoComplete="mobile tel"
            />
          </div>
          <CustomButton isLoading={loading} type="submit" className="px-5 ml-auto">
            Save
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AddressBookEdit;
