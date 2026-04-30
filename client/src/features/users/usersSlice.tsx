// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

// --- Utils
import api from "@utils/api";

// --- Types
import type { UserType } from "@/types/types";

// --- Error Message
const errorMsg = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Server Error";
  }
  return error instanceof Error ? error.message : "Something went wrong!";
};

// --- UsersState (Types)
type UsersState = {
  loading: boolean;
  users: UserType[];
  singleUser: UserType | null;
  error: string;
};

// --- initialState
const initialState: UsersState = {
  loading: false,
  users: [],
  singleUser: null,
  error: "",
};

/**
 * @desc Get All Users
 * @route /api/users
 * @access private (admin only)
 */
export const fetchUsers = createAsyncThunk<UserType[], void, { rejectValue: string }>(
  "users/all-users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Get User Profile
 * @route /api/users/:id
 * @access private (owner or admin)
 */
export const fetchUserById = createAsyncThunk<UserType, { id: string }, { rejectValue: string }>(
  "users/single-user",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Update User Role
 * @route /api/users/:id
 * @access private (admin only)
 */
export const updateUserRole = createAsyncThunk<
  UserType,
  { id: string; role: "admin" | "customer" },
  { rejectValue: string }
>("users/update-role", async ({ id, role }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/users/${id}`, { role });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Delete User
 * @route /api/users/:id
 * @access private (admin only)
 */
export const deleteUser = createAsyncThunk<string, { id: string }, { rejectValue: string }>(
  "users/delete-user",
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

// --- Users Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Fetch All Users
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });

    // --- Fetch User By Id
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleUser = action.payload;
      state.error = "";
    });

    // --- Update User Role
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.users.findIndex((user) => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      state.singleUser = action.payload;
      state.error = "";
    });

    // --- Delete User
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user._id !== action.payload);
      state.error = "";
    });

    // --- Matchers
    builder.addMatcher(
      isAnyOf(fetchUsers.pending, fetchUserById.pending, updateUserRole.pending, deleteUser.pending),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    builder.addMatcher(
      isAnyOf(fetchUsers.rejected, fetchUserById.rejected, updateUserRole.rejected, deleteUser.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export default usersSlice.reducer;
