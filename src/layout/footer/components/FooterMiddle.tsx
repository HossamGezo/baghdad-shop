// --- Local Component
import FooterLinks from "./FooterLinks";

// ------ Producsts Link Arraies
const electronics = [
  "Cameras & Video Recording",
  "Home Appliances",
  "Phones",
  "Headphones",
  "Televisions",
  "Tablets",
];

const fashion = [
  "Men’s Fashion",
  "Women’s Fashion",
  "Kids’ Fashion",
  "Glasses",
  "Jewelry",
  "Watches",
];

const homeAndKitchen = [
  "Home Décor",
  "Furniture",
  "Kitchen & Dining Tools",
  "Bathroom Accessories",
  "Audio & Video Devices",
  "Garden Supplies",
];

const beauty = [
  "Perfumes",
  "Makeup",
  "Hair Care",
  "Skincare",
  "Body & Bath",
  "Garden Supplies",
  "Health Care Products",
];

// --- MiddleFooter (Main Component)
const MiddleFooter = () => {
  return (
    <div className="middle-footer bg-primary/80 text-white">
      <div className="footer-desc custom-container py-5 grid grid-cols-1 sm:grid-cols-2 gap-5 xxl:grid-cols-4">
        {/* Electronics */}
        <FooterLinks title={"Electronics"} productsLink={electronics} />

        {/* Fashion */}
        <FooterLinks title={"Fashion"} productsLink={fashion} />

        {/* Home & Kitchen */}
        <FooterLinks title={"Home & Kitchen"} productsLink={homeAndKitchen} />

        {/* Beauty */}
        <FooterLinks title={"Beauty"} productsLink={beauty} />
      </div>
    </div>
  );
};

export default MiddleFooter;
