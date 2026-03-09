// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

// --- Utils
import api from "@utils/api";

// --- Json
import database from "~/@/db.json";

// --- Types
import type { ProductType } from "@/types";

// --- Error Message
const errorMsg = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Something went wrong!";
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
type CategoryType = keyof typeof database;
export const fetchProductsByCategory = createAsyncThunk<
  { data: ProductType[]; category: string }, // Payload/Return Type
  CategoryType, // Argument Type
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
      const key = category as keyof ProductsState;
      if (key !== "loading" && key !== "error" && key !== "singleProduct")
        state[key] = data;

      state.error = "";
    });

    // --- Fetch Product By Id
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
      state.error = "";
    });

    // ----- Pending Case
    builder.addMatcher(
      isAnyOf(fetchProductsByCategory.pending, fetchSingleProduct.pending),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    // ----- Rejected Case
    builder.addMatcher(
      isAnyOf(fetchProductsByCategory.rejected, fetchSingleProduct.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export const { clearSingleProduct } = productsSlice.actions;
export default productsSlice.reducer;
