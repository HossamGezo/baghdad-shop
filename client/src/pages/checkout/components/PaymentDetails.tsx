// --- Libraries
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- React Icons
import { GiWrappingStar } from "react-icons/gi";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { createOrder } from "@features/orders/ordersSlice";
import { updateProfile } from "@features/auth/authSlice";

// --- Local Components
import InputField from "@components/inputs/InputField";
import CustomButton from "@components/custom-button/CustomButton";

// --- Address Schema
const AddressSchema = z.object({
  fullName: z.string().trim().min(3, "Name must be at least 3 characters").max(21),
  city: z.string().min(3, "City is required").trim(),
  area: z.string().min(3, "Area is required").trim(),
  street: z.string().min(3, "Street is required").trim(),
  phone: z.string().min(11, "Phone must be at least 11 digits").trim(),
  cardNumber: z
    .string()
    .regex(/^[0-9\s]{13,19}$/, "Invalid Card Number")
    .trim(),
});
type AddressSchemaType = z.infer<typeof AddressSchema>;

// --- Main Component
const PaymentDetails = () => {
  const navigate = useNavigate();

  // --- RTK
  const { loading: authLoading, user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const { loading } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  // --- Billing Address Hook Form Logic
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<AddressSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      fullName: "",
      city: "",
      area: "",
      street: "",
      phone: "",
      cardNumber: "",
    },
  });

  // --- Auto-fill user form data
  useEffect(() => {
    if (user)
      reset({
        fullName: user.fullName,
        city: user.address?.city || "",
        area: user.address?.area || "",
        street: user.address?.street || "",
        phone: user.address?.phone || "",
        cardNumber: "",
      });
  }, [reset, user]);

  // --- Submit Form
  const onSubmit: SubmitHandler<AddressSchemaType> = async (data) => {
    const { cardNumber: _, fullName, ...addressData } = data;

    const orderData = {
      customerName: fullName,
      email: user?.email || "",
      orderItems: cart,
      shippingAddress: addressData,
      paymentMethod: "card" as const,
    };

    const resultAction = await dispatch(createOrder(orderData));

    if (createOrder.fulfilled.match(resultAction)) {
      navigate("/profile/orders");
    }
  };

  // --- Handle Update Profile
  const isAddressChanged =
    dirtyFields.fullName || dirtyFields.city || dirtyFields.area || dirtyFields.street || dirtyFields.phone;

  const handleUpdateProfile = async () => {
    const isValid = await trigger(["fullName", "city", "area", "street", "phone"]);

    if (isValid) {
      const values = getValues();
      const updatePayload = {
        fullName: values.fullName,
        address: {
          city: values.city,
          area: values.area,
          street: values.street,
          phone: values.phone,
        },
      };
      dispatch(updateProfile(updatePayload));
    }
  };

  // --- Return JSX
  return (
    <div className="p-2.5 rounded-md bg-white shadow-md text-neutral-800">
      <h2 className="relative w-fit text-primary/60 text-2xl font-jetbrains select-none mb-5 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
        CHECKOUT
      </h2>
      <form className="max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg mt-10" onSubmit={handleSubmit(onSubmit)}>
        {/* 1. Address Section */}
        <h3 className="relative w-fit text-primary/60 text-lg font-jetbrains select-none mb-10 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
          1. Billing Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            type="text"
            name="fullName"
            placeholder="Enter your name"
            register={register}
            label="Full Name"
            error={errors.fullName?.message}
            autoComplete="name"
          />
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
          {isAddressChanged && (
            <CustomButton
              onClick={handleUpdateProfile}
              isLoading={authLoading}
              type="button"
              className="px-5 ml-auto mt-5"
            >
              Save Changes
            </CustomButton>
          )}
        </div>

        {/* Horizontal Break */}
        <span className="flex items-center justify-center gap-2.5 w-1/2 my-7 mx-auto">
          <span className="w-[40%] h-px bg-gray-400/50"></span>
          <GiWrappingStar className="text-gray-400/50" size={15} />
          <span className="w-[40%] h-px bg-gray-400/50"></span>
        </span>

        {/* 2. Payment Section */}
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
            error={errors.cardNumber?.message}
            autoComplete="cc-number"
            maxLength={19}
          />
          {!isAddressChanged && (
            <CustomButton isLoading={loading} type="submit" className="px-5 ml-auto mt-5">
              Place Order
            </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
