// --- Libraries
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

// --- React Icons
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

// --- Utils
import { cn } from "@utils/cn";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { deleteUser, fetchUsers } from "@features/users/usersSlice";

// --- Local Components
import Modal from "@components/modal/Modal";
import ErrorHandler from "@components/error-handler/ErrorHandler";
import Spinner from "@components/spinner/Spinner";

// --- Types
import type { UserType } from "@/types/types";

// --- Helper Functions: Badge Colors
const getStatusBadge = (status: string) => {
  return status === "active"
    ? "bg-green-100 text-green-700 border-green-200"
    : "bg-red-100 text-red-700 border-red-200";
};

const getRoleBadge = (role: string) => {
  return role === "admin"
    ? "bg-purple-100 text-purple-700 border-purple-200"
    : "bg-blue-100 text-blue-700 border-blue-200";
};

// --- Main Component
const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading && users.length == 0) dispatch(fetchUsers());
  }, [dispatch, users.length, loading]);

  // --- Logic: Filtering
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, users]);

  // --- Handle Modal
  const [isOpen, setIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  const onConfirm = () => {
    if (userToDelete) {
      dispatch(deleteUser({ id: userToDelete.id }));
      setUserToDelete(null);
    }
  };

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      {/* --- Header --- */}

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

      {/* --- Real Data Container --- */}
      <div className="flex-1 bg-white rounded-md shadow-sm overflow-hidden flex flex-col min-h-100">
        {loading ? (
          <div className="flex-1 flex items-center justify-center h-full">
            <Spinner className="w-12 h-12" />
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center p-5">
            <ErrorHandler error={error} />
          </div>
        ) : (
          <div>
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
                            <p className="text-[11px] text-gray-500">
                              {user.email}
                            </p>
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
                            {new Date(user.joinDate).toLocaleDateString(
                              "en-GB",
                            )}
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
          </div>
        )}
      </div>

      {/* --- Modal --- */}

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          onConfirm={onConfirm}
          title="Delete User"
          description={`Are you sure you want to delete "${userToDelete?.fullName}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default Users;
