// --- Libraries
import { useEffect } from "react";

// --- Utils
import { getStatusStyles } from "@utils/helpers/statusColor";
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/cn";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchAllOrders } from "@features/orders/ordersSlice";

// --- Local Components
import ErrorHandler from "@components/error-handler/ErrorHandler";

// --- Main Component
const Orders = () => {
  const { loading, orders, error } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (orders.length === 0) dispatch(fetchAllOrders());
  }, [dispatch, orders.length]);

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
                    key={order.id}
                    className="even:bg-[#EFF2F3]/75 hover:bg-gray-500/10 transition-colors duration-200 *:whitespace-nowrap *:px-3 *:py-2.5 *:text-center *:text-[12px] *:select-none"
                  >
                    <td>
                      <div className="bg-white p-1 rounded border border-gray-100 w-12 h-12 mx-auto">
                        <img
                          src={order.orderItems[0].firstImage}
                          alt={order.orderItems[0].title}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="font-bold">{order.id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
                    <td
                      className="max-w-50 truncate"
                      title={`${order.shippingAddress.street}, ${order.shippingAddress.area}, ${order.shippingAddress.city}`}
                    >{`${order.shippingAddress.city}, ${order.shippingAddress.area}`}</td>
                    <td className="font-bold">{order.orderItems.length}</td>
                    <td className="font-bold text-primary">{formatCurrency(order.totalPrice)}</td>
                    <td>
                      <span
                        className={cn(
                          "mx-auto flex items-center justify-center shadow-md rounded-[5px] h-7.5 w-20 text-[10px] font-bold border uppercase",
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
      </section>
    </div>
  );
};

export default Orders;
