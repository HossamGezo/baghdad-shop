export const categoryConfigs = {
  electronics: {
    title: "Electronics Section",
    poster: "/images/posters/electronics-poster.png",
    subCategories: [
      { id: "all-products", label: "All Products" },
      { id: "laptops", label: "Laptops" },
      { id: "mobiles", label: "Mobiles" },
    ],
  },
  kitchen: {
    title: "Kitchen & Dining",
    poster: "/images/posters/kitchen-poster.png",
    subCategories: [
      { id: "all-products", label: "All Kitchen" },
      { id: "appliances", label: "Appliances" },
      { id: "cookware", label: "Cookware" },
    ],
  },
  men: {
    title: "Men's Fashion",
    poster: "/images/posters/men-poster.png",
    subCategories: [
      { id: "all-products", label: "All Men's" },
      { id: "clothing", label: "Clothing" },
      { id: "shoes", label: "Shoes" },
    ],
  },
  women: {
    title: "Women's Collection",
    poster: "/images/posters/women-poster.png",
    subCategories: [
      { id: "all-products", label: "All Women's" },
      { id: "dresses", label: "Dresses" },
      { id: "handbags", label: "Handbags" },
    ],
  },
};

export type CategoryConfigType = typeof categoryConfigs;
