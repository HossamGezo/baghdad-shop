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
  const { error, users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // --- Logic: Filtering
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users
      .filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .toSorted((a, b) => {
        const roleOrder = { admin: 0, customer: 1 };
        return roleOrder[a.role] - roleOrder[b.role];
      });
  }, [searchTerm, users]);

  // --- Handle Modal
  const [isOpen, setIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  const onConfirm = () => {
    if (userToDelete) {
      dispatch(deleteUser({ id: userToDelete._id }));
      setIsOpen(false);
      setUserToDelete(null);
    }
  };

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="bg-white p-5 rounded-md shadow-sm mb-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary font-jetbrains">Users Management</h1>
          <p className="text-sm text-gray-500">Manage registered members ({filteredUsers.length})</p>
        </div>
        <div className="relative w-full lg:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Real Data Container */}
      <div className="flex-1 bg-white rounded-md shadow-sm overflow-hidden flex flex-col min-h-100">
        {error ? (
          <div className="flex-1 flex items-center justify-center p-5">
            <ErrorHandler error={error} />
          </div>
        ) : (
          <div className="overflow-auto custom-scrollbar">
            <table className="w-full min-w-max relative border-separate border-spacing-0">
              <thead>
                <tr className="sticky top-0 z-10 bg-[#EFF2F3] text-neutral-700 *:whitespace-nowrap *:text-center *:text-[10px] *:px-3 *:py-2.5 *:not-last:border-r *:border-r-warning">
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
                      key={user._id}
                      className="even:bg-[#EFF2F3]/75 hover:bg-gray-500/10 transition-colors *:whitespace-nowrap *:px-3 *:py-2.5 *:text-center *:text-[12px]"
                    >
                      <td>
                        <img
                          src={user.avatar}
                          alt={user.fullName}
                          className={cn("w-10 h-10 object-contain rounded-full mx-auto")}
                          onError={(e) => {
                            const bg = user.role === "admin" ? "0f172a" : "random";
                            const color = user.role === "admin" ? "f87171" : "fff";
                            (e.target as HTMLImageElement).src =
                              `https://ui-avatars.com/api/?name=${user.fullName}&background=${bg}&color=${color}`;
                          }}
                        />
                      </td>
                      <td>
                        <p className="text-[14px] font-semibold text-primary">{user.fullName}</p>
                        <p className="text-[11px] text-gray-500">{user.email}</p>
                      </td>
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
                      <td className="font-medium text-[14px]">{user.totalOrders}</td>
                      <td className="text-gray-600">{new Date(user.createdAt).toLocaleDateString("en-GB")}</td>
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
                      <td>
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            to={`/admin/users/edit/${user._id}`}
                            className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                          >
                            <FiEdit size={18} />
                          </Link>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded cursor-pointer"
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
                    <td colSpan={7} className="text-center py-10 text-gray-400 font-jetbrains text-xl">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          onConfirm={onConfirm}
          title="Delete User"
          description={`Are you sure you want to delete "${userToDelete?.fullName}"? This action will also delete all their orders.`}
        />
      )}
    </div>
  );
};

export default Users;
