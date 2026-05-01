// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

// --- Utils
import api from "@utils/api";

// --- Types
import type { CategoriesType, ProductType } from "@/types/types";

// --- Error Message
const errorMsg = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Server Error";
  }
  return error instanceof Error ? error.message : "Something went wrong!";
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

/**
 * @desc Get All Products By Category
 * @route /api/products?category
 * @method GET
 * @access public
 */
export const fetchProductsByCategory = createAsyncThunk<
  { data: ProductType[]; category: string },
  CategoriesType,
  { rejectValue: string }
>("products/category", async (category, { rejectWithValue }) => {
  try {
    const response = await api.get(`/products?category=${category}`);
    return { data: response.data, category };
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Get Product By Id
 * @route /api/products/:id
 * @method GET
 * @access public
 */
export const fetchSingleProduct = createAsyncThunk<ProductType, { id: string }, { rejectValue: string }>(
  "products/single-product",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Add New Product
 * @route /api/products/add-product
 * @method POST
 * @access private (admin)
 */
export const addProduct = createAsyncThunk<ProductType, FormData, { rejectValue: string }>(
  "products/add-product",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/products/add-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Update Product
 * @route /api/products/:id
 * @method PUT
 * @access private (admin)
 */
export const updateProduct = createAsyncThunk<ProductType, { id: string; formData: FormData }, { rejectValue: string }>(
  "products/update-product",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Delete Product
 * @route /api/products/:id
 * @method DELETE
 * @access private (admin)
 */
export const deleteProduct = createAsyncThunk<
  { id: string; category: string },
  { id: string; category: string },
  { rejectValue: string }
>("products/delete-product", async ({ id, category }, { rejectWithValue }) => {
  try {
    await api.delete(`/products/${id}`);
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

      const key = category as keyof Omit<ProductsState, "loading" | "error" | "singleProduct">;
      state[key] = data;

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

      const key = action.payload.category as keyof Omit<ProductsState, "loading" | "error" | "singleProduct">;

      if (state[key]) {
        state[key].push(action.payload);
      }

      state.error = "";
    });

    // --- Update Product fulfilled
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;

      const key = action.payload.category as keyof Omit<ProductsState, "loading" | "error" | "singleProduct">;
      const updatedProduct = action.payload;

      const index = state[key].findIndex((p) => p._id === updatedProduct._id);
      if (index !== -1) {
        state[key][index] = updatedProduct;
      }

      if (state.singleProduct?._id === updatedProduct._id) {
        state.singleProduct = updatedProduct;
      }

      state.error = "";
    });

    // --- Delete Product fulfilled
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      const { id, category } = action.payload;
      const key = category as keyof Omit<ProductsState, "loading" | "error" | "singleProduct">;
      state[key] = state[key].filter((product) => product._id !== id);
    });

    // --- Pending Case
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

    // --- Rejected Case
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
