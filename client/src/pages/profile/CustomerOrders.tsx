// --- Libraries
import { useEffect } from "react";

// --- Local Components
import EmptyState from "@components/empty-state/EmptyState";
import OrderImages from "@pages/admin/OrderImages";

// --- RTK
import { fetchUserOrders } from "@features/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@app/hooks";

// --- Utils
import { getStatusStyles } from "@utils/helpers/statusColor";
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/cn";

// --- Main Component
const CustomerOrders = () => {
  // --- RTK
  const { orders, loading } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  // --- Fetch Orders
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  // --- Return JSx
  return (
    <div>
      <h1 className="border-b p-5 border-body text-xl text-[#333] font-jetbrains font-bold">Orders</h1>

      {orders.length === 0 && !loading ? (
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
                  key={order._id}
                  className="even:bg-[#EFF2F3]/75 *:whitespace-nowrap *:px-1.5 *:py-2.5 *:text-center *:text-[11px] *:select-none"
                >
                  <td>
                    <OrderImages orderItems={order.orderItems} />
                  </td>
                  <td title={order._id} className="cursor-help font-mono uppercase text-[10px]">
                    {order._id.substring(0, 8)}...
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
                  <td
                    className="max-w-50 truncate"
                    title={`${order.shippingAddress.street}, ${order.shippingAddress.area}, ${order.shippingAddress.city}`}
                  >
                    {`${order.shippingAddress.city}, ${order.shippingAddress.area}`}
                  </td>
                  <td>{order.orderItems.length}</td>
                  <td>{formatCurrency(order.totalPrice)}</td>
                  <td>
                    <span
                      className={cn(
                        "mx-auto flex items-center justify-center rounded-[5px] h-7.5 w-18 text-[10px] font-bold uppercase",
                        getStatusStyles(order.status),
                      )}
                    >
                      {order.status}
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
