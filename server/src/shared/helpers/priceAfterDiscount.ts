// --- Helper Functions
export const priceAfterDiscountFunc = (price: number, discount: number): number => {
  return Number((price - price * (discount / 100)).toFixed(2));
};
