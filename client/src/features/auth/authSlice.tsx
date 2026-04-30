// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

// --- Utils
import api from "@utils/api";

// --- Types
import type {
  LoginType,
  RegisterType,
  ResetPasswordType,
  UpdateProfileType,
  UserType,
  AuthResponseType,
} from "@/types/types";
import type { RootState } from "@app/store";

// --- RTK
import { updateUserRole } from "@features/users/usersSlice";

// --- localStorage
const storedUser = window.localStorage.getItem("user");
const user: AuthResponseType | null = storedUser ? JSON.parse(storedUser) : null;

// --- Error Message
const errorMsg = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Server Error";
  }
  return error instanceof Error ? error.message : "Something went wrong!";
};

// --- State
type AuthState = {
  loading: boolean;
  user: AuthResponseType | null;
  isAuthenticated: boolean;
  error: string;
};

const initialState: AuthState = {
  loading: false,
  user: user,
  isAuthenticated: Boolean(user),
  error: "",
};

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
export const registerUser = createAsyncThunk<AuthResponseType, RegisterType, { rejectValue: string }>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
export const loginUser = createAsyncThunk<AuthResponseType, LoginType, { rejectValue: string }>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Reset Password
 * @route /api/auth/reset-password
 * @method POST
 * @access public
 */
export const resetPassword = createAsyncThunk<string, ResetPasswordType, { rejectValue: string }>(
  "auth/reset-password",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/reset-password", userData);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Update Profile
 * @route /api/users/:id
 * @method PUT
 * @access private (user himself & admin)
 */
export const updateProfile = createAsyncThunk<UserType, UpdateProfileType, { rejectValue: string; state: RootState }>(
  "auth/update-profile",
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().auth;

      if (!user) return rejectWithValue("No user logged in");

      const response = await api.put(`/users/${user._id}`, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

// --- authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // --- Register Fulfilled
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = "";
    });

    // --- Login Fulfilled
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = "";
    });

    // --- Reset Password Fulfilled
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });

    // --- Update Profile Fullfilled
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      if (state.user) {
        state.user = {
          ...action.payload,
          token: state.user.token,
        };
      }
      state.error = "";
    });

    // --- Update User Role "From Users Slice"
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.loading = false;
      if (state.user?._id == action.payload._id) {
        state.user = {
          ...action.payload,
          token: state.user.token,
        };
      }
      state.error = "";
    });

    // --- Pending Case
    builder.addMatcher(
      isAnyOf(registerUser.pending, loginUser.pending, resetPassword.pending, updateProfile.pending),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    // --- Rejected Case
    builder.addMatcher(
      isAnyOf(registerUser.rejected, loginUser.rejected, resetPassword.rejected, updateProfile.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
