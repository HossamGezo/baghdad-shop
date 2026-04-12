// --- Helper: Status Colors
export const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-700 border-green-200";
    case "shipped":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "pending":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
