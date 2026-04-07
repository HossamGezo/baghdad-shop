// --- Local Components
import Box from "@pages/profile/components/Box";

// --- Main Component
const AccountOverview = () => {
  return (
    <div>
      <h1 className="border-b p-5 border-body text-xl text-[#333] font-jetbrains font-bold">Account Overview</h1>
      <div className="pb-5 px-5 mt-5 grid grid-cols-2 gap-5">
        {/* Account Details */}
        <Box
          ariaLabel="Edit Account Details"
          title="Account details"
          goTo="account/edit"
          head="Hossam Gouda"
          className="max-lg:col-span-2"
        >
          <p>tigeragencyltd@gmail.com</p>
        </Box>

        {/* Address Details */}
        <Box
          ariaLabel="Edit Address"
          title="Address Book"
          goTo="address/edit"
          head="Your default shipping address:"
          className="max-lg:col-span-2"
        >
          <p>Hossam Gouda</p>
          <p>Nasser / Bani Suef</p>
          <p>Al Rehab 1, Cairo</p>
          <p>+20 1111182665</p>
        </Box>
      </div>
    </div>
  );
};

export default AccountOverview;
