// --- React Icons
import {IoSettingsSharp} from "react-icons/io5";
import {GiTakeMyMoney} from "react-icons/gi";

// --- Sellers (Main Component)
const Sellers = () => {
  return (
    <div className="baghdad-sellers hidden xl:grid col-span-4 select-none">
      {/* --- Seller Promotion */}
      <div className="seller-promotion bg-white/10 p-2.5 flex flex-col gap-2 rounded-md shadow-secondary">
        <div className="seller-partner flex items-center gap-3.5 border-b border-amber-400 pb-1.5 px-3">
          <img
            src="/logo.svg"
            alt="LOGO"
            draggable="false"
            className="w-8.75 object-contain"
          />
          <div className="seller-partner-desc">
            <h3 className="text-[16px] font-medium text-[#333]">
              Join Baghdad Shop
            </h3>
            <span className="text-[14px] text-[#333]/75">
              Become a Sales Partner
            </span>
          </div>
        </div>
        <div className="seller-business flex items-center gap-3.5 border-b border-amber-400 pb-1.5 px-3">
          <GiTakeMyMoney className="text-[35px] text-green-500" />
          <div className="seller-business-desc">
            <h3 className="text-[16px] font-medium text-[#333]">
              Sell Your Products
            </h3>
            <span className="text-[14px] text-[#333]/75">
              And Grow Your Business
            </span>
          </div>
        </div>
        <div className="seller-purchases flex items-center gap-3.5 pb-1.5 px-3">
          <IoSettingsSharp className="text-[35px] text-gray-400" />
          <div className="seller-purchases-desc">
            <h3 className="text-[16px] font-medium text-[#333]">Warranty</h3>
            <span className="text-[14px] text-[#333]/75">on All Purchases</span>
          </div>
        </div>
      </div>
      {/* --- Seller Christmas Gif */}
      <div className="seller-christmas-gif mt-5 rounded-md overflow-hidden h-55 shadow-secondary">
        <img
          src="/images/gifs/christmas.gif"
          alt="CHRISTMAS"
          draggable="false"
          className="w-full h-full object-cover object-top-right"
        />
      </div>
    </div>
  );
};

export default Sellers;
