// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

// --- Utils
import api from "@utils/api";

// --- Types
import type { CategoriesType, ProductType } from "@/types/types";

// --- Error Message
const errorMsg = (error: unknown) => {
  const message = error instanceof Error ? error.message : "Something went wrong!";
  return message;
};

// --- ProductsState (Types)
type ProductsState = {
  loading: boolean;
  laptops: ProductType[];
  mobiles: ProductType[];
  specialOffers: ProductType[];
  appliances: ProductType[];
  cookware: ProductType[];
  clothing: ProductType[];
  shoes: ProductType[];
  dresses: ProductType[];
  handbags: ProductType[];
  supermarket: ProductType[];
  automotive: ProductType[];
  singleProduct: ProductType | null;
  error: string;
};

// --- initialState
const initialState: ProductsState = {
  loading: false,
  laptops: [],
  mobiles: [],
  specialOffers: [],
  appliances: [],
  cookware: [],
  clothing: [],
  shoes: [],
  dresses: [],
  handbags: [],
  supermarket: [],
  automotive: [],
  singleProduct: null,
  error: "",
};

// --- Generic Async Thunk Pattern Or Parametric Data Fetcher

/**
 * @desc Get All Products
 * @route /:category
 * @method GET
 * @access public
 */
export const fetchProductsByCategory = createAsyncThunk<
  { data: ProductType[]; category: string }, // Payload/Return Type
  CategoriesType, // Argument Type
  { rejectValue: string } // ThunkConfig
>("products/category", async (category, { rejectWithValue }) => {
  try {
    const response = await api.get(`/${category}`);
    return { data: response.data, category };
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Get Product By Id
 * @route /:category/:id
 * @method GET
 * @access public
 */
type SingleProductType = {
  category: string;
  id: string;
};
export const fetchSingleProduct = createAsyncThunk<
  ProductType, // Return Type
  SingleProductType, // Argument Type
  { rejectValue: string } // ThunkConfig
>("products/single-product", async ({ category, id }, { rejectWithValue }) => {
  try {
    const response = await api.get(`/${category}/${id}`);
    const product = response.data;
    return product;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Add New Product
 * @route /:category
 * @method POST
 * @access private (admin)
 */
export const addProduct = createAsyncThunk<
  ProductType,
  {
    title: string;
    image: string;
    price: string;
    discount: string;
    category: string;
    description: string;
  },
  { rejectValue: string }
>("products/add-product", async (product, { rejectWithValue }) => {
  try {
    const response = await api.post(`/${product.category}`, {
      title: product.title,
      description: product.description,
      price: Number(product.price),
      discount: Number(product.discount),
      category: product.category,
      firstImage: product.image,
      secondImage: product.image,
      images: [product.image],
      rating: 0,
      reviews: 0,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Update Product
 * @route /category/:id
 * @method PUT
 * @access private (admin)
 */
export const updateProduct = createAsyncThunk<
  ProductType,
  {
    id: string;
    category: string;
    product: {
      title: string;
      image: string;
      price: string;
      discount: string;
      category: string;
      description: string;
    };
  },
  { rejectValue: string }
>("products/update-product", async ({ id, category, product }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/${category}/${id}`, {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount),
      firstImage: product.image,
      secondImage: product.image,
      images: [product.image],
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Delete Product
 * @route /category/:id
 * @method DELETE
 * @access private (admin)
 */
export const deleteProduct = createAsyncThunk<
  { id: string; category: string }, // Return Type
  { id: string; category: string }, // Argument Type
  { rejectValue: string }
>("products/delete-product", async ({ id, category }, { rejectWithValue }) => {
  try {
    await api.delete(`/${category}/${id}`);
    return { id, category };
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

// --- Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    // --- Fetch All Products By Category
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;

      const { category, data } = action.payload;

      state[category as CategoriesType] = data;

      state.error = "";
    });

    // --- Fetch Product By Id
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
      state.error = "";
    });

    // --- Add Product fulfilled
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;

      state[action.payload.category as CategoriesType].push(action.payload);

      state.error = "";
    });

    // --- Update Product fulfilled
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;

      const category = action.payload.category as CategoriesType;

      const updatedProduct = action.payload;

      const index = state[category].findIndex((p) => p.id === updatedProduct.id);

      if (index !== -1) {
        state[category][index] = updatedProduct;
      }

      if (state.singleProduct?.id === updatedProduct.id) {
        state.singleProduct = updatedProduct;
      }

      state.error = "";
    });

    // --- Delete Product fulfilled
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;

      const { id, category } = action.payload;

      state[category as CategoriesType] = state[category as CategoriesType].filter((product) => product.id != id);
    });

    // ----- Pending Case
    builder.addMatcher(
      isAnyOf(
        fetchProductsByCategory.pending,
        fetchSingleProduct.pending,
        addProduct.pending,
        updateProduct.pending,
        deleteProduct.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    // ----- Rejected Case
    builder.addMatcher(
      isAnyOf(
        fetchProductsByCategory.rejected,
        fetchSingleProduct.rejected,
        addProduct.rejected,
        updateProduct.rejected,
        deleteProduct.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export const { clearSingleProduct } = productsSlice.actions;
export default productsSlice.reducer;
