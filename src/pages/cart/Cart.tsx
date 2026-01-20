// --- Local Components
import type {ProductProps} from "../../utils/types";
import CartEmpty from "./components/CartEmpty";
import CartProduct from "./components/CartProduct";
import CartSummary from "./components/CartSummary";

// const cart: ProductProps[] = [];

const cart: ProductProps[] = [
  {
    id: 1,
    title: "HP EliteBook 2nd Gen",
    firstImage: "/images/products/laptops/l1.jpg",
    secondImage: "/images/products/laptops/l1.jpg",
    images: ["/images/products/laptops/l1.jpg"],
    price: 750,
    discount: 0,
    rating: 4.5,
    reviews: "900",
    category: "laptops",
    description:
      "A reliable business laptop featuring a sleek design, solid performance, and long battery life—perfect for professionals and everyday productivity.",
  },
  {
    id: 2,
    title: "Acer Nitro 515-5 Laptop",
    firstImage: "/images/products/laptops/l2.jpg",
    secondImage: "/images/products/laptops/l2.jpg",
    images: ["/images/products/laptops/l2.jpg"],
    price: 600,
    discount: 0,
    rating: 3.8,
    reviews: "250",
    category: "laptops",
    description:
      "A powerful gaming laptop built with high-performance hardware to handle demanding games and multitasking with ease.",
  },
  {
    id: 3,
    title: "Huawei MateBook 14 Laptop",
    firstImage: "/images/products/laptops/l3.jpg",
    secondImage: "/images/products/laptops/l3.jpg",
    images: ["/images/products/laptops/l3.jpg"],
    price: 800,
    discount: 0,
    rating: 4.6,
    reviews: "1,200",
    category: "laptops",
    description:
      "A premium laptop with a stunning display, fast performance, and a lightweight design—ideal for work, study, and creativity.",
  },
  {
    id: 1,
    title: "Apple iPhone 13",
    firstImage: "/images/products/mobiles/m1.jpg",
    secondImage: "/images/products/mobiles/m1.jpg",
    images: ["/images/products/mobiles/m1.jpg"],
    price: 800,
    discount: 0,
    rating: 4.9,
    reviews: "8,240",
    category: "mobiles",
    description:
      "A flagship smartphone with a powerful processor, stunning camera quality, and a sleek premium design.",
  },
  {
    id: 2,
    title: "Samsung Galaxy M33 Smartphone",
    firstImage: "/images/products/mobiles/m2.jpg",
    secondImage: "/images/products/mobiles/m2.jpg",
    images: ["/images/products/mobiles/m2.jpg"],
    price: 350,
    discount: 0,
    rating: 4.5,
    reviews: "9,014",
    category: "mobiles",
    description:
      "A reliable smartphone offering long battery life, smooth performance, and excellent value for everyday use.",
  },
  {
    id: 3,
    title: "Samsung Galaxy M32 Dual SIM",
    firstImage: "/images/products/mobiles/m3.jpg",
    secondImage: "/images/products/mobiles/m3.jpg",
    images: ["/images/products/mobiles/m3.jpg"],
    price: 200,
    discount: 0,
    rating: 3.5,
    reviews: "7,784",
    category: "mobiles",
    description:
      "A budget-friendly dual SIM smartphone with a vibrant display and dependable performance.",
  },
  {
    id: 100,
    title: "Pioneer DJ Headphones",
    firstImage: "/images/products/special-offers/s1.jpg",
    secondImage: "/images/products/special-offers/s2.jpg",
    images: [
      "/images/products/special-offers/s1.jpg",
      "/images/products/special-offers/s2.jpg",
      "/images/products/special-offers/s3.jpg",
      "/images/products/special-offers/s4.jpg",
    ],
    price: 50,
    discount: 30,
    rating: 4.1,
    reviews: "4,521",
    category: "special-offers",
    description:
      "Pioneer DJ Headphones are designed to deliver powerful, clear sound with deep bass, making them ideal for DJs and music lovers. They feature a comfortable over-ear design for long listening sessions and are now available with a 30% discount for a limited time.",
  },
  {
    id: 101,
    title: "Hoco In-Ear Earphones",
    firstImage: "/images/products/special-offers/s3.jpg",
    secondImage: "/images/products/special-offers/s4.jpg",
    images: [
      "/images/products/special-offers/s3.jpg",
      "/images/products/special-offers/s4.jpg",
      "/images/products/special-offers/s1.jpg",
      "/images/products/special-offers/s2.jpg",
    ],
    price: 40,
    discount: 20,
    rating: 4.1,
    reviews: "1,870",
    category: "special-offers",
    description:
      "Hoco In-Ear Earphones provide clear sound with balanced audio and enhanced bass. Their lightweight, ergonomic design makes them perfect for daily use, and they are currently offered with a 20% discount for great value.",
  },
  {
    id: 102,
    title: "Samsung Tablet",
    firstImage: "/images/products/special-offers/s5.jpg",
    secondImage: "/images/products/special-offers/s6.jpg",
    images: [
      "/images/products/special-offers/s5.jpg",
      "/images/products/special-offers/s6.jpg",
    ],
    price: 200,
    discount: 40,
    rating: 4.5,
    reviews: "584",
    category: "special-offers",
    description:
      "Samsung Tablet is a versatile device for entertainment, studying, and everyday productivity. It offers a clear display, smooth performance, and long battery life, and is now available with a 40% discount for a limited-time offer.",
  },
];

// --- Cart (Main Component)
const Cart = () => {
  if (cart.length === 0) {
    return <CartEmpty />;
  }
  return (
    <div className="cart-page-content my-5 grid grid-cols-5 xl:grid-cols-4 gap-5">
      {/* Cart Products */}
      <div className="cart-products max-md:order-last col-span-5 md:col-span-3 xl:col-span-3 bg-white rounded-md">
        <h3 className="cart-products-head p-3 text-2xl border-b-2 border-b-body text-[#333]">
          Cart (9)
        </h3>
        <div className="cart-products-wrapper">
          {cart.map((product, index) => (
            <CartProduct {...product} key={index} />
          ))}
        </div>
      </div>
      {/* Cart Summary */}
      <CartSummary />
    </div>
  );
};

export default Cart;
