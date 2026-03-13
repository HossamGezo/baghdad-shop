// --- Libraries
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- React Icons
import { GiWrappingStar } from "react-icons/gi";

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
  cardNumber: z
    .string()
    .regex(/[0-9\s]{13,19}/, {
      message: "Card number must be at least 13 digits",
    })
    .trim(),
});
type AddressSchemaType = z.infer<typeof AddressSchema>;

// --- Main Component
const PaymentDetails = () => {
  // --- Billing Address Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-356-789",
      address: "Cairo / El Rehab",
    },
  });

  const onSubmit: SubmitHandler<AddressSchemaType> = (data) => {
    console.log(data);
    reset();
  };

  // --- Return JSX
  return (
    <div className="p-2.5 rounded-md bg-white shadow-md text-neutral-800">
      <h2 className="relative w-fit text-primary/60 text-2xl font-jetbrains select-none mb-5 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
        ChECKOUT
      </h2>
      <form
        className="max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Address */}
        <h3 className="relative w-fit text-primary/60 text-lg font-jetbrains select-none mb-10 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
          1. Billing Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            register={register}
            label="First Name"
            error={errors.firstName?.message}
            autoComplete="firstName"
            className="sm:w-full"
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
          />
        </div>

        {/* Horizontal Break */}
        <span className="flex items-center justify-center gap-2.5 w-1/2 my-7 mx-auto">
          <span className="w-[40%] h-px bg-gray-400/50 rounded-bl-2xl rounded-tr-2xl"></span>
          <GiWrappingStar className="text-gray-400/50" size={15} />
          <span className="w-[40%] h-px bg-gray-400/50 rounded-bl-2xl rounded-tr-2xl"></span>
        </span>

        {/* Payment Method */}
        <h3 className="relative w-fit text-primary/60 text-lg font-jetbrains select-none mb-10 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
          2. Payment Method
        </h3>
        <div>
          <InputField
            type="tel"
            name="cardNumber"
            placeholder="xxxx xxxx xxxx xxxx"
            register={register}
            label="Card Number"
            error={errors.firstName?.message}
            autoComplete="cc-number"
            className="sm:w-full"
          />
          <CustomButton
            type="submit"
            aria-label="Save Changes"
            className="px-5 ml-auto mt-5"
          >
            Place In Order
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
