// --- Libraries
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- React Icons
import { GiWrappingStar } from "react-icons/gi";

// --- Utils
import { calculateDiscount } from "@utils/calculateDiscount";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { createOrder } from "@features/orders/ordersSlice";
import { updateProfile } from "@features/auth/authSlice";

// --- Local Components
import InputField from "@components/inputs/InputField";
import CustomButton from "@components/custom-button/CustomButton";

// --- Address Schema
const AddressSchema = z.object({
  fullName: z.string().max(21, "Name must not exceed 21 characters").trim(),
  city: z.string().min(3, "City must be at least 3 characters").trim(),
  area: z.string().min(3, "Area must be at least 3 characters").trim(),
  street: z.string().min(3, "Street must be at least 3 characters").trim(),
  phone: z.string().min(11, "Phone Number must be at least 11 digits").trim(),
  cardNumber: z
    .string()
    .regex(/^[0-9\s]{13,19}$/, {
      message: "Card number must be at least 13 digits",
    })
    .trim(),
});
type AddressSchemaType = z.infer<typeof AddressSchema>;

// --- Main Component
const PaymentDetails = () => {
  // --- React Router
  const navigate = useNavigate();

  // --- RTK
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const { loading } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

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
        city: user.address?.city,
        area: user.address?.area,
        street: user.address?.street,
        phone: user.address?.phone,
      });
  }, [reset, user]);

  // --- Submit Form
  const onSubmit: SubmitHandler<AddressSchemaType> = async (data) => {
    const { cardNumber: _, fullName, ...addressData } = data;

    // --- Calculations
    const total = cart.reduce((acc, cur) => acc + cur.count * calculateDiscount(cur.price, cur.discount), 0);
    const fees = 15;
    const totalPrice = total + fees;

    const orderData = {
      userId: user?.id || "",
      customerName: fullName,
      email: user?.email || "",
      orderItems: cart,
      shippingAddress: addressData,
      totalPrice: totalPrice,
    };

    const resultAction = await dispatch(createOrder(orderData));

    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(updateProfile({ fullName, ...addressData }));
      navigate("/profile/orders");
    }
  };

  // --- Return JSX
  return (
    <div className="p-2.5 rounded-md bg-white shadow-md text-neutral-800">
      <h2 className="relative w-fit text-primary/60 text-2xl font-jetbrains select-none mb-5 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
        CHECKOUT
      </h2>
      <form className="max-sm:p-5 sm:px-10 sm:pb-10 rounded-lg mt-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Address */}
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
            className="sm:w-full"
          />
          <InputField
            type="text"
            name="city"
            placeholder="Enter your city"
            register={register}
            label="City"
            error={errors.city?.message}
            autoComplete="address-level1"
            className="sm:w-full"
          />
          <InputField
            type="text"
            name="area"
            placeholder="Enter your area"
            register={register}
            label="Area"
            error={errors.area?.message}
            autoComplete="address-level2"
            className="sm:w-full"
          />
          <InputField
            type="text"
            name="street"
            placeholder="Enter your street"
            register={register}
            label="Street"
            error={errors.street?.message}
            autoComplete="address-level3"
            className="sm:w-full"
          />
          <InputField
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            register={register}
            label="Phone Number"
            error={errors.phone?.message}
            autoComplete="mobile tel"
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
            error={errors.cardNumber?.message}
            autoComplete="cc-number"
            className="sm:w-full"
            maxLength={19}
          />
          <CustomButton isLoading={loading} type="submit" aria-label="Save Changes" className="px-5 ml-auto mt-5">
            Place In Order
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
