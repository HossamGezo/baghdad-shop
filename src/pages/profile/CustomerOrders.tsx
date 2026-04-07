// --- Local Components
import EmptyState from "@components/empty-state/EmptyState";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";

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
    description:
      "A large-screen laptop offering comfortable viewing, solid performance, and everyday reliability for home and office use.",
  },
];

// --- Main Component
const CustomerOrders = () => {
  // --- Return JSx
  return (
    <div>
      <h1 className="border-b p-5 border-body text-xl text-[#333] font-jetbrains font-bold">Orders</h1>
      {orders.length === 0 ? (
        <EmptyState
          title={"You have placed no orders yet!"}
          desc={"All your orders will be saved here for you to access their state anytime."}
        />
      ) : (
        <div className="p-2.5 overflow-x-scroll custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="bg-[#EFF2F3] text-neutral-700 *:whitespace-nowrap *:text-center *:text-[10px] *:px-3 *:py-2.5 *:flex-1 *:select-none *:not-last:border-r *:border-r-warning">
                <th>IMAGE</th>
                <th>ORDER ID</th>
                <th>CREATED</th>
                <th>SHIPPING ADDRESS</th>
                <th>ITEMS</th>
                <th>PRICE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="even:bg-[#EFF2F3]/75 *:whitespace-nowrap *:px-1.5 *:py-2.5 *:text-center *:text-[11px] *:select-none"
                >
                  <td>
                    <img
                      src={order.firstImage}
                      alt={order.title}
                      loading="lazy"
                      className="w-10 h-10 object-contain mx-auto"
                    />
                  </td>
                  <td>#679769813bcea508e09858d5</td>
                  <td>27/01/2025 16:39:53</td>
                  <td>Cairo, Egypt</td>
                  <td>1</td>
                  <td>{formatCurrency(order.price)}</td>
                  <td>
                    <span className="mx-auto flex items-center justify-center bg-green-300 text-green-900 rounded-[5px] h-7.5 w-15">
                      paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
