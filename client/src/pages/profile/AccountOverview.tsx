// --- RTK
import { useAppSelector } from "@app/hooks";

// --- Local Components
import Box from "@pages/profile/components/Box";
import ErrorHandler from "@components/error-handler/ErrorHandler";

// --- Main Component
const AccountOverview = () => {
  // --- RTK
  const { user, error } = useAppSelector((state) => state.auth);

  // --- Return JSX
  return (
    <div>
      <h1 className="border-b p-5 border-body text-xl text-[#333] font-jetbrains font-bold">Account Overview</h1>
      {user ? (
        <div className="pb-5 px-5 mt-5 grid grid-cols-2 gap-5">
          {/* Account Details */}
          <Box
            ariaLabel="Edit Account Details"
            title="Account details"
            goTo="account/edit"
            head={user.fullName}
            className="max-lg:col-span-2"
          >
            <p>{user.email}</p>
          </Box>

          {/* Address Details */}
          <Box
            ariaLabel="Edit Address"
            title="Address Book"
            goTo="address/edit"
            head="Your default shipping address:"
            className="max-lg:col-span-2"
          >
            <p className="line-clamp-1">{user.fullName}</p>
            {user.address ? (
              <>
                <p className="line-clamp-1">
                  {user.address.area} / {user.address.city} / {user.address.street}
                </p>
                <p className="line-clamp-1">{user.address?.phone}</p>
              </>
            ) : (
              <div>No address provided</div>
            )}
          </Box>
        </div>
      ) : (
        <ErrorHandler error={error} />
      )}
    </div>
  );
};

export default AccountOverview;
