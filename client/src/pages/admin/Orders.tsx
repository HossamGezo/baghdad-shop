// --- Libraries
import { useEffect } from "react";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/cn";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchAllOrders } from "@features/orders/ordersSlice";

// --- Local Components
import ErrorHandler from "@components/error-handler/ErrorHandler";
import SelectStatus from "@pages/admin/SelectStatus";
import OrderImages from "@pages/admin/OrderImages";

// --- Main Component
const Orders = () => {
  const { loading, orders, error } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <div className="bg-white p-5 rounded-md text-primary text-xl shadow-sm shadow-primary/20 mb-5 shrink-0">
        <h1 className="text-xl font-bold text-primary font-jetbrains">Orders Management</h1>
        <p className="text-sm text-gray-500">Manage and track customer orders ({orders.length})</p>
      </div>

      <section className="flex-1 bg-white rounded-md shadow-sm overflow-hidden flex flex-col min-h-125">
        {error ? (
          <div className="flex-1 flex items-center justify-center p-5">
            <ErrorHandler error={error} />
          </div>
        ) : (
          <div
            className={cn(
              "overflow-auto custom-scrollbar flex-1 transition-opacity duration-300",
              loading ? "opacity-50" : "opacity-100",
            )}
          >
            <table className="w-full min-w-max relative border-separate border-spacing-0">
              <thead>
                <tr className="sticky top-0 z-10 bg-[#EFF2F3] shadow-sm text-neutral-700 *:whitespace-nowrap *:text-center *:text-[10px] *:px-3 *:py-2.5 *:flex-1 *:not-last:border-r *:border-r-warning">
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
                    className="even:bg-[#EFF2F3]/75 hover:bg-gray-500/10 transition-colors duration-200 *:whitespace-nowrap *:px-3 *:py-2.5 *:text-center *:text-[12px] *:select-none"
                  >
                    <td>
                      <OrderImages orderItems={order.orderItems} />
                    </td>
                    <td title={order._id} className="font-mono uppercase text-[10px]">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
                    <td
                      className="max-w-50 truncate"
                      title={`${order.shippingAddress.street}, ${order.shippingAddress.area}, ${order.shippingAddress.city}`}
                    >{`${order.shippingAddress.city}, ${order.shippingAddress.area}`}</td>
                    <td className="font-bold">{order.orderItems.length}</td>
                    <td className="font-bold text-primary">{formatCurrency(order.totalPrice)}</td>
                    <td>
                      <SelectStatus id={order._id} status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;
