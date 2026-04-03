// --- Libraries
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router";

// --- React Icons
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

// --- Utils
import { formatCurrency } from "@utils/formatCurrency";
import { cn } from "@utils/cn";

// --- Custom Hooks & Actions
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchProductsByCategory } from "@features/products/productsSlice";

// --- Local Components
import CustomButton from "@components/custom-button/CustomButton";
import Modal from "@components/modal/Modal";

// --- Types
import type { CategoriesType, ProductType } from "@/types/types";

// --- Main Component
const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const state = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  // --- Logic: Dispatch all empty categories
  useEffect(() => {
    const categories: CategoriesType[] = [
      "laptops",
      "mobiles",
      "specialOffers",
      "appliances",
      "cookware",
      "clothing",
      "shoes",
      "dresses",
      "handbags",
    ];

    categories.forEach((cat) => {
      const currentCategory = state[cat];

      if (currentCategory.length === 0) {
        dispatch(fetchProductsByCategory(cat));
      }
    });
  }, [state, dispatch]);

  const allProducts = useMemo(() => {
    return [
      ...state.laptops,
      ...state.mobiles,
      ...state.specialOffers,
      ...state.appliances,
      ...state.cookware,
      ...state.clothing,
      ...state.shoes,
      ...state.dresses,
      ...state.handbags,
    ];
  }, [
    state.laptops,
    state.mobiles,
    state.specialOffers,
    state.appliances,
    state.cookware,
    state.clothing,
    state.shoes,
    state.dresses,
    state.handbags,
  ]);

  // --- Logic: Filtering
  const filteredProducts = useMemo(() => {
    return allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allProducts, searchTerm]);

  // --- Handle Modal
  const [isOpen, setIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(
    null,
  );

  const onConfirm = () => {
    if (productToDelete) {
      console.log(`" ${productToDelete.title} " Has been deleted successfully`);
    }

    // Delete Logic

    setProductToDelete(null);
  };

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      {/* --- Header --- */}
      <div className="bg-white p-5 rounded-md shadow-sm mb-5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary font-jetbrains">
            Inventory Management
          </h1>
          <p className="text-sm text-gray-500">
            Total Products in store: ({filteredProducts.length})
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 w-full xl:w-auto">
          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or category..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-[border-color,box-shadow] duration-500 ease-in-out"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          {/* Add Product Button */}
          <CustomButton
            type="button"
            className="text-primary px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2"
            onClick={() => navigate("/admin/add-product")}
          >
            <FiPlus /> Add Product
          </CustomButton>
        </div>
      </div>

      {/* --- Table --- */}
      <div className="flex-1 bg-white rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table
            className={cn(
              "w-full min-w-max relative border-separate border-spacing-0",
              filteredProducts.length === 0 && "h-full",
            )}
          >
            <thead>
              <tr className="sticky top-0 z-10 bg-[#EFF2F3] shadow-sm text-neutral-700 *:whitespace-nowrap *:text-center *:text-[10px] *:px-3 *:py-2.5 *:flex-1 *:select-none *:not-last:border-r *:border-r-warning">
                <th>IMAGE</th>
                <th>PRODUCT NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>RATING</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="even:bg-[#EFF2F3]/75 hover:bg-gray-500/10 transition-colors duration-200 *:whitespace-nowrap *:px-3 *:py-2.5 *:text-center *:text-[12px] *:select-none"
                  >
                    {/* Image */}
                    <td>
                      <div className="bg-white p-1 rounded border border-gray-100 w-12 h-12 mx-auto">
                        <img
                          src={product.firstImage}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="w-25">
                      <p
                        className="font-semibold text-primary text-[13px] line-clamp-1"
                        title={product.title}
                      >
                        {product.title}
                      </p>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] border border-gray-200 uppercase">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="font-bold text-primary">
                      {formatCurrency(product.price)}
                    </td>

                    {/* Rating */}
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span>{product.rating}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-center gap-4">
                        <Link
                          to={`/admin/products/edit/${product.category}/${product.id}`}
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded"
                          title="Edit Product"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded cursor-pointer"
                          title="Delete Product"
                          onClick={() => {
                            setIsOpen(true);
                            setProductToDelete(product);
                          }}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-500/75 tracking-wide font-jetbrains text-xl select-none"
                  >
                    No products found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} onConfirm={onConfirm} />}
    </div>
  );
};

export default ProductsList;
