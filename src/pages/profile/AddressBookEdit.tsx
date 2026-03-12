// --- Libraries
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- React Icons
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// --- Local Components
import InputField from "@components/inputs/InputField";
import CustomButton from "@components/custom-button/CustomButton";

// --- Address Schema
const AddressSchema = z.object({
  firstName: z
    .string()
    .max(21, "First Name must not exceed 21 characters")
    .trim(),
  lastName: z
    .string()
    .max(21, "Last Name must not exceed 21 characters")
    .trim(),
  phoneNumber: z
    .string()
    .min(11, "Phone Number must be at least 11 digits")
    .trim(),
  address: z.string().min(11, "Address must be at least 50 characters").trim(),
});
type AddressSchemaType = z.infer<typeof AddressSchema>;

// --- Main Component
const AddressBookEdit = () => {
  const navigate = useNavigate();

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(AddressSchema),
  });

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<AddressSchemaType> = (data) => {
    console.log(data);
    reset();
  };

  // --- Return JSX
  return (
    <div>
      <h1 className="border-b p-5 border-body text-xl text-[#333] font-jetbrains font-bold flex items-center gap-5">
        <button
          type="button"
          aria-label="Back to profile"
          onClick={() => navigate("/profile")}
        >
          <MdOutlineKeyboardBackspace size={30} className="cursor-pointer" />
        </button>
        Edit Address
      </h1>
      <div className="mt-5">
        <form
          className="gap-4 max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <InputField
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              register={register}
              label="First Name"
              error={errors.firstName?.message}
              autoComplete="firstName"
              className="sm:w-full"
              defaultValue={"John"}
            />
            <InputField
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              register={register}
              label="Last Name"
              error={errors.lastName?.message}
              autoComplete="lastName"
              className="sm:w-full"
              defaultValue={"Doe"}
            />
            <InputField
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              register={register}
              label="Phone Number"
              error={errors.phoneNumber?.message}
              autoComplete="phoneNumber"
              className="sm:w-full"
              defaultValue={"123-456-789"}
            />
            <InputField
              type="text"
              name="address"
              placeholder="Enter your address"
              register={register}
              label="Address"
              error={errors.address?.message}
              autoComplete="address"
              className="sm:w-full"
              defaultValue={"Cairo / El-Rehab"}
            />
          </div>
          <CustomButton
            type="submit"
            aria-label="Save Changes"
            className="px-5 ml-auto"
          >
            Save
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AddressBookEdit;
