// --- Libraries
import { useMemo, useState } from "react";
import { Link } from "react-router";

// --- React Icons
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

// --- Utils
import { cn } from "@utils/cn";

// --- Local Components
import Modal from "@components/modal/Modal";

// --- Types
import type { UserType } from "@/types/types";

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

// --- Helper Functions: Badge Colors
const getStatusBadge = (status: string) => {
  return status === "Active"
    ? "bg-green-100 text-green-700 border-green-200"
    : "bg-red-100 text-red-700 border-red-200";
};

const getRoleBadge = (role: string) => {
  return role === "Admin"
    ? "bg-purple-100 text-purple-700 border-purple-200"
    : "bg-blue-100 text-blue-700 border-blue-200";
};

// --- Main Component
const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // --- Logic: Filtering
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  // --- Handle Modal
  const [isOpen, setIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  const onConfirm = () => {
    if (userToDelete) {
      console.log(`" ${userToDelete.fullName} " Has been deleted successfully`);
    }

    // Delete Logic

    setUserToDelete(null);
  };

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-5 rounded-md shadow-sm mb-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary font-jetbrains lg:text-start">
            Users Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track registered customers ({filteredUsers.length})
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-[border-color,box-shadow] duration-500 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Data Table Area */}
      <div className="flex-1 bg-white rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-auto custom-scrollbar flex-1">
          <table
            className={cn(
              "w-full min-w-max relative border-separate border-spacing-0",
              filteredUsers.length === 0 && "h-full",
            )}
          >
            <thead>
              <tr className="sticky top-0 z-10 bg-[#EFF2F3] shadow-sm text-neutral-700 *:whitespace-nowrap *:text-center *:text-[10px] *:px-3 *:py-2.5 *:flex-1 *:select-none *:not-last:border-r *:border-r-warning">
                <th>AVATAR</th>
                <th>USER INFO</th>
                <th>ROLE</th>
                <th>TOTAL ORDERS</th>
                <th>JOIN DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="even:bg-[#EFF2F3]/75 hover:bg-gray-500/10 transition-colors duration-200 *:whitespace-nowrap *:px-3 *:py-2.5 *:text-center *:text-[12px] *:select-none"
                  >
                    {/* Avatar */}
                    <td>
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        loading="lazy"
                        className="w-10 h-10 object-contain rounded-full mx-auto border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${user.fullName}&background=random`;
                        }}
                      />
                    </td>

                    {/* User Info */}
                    <td>
                      <p className="text-[14px] font-semibold text-primary">
                        {user.fullName}
                      </p>
                      <p className="text-[11px] text-gray-500">{user.email}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {user.phone}
                      </p>
                    </td>

                    {/* Role */}
                    <td>
                      <span
                        className={cn(
                          "block w-20 mx-auto px-2.5 py-1 rounded-full text-[10px] font-bold border",
                          getRoleBadge(user.role),
                        )}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Orders Count */}
                    <td className="font-medium text-[14px]">
                      {user.totalOrders}
                    </td>

                    {/* Date */}
                    <td className="text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString("en-GB")}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={cn(
                          "block w-20 mx-auto px-2.5 py-1 rounded-full text-[10px] font-bold border",
                          getStatusBadge(user.status),
                        )}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          to={`/admin/users/edit/${user.id}`}
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded"
                          aria-label="Edit User"
                          title="Edit User"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded cursor-pointer"
                          aria-label="Delete User"
                          title="Delete User"
                          onClick={() => {
                            setIsOpen(true);
                            setUserToDelete(user);
                          }}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-500/75 tracking-wide font-jetbrains text-xl select-none"
                  >
                    No users found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} onConfirm={onConfirm} />}
    </div>
  );
};

export default Users;
