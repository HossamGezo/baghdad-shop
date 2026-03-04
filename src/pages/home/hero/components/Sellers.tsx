// --- React Icons
import { IoSettingsSharp } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";

// --- Main Component
const Sellers = () => {
  return (
    <div className="hidden xl:grid col-span-4 select-none">
      {/* --- Seller Promotion */}
      <div className="bg-white/10 p-2.5 flex flex-col gap-2 rounded-md shadow-deep">
        <div className="flex items-center gap-3.5 border-b border-amber-400 pb-1.5 px-3">
          <img
            src="/logo.svg"
            alt="Logo"
            loading="lazy"
            draggable="false"
            className="w-8.75 object-contain"
          />
          <div>
            <h3 className="text-[16px] font-medium text-neutral-700">
              Join Baghdad Shop
            </h3>
            <span className="text-[14px] text-neutral-700/75">
              Become a Sales Partner
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 border-b border-amber-400 pb-1.5 px-3">
          <GiTakeMyMoney className="text-[35px] text-green-500" />
          <div>
            <h3 className="text-[16px] font-medium text-neutral-700">
              Sell Your Products
            </h3>
            <span className="text-[14px] text-neutral-700/75">
              And Grow Your Business
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3.5 pb-1.5 px-3">
          <IoSettingsSharp className="text-[35px] text-gray-400" />
          <div>
            <h3 className="text-[16px] font-medium text-neutral-700">
              Warranty
            </h3>
            <span className="text-[14px] text-neutral-700/75">
              on All Purchases
            </span>
          </div>
        </div>
      </div>
      {/* --- Seller Christmas Gif */}
      <div className="mt-5 rounded-md overflow-hidden h-55 shadow-deep">
        <img
          src="/images/gifs/christmas.gif"
          alt="Christmas"
          loading="lazy"
          draggable="false"
          className="w-full h-full object-cover object-top-right"
        />
      </div>
    </div>
  );
};

export default Sellers;
