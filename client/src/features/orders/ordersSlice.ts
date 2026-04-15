// --- Libraries

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

// --- Utils

import api from "@utils/api";

// --- Types

import type { OrderType } from "@/types/types";

// --- Error Message

const errorMsg = (error: unknown) => {
  const message = error instanceof Error ? error.message : "Something went wrong!";
  return message;
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
 * @route /orders
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
 * @desc Create Order
 * @route /orders
 * @method POST
 * @access public
 */
export const createOrder = createAsyncThunk<
  OrderType,
  Omit<OrderType, "id" | "createdAt" | "status" | "paymentMethod">,
  { rejectValue: string }
>("orders/create-order", async (order, { rejectWithValue }) => {
  try {
    const response = await api.post("/orders", {
      ...order,
      status: "pending",
      paymentMethod: "card",
      createdAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Update Order Status
 * @route /orders/:id
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
    // --- Fetch All Orders 'Fulfilled Case'

    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.loading = false;

      state.orders = action.payload;

      state.error = "";
    });

    // --- Create An Order 'Fulfilled Case'

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
      state.error = "";
    });

    // --- Update Order Status 'Fulfilled Case'

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.orders.findIndex((order) => order.id == action.payload.id);
      if (index != -1) {
        state.orders[index] = action.payload;
      }

      state.error = "";
    });

    // --- Pending Case

    builder.addMatcher(isAnyOf(fetchAllOrders.pending, createOrder.pending, updateOrderStatus.pending), (state) => {
      state.loading = true;
      state.error = "";
    });

    // --- Rejected Case

    builder.addMatcher(
      isAnyOf(fetchAllOrders.rejected, createOrder.rejected, updateOrderStatus.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export default ordersSlice.reducer;
