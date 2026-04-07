export const calculateDiscount = (price: number, discount: number = 0): number => {
  return price - (discount / 100) * price;
};
