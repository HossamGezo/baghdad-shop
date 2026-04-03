// --- Libraries
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- React Icons
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// --- Components
import ErrorHandler from "@components/error-handler/ErrorHandler";
import CustomButton from "@components/custom-button/CustomButton";

// --- Utils
import { cn } from "@utils/cn";

// --- Types
import type { UserType } from "@/types/types";
import { useEffect } from "react";

// --- Mock Data
const mockUsers: UserType[] = [
  {
    id: "USR-001",
    fullName: "Hossam Gouda",
    email: "hossam@example.com",
    phone: "+201111182665",
    role: "admin",
    joinDate: "2023-01-15T00:00:00Z",
    avatar: "/images/avatar/avatar1.png",
    status: "Active",
    totalOrders: 42,
  },
  {
    id: "USR-002",
    fullName: "Ahmed Ali",
    email: "ahmed.ali@mail.com",
    phone: "+201000000002",
    role: "customer",
    joinDate: "2024-05-10T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 1,
  },
  {
    id: "USR-003",
    fullName: "Sara Mahmoud",
    email: "sara.m@test.com",
    phone: "+201200000003",
    role: "customer",
    joinDate: "2024-08-22T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 5,
  },
  {
    id: "USR-004",
    fullName: "Mona Adel",
    email: "mona.design@example.com",
    phone: "+201500000004",
    role: "customer",
    joinDate: "2024-09-01T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Inactive",
    totalOrders: 2,
  },
  {
    id: "USR-005",
    fullName: "Youssef Tarek",
    email: "y.tarek@company.com",
    phone: "+201100000005",
    role: "customer",
    joinDate: "2024-10-05T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 8,
  },
  {
    id: "USR-006",
    fullName: "Omar Khaled",
    email: "omar.khaled@mail.com",
    phone: "+201200000006",
    role: "customer",
    joinDate: "2024-10-15T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 3,
  },
  {
    id: "USR-007",
    fullName: "Nour Hassan",
    email: "nour.hassan@mail.com",
    phone: "+201200000007",
    role: "customer",
    joinDate: "2024-11-01T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 6,
  },
  {
    id: "USR-008",
    fullName: "Karim Mostafa",
    email: "karim.mostafa@mail.com",
    phone: "+201200000008",
    role: "customer",
    joinDate: "2024-11-10T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Inactive",
    totalOrders: 0,
  },
  {
    id: "USR-009",
    fullName: "Aya Ibrahim",
    email: "aya.ibrahim@mail.com",
    phone: "+201200000009",
    role: "customer",
    joinDate: "2024-11-18T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 4,
  },
  {
    id: "USR-010",
    fullName: "Mahmoud Samir",
    email: "mahmoud.samir@mail.com",
    phone: "+201200000010",
    role: "customer",
    joinDate: "2024-12-01T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 7,
  },
  {
    id: "USR-011",
    fullName: "Salma Nabil",
    email: "salma.nabil@mail.com",
    phone: "+201200000011",
    role: "customer",
    joinDate: "2024-12-10T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Inactive",
    totalOrders: 2,
  },
  {
    id: "USR-012",
    fullName: "Ali Hany",
    email: "ali.hany@mail.com",
    phone: "+201200000012",
    role: "customer",
    joinDate: "2024-12-20T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 9,
  },
  {
    id: "USR-013",
    fullName: "Dina Fathy",
    email: "dina.fathy@mail.com",
    phone: "+201200000013",
    role: "customer",
    joinDate: "2025-01-05T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 5,
  },
  {
    id: "USR-014",
    fullName: "Hassan Adel",
    email: "hassan.adel@mail.com",
    phone: "+201200000014",
    role: "customer",
    joinDate: "2025-01-15T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Inactive",
    totalOrders: 1,
  },
  {
    id: "USR-015",
    fullName: "Fatma Mohamed",
    email: "fatma.mohamed@mail.com",
    phone: "+201200000015",
    role: "customer",
    joinDate: "2025-01-25T00:00:00Z",
    avatar: "/images/avatar/default.png",
    status: "Active",
    totalOrders: 10,
  },
];

// --- Helper Components

type FieldProps = {
  title: string;
  description: string;
};

const Field = ({ title, description }: FieldProps) => {
  return (
    <div>
      <div className="relative flex flex-col gap-2.5">
        <span className="absolute bg-white text-primary/50 px-2.5 text-[12px] left-3.5 -top-2">
          {title}
        </span>
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
  // --- Hook Form
  const { register, reset, handleSubmit } = useForm<EditUserSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      role: "customer",
    },
  });

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<EditUserSchemaType> = (data) => {
    console.log(data);
  };

  // --- Edit User
  const navigate = useNavigate();
  const { id } = useParams();

  const user: UserType | undefined = mockUsers.find((user) => user.id === id);

  // --- Default Values
  useEffect(() => {
    if (user) {
      reset({
        role: user.role,
      });
    }
  }, [reset, user]);

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      <h1 className="border-b p-5 border-body text-xl text-primary font-jetbrains font-bold flex items-center gap-5 bg-white rounded-md shadow-sm mb-5">
        <button
          type="button"
          aria-label="Back to users management"
          onClick={() => navigate("/admin/users")}
        >
          <MdOutlineKeyboardBackspace size={30} className="cursor-pointer" />
        </button>
        Edit User
      </h1>
      {!user ? (
        <div className="h-full flex items-center justify-center w-3/4 mx-auto">
          <ErrorHandler error={"User Not Found"} />
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm h-full p-2.5">
          <div className="flex max-sm:flex-col gap-5 sm:p-7">
            <div className="border-2 w-fit mx-auto border-amber-400 hover:shadow-md transition-shadow duration-300 shadow-amber-500/25 rounded-full h-fit p-0.5 flex items-center justify-center">
              <img
                src={user.avatar}
                alt={user.fullName}
                loading="lazy"
                className="w-20 h-20 object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${user.fullName}&background=random`;
                }}
              />
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-5 shadow-sm border border-gray-200 rounded-md p-5">
              <Field title={"User Name"} description={user.fullName} />
              <Field title={"Email"} description={user.email} />
              <Field title={"Phone"} description={user.phone} />
              <Field
                title={"Join Date"}
                description={user.joinDate.substring(0, 10)}
              />
              <Field
                title={"Total Orders"}
                description={String(user.totalOrders)}
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <select
                  {...register("role")}
                  name="role"
                  id="role"
                  className="border w-full border-gray-300 h-12.5 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[border-color,box-shadow] duration-500 ease-in-out shadow-sm"
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
