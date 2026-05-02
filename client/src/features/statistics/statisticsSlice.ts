// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

// --- Utils
import api from "@utils/api";

// --- Types
import type { DashboardStatsType } from "@/types/types";

// --- Error Message
const errorMsg = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Server Error";
  }
  return error instanceof Error ? error.message : "Something went wrong!";
};

// --- StatisticsState (Types)
type StatisticsState = {
  loading: boolean;
  stats: DashboardStatsType | null;
  error: string;
};

// --- initialState
const initialState: StatisticsState = {
  loading: false,
  stats: null,
  error: "",
};

/**
 * @desc Get Dashboard Statistics
 * @route /api/statistics
 * @method GET
 * @access private (only admin)
 */
export const fetchDashboardStats = createAsyncThunk<DashboardStatsType, void, { rejectValue: string }>(
  "statistics/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/statistics");
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

// --- Statistics Slice
const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    clearStats: (state) => {
      state.stats = null;
    },
  },
  extraReducers: (builder) => {
    // --- Fetch Dashboard Stats fulfilled
    builder.addCase(fetchDashboardStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.error = "";
    });

    // --- Pending Case
    builder.addMatcher(isAnyOf(fetchDashboardStats.pending), (state) => {
      state.loading = true;
      state.error = "";
    });

    // --- Rejected Case
    builder.addMatcher(isAnyOf(fetchDashboardStats.rejected), (state, action) => {
      state.loading = false;
      state.error = action.payload || "An unexpected error occurred";
    });
  },
});

export const { clearStats } = statisticsSlice.actions;
export default statisticsSlice.reducer;
