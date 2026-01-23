// --- Libraries
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// --- Types
import type {ProductProps} from "../../types";

// --- Base Url
const baseUrl = "http://localhost:5100";

// --- Error Message
const errorMsg = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Something went wrong!";
  return message;
};

// --- InitialStateProps (Types)
type InitialStateProps = {
  loading: boolean;
  laptops: ProductProps[];
  mobiles: ProductProps[];
  specialOffers: ProductProps[];
  singleProduct: ProductProps | null;
  error: string;
};

// --- initialState
const initialState: InitialStateProps = {
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
  ProductProps[], // Return Type
  void, // Argument Type
  {rejectValue: string} // ThunkConfig
>("products/laptops", async (_, {rejectWithValue}) => {
  try {
    const response = await axios(`${baseUrl}/laptops`);
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
  ProductProps[], // Return Type
  void, // Argument Type
  {rejectValue: string} // ThunkConfig
>("products/mobiles", async (_, {rejectWithValue}) => {
  try {
    const response = await axios(`${baseUrl}/mobiles`);
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
  ProductProps[], // Return Type
  void, // Argument Type
  {rejectValue: string} // ThunkConfig
>("products/specialOffers", async (_, {rejectWithValue}) => {
  try {
    const response = await axios(`${baseUrl}/special-offers`);
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
type SingleProductProps = {
  category: string;
  id: string;
};
export const fetchSingleProduct = createAsyncThunk<
  ProductProps, // Return Type
  SingleProductProps, // Argument Type
  {rejectValue: string} // ThunkConfig
>("products/singleProduct", async ({category, id}, {rejectWithValue}) => {
  try {
    const response = await axios(`${baseUrl}/${category}/${id}`);
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
    builder.addCase(fetchLaptops.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLaptops.fulfilled, (state, action) => {
      state.loading = false;
      state.laptops = action.payload;
      state.error = "";
    });
    builder.addCase(fetchLaptops.rejected, (state, action) => {
      state.loading = false;
      state.laptops = [];
      state.error = action.payload as string;
    });

    // ----- Fetch Mobiles
    builder.addCase(fetchMobiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMobiles.fulfilled, (state, action) => {
      state.loading = false;
      state.mobiles = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMobiles.rejected, (state, action) => {
      state.loading = false;
      state.mobiles = [];
      state.error = action.payload as string;
    });

    // --- Fetch Special Offers
    builder.addCase(fetchSpecialOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSpecialOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.specialOffers = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSpecialOffers.rejected, (state, action) => {
      state.loading = false;
      state.specialOffers = [];
      state.error = action.payload as string;
    });

    // --- Fetch Product By Id
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.singleProduct = null;
      state.error = action.payload as string;
    });
  },
});

export const {clearSingleProduct} = productsSlice.actions;
export default productsSlice.reducer;
