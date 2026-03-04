// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

// --- Utils
import api from "@utils/api";

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
  singleProduct: ProductType | null;
  error: string;
};

// --- initialState
const initialState: ProductsState = {
  loading: false,
  laptops: [],
  mobiles: [],
  specialOffers: [],
  singleProduct: null,
  error: "",
};

/**
 * @desc Get All Laptops
 * @route /laptops
 * @method GET
 * @access public
 */
export const fetchLaptops = createAsyncThunk<
  ProductType[], // Return Type
  void, // Argument Type
  { rejectValue: string } // ThunkConfig
>("products/laptops", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/laptops`);
    const laptops = response.data;
    return laptops;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Get All Mobiles
 * @route /mobiles
 * @method GET
 * @access public
 */
export const fetchMobiles = createAsyncThunk<
  ProductType[], // Return Type
  void, // Argument Type
  { rejectValue: string } // ThunkConfig
>("products/mobiles", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/mobiles`);
    const mobiles = response.data;
    return mobiles;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Get All Special Offers
 * @route /special-offers
 * @method GET
 * @access public
 */
export const fetchSpecialOffers = createAsyncThunk<
  ProductType[], // Return Type
  void, // Argument Type
  { rejectValue: string } // ThunkConfig
>("products/special-offers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/special-offers`);
    const specialOffers = response.data;
    return specialOffers;
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
    // ----- Fetch Laptops
    builder.addCase(fetchLaptops.fulfilled, (state, action) => {
      state.loading = false;
      state.laptops = action.payload;
      state.error = "";
    });

    // ----- Fetch Mobiles
    builder.addCase(fetchMobiles.fulfilled, (state, action) => {
      state.loading = false;
      state.mobiles = action.payload;
      state.error = "";
    });

    // --- Fetch Special Offers
    builder.addCase(fetchSpecialOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.specialOffers = action.payload;
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
      isAnyOf(
        fetchLaptops.pending,
        fetchMobiles.pending,
        fetchSpecialOffers.pending,
        fetchSingleProduct.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    // ----- Rejected Case
    builder.addMatcher(
      isAnyOf(
        fetchLaptops.rejected,
        fetchMobiles.rejected,
        fetchSpecialOffers.rejected,
        fetchSingleProduct.rejected,
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
