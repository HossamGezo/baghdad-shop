// --- Utils
import { cn } from "@utils/cn";
import { getStatusStyles } from "@utils/helpers/statusColor";

// --- RTK
import { useAppDispatch } from "@app/hooks";
import { updateOrderStatus } from "@features/orders/ordersSlice";

// --- Types
import type { OrderStatus } from "@/types/types";

// --- Types
type SelectStatusProps = {
  id: string;
  status: OrderStatus;
};

// --- Main Component
const SelectStatus = ({ id, status }: SelectStatusProps) => {
  // --- RTK
  const dispatch = useAppDispatch();

  // --- Handle Status
  const handleStatusChange = (id: string, status: OrderStatus) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  // --- Return JSX
  return (
    <select
      value={status}
      className={cn(
        "shadow-md rounded-[5px] h-7.5 w-24 text-[10px] font-bold border uppercase cursor-pointer outline-none transition-colors px-2.5",
        getStatusStyles(status),
      )}
      onChange={(e) => handleStatusChange(id, e.target.value as OrderStatus)}
    >
      <option value="pending">pending</option>
      <option value="shipped">shipped</option>
      <option value="delivered">delivered</option>
      <option value="cancelled">cancelled</option>
    </select>
  );
};

export default SelectStatus;
