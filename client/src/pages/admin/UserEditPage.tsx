// --- Libraries
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- React Icons
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// --- Components
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomButton from "@components/custom-button/CustomButton";
import Spinner from "@components/spinner/Spinner";

// --- Utils
import { cn } from "@utils/cn";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchUserById, updateUserRole } from "@features/users/usersSlice";

// --- Helper Components
type FieldProps = {
  title: string;
  description: string;
};

const Field = ({ title, description }: FieldProps) => {
  return (
    <div>
      <div className="relative flex flex-col gap-2.5">
        <span className="absolute bg-white text-primary/50 px-2.5 text-[12px] left-3.5 -top-2">{title}</span>
        <div
          className={cn(
            "w-full bg-white border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
            "text-sm px-1.5 py-3.5 caret-primary rounded-md placeholder:text-primary/50 placeholder:text-sm transition-[border-color,box-shadow] duration-500 ease-in-out pl-2.5",
            "bg-gray-50 text-primary/50 cursor-not-allowed",
          )}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

// --- Validation
const EditUserSchema = z.object({
  role: z.enum(["customer", "admin"]),
});

type EditUserSchemaType = z.infer<typeof EditUserSchema>;

// --- Main Component
const UserEditPage = () => {
  // --- RTK
  const { user } = useAppSelector((state) => state.auth);
  const { loading, singleUser } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  // --- Router Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // --- Fetch User
  useEffect(() => {
    if (id && (!singleUser || singleUser._id !== id)) {
      dispatch(fetchUserById({ id }));
    }
  }, [dispatch, singleUser, id]);

  // --- Hook Form
  const { register, reset, handleSubmit } = useForm<EditUserSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      role: "customer",
    },
  });

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<EditUserSchemaType> = async (data) => {
    if (singleUser) {
      await dispatch(updateUserRole({ id: singleUser._id, role: data.role }));

      const isEditingSelf = singleUser._id === user?._id;
      const becameCustomer = data.role === "customer";

      if (isEditingSelf && becameCustomer) {
        navigate("/", { replace: true });
      } else {
        navigate("/admin/users");
      }
    }
  };

  // --- Default Values
  useEffect(() => {
    if (singleUser) {
      reset({
        role: singleUser.role,
      });
    }
  }, [reset, singleUser]);

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      <h1 className="border-b p-5 border-body text-xl text-primary font-jetbrains font-bold flex items-center gap-5 bg-white rounded-md shadow-sm mb-5">
        <button type="button" aria-label="Back to users management" onClick={() => navigate("/admin/users")}>
          <MdOutlineKeyboardBackspace size={30} className="cursor-pointer" />
        </button>
        Edit User
      </h1>

      {loading ? (
        <div className="flex-1 flex items-center justify-center h-full">
          <Spinner className="w-12 h-12" />
        </div>
      ) : !singleUser ? (
        <div className="h-full flex items-center justify-center w-3/4 mx-auto">
          <ErrorHandler error={"User Not Found"} />
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm h-full p-2.5">
          <div className="flex max-sm:flex-col gap-5 sm:p-7">
            <div
              className={cn(
                "border-2 w-fit mx-auto rounded-full h-fit p-0.5 flex items-center justify-center border-amber-400",
              )}
            >
              <img
                src={singleUser.avatar}
                alt={singleUser.fullName}
                className="w-20 h-20 object-contain rounded-full"
                onError={(e) => {
                  const bg = singleUser.role === "admin" ? "0f172a" : "random";
                  const color = singleUser.role === "admin" ? "f87171" : "fff";
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${singleUser.fullName}&background=${bg}&color=${color}`;
                }}
              />
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-5 shadow-sm border border-gray-200 rounded-md p-5">
              <Field title={"User Name"} description={singleUser.fullName} />
              <Field title={"Email"} description={singleUser.email} />
              <Field title={"Phone"} description={singleUser.address?.phone || "No Phone Number"} />
              <Field title={"Join Date"} description={new Date(singleUser.createdAt).toLocaleDateString("en-GB")} />
              <Field title={"Total Orders"} description={String(singleUser.totalOrders)} />

              <form onSubmit={handleSubmit(onSubmit)}>
                <select
                  {...register("role")}
                  className="border w-full border-gray-300 h-12.5 rounded-md focus:border-primary outline-none shadow-sm"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                <CustomButton type="submit" className="w-35 mt-5 sm:ml-auto">
                  Save Changes
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEditPage;
