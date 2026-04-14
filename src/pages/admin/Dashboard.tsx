// --- Libraries
import { useEffect, useMemo } from "react";

// --- React Icons
import { FiUsers } from "react-icons/fi";
import { SiSoundcharts } from "react-icons/si";
import { BiBasket } from "react-icons/bi";
import { TbCategory2 } from "react-icons/tb";
import { FaDollarSign } from "react-icons/fa6";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/cn";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchAllOrders } from "@features/orders/ordersSlice";
import { fetchUsers } from "@features/users/usersSlice";

// --- Local Components
import SelectStatus from "@pages/admin/SelectStatus";
import OrderImages from "@pages/admin/OrderImages";

// --- CustomStatsCard
type CustomStatsCardProps = React.ComponentProps<"div"> & {
  firstIcon: React.ReactNode;
  secondIcon: React.ReactNode;
  title: string;
  stats: number;
  price?: boolean;
  color: string;
};
const CustomStatsCard = ({
  firstIcon,
  secondIcon,
  title,
  stats,
  price = false,
  color,
  className,
  ...rest
}: CustomStatsCardProps) => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${color}, ${color}80)`,
      }}
      className={cn(
        `relative col-span-4 lg:col-span-2 xxl:col-span-1 px-10 xxl:px-7 py-7.5 h-25 rounded-md flex items-center justify-start gap-10 shadow-lg`,
        className,
      )}
      {...rest}
    >
      <div className="text-white/50">{firstIcon}</div>
      <div className="mx-auto flex flex-col items-center justify-center w-50 font-jetbrains">
        <span className="text-white/75 tracking-wider font-bold">{title}</span>
        <span className="text-[22px] xxl:text-[20px] font-semibold flex items-center justify-center">
          {price ? formatCurrency(stats) : stats.toLocaleString()}
        </span>
      </div>
      <div className="absolute top-2.5 right-2.5 text-white/45">{secondIcon}</div>
    </div>
  );
};

// --- Main Component
const Dashboard = () => {
  // --- RTK
  const { users } = useAppSelector((state) => state.users);
  const { orders } = useAppSelector((state) => state.orders);
  const productsState = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  // --- Fetch Recent Orders
  useEffect(() => {
    if (orders.length == 0) dispatch(fetchAllOrders());
    if (users.length == 0) dispatch(fetchUsers());
  }, [dispatch, orders.length, users.length]);

  // --- Statistics
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const categoriesCount = useMemo(() => {
    return Object.keys(productsState).filter((key) => key !== "loading" && key !== "error" && key !== "singleProduct")
      .length;
  }, [productsState]);

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      {/* --- Header --- */}
      <div className="bg-white p-5 rounded-md shadow-sm mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary font-jetbrains">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Real-time analytics and store performance at a glance</p>
        </div>
      </div>

      {/* ---- Statistics ---- */}
      <div className="grid grid-cols-4 gap-5 xxl:gap-2.5 text-white">
        <CustomStatsCard
          firstIcon={<FaDollarSign size={30} />}
          secondIcon={<SiSoundcharts size={30} />}
          title={"Total Revenue"}
          stats={totalRevenue}
          price={true}
          color="#3071FB"
        />

        <CustomStatsCard
          firstIcon={<FiUsers size={30} />}
          secondIcon={<SiSoundcharts size={30} />}
          title={"Active Users"}
          stats={users.length}
          color="#00A47D"
        />

        <CustomStatsCard
          firstIcon={<BiBasket size={30} />}
          secondIcon={<SiSoundcharts size={30} />}
          title={"Total Orders"}
          stats={totalOrdersCount}
          color="#4A50E7"
        />

        <CustomStatsCard
          firstIcon={<TbCategory2 size={30} />}
          secondIcon={<SiSoundcharts size={30} />}
          title={"Total Categories"}
          stats={categoriesCount}
          color="#FF425D"
        />
      </div>
      <h3 className="my-5 text-xl font-jetbrains bg-white p-2.5 w-fit rounded-md shadow-sm">Recent Orders</h3>

      {/* --- Table --- */}
      <div className="flex-1 bg-white rounded-md shadow-sm flex flex-col">
        <div className="overflow-auto custom-scrollbar flex-1">
          <table className="w-full min-w-max relative border-separate border-spacing-0">
            <thead>
              <tr className="sticky top-0 z-10 bg-[#EFF2F3] shadow-sm text-neutral-700 *:whitespace-nowrap *:text-center *:text-[10px] *:px-3 *:py-2.5 *:flex-1 *:select-none *:not-last:border-r *:border-r-warning">
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
              {orders
                .toReversed()
                .slice(0, 7)
                .map((order) => (
                  <tr
                    key={order.id}
                    className="even:bg-[#EFF2F3]/75 hover:bg-gray-500/10 transition-colors duration-200 *:whitespace-nowrap *:px-3 *:py-2.5 *:text-center *:text-[12px] *:select-none"
                  >
                    <td>
                      <OrderImages orderItems={order.orderItems} />
                    </td>
                    <td>{order.id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
                    <td
                      className="max-w-50 truncate"
                      title={`${order.shippingAddress.street}, ${order.shippingAddress.area}, ${order.shippingAddress.city}`}
                    >{`${order.shippingAddress.city}, ${order.shippingAddress.area}`}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{formatCurrency(order.totalPrice)}</td>
                    <td>
                      <SelectStatus id={order.id} status={order.status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
