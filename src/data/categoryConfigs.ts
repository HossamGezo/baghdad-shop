export const categoryConfigs = {
  electronics: {
    title: "Electronics Section",
    poster: "/images/posters/electronics-poster.png",
    subCategories: [
      { id: "all-products", label: "All Products" },
      { id: "mobiles", label: "Mobiles" },
      { id: "laptops", label: "Laptops" },
    ],
  },
  kitchen: {
    title: "Kitchen & Dining",
    poster: "/images/posters/kitchen-poster.png",
    subCategories: [
      { id: "all-products", label: "All Kitchen" },
      { id: "cookware", label: "Cookware" },
      { id: "appliances", label: "Appliances" },
    ],
  },
  men: {
    title: "Men's Fashion",
    poster: "/images/posters/men-poster.png",
    subCategories: [
      { id: "all-products", label: "All Men's" },
      { id: "shoes", label: "Shoes" },
      { id: "clothing", label: "Clothing" },
    ],
  },
  women: {
    title: "Women's Collection",
    poster: "/images/posters/women-poster.png",
    subCategories: [
      { id: "all-products", label: "All Women's" },
      { id: "handbags", label: "Handbags" },
      { id: "dresses", label: "Dresses" },
    ],
  },
  supermarket: {
    subCategories: [{ id: "all-products", label: "All Grocery" }],
  },
  automotive: {
    subCategories: [{ id: "all-products", label: "All Accessories" }],
  },
};

export type CategoryConfigType = typeof categoryConfigs;
