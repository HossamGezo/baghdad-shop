// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

// --- Utils
import api from "@utils/api";

// --- Types
import type { OrderType } from "@/types/types";

// --- Error Message
const errorMsg = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Server Error";
  }
  return error instanceof Error ? error.message : "Something went wrong!";
};

// --- Initial State
type OrdersState = {
  loading: boolean;
  orders: OrderType[];
  error: string;
};

const initialState: OrdersState = {
  loading: false,
  orders: [],
  error: "",
};

// --- Generic Async Thunk Pattern

/**
 * @desc Get All Orders
 * @route /api/orders
 * @method GET
 * @access private (admin)
 */
export const fetchAllOrders = createAsyncThunk<OrderType[], void, { rejectValue: string }>(
  "orders/all-orders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Get User Orders
 * @route /api/orders/my-orders
 * @method GET
 * @access private (user himself)
 */
export const fetchUserOrders = createAsyncThunk<OrderType[], void, { rejectValue: string }>(
  "orders/user-orders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders/my-orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Create Order
 * @route /api/orders/add-order
 * @method POST
 * @access private (logged in user)
 */
export const createOrder = createAsyncThunk<
  OrderType,
  Omit<OrderType, "_id" | "createdAt" | "updatedAt" | "status" | "totalPrice" | "userId">,
  { rejectValue: string }
>("orders/create-order", async (orderData, { rejectWithValue }) => {
  try {
    const response = await api.post("/orders/add-order", orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Update Order Status
 * @route /api/orders/:id
 * @method PATCH
 * @access private (admin)
 */
export const updateOrderStatus = createAsyncThunk<OrderType, { id: string; status: string }, { rejectValue: string }>(
  "orders/update-status",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

// --- Orders Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Fetch All Orders
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = "";
    });

    // --- Fetch User Orders
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = "";
    });

    // --- Create An Order
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
      state.error = "";
    });

    // --- Update Order Status
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.orders.findIndex((order) => order._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      state.error = "";
    });

    // --- Pending Case
    builder.addMatcher(
      isAnyOf(fetchAllOrders.pending, fetchUserOrders.pending, createOrder.pending, updateOrderStatus.pending),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    // --- Rejected Case
    builder.addMatcher(
      isAnyOf(fetchAllOrders.rejected, fetchUserOrders.rejected, createOrder.rejected, updateOrderStatus.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export default ordersSlice.reducer;
