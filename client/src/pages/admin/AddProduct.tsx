// --- Libraries
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- Components
import InputField from "@components/inputs/InputField";
import CustomButton from "@components/custom-button/CustomButton";
import ErrorHandler from "@components/error-handler/ErrorHandler";

// --- Redux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { addProduct, fetchProductsByCategory, updateProduct } from "@features/products/productsSlice";

// --- Types
import type { CategoriesType, ProductType } from "@/types/types";

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
  "supermarket",
  "automotive",
];

// --- Product Schema
const ProductSchema = z.object({
  title: z.string().trim(),
  image: z.string().trim(),
  price: z.string().trim(),
  discount: z.string().trim(),
  category: z.enum(categories),
  description: z.string().trim(),
});
type ProductSchemaType = z.infer<typeof ProductSchema>;

// --- Main Component
const AddProduct = () => {
  // --- React Router
  const navigate = useNavigate();

  // --- RTK
  const dispatch = useAppDispatch();

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(ProductSchema),
  });

  // --- Get Product Data from URL & Store
  const { category, id } = useParams();

  const products: ProductType[] = useAppSelector((state) =>
    category ? state.products[category as CategoriesType] : [],
  );

  // --- Fetch Product Category Data
  useEffect(() => {
    if (products.length == 0) dispatch(fetchProductsByCategory(category as CategoriesType));
  }, [dispatch, category, products.length]);

  // --- Find Product
  const product: ProductType | undefined = products.find((item) => item.id === id);

  // --- Fill Form With Product Data
  useEffect(() => {
    if (product)
      reset({
        title: product?.title,
        image: product?.firstImage,
        price: String(product?.price),
        discount: String(product?.discount),
        category: product?.category,
        description: product?.description,
      });
  }, [reset, product]);

  // --- OnSubmit Function
  const onSubmit: SubmitHandler<ProductSchemaType> = async (data) => {
    if (product) {
      await dispatch(
        updateProduct({
          id: product.id,
          category: product.category,
          product: data,
        }),
      );
    } else {
      await dispatch(addProduct(data));
    }

    navigate("/admin/products");
  };

  // --- Return JSX
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-xl font-bold text-primary font-jetbrains bg-white p-5 rounded-md shadow-sm mb-5">
        {product ? "Edit Product" : "Add New Product"}
      </h1>
      <div className="bg-white rounded-md shadow-sm h-full p-2.5">
        {id && !product ? (
          <div className="h-full flex items-center justify-center w-3/4 mx-auto">
            <ErrorHandler error={"Product Not Found"} />
          </div>
        ) : (
          <div className="bg-white p-3 rounded-xl mx-auto ">
            <form className="flex flex-col gap-5 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Title */}
                <InputField
                  type="text"
                  name="title"
                  placeholder="Product title"
                  register={register}
                  label="Title"
                  error={errors.title?.message}
                  className="shadow-sm"
                />

                {/* Price */}
                <InputField
                  type="number"
                  name="price"
                  placeholder="Product price"
                  register={register}
                  label="Price"
                  error={errors.price?.message}
                  className="shadow-sm"
                />

                {/* (Change / Upload) Image */}
                <div className="flex flex-col gap-2 lg:col-span-2 xl:col-span-1">
                  <div className="w-full h-12.5 border border-gray-300 flex items-center overflow-hidden rounded-md shadow-sm hover:border-primary hover:ring-1 hover:ring-primary transition-[border-color,box-shadow] duration-500 ease-in-out cursor-pointer">
                    <label
                      htmlFor="image"
                      className="bg-gray-300 h-full w-4/11 text-[12px] flex items-center justify-center font-jetbrains font-semibold cursor-pointer"
                    >
                      {product ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      type="file"
                      {...register("image")}
                      name="image"
                      id="image"
                      className="w-7/11 bg-gray-300/50 h-full px-2.5 py-3.75 text-[13px] cursor-pointer"
                    />
                  </div>
                  {product && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <span className="font-bold">Current:</span>
                      <img src={product.firstImage} alt="Current" className="w-8 h-8 object-contain border rounded" />
                      <span className="truncate w-32">{product.firstImage}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="lg:col-span-2 xl:col-span-3 relative flex flex-col gap-2.5">
                  <label className="absolute bg-white text-primary/50 px-2.5 text-[12px] left-3.5 -top-2">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Product Description"
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary h-32 pt-4"
                  />
                  {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                </div>

                {/* Discount */}
                <div>
                  <InputField
                    type="number"
                    name="discount"
                    placeholder="Product discount"
                    register={register}
                    label="Discount"
                    error={errors.discount?.message}
                    className="shadow-sm"
                  />
                </div>

                {/* Category */}
                <select
                  {...register("category")}
                  name="category"
                  id="category"
                  className="border border-gray-300 h-12.5 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[border-color,box-shadow] duration-500 ease-in-out shadow-sm"
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* (Edit / Add) Button */}
                <CustomButton type="submit" aria-label="Submit form" className="h-12.5 lg:col-span-2 xl:col-span-1">
                  {product ? "Edit" : "Add"}
                </CustomButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
