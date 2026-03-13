// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import RatingAndViews from "~/@/src/components/card/components/rating-and-reviews/RatingAndReviews";

// --- Mock Data
const orders = [
  {
    id: "1",
    title: "HP EliteBook 2nd Gen",
    firstImage: "/images/products/laptops/l1.jpg",
    secondImage: "/images/products/laptops/l1.jpg",
    images: ["/images/products/laptops/l1.jpg"],
    price: 750,
    discount: 0,
    rating: 4.5,
    reviews: 900,
    category: "laptops",
    count: 3,
    description:
      "A reliable business laptop featuring a sleek design, solid performance, and long battery life—perfect for professionals and everyday productivity.",
  },
  {
    id: "2",
    title: "Acer Nitro 515-5 Laptop",
    firstImage: "/images/products/laptops/l2.jpg",
    secondImage: "/images/products/laptops/l2.jpg",
    images: ["/images/products/laptops/l2.jpg"],
    price: 600,
    discount: 0,
    rating: 3.8,
    reviews: 250,
    category: "laptops",
    count: 2,
    description:
      "A powerful gaming laptop built with high-performance hardware to handle demanding games and multitasking with ease.",
  },
  {
    id: "3",
    title: "Huawei MateBook 14 Laptop",
    firstImage: "/images/products/laptops/l3.jpg",
    secondImage: "/images/products/laptops/l3.jpg",
    images: ["/images/products/laptops/l3.jpg"],
    price: 800,
    discount: 0,
    rating: 4.6,
    reviews: 1200,
    category: "laptops",
    count: 1,
    description:
      "A premium laptop with a stunning display, fast performance, and a lightweight design—ideal for work, study, and creativity.",
  },
  {
    id: "4",
    title: "Asus Gaming Laptop 571GT",
    firstImage: "/images/products/laptops/l4.jpg",
    secondImage: "/images/products/laptops/l4.jpg",
    images: ["/images/products/laptops/l4.jpg"],
    price: 950,
    discount: 0,
    rating: 4.1,
    reviews: 7548,
    category: "laptops",
    count: 2,
    description:
      "A gaming-focused laptop delivering smooth graphics, fast processing, and immersive gameplay for serious gamers.",
  },
  {
    id: "5",
    title: "Asus TUF 15 Laptop",
    firstImage: "/images/products/laptops/l1.jpg",
    secondImage: "/images/products/laptops/l1.jpg",
    images: ["/images/products/laptops/l1.jpg"],
    price: 700,
    discount: 0,
    rating: 4.5,
    reviews: 2200,
    category: "laptops",
    count: 1,
    description:
      "Built for durability and performance, this laptop is perfect for gaming and heavy workloads with reliable cooling and power.",
  },
  {
    id: "6",
    title: "Asus F15 Gaming Laptop",
    firstImage: "/images/products/laptops/l6.jpg",
    secondImage: "/images/products/laptops/l6.jpg",
    images: ["/images/products/laptops/l6.jpg"],
    price: 990,
    discount: 0,
    rating: 4.8,
    reviews: 5500,
    category: "laptops",
    count: 2,
    description:
      "A high-end gaming laptop offering top-tier performance, fast refresh rates, and a bold design for competitive players.",
  },
  {
    id: "7",
    title: 'Lenovo IdeaPad Flex 5 14"',
    firstImage: "/images/products/laptops/l7.jpg",
    secondImage: "/images/products/laptops/l7.jpg",
    images: ["/images/products/laptops/l7.jpg"],
    price: 500,
    discount: 0,
    rating: 4.2,
    reviews: 850,
    category: "laptops",
    count: 3,
    description:
      "A versatile 2-in-1 laptop with a flexible touchscreen design, perfect for students, professionals, and everyday use.",
  },
  {
    id: "8",
    title: "Microsoft Surface Go 2 Touchscreen",
    firstImage: "/images/products/laptops/l8.jpg",
    secondImage: "/images/products/laptops/l8.jpg",
    images: ["/images/products/laptops/l8.jpg"],
    price: 850,
    discount: 0,
    rating: 4.7,
    reviews: 8200,
    category: "laptops",
    count: 5,
    description:
      "A compact and portable touchscreen device designed for productivity on the go with a premium Microsoft experience.",
  },
  {
    id: "9",
    title: 'Microsoft Surface Pro 8 13"',
    firstImage: "/images/products/laptops/l8.jpg",
    secondImage: "/images/products/laptops/l8.jpg",
    images: ["/images/products/laptops/l8.jpg"],
    price: 900,
    discount: 0,
    rating: 4.1,
    reviews: 1895,
    category: "laptops",
    count: 2,
    description:
      "A powerful 2-in-1 laptop combining tablet flexibility with laptop performance, ideal for work and creative tasks.",
  },
  {
    id: "10",
    title: "Asus VivoBook 17 Laptop",
    firstImage: "/images/products/laptops/l10.jpg",
    secondImage: "/images/products/laptops/l10.jpg",
    images: ["/images/products/laptops/l10.jpg"],
    price: 680,
    discount: 0,
    rating: 3.5,
    reviews: 8124,
    category: "laptops",
    count: 1,
    description:
      "A large-screen laptop offering comfortable viewing, solid performance, and everyday reliability for home and office use.",
  },
];

// --- Main Component
const OrderSummary = () => {
  // --- Calculations
  const total = orders.reduce((acc, cur) => acc + cur.price * cur.count, 0);
  const fees = total - (99 / 100) * total;
  const totalPrice = total + fees;

  // --- Return JSX
  return (
    <div className="text-neutral-800 py-2.5 bg-white shadow-md rounded-md">
      <h2 className="relative w-fit px-2.5 text-primary/60 text-2xl font-jetbrains select-none mb-5 before:-bottom-1 before:absolute before:w-full before:h-0.5 before:bg-warning before:rounded-[100%]">
        ORDER SUMMARY
      </h2>
      <div className="p-2.5 *:not-last:border-b *:border-b-primary">
        {/* Orders */}
        <div className="flex flex-col gap-2.5 max-h-[45vh] overflow-y-auto custom-scrollbar pb-2.5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-5 text-[14px] odd:bg-primary/5 even:bg-neutral-400/25 p-2.5 rounded-md"
            >
              <div>
                <img
                  src={order.firstImage}
                  alt={order.title}
                  className="w-20 h-20 object-contain rounded-[5px]"
                />
                <span className="font-semibold">{order.count} X</span>
              </div>
              <div className="flex flex-col">
                <p className="mb-1.5 line-clamp-2">{order.description}</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{formatCurrency(order.price)}</p>
                  <RatingAndViews
                    rating={order.rating}
                    reviews={order.reviews}
                    className="mt-0 w-4/10 text-[12px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div className="pl-5 py-5 flex flex-col gap-2.5">
          <div className="flex items-center">
            <span className="font-semibold mr-2.5 w-30 bg-neutral-400/15 p-1.5 rounded-sm">
              Sub Total
            </span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2.5 w-30 bg-neutral-400/15 p-1.5 rounded-sm">
              Delivery Fee
            </span>
            <span>{formatCurrency(fees)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="pl-5 py-5 flex items-center">
          <span className="font-semibold mr-2.5 w-30 bg-neutral-400/15 p-1.5 rounded-sm">
            TOTAL
          </span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
