export const formatCurrency = (value: number | string | undefined | null, currency: string = "EGP") => {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: currency,
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
