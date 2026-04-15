export const ALL_CATEGORIES = [
  "laptops",
  "mobiles",
  "specialOffers",
  "appliances",
  "cookware",
  "clothing",
  "shoes",
  "dresses",
  "handbags",
  "supermarket",
  "automotive",
] as const;

export type CategoryName = (typeof ALL_CATEGORIES)[number];
