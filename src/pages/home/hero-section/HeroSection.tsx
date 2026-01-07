// --- React Icons
import {IoSettingsSharp} from "react-icons/io5";
import {GiTakeMyMoney} from "react-icons/gi";
import {useEffect, useRef, useState} from "react";

// --- Offers Images
const offerImages = [
  {url: "./images/banners/offer1.png", direction: "object-left"},
  {url: "./images/banners/offer2.png", direction: "object-right"},
  {url: "./images/banners/offer3.png", direction: "object-right"},
  {url: "./images/banners/offer4.png", direction: "object-center"},
  {url: "./images/banners/offer5.png", direction: "object-right"},
];
// --- Essentials Images
const essentialImages = [
  {url: "./images/essentials/essential01.png", title: "Up To 70%"},
  {url: "./images/essentials/essential02.gif", title: "Dont Miss Out.."},
  {url: "./images/essentials/essential03.png", title: "Fashion"},
  {url: "./images/essentials/essential04.png", title: "Phones & Accessories"},
  {url: "./images/essentials/essential05.png", title: "Beauty"},
  {url: "./images/essentials/essential06.png", title: "Supermarket"},
  {url: "./images/essentials/essential07.png", title: "Automotive"},
  {url: "./images/essentials/essential08.png", title: "Home & Furniture"},
  {url: "./images/essentials/essential09.gif", title: "Laptops"},
  {url: "./images/essentials/essential10.png", title: "Footwear"},
  {url: "./images/essentials/essential11.png", title: "Appliances"},
  {url: "./images/essentials/essential12.png", title: "Televisions"},
];
// --- HeroSection (Main Component)
const HeroSection = () => {
  // --- Auto Carousel Animation Logic
  const timeoutRef = useRef<number | undefined>(undefined);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev === offerImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);
  // --- Return JSX
  return (
    <div className="hero-section mt-5">
      {/* Hero Section Offers */}
      <section className="hero-section-offers h-55 sm:h-62.5 md:h-85 lg:h-100 xl:h-110 grid grid-cols-12 gap-5 mb-10">
        {/* -- Offer Images */}
        <div className="offer-images col-span-12 xl:col-span-8 rounded-md overflow-hidden shadow-secondary relative">
          {offerImages.map((offer, i) => (
            <img
              src={offer.url}
              alt="OFFER"
              key={i}
              className={`w-full h-full absolute object-cover ${
                offer.direction
              } transition-opacity duration-1000 ease-in-out ${
                index === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* -- Baghdad Sellers */}
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
                <h3 className="text-[16px] font-medium text-[#333]">
                  Warranty
                </h3>
                <span className="text-[14px] text-[#333]/75">
                  on All Purchases
                </span>
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
      </section>
      {/* Hero Section Essentials */}
      <section className="hero-section-essentials">
        <h2 className="essentials-head w-fit mx-auto mb-7 bg-warning py-1.5 px-5 rounded-sm text-sm sm:text-lg md:text-xl lg:text-2xl select-none font-bold lg:font-medium font-jetbrains">
          All Your Essentials in One Place
        </h2>
        <ul className="essential-list grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {essentialImages.map((essential, i) => (
            <li
              key={i}
              className="essential-list-item flex flex-col items-center justify-center gap-2.5 bg-body hover:scale-[1.01] hover:shadow-primary transition-[transform,box-shadow] duration-300 cursor-pointer rounded-sm p-1"
            >
              <img
                src={essential.url}
                alt="Essential"
                draggable="false"
                className="max-md:w-35"
              />
              <span className="essential-item-title text-[13px] sm:text-[14px] font-medium sm:font-normal">
                {essential.title}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default HeroSection;
